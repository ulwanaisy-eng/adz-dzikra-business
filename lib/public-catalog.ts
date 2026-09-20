import { createClient } from "@supabase/supabase-js";
import { getCatalogProducts, getProductBySlug, Product } from "@/lib/products";

type ProductRow = Record<string, unknown> & {
  product_images?: Array<{ storage_path: string; sort_order: number }>;
};

function getPublicCatalogClient() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!rawUrl || !key) return null;

  // Accept either the regular project URL or the REST endpoint users often copy.
  const url = rawUrl.replace(/\/rest\/v1\/?$/, "");
  return {
    url,
    client: createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    }),
  };
}

function mapProduct(row: ProductRow, baseUrl: string): Product {
  const imageRoot = `${baseUrl}/storage/v1/object/public/product-images/`;
  const images = (row.product_images ?? [])
    .sort((first, second) => first.sort_order - second.sort_order)
    .map((image) => `${imageRoot}${image.storage_path}`);

  return {
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name),
    description: String(row.description),
    author: row.author ? String(row.author) : undefined,
    muhaqqiq: row.muhaqqiq ? String(row.muhaqqiq) : undefined,
    preorderPrice: row.preorder_price == null ? undefined : Number(row.preorder_price),
    retailPrice: row.retail_price == null ? undefined : Number(row.retail_price),
    preorderStartsAt: row.preorder_starts_at ? String(row.preorder_starts_at) : undefined,
    preorderEndsAt: row.preorder_ends_at ? String(row.preorder_ends_at) : undefined,
    preorderStatus: row.preorder_status as Product["preorderStatus"],
    dimensions: row.dimensions ? String(row.dimensions) : undefined,
    weightGrams: row.weight_grams == null ? undefined : Number(row.weight_grams),
    coverType: row.cover_type ? String(row.cover_type) : undefined,
    images,
    orderUrl: row.order_url ? String(row.order_url) : undefined,
    status: row.status as Product["status"],
  };
}

/**
 * Public storefront repository. Supabase becomes the live source as soon as it
 * is configured; JSON remains a safe local-development fallback.
 */
export async function getPublicCatalogProducts(): Promise<Product[]> {
  const source = getPublicCatalogClient();
  if (!source) return getCatalogProducts();

  const { data, error } = await source.client
    .from("products")
    .select("*, product_images(storage_path, sort_order)")
    .order("created_at", { ascending: false });

  if (error) return getCatalogProducts();
  return (data as ProductRow[]).map((product) => mapProduct(product, source.url));
}

export async function getPublicProductBySlug(slug: string): Promise<Product | undefined> {
  const source = getPublicCatalogClient();
  if (!source) return getProductBySlug(slug);

  const { data, error } = await source.client
    .from("products")
    .select("*, product_images(storage_path, sort_order)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) return getProductBySlug(slug);
  return data ? mapProduct(data as ProductRow, source.url) : undefined;
}
