import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicProductBySlug } from "@/lib/public-catalog";
import { ProductDetail } from "./product-detail";

type ProductPageProps = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);
  if (!product) return { title: "Produk tidak ditemukan | Dzikra" };
  return {
    title: `${product.name} | Dzikra`,
    description: product.description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: { title: `${product.name} | Dzikra`, description: product.description, type: "website" },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetail initialProduct={product} slug={slug} />;
}
