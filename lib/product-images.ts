export const MAX_PRODUCT_PHOTOS = 5;
export const MAX_PHOTO_BYTES = 10 * 1024 * 1024;

export function dataPhotoToBlob(image: string): Blob {
  const match = /^data:image\/[a-z0-9.+-]+;base64,([\s\S]+)$/i.exec(image);
  if (!match) throw new Error("Format foto tidak didukung. Gunakan JPG, PNG, atau WebP.");
  const binary = atob(match[1]);
  if (binary.length > MAX_PHOTO_BYTES) throw new Error("Ukuran foto maksimal 10 MB per foto.");
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  // Read the file signature: clipboard files sometimes say JPEG but contain PNG.
  const type = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47
    ? "image/png"
    : bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
      ? "image/jpeg"
      : String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP"
        ? "image/webp" : null;
  if (!type) throw new Error("Foto harus berupa JPG, PNG, atau WebP yang valid.");
  return new Blob([bytes], { type });
}

export type ImageRecord = { storage_path: string; sort_order: number };
type PhotoRepository = {
  upload: (blob: Blob, index: number) => Promise<string>;
  existingPath: (url: string) => string;
  insert: (rows: ImageRecord[]) => Promise<void>;
  removeReferences: () => Promise<void>;
};

/** Files are uploaded first; an upload failure never touches the live gallery. */
export async function saveProductImages(
  images: string[], oldImages: ImageRecord[], repository: PhotoRepository,
  progress?: (message: string) => void,
): Promise<ImageRecord[]> {
  if (images.length > MAX_PRODUCT_PHOTOS) throw new Error("Maksimal lima foto untuk satu kitab.");
  // Validate every local file before starting any remote operation.
  const prepared = images.map((image) => image.startsWith("data:") ? dataPhotoToBlob(image) : repository.existingPath(image));
  const rows: ImageRecord[] = [];
  for (let index = 0; index < prepared.length; index++) {
    const image = prepared[index];
    progress?.(`Mengunggah foto ${index + 1} dari ${prepared.length}…`);
    const storage_path = typeof image === "string" ? image : await repository.upload(image, index);
    rows.push({ storage_path, sort_order: index });
  }
  const old = [...oldImages].sort((a, b) => a.sort_order - b.sort_order);
  if (JSON.stringify(old) === JSON.stringify(rows)) return rows;
  progress?.("Menyimpan galeri foto…");
  // Appending is safe without replacing existing references.
  if (rows.length >= old.length && old.every((row, index) => JSON.stringify(row) === JSON.stringify(rows[index]))) {
    if (rows.length > old.length) await repository.insert(rows.slice(old.length));
    return rows;
  }
  // Keep the underlying files; recover old references if replacement fails.
  await repository.removeReferences();
  try {
    if (rows.length) await repository.insert(rows);
  } catch (error) {
    try {
      if (old.length) await repository.insert(old);
    } catch {
      throw new Error("Galeri gagal diperbarui. File foto tetap tersimpan, tetapi tautan galeri perlu dipulihkan. Draft foto tetap tersedia.");
    }
    throw error;
  }
  return rows;
}
