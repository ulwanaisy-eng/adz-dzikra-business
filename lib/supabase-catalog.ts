"use client";

import { Book } from "@/lib/catalog";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

type ProductRow = Record<string, unknown> & { product_images?: Array<{ storage_path: string; sort_order: number }> };
const mapProduct = (row: ProductRow): Book => ({
  id: String(row.id), slug: String(row.slug), name: String(row.name), description: String(row.description),
  author: row.author as string | undefined, muhaqqiq: row.muhaqqiq as string | undefined,
  preorderPrice: row.preorder_price ? Number(row.preorder_price) : undefined, retailPrice: row.retail_price ? Number(row.retail_price) : undefined,
  preorderStartsAt: row.preorder_starts_at as string | undefined, preorderEndsAt: row.preorder_ends_at as string | undefined,
  preorderStatus: row.preorder_status as Book["preorderStatus"], dimensions: row.dimensions as string | undefined,
  weightGrams: row.weight_grams ? Number(row.weight_grams) : undefined, coverType: row.cover_type as string | undefined,
  status: row.status as Book["status"], images: (row.product_images ?? []).sort((a,b) => a.sort_order-b.sort_order).map(image => getSupabaseBrowserClient()!.storage.from("product-images").getPublicUrl(image.storage_path).data.publicUrl),
});

export async function loadSupabaseCatalog() {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;
  const { data, error } = await supabase.from("products").select("*, product_images(storage_path, sort_order)").order("created_at", { ascending: false });
  if (error) throw error;
  return (data as ProductRow[]).map(mapProduct);
}

export async function saveSupabaseBook(book: Book) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;
  const row = { id: book.id, slug: book.slug, name: book.name, description: book.description, author: book.author ?? null, muhaqqiq: book.muhaqqiq ?? null, preorder_price: book.preorderPrice ?? null, retail_price: book.retailPrice ?? null, preorder_starts_at: book.preorderStartsAt ?? null, preorder_ends_at: book.preorderEndsAt ?? null, preorder_status: book.preorderStatus ?? "UPCOMING", dimensions: book.dimensions ?? null, weight_grams: book.weightGrams ?? null, cover_type: book.coverType ?? null, status: book.status };
  const { error } = await supabase.from("products").upsert(row);
  if (error) throw error;
  const { data: oldImages } = await supabase.from("product_images").select("storage_path").eq("product_id", book.id);
  if (oldImages?.length) { await supabase.storage.from("product-images").remove(oldImages.map(item => item.storage_path)); await supabase.from("product_images").delete().eq("product_id", book.id); }
  const rows = await Promise.all((book.images ?? []).map(async (image, sort_order) => {
    if (!image.startsWith("data:")) return null;
    const blob = await (await fetch(image)).blob();
    const extension = blob.type.split("/")[1] || "jpg";
    const storage_path = `${book.id}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from("product-images").upload(storage_path, blob, { contentType: blob.type });
    if (uploadError) throw uploadError;
    return { product_id: book.id, storage_path, sort_order };
  }));
  const images = rows.filter((row): row is { product_id: string; storage_path: string; sort_order: number } => row !== null);
  if (images.length) { const { error: imageError } = await supabase.from("product_images").insert(images); if (imageError) throw imageError; }
}
