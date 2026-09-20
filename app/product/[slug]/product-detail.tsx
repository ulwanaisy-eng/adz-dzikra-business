"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookGallery } from "@/app/components/book-gallery";
import { formatRupiah, Product, productStatusLabel } from "@/lib/products";
import { loadSupabaseBookBySlug } from "@/lib/supabase-catalog";
import styles from "./page.module.css";
import { trackCheckoutStarted, trackOrderButtonClick, trackProductView } from "@/lib/analytics";

type ProductDetailProps = {
  initialProduct: Product;
  slug: string;
};

const formatDate = (value?: string | null) => value
  ? new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${value}T00:00:00`))
  : null;

export function ProductDetail({ initialProduct, slug }: ProductDetailProps) {
  const [product, setProduct] = useState(initialProduct);

  useEffect(() => {
    trackProductView(product);
    let active = true;
    loadSupabaseBookBySlug(slug, true)
      .then((remoteProduct) => { if (active && remoteProduct) setProduct(remoteProduct); })
      .catch(() => undefined);
    return () => { active = false; };
  }, [slug]);

  const preorderStartsAt = formatDate(product.preorderStartsAt);
  const preorderEndsAt = formatDate(product.preorderEndsAt);
  const price = product.status === "PREORDER" && product.preorderPrice != null ? product.preorderPrice : product.retailPrice;
  const specifications = [
    ["Penulis", product.author],
    ["Muhaqqiq", product.muhaqqiq],
    ["Ukuran", product.dimensions],
    ["Berat", product.weightGrams != null ? `${product.weightGrams} gram` : null],
    ["Cover", product.coverType],
    ["Periode pre-order", preorderStartsAt && preorderEndsAt ? `${preorderStartsAt} — ${preorderEndsAt}` : null],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <main className={styles.page}>
      <header className={styles.navigation}>
        <Link href="/" className={styles.wordmark} aria-label="Kembali ke beranda Dzikra">DZIKRA <span>®</span></Link>
        <Link href="/#koleksi" className={styles.backLink}>← Kembali ke koleksi</Link>
      </header>
      <section className={styles.product} aria-labelledby="product-title">
        <div className={styles.galleryPanel}>
          <div className={styles.galleryFrame}><BookGallery images={product.images} title={product.name} sizes="(max-width: 820px) 100vw, 48vw" /></div>
          <p className={styles.photoNote}>{product.images?.length ? `${product.images.length} foto kitab` : "Foto fisik kitab akan hadir"}</p>
        </div>
        <article className={styles.content}>
          <p className={styles.eyebrow}>KOLEKSI DZIKRA · {product.status === "PREORDER" ? "PRE-ORDER" : "KITAB"}</p>
          <h1 id="product-title">{product.name}</h1>
          <p className={styles.status}>{productStatusLabel(product.status, product.preorderStatus)}</p>
          <p className={styles.price}>{formatRupiah(price)}</p>
          <p className={styles.description}>{product.description}</p>
          {product.orderUrl ? <a className={styles.orderButton} href={product.orderUrl} target="_blank" rel="noreferrer" onClick={() => { trackOrderButtonClick(product); trackCheckoutStarted(product); }}>Pesan Sekarang <span aria-hidden="true">↗</span></a> : <span className={styles.orderPending}>Form pemesanan akan segera tersedia</span>}
          <div className={styles.specifications}>
            <p className={styles.specificationLabel}>SPESIFIKASI</p>
            {specifications.length ? <dl>{specifications.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl> : <p className={styles.pending}>Spesifikasi lengkap akan diperbarui oleh tim Dzikra.</p>}
          </div>
        </article>
      </section>
    </main>
  );
}
