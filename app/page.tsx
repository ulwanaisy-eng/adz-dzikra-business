import { getPublicCatalogProducts } from "@/lib/public-catalog";
import { CatalogSection } from "./components/catalog-section";
import { CinematicHistory } from "./components/cinematic-history";
import { DzikraHeroOpening } from "./components/dzikra-hero-opening";
import { WhatsAppLink } from "./components/whatsapp-link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getPublicCatalogProducts();

  return (
    <main>
      <DzikraHeroOpening />

      <div id="tentang">
        <CinematicHistory />
      </div>

      <section className="dz-now" aria-labelledby="dz-now-heading">
        <div className="dz-now__header">
          <p className="eyebrow">DZIKRA HARI INI</p>
          <h2 id="dz-now-heading">Tiga dekade menjaga proses.<br /><em>Kini menerbitkan karya.</em></h2>
        </div>
        <div className="dz-now__body">
          <p>
            Dzikra tumbuh dari pekerjaan yang menuntut ketelitian—membantu penerbit,
            pesantren, ulama, dan penulis merawat ilmu sebelum ia menjadi kitab.
          </p>
          <p>
            Pengalaman itu kini menjadi fondasi karya-karya Dzikra sendiri:
            jernih dalam isi, cermat dalam proses, dan nyaman untuk dibaca.
          </p>
        </div>
        <ul className="dz-now__services" aria-label="Pengalaman layanan Dzikra">
          <li><span>01</span> Pengetikan naskah</li>
          <li><span>02</span> Layout &amp; tata letak</li>
          <li><span>03</span> Tahqiq &amp; koreksi</li>
          <li><span>04</span> Persiapan kitab</li>
        </ul>
      </section>

      <CatalogSection initialProducts={products} />

      <section className="order" id="pesan">
        <p className="eyebrow">CARA MEMESAN</p>
        <h2>Sederhana, jelas,<br /><em>dan terjaga.</em></h2>
        <div className="steps">
          {[
            ["01", "Pilih kitab"],
            ["02", "Isi pesanan"],
            ["03", "Konfirmasi pembayaran"],
            ["04", "Produksi & pengiriman"],
          ].map(([number, title]) => (
            <div key={number}>
              <b>{number}</b>
              <p>{title}</p>
            </div>
          ))}
        </div>
        <WhatsAppLink className="button">
          Tanya via WhatsApp <span>↗</span>
        </WhatsAppLink>
      </section>

      <footer>
        <div className="wordmark">DZIKRA<span>®</span></div>
        <p>Crafted with Amanah, Designed for Comfort.</p>
        <div>
          <a href="mailto:dzikracompofficial05@gmail.com">Email</a>
          <a href="https://www.instagram.com/dzikracomppublishers" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.tiktok.com/@penerbit.dzikra?_r=1&_t=ZS-99stOw8jA2O" target="_blank" rel="noreferrer">TikTok</a>
        </div>
        <small>© {new Date().getFullYear()} Dzikra. Penerbit &amp; Distributor Kitab.</small>
      </footer>
    </main>
  );
}
