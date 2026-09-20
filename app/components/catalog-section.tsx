"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Product, productHref, productStatusLabel } from "@/lib/products";
import { loadSupabaseCatalog } from "@/lib/supabase-catalog";
import { BookGallery } from "./book-gallery";
import { trackProductClick } from "@/lib/analytics";

type CatalogSectionProps = {
  initialProducts: Product[];
};

/** Loads live data in the visitor browser after the first visual render. */
export function CatalogSection({ initialProducts }: CatalogSectionProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hasLoadedLiveData, setHasLoadedLiveData] = useState(false);

  useEffect(() => {
    let active = true;
    let firstLoad = true;
    const refresh = () => {
      loadSupabaseCatalog(true)
        .then((remoteProducts) => {
          if (active && remoteProducts) setProducts(remoteProducts);
        })
        .catch(() => undefined)
        .finally(() => {
          if (active && firstLoad) {
            setHasLoadedLiveData(true);
            firstLoad = false;
          }
        });
    };
    refresh();
    const interval = window.setInterval(refresh, 15000);
    const onFocus = () => refresh();
    const onVisible = () => { if (document.visibilityState === "visible") refresh(); };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      active = false;
      window.clearInterval(interval);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <section className="catalog" id="koleksi">
      <div className="catalog-head">
        <div>
          <p className="eyebrow">KOLEKSI DZIKRA</p>
          <h2>Kitab pilihan<br />untuk perjalanan ilmu.</h2>
        </div>
        <p>Produk dan informasi pre-order selalu diperbarui langsung oleh tim Dzikra.</p>
      </div>
      {hasLoadedLiveData && products.length === 0 ? (
        <p className="catalog-empty">Koleksi sedang disiapkan. Nantikan kitab Dzikra berikutnya.</p>
      ) : (
        <div className="book-grid">
          {products.map((book) => (
            <article className="book-card" key={book.id}>
              <div className="cover-wrap"><BookGallery images={book.images} title={book.name} /></div>
              <div className="book-info">
                <p className="status">{productStatusLabel(book.status, book.preorderStatus)}</p>
                <h3>{book.name}</h3>
                <p>{book.author}</p>
                <Link href={productHref(book.slug)} className="text-link" onClick={() => trackProductClick(book)}>Lihat informasi <span>↗</span></Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
