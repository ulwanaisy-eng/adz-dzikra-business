import productData from "@/content/products.json";

export type ProductStatus = "PREORDER" | "READY" | "DRAFT" | "SOLD_OUT";
export type PreorderStatus = "UPCOMING" | "OPEN" | "CLOSED";

/**
 * The public product contract. JSON, Supabase, Decap, and Tina can all map to
 * this shape, so the storefront never needs to know where content originated.
 */
export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  author?: string;
  muhaqqiq?: string;
  preorderPrice?: number;
  retailPrice?: number;
  preorderStartsAt?: string;
  preorderEndsAt?: string;
  preorderStatus?: PreorderStatus;
  dimensions?: string;
  weightGrams?: number;
  coverType?: string;
  /** Foto fisik kitab. Maksimal lima foto per katalog. */
  images?: string[];
  /** URL form Tally khusus untuk produk ini. */
  orderUrl?: string;
  status: ProductStatus;
};

type ProductRecord = Omit<
  Product,
  | "author"
  | "muhaqqiq"
  | "preorderPrice"
  | "retailPrice"
  | "preorderStartsAt"
  | "preorderEndsAt"
  | "preorderStatus"
  | "dimensions"
  | "weightGrams"
  | "coverType"
  | "images"
  | "orderUrl"
> & {
  author?: string | null;
  muhaqqiq?: string | null;
  preorderPrice?: number | null;
  retailPrice?: number | null;
  preorderStartsAt?: string | null;
  preorderEndsAt?: string | null;
  preorderStatus?: PreorderStatus | null;
  dimensions?: string | null;
  weightGrams?: number | null;
  coverType?: string | null;
  images?: string[] | null;
  orderUrl?: string | null;
};

const undefinedWhenEmpty = <Value,>(value: Value | null | undefined) => value ?? undefined;

export const products = (productData as unknown as ProductRecord[]).map((product) => ({
  ...product,
  author: undefinedWhenEmpty(product.author),
  muhaqqiq: undefinedWhenEmpty(product.muhaqqiq),
  preorderPrice: undefinedWhenEmpty(product.preorderPrice),
  retailPrice: undefinedWhenEmpty(product.retailPrice),
  preorderStartsAt: undefinedWhenEmpty(product.preorderStartsAt),
  preorderEndsAt: undefinedWhenEmpty(product.preorderEndsAt),
  preorderStatus: undefinedWhenEmpty(product.preorderStatus),
  dimensions: undefinedWhenEmpty(product.dimensions),
  weightGrams: undefinedWhenEmpty(product.weightGrams),
  coverType: undefinedWhenEmpty(product.coverType),
  images: product.images ?? [],
  orderUrl: undefinedWhenEmpty(product.orderUrl),
}));

/** Products intentionally kept as drafts do not appear in the public catalogue. */
export const getCatalogProducts = () => products.filter((product) => product.status !== "DRAFT");

export const getProductBySlug = (slug: string) =>
  getCatalogProducts().find((product) => product.slug === slug);

export const formatRupiah = (value?: number) =>
  value == null
    ? "Harga akan diumumkan"
    : new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(value);

export const productStatusLabel = (status: ProductStatus, preorderStatus?: PreorderStatus) => {
  if (status === "PREORDER") {
    if (preorderStatus === "OPEN") return "Pre-order dibuka";
    if (preorderStatus === "CLOSED") return "Pre-order ditutup";
    return "Pre-order akan hadir";
  }

  if (status === "READY") return "Tersedia";
  if (status === "SOLD_OUT") return "Stok habis";
  return "Draft";
};

export const productHref = (slug: string) => `/product/${slug}`;
