import Image from "next/image";
import { books } from "@/lib/catalog";
import { BookGallery } from "./components/book-gallery";
import { DzikraStory } from "./components/dzikra-story";

const story = [
  ["1992", "Berawal dari ketelitian", "Dari meja kerja sederhana, proses menyusun kitab dilakukan dengan tangan, kesabaran, dan amanah."],
  ["2010", "Tradisi bertemu teknologi", "Teknologi membantu mempercepat proses. Ketelitian dalam layout, kaligrafi, dan koreksi tetap kami jaga."],
  ["HARI INI", "Dari naskah menjadi kitab", "Setiap halaman melewati proses yang menghormati ilmu—hingga siap menemani pembaca."],
];

export default function Home() {
  return <main>
    <nav className="nav"><a className="wordmark" href="#top"><Image className="brand-symbol" src="/images/dzikra-logo.jpg" alt="Logo kaligrafi Dzikra" width={34} height={34}/>DZIKRA<span>®</span></a><div><a href="#tentang">Tentang</a><a href="#koleksi">Koleksi</a><a href="#pesan">Cara Pesan</a></div></nav>
    <section className="cinema" id="top" aria-label="Perjalanan Dzikra">
      <div className="grain" />
      <div className="sun" />
      <svg className="gunungan" viewBox="0 0 360 520" aria-hidden="true"><path d="M180 18C144 88 95 128 83 204c-10 63 25 98 0 159 45-16 58 25 97 18 39 7 52-34 97-18-25-61 10-96 0-159C265 128 216 88 180 18Z"/><path d="M180 70v290M115 200h130M105 280h150M126 130l54 70 54-70M120 334l60-54 60 54"/></svg>
      <div className="hero-copy"><p className="eyebrow">PENERBIT & DISTRIBUTOR KITAB</p><h1>DZIKRA</h1><p className="tagline">Crafted with Amanah<br/>Designed for Comfort</p><a className="scroll-cue" href="#tentang">Jelajahi perjalanan <b>↓</b></a></div>
    </section>
    <DzikraStory />
    <section className="story">
      <div className="section-intro"><p className="eyebrow">SEJAK 1992</p><h2>Menjaga ilmu,<br/><em>dengan amanah.</em></h2><p>Perjalanan Dzikra tumbuh dari pekerjaan yang menuntut ketelitian: menyusun, menata, memeriksa, dan menghadirkan kitab dengan penuh tanggung jawab.</p></div>
      <div className="timeline">
        {story.map(([year, title, text], i) => <article className={`scene scene-${i + 1}`} key={year}><div className="scene-number">{year}</div><div className="scene-art"><i /><i /><i /></div><div><p className="eyebrow">{year}</p><h3>{title}</h3><p>{text}</p></div></article>)}
      </div>
      <div className="principles"><p className="eyebrow">TIGA DEKADE PENGALAMAN</p><h2>Teliti dalam proses.<br/><em>Nyaman dalam membaca.</em></h2><div className="principle-list"><span>Amanah</span><span>Tahqiq</span><span>Ta&apos;liq</span><span>Comfort</span></div></div>
    </section>
    <section className="bridge"><div className="bridge-pattern"/><div><p className="eyebrow">KINI, UNTUK KARYA KAMI SENDIRI</p><h2>Tradisi yang hidup<br/>dalam setiap <em>kitab.</em></h2><p>Pengalaman panjang menjadi fondasi Dzikra untuk menerbitkan karya yang bisa diandalkan oleh pembaca hari ini.</p></div></section>
    <section className="catalog" id="koleksi"><div className="catalog-head"><div><p className="eyebrow">KOLEKSI DZIKRA</p><h2>Kitab pilihan<br/>untuk perjalanan ilmu.</h2></div><p>Produk dan informasi pre-order selalu diperbarui langsung oleh tim Dzikra.</p></div><div className="book-grid">{books.map(book => <article className="book-card" key={book.id}><div className="cover-wrap"><BookGallery images={book.images} title={book.name}/></div><div className="book-info"><p className="status">{book.status === "PREORDER" ? "PRE-ORDER" : book.status}</p><h3>{book.name}</h3><p>{book.author}</p><a href={`#pesan`} className="text-link">Lihat informasi <span>↗</span></a></div></article>)}</div></section>
    <section className="order" id="pesan"><p className="eyebrow">CARA MEMESAN</p><h2>Sederhana, jelas,<br/><em>dan terjaga.</em></h2><div className="steps">{[["01","Pilih kitab"],["02","Isi pesanan"],["03","Konfirmasi pembayaran"],["04","Produksi & pengiriman"]].map(([n,t])=><div key={n}><b>{n}</b><p>{t}</p></div>)}</div><a className="button" href="https://wa.me/62882000020979" target="_blank" rel="noreferrer">Tanya via WhatsApp <span>↗</span></a></section>
    <footer><div className="wordmark">DZIKRA<span>®</span></div><p>Crafted with Amanah, Designed for Comfort.</p><div><a href="mailto:dzikracompofficial05@gmail.com">Email</a><a href="https://www.instagram.com/dzikracomppublishers" target="_blank" rel="noreferrer">Instagram</a><a href="/admin">Admin</a></div><small>© {new Date().getFullYear()} Dzikra. Penerbit & Distributor Kitab.</small></footer>
  </main>;
}
