"use client";

import { Book } from "@/lib/catalog";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { saveProductImages, type ImageRecord } from "@/lib/product-images";

type ProductRow = Record<string, unknown> & { product_images?: Array<{ storage_path: string; sort_order: number }> };
const mapProduct = (row: ProductRow): Book => ({
  id: String(row.id), slug: String(row.slug), name: String(row.name), description: String(row.description),
  author: row.author as string | undefined, muhaqqiq: row.muhaqqiq as string | undefined,
  preorderPrice: row.preorder_price ? Number(row.preorder_price) : undefined, retailPrice: row.retail_price ? Number(row.retail_price) : undefined,
  preorderStartsAt: row.preorder_starts_at as string | undefined, preorderEndsAt: row.preorder_ends_at as string | undefined,
  preorderStatus: row.preorder_status as Book["preorderStatus"], dimensions: row.dimensions as string | undefined,
  weightGrams: row.weight_grams ? Number(row.weight_grams) : undefined, coverType: row.cover_type as string | undefined,
  orderUrl: row.order_url as string | undefined,
  status: row.status as Book["status"], images: (row.product_images ?? []).sort((a,b) => a.sort_order-b.sort_order).map(image => getSupabaseBrowserClient()!.storage.from("product-images").getPublicUrl(image.storage_path).data.publicUrl),
});

export async function loadSupabaseCatalog(publicOnly = false) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;
  let query = supabase.from("products").select("*, product_images(storage_path, sort_order)").order("created_at", { ascending: false });
  if (publicOnly) query = query.in("status", ["PREORDER", "READY", "SOLD_OUT"]);
  const { data, error } = await query;
  if (error) throw error;
  return (data as ProductRow[]).map(mapProduct);
}

export async function loadSupabaseBookBySlug(slug: string, publicOnly = false) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;
  let query = supabase
    .from("products")
    .select("*, product_images(storage_path, sort_order)")
    .eq("slug", slug);
  if (publicOnly) query = query.in("status", ["PREORDER", "READY", "SOLD_OUT"]);
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return data ? mapProduct(data as ProductRow) : undefined;
}

export async function saveSupabaseBook(book: Book, progress?: (message: string) => void): Promise<Book> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) throw new Error("Koneksi Supabase belum diatur. Produk belum tersimpan.");
  const { data: auth, error: authError } = await supabase.auth.getSession();
  if (authError || !auth.session) throw new Error("Sesi admin berakhir. Silakan masuk lagi; draft foto tetap tersedia.");
  progress?.("Menyimpan informasi kitab…");
  const row = { id: book.id, slug: book.slug, name: book.name, description: book.description, author: book.author ?? null, muhaqqiq: book.muhaqqiq ?? null, preorder_price: book.preorderPrice ?? null, retail_price: book.retailPrice ?? null, preorder_starts_at: book.preorderStartsAt ?? null, preorder_ends_at: book.preorderEndsAt ?? null, preorder_status: book.preorderStatus ?? "UPCOMING", dimensions: book.dimensions ?? null, weight_grams: book.weightGrams ?? null, cover_type: book.coverType ?? null, order_url: book.orderUrl ?? null, status: book.status };
  const { error } = await supabase.from("products").upsert(row);
  if (error) throw new Error(`Informasi kitab belum tersimpan: ${error.message}`);
  const { data: oldImages, error: oldImagesError } = await supabase.from("product_images").select("storage_path, sort_order").eq("product_id", book.id);
  if (oldImagesError) throw new Error(`Galeri belum dapat dibaca: ${oldImagesError.message}`);
  const bucket = supabase.storage.from("product-images");
  const publicPrefix = bucket.getPublicUrl("").data.publicUrl;
  const rows = await saveProductImages(book.images ?? [], oldImages as ImageRecord[], {
    existingPath: (url) => {
      if (!url.startsWith(publicPrefix)) throw new Error("Foto ini belum berada di penyimpanan Dzikra. Unggah kembali file aslinya.");
      const path = decodeURIComponent(url.slice(publicPrefix.length));
      if (!path.startsWith(`${book.id}/`) || path.includes("..") || path.includes("?")) throw new Error("Tautan foto tidak sesuai dengan kitab ini.");
      return path;
    },
    upload: async (blob, index) => {
      const path = `${book.id}/${crypto.randomUUID()}.${blob.type === "image/jpeg" ? "jpg" : blob.type.split("/")[1]}`;
      const { error } = await bucket.upload(path, blob, { contentType: blob.type });
      if (error) throw new Error(`Foto ${index + 1} gagal diunggah: ${error.message}`);
      return path;
    },
    insert: async (images) => {
      const { error } = await supabase.from("product_images").insert(images.map(image => ({ ...image, product_id: book.id })));
      if (error) throw new Error(`Tautan galeri belum tersimpan: ${error.message}`);
    },
    removeReferences: async () => {
      const { error } = await supabase.from("product_images").delete().eq("product_id", book.id);
      if (error) throw new Error(`Galeri belum dapat diperbarui: ${error.message}`);
    },
  }, progress);
  progress?.("Memastikan foto tersimpan…");
  const saved = await loadSupabaseBookBySlug(book.slug);
  const expected = rows.map(row => bucket.getPublicUrl(row.storage_path).data.publicUrl);
  if (!saved || saved.id !== book.id || JSON.stringify(saved.images) !== JSON.stringify(expected)) {
    throw new Error("Hasil simpan galeri belum dapat dipastikan. Draft masih tersedia; coba simpan kembali saat koneksi stabil.");
  }
  return saved;
}
