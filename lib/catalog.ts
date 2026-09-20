// Compatibility bridge for the existing admin editor. The canonical local
// content source is content/products.json through lib/products.ts.
export { products as books } from "@/lib/products";
export type { Product as Book, ProductStatus } from "@/lib/products";
