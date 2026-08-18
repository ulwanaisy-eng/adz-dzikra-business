"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Book3D from "./components/Book3D";

const WA_NUMBER = "62882000020979";
const WA_MSG_GENERAL = encodeURIComponent("Assalamu'alaikum, I'm interested in DZIKRA's publications. Could I get more information?");
const WA_MSG_ORDER = encodeURIComponent("Assalamu'alaikum, I would like to order the DZIKRA edition of Riyadhussalihin. Please send me more information.");
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG_GENERAL}`;
const WA_ORDER = `https://wa.me/${WA_NUMBER}?text=${WA_MSG_ORDER}`;
const IG_URL = "https://instagram.com/dzikracomppublishers";
const EMAIL = "dzikracompofficial05@gmail.com";
const TALLY_PO = "https://tally.so"; // UPDATE with real Tally link

// ── ICONS ────────────────────────────────────────────────────────
function IconWA({ size = 22 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
}
function IconIG({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
}
function IconEmail({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>;
}
function IconMenu({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
}
function IconClose({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
}
function IconChevronLeft({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>;
}
function IconChevronRight({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>;
}
function IconStar({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="#C8A556"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
}

// ── ORNAMENT SVG ─────────────────────────────────────────────────
function OrnamentDivider({ light = false }: { light?: boolean }) {
  const c = light ? "#1B2A4A" : "#C8A556";
  const o = light ? 0.15 : 0.25;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, width: "100%" }} aria-hidden="true">
      {[false, true].map((mirror, idx) => (
        <svg key={idx} width="220" height="24" viewBox="0 0 220 24" style={{ opacity: o, transform: mirror ? "scaleX(-1)" : "none" }}>
          <defs><linearGradient id={`dg${idx}`} x1="0%" x2="100%"><stop offset="0%" stopColor={c} stopOpacity="0"/><stop offset="60%" stopColor={c} stopOpacity="1"/><stop offset="100%" stopColor={c} stopOpacity="0.6"/></linearGradient></defs>
          <line x1="0" y1="12" x2="185" y2="12" stroke={`url(#dg${idx})`} strokeWidth="0.8"/>
          {[35,70,110,150].map(x => <path key={x} d={`M${x} 12 L${x+4} 9 L${x+8} 12 L${x+4} 15Z`} fill={c}/>)}
          <path d={`M175 9 Q185 12 175 15 Q165 12 175 9Z`} fill={c} fillOpacity="0.8"/>
          <circle cx="196" cy="12" r="3" fill="none" stroke={c} strokeWidth="0.8"/>
          <circle cx="196" cy="12" r="1" fill={c}/>
        </svg>
      ))}
    </div>
  );
}

function GoldDiamond() {
  return <svg width="9" height="9" viewBox="0 0 9 9"><path d="M4.5 0 L9 4.5 L4.5 9 L0 4.5Z" fill="#C8A556" opacity="0.9"/></svg>;
}

function SectionEyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  const color = light ? "#1B2A4A" : "#C8A556";
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
      <GoldDiamond/>
      <span style={{ fontFamily: "system-ui,sans-serif", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color, opacity: 0.85 }}>{children}</span>
      <GoldDiamond/>
    </div>
  );
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
}

// ── BOOK DATA ─────────────────────────────────────────────────────
const BOOK = {
  titleAr: "رياض الصالحين",
  titleId: "Riyadhussalihin",
  author: "Imam An-Nawawi",
  authorAr: "الإمام النووي",
  desc: "A selected collection of hadith by Imam Yahya bin Syaraf An-Nawawi — containing over a thousand authentic (sahih) hadith grouped by themes of a Muslim's daily life. Published by DZIKRA with meticulous Arabic typesetting, quality paper, and sturdy binding.",
  price_po: "Rp 199.999",
  price_normal: "Rp 250.000",
  price_reseller: "Rp 180.000",
  pages: "±900 pages",
  size: "17 × 24 cm",
  cover: "Hard Cover",
  paper: "Bookpaper Cream",
  status: "PRE-ORDER",
  images: [
    "/cover-full.jpg",
    "/cover-front.jpg",
    "/cover-back.jpg",
  ],
  features: [
    "Meticulous, comfortable-to-read Arabic typesetting",
    "Cream bookpaper — easy on the eyes",
    "Sturdy hard cover with gold embossing",
    "Central Java batik motif — local pride",
    "Printed in Indonesia to a high standard",
    "Complete & accurate harakat (diacritics)",
  ],
};

// ── IMAGE SLIDER ──────────────────────────────────────────────────
function ImageSlider({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length);
  const next = () => setCurrent(i => (i + 1) % images.length);

  return (
    <div style={{ position: "relative", background: "var(--navy-deep)", borderRadius: "3px", overflow: "hidden" }}>
      <div style={{ aspectRatio: "3/4", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(160deg, var(--navy-mid), var(--navy-deep))", position: "relative" }}>
        {/* Book cover placeholder — replace with real img when available */}
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ fontFamily: "Amiri, serif", fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "var(--gold)", marginBottom: "16px", direction: "rtl" }}>{BOOK.titleAr}</div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "var(--cream)", opacity: 0.7 }}>{BOOK.titleId}</div>
          <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.7rem", color: "var(--gold-muted)", marginTop: "8px", letterSpacing: "0.1em" }}>DZIKRA</div>
        </div>
        {/* Navigation arrows */}
        <button onClick={prev} style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", background: "rgba(13,27,42,0.7)", border: "1px solid var(--border-gold)", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--gold)" }}>
          <IconChevronLeft size={16}/>
        </button>
        <button onClick={next} style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", background: "rgba(13,27,42,0.7)", border: "1px solid var(--border-gold)", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--gold)" }}>
          <IconChevronRight size={16}/>
        </button>
      </div>
      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", padding: "12px" }}>
        {images.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`slider-dot${i === current ? " active" : ""}`}/>
        ))}
      </div>
    </div>
  );
}

// ── BOOK MODAL ────────────────────────────────────────────────────
function BookModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid var(--border-gold)" }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "var(--gold)" }}>Product Details</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--cream)", cursor: "pointer", opacity: 0.6 }}><IconClose size={20}/></button>
        </div>
        {/* Content */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0" }}>
          {/* Left — Image */}
          <div style={{ padding: "24px", borderRight: "1px solid var(--border-gold)" }}>
            <ImageSlider images={BOOK.images}/>
          </div>
          {/* Right — Info */}
          <div style={{ padding: "24px" }}>
            <div style={{ fontFamily: "Amiri, serif", fontSize: "2rem", color: "var(--gold)", direction: "rtl", marginBottom: "4px" }}>{BOOK.titleAr}</div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "1.3rem", color: "var(--cream)", marginBottom: "4px" }}>{BOOK.titleId}</div>
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.75rem", color: "var(--text-muted-navy)", marginBottom: "20px" }}>{BOOK.author}</div>

            {/* Price */}
            <div style={{ background: "rgba(200,165,86,0.06)", border: "1px solid var(--border-gold)", borderRadius: "3px", padding: "16px", marginBottom: "20px" }}>
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.58rem", letterSpacing: "0.15em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "6px" }}>Pre-Order Price</div>
              <div className="price-po">{BOOK.price_po}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                <span className="price-normal">{BOOK.price_normal}</span>
                <span style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.62rem", color: "#E57373", background: "rgba(229,115,115,0.1)", padding: "2px 6px", borderRadius: "2px" }}>Save Rp 50,001</span>
              </div>
            </div>

            {/* Specs */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.58rem", letterSpacing: "0.15em", color: "var(--gold-muted)", textTransform: "uppercase", marginBottom: "10px" }}>Specifications</div>
              {[
                ["Pages", BOOK.pages],
                ["Size", BOOK.size],
                ["Binding", BOOK.cover],
                ["Paper", BOOK.paper],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(200,165,86,0.08)", fontFamily: "system-ui, sans-serif", fontSize: "0.78rem" }}>
                  <span style={{ color: "var(--text-muted-navy)" }}>{k}</span>
                  <span style={{ color: "var(--cream)" }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Features */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.58rem", letterSpacing: "0.15em", color: "var(--gold-muted)", textTransform: "uppercase", marginBottom: "10px" }}>Highlights</div>
              {BOOK.features.map(f => (
                <div key={f} style={{ display: "flex", gap: "8px", marginBottom: "6px", fontFamily: "system-ui, sans-serif", fontSize: "0.78rem", color: "var(--cream)", opacity: 0.8 }}>
                  <span style={{ color: "var(--gold)", flexShrink: 0 }}>✦</span>{f}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a href={WA_ORDER} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px", borderRadius: "3px", textDecoration: "none" }}>
                <IconWA size={16}/> Order via WhatsApp
              </a>
              <a href={WA_ORDER} target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "13px", borderRadius: "3px", textDecoration: "none" }}>
                Pre-Order Form
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── NAVIGATION ────────────────────────────────────────────────────
function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Why DZIKRA", href: "#mengapa" },
    { label: "Collection", href: "#koleksi" },
    { label: "How to Order", href: "#cara-pesan" },
    { label: "Contact", href: "#kontak" },
  ];

  return (
    <nav className="nav-dzikra" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none", transition: "box-shadow 0.3s" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "66px" }}>
        <a href="#top" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/logo.png" alt="DZIKRA" style={{ width: "44px", height: "44px", objectFit: "contain", filter: "drop-shadow(0 0 6px rgba(200,165,86,0.3))" }}/>
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", color: "var(--gold)", letterSpacing: "0.14em" }}>DZIKRA</div>
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.48rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold-muted)", opacity: 0.8 }}>Crafted With Amanah, Designed for Comfort</div>
          </div>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }} className="desktop-only">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.72rem", letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--text-muted-navy)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")} onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted-navy)")}>{l.label}</a>
          ))}
          <a href={WA_ORDER} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding: "9px 18px", borderRadius: "3px", textDecoration: "none", display: "flex", alignItems: "center", gap: "7px" }}>
            <IconWA size={13}/> Pre-Order Now
          </a>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: "var(--gold)", cursor: "pointer", display: "none", padding: "4px" }} className="mobile-menu-btn">
          {menuOpen ? <IconClose/> : <IconMenu/>}
        </button>
      </div>
      {menuOpen && (
        <div style={{ background: "var(--navy)", borderTop: "1px solid var(--border-gold)", padding: "16px 24px" }}>
          {links.map(l => <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "12px 0", fontFamily: "system-ui, sans-serif", fontSize: "0.82rem", color: "var(--text-muted-navy)", textDecoration: "none", borderBottom: "1px solid rgba(200,165,86,0.07)" }}>{l.label}</a>)}
          <a href={WA_ORDER} target="_blank" rel="noopener noreferrer" className="btn-gold" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "12px", borderRadius: "3px", textDecoration: "none", marginTop: "14px" }}>
            <IconWA size={13}/> Pre-Order Now
          </a>
        </div>
      )}
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────────────
function HeroSection({ onOpenBook }: { onOpenBook: () => void }) {
  return (
    <section id="top" className="batik-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "66px", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 50%, var(--navy-mid) 100%)" }}>
      {/* Gold glow top right */}
      <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(200,165,86,0.08) 0%, transparent 70%)", pointerEvents: "none" }}/>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px", width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", alignItems: "center" }}>
        {/* Left — Text */}
        <div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", fontWeight: 400, color: "var(--cream)", lineHeight: 1.15, marginBottom: "20px", animation: "fadeInUp 0.8s ease 0.15s forwards", opacity: 0 }}>
            Reading Classical Kitab,<br/>
            <span className="text-gold-gradient">Made More Comfortable</span>
          </h1>
          <div style={{ marginBottom: "24px", animation: "fadeInUp 0.8s ease 0.25s forwards", opacity: 0 }}>
            <OrnamentDivider/>
          </div>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(0.92rem, 1.7vw, 1.05rem)", lineHeight: 1.85, color: "var(--text-muted-navy)", marginBottom: "36px", animation: "fadeInUp 0.8s ease 0.35s forwards", opacity: 0, fontStyle: "italic" }}>
            DZIKRA publishes classical Islamic heritage texts with meticulous Arabic typesetting, carefully chosen paper, and a design to be proud of — the result of three decades of experience from Dzikra Comp. Rembang.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", animation: "fadeInUp 0.8s ease 0.45s forwards", opacity: 0 }}>
            <a href={WA_ORDER} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding: "14px 28px", borderRadius: "3px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <IconWA size={15}/> Pre-Order Now
            </a>
            <button onClick={onOpenBook} className="btn-outline-gold" style={{ padding: "14px 28px", borderRadius: "3px", background: "none" }}>
              View Book Details
            </button>
          </div>
          {/* Stats */}
          <div style={{ display: "flex", gap: "clamp(20px, 5vw, 48px)", marginTop: "48px", paddingTop: "32px", borderTop: "1px solid rgba(200,165,86,0.15)", animation: "fadeInUp 0.8s ease 0.6s forwards", opacity: 0, flexWrap: "wrap" }}>
            {[{ v: "1992", l: "Established" }, { v: "1", l: "Titles Published" }, { v: "30+", l: "Years of Expertise" }].map(s => (
              <div key={s.l}>
                <div className="text-gold-gradient" style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, lineHeight: 1, marginBottom: "4px" }}>{s.v}</div>
                <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted-navy)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Right — Book Visual */}
        <div style={{ display: "flex", justifyContent: "center", animation: "fadeInUp 0.9s ease 0.3s forwards", opacity: 0 }}>
          <Book3D onClick={onOpenBook} />
        </div>
      </div>
    </section>
  );
}

// ── COLLECTION SECTION ────────────────────────────────────────────
function CollectionSection({ onOpenBook }: { onOpenBook: () => void }) {
  const ref = useReveal();
  return (
    <section id="koleksi" className="section-cream batik-cream" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ textAlign: "center", marginBottom: "56px" }}>
          <SectionEyebrow light>Collection DZIKRA</SectionEyebrow>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: "var(--navy)", lineHeight: 1.25, marginBottom: "16px" }}>
            Our Publications
          </h2>
          <OrnamentDivider light/>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.95rem", lineHeight: 1.85, color: "var(--navy)", opacity: 0.6, maxWidth: "560px", margin: "16px auto 0", fontStyle: "italic" }}>
            Every title is carefully selected and published to the highest quality standards.
          </p>
        </div>
        {/* Book Card */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 360px))", gap: "28px", justifyContent: "center" }}>
          {/* Live Book */}
          <div className="card-book reveal" style={{ borderRadius: "4px", background: "var(--navy)", borderColor: "rgba(200,165,86,0.3)" }}>
            <div style={{ height: "280px", background: "linear-gradient(160deg, var(--navy-mid), var(--navy-deep))", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(200,165,86,0.15)", position: "relative" }}>
              <div style={{ position: "absolute", top: "12px", left: "12px" }}><span className="badge-po">Pre-Order</span></div>
              <div style={{ textAlign: "center", padding: "20px" }}>
                <div style={{ fontFamily: "Amiri, serif", fontSize: "2.4rem", color: "var(--gold)", direction: "rtl", marginBottom: "8px" }}>{BOOK.titleAr}</div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: "0.85rem", color: "var(--cream)", opacity: 0.7 }}>{BOOK.titleId}</div>
              </div>
            </div>
            <div style={{ padding: "20px" }}>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", color: "var(--cream)", marginBottom: "4px" }}>{BOOK.titleId}</h3>
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.72rem", color: "var(--text-muted-navy)", marginBottom: "12px" }}>{BOOK.author}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "16px" }}>
                <span className="price-po" style={{ fontSize: "1.2rem" }}>{BOOK.price_po}</span>
                <span className="price-normal">{BOOK.price_normal}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <button onClick={onOpenBook} className="btn-navy" style={{ padding: "10px", borderRadius: "3px", fontSize: "0.68rem", letterSpacing: "0.06em" }}>Book Details</button>
                <a href={WA_ORDER} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding: "10px", borderRadius: "3px", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "0.68rem" }}>
                  <IconWA size={12}/> Order
                </a>
              </div>
            </div>
          </div>
          {/* Placeholder 2 */}
          {[1,2].map(i => (
            <div key={i} className="card-book reveal" style={{ borderRadius: "4px", background: "var(--navy)", opacity: 0.5, transitionDelay: `${i * 0.1}s` }}>
              <div style={{ height: "280px", background: "linear-gradient(160deg, var(--navy-mid), var(--navy-deep))", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(200,165,86,0.08)" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--gold-muted)", opacity: 0.5, marginBottom: "8px", textTransform: "uppercase" }}>Coming Soon</div>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: "0.78rem", color: "var(--gold)", opacity: 0.35 }}>Next Edition</div>
                </div>
              </div>
              <div style={{ padding: "20px" }}>
                <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "var(--cream)", opacity: 0.4, marginBottom: "12px" }}>Coming Soon</h3>
                <button disabled style={{ width: "100%", padding: "10px", background: "rgba(200,165,86,0.05)", border: "1px solid rgba(200,165,86,0.12)", borderRadius: "3px", fontFamily: "system-ui, sans-serif", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-muted)", opacity: 0.4, cursor: "not-allowed" }}>
                  Not Yet Available
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── WHY DZIKRA ────────────────────────────────────────────────────
function MengapaSection() {
  const ref = useReveal();
  return (
    <section id="mengapa" className="batik-bg" style={{ padding: "100px 24px", background: "var(--navy)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ textAlign: "center", marginBottom: "56px" }}>
          <SectionEyebrow>Why DZIKRA</SectionEyebrow>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: "var(--cream)", lineHeight: 1.25, marginBottom: "16px" }}>
            Built on<br/><span className="text-gold-gradient">Three Decades of Expertise</span>
          </h2>
          <OrnamentDivider/>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.98rem", lineHeight: 1.85, color: "var(--text-muted-navy)", maxWidth: "620px", margin: "16px auto 0", fontStyle: "italic" }}>
            Since 1992, Dzikra Comp. Rembang has been trusted by leading Islamic publishers across Indonesia for meticulous Arabic typesetting. DZIKRA now carries that legacy into its own publications.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "rgba(200,165,86,0.08)", border: "1px solid rgba(200,165,86,0.08)", borderRadius: "4px", overflow: "hidden" }}>
          {[
            { icon: "◈", title: "Professional Arabic Typesetting", body: "30 years of specialization in Arabic typesetting for major Indonesian publishers. Every diacritic and spacing detail is carefully attended to." },
            { icon: "✦", title: "Distinctive Indonesian Design", body: "Central Java batik motifs meet classical kitab aesthetics — a local identity no other publisher has." },
            { icon: "◇", title: "Carefully Chosen Materials", body: "Eye-friendly cream bookpaper, a sturdy hard cover, and durable binding to accompany years of study." },
            { icon: "◉", title: "Authentic & Trustworthy", body: "Manuscripts are carefully prepared, preserving the integrity of the original text with the utmost clarity and precision." },
            { icon: "⬡", title: "Protected Delivery", body: "Every order is packaged securely to ensure the kitab arrives safely anywhere in Indonesia." },
            { icon: "✧", title: "Made in Indonesia", body: "Published, designed, and printed in Indonesia — supporting a quality local Islamic publishing industry." },
          ].map((c, i) => (
            <div key={c.title} className="card-feature reveal" style={{ padding: "clamp(24px, 3vw, 36px)", transitionDelay: `${i * 0.08}s` }}>
              <div style={{ fontSize: "1.1rem", color: "var(--gold-muted)", marginBottom: "12px", opacity: 0.8 }}>{c.icon}</div>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "0.96rem", fontWeight: 400, color: "var(--cream)", marginBottom: "8px", lineHeight: 1.4 }}>{c.title}</h3>
              <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.78rem", lineHeight: 1.75, color: "var(--text-muted-navy)" }}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PROCESS ───────────────────────────────────────────────────────
function CaraOrderSection() {
  const ref = useReveal();
  const steps = [
    { n: "01", t: "Browse the Collection", b: "Explore our available titles and choose the one that suits you." },
    { n: "02", t: "Choose an Edition", b: "Select the book or edition you want to order." },
    { n: "03", t: "Place Your Order", b: "Order via our official WhatsApp or our Pre-Order form." },
    { n: "04", t: "Confirm", b: "Confirm and complete payment to secure your copy." },
    { n: "05", t: "Careful Preparation", b: "Your order is prepared, quality-checked, and packaged securely." },
    { n: "06", t: "Delivered to You", b: "Receive your kitab and begin a more comfortable learning journey." },
  ];
  return (
    <section id="cara-pesan" className="section-cream batik-cream" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ textAlign: "center", marginBottom: "60px" }}>
          <SectionEyebrow light>How to Order</SectionEyebrow>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: "var(--navy)", lineHeight: 1.25, marginBottom: "16px" }}>
            Six Simple Steps
          </h2>
          <OrnamentDivider light/>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", background: "rgba(27,42,74,0.1)", border: "1px solid rgba(27,42,74,0.1)", borderRadius: "4px", overflow: "hidden" }}>
          {steps.map((s, i) => (
            <div key={s.n} className="reveal" style={{ padding: "28px 24px", background: "rgba(245,237,214,0.6)", transitionDelay: `${i * 0.07}s` }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "2.8rem", color: "rgba(27,42,74,0.12)", lineHeight: 1, marginBottom: "12px" }}>{s.n}</div>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "0.96rem", color: "var(--navy)", marginBottom: "8px" }}>{s.t}</h3>
              <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.78rem", lineHeight: 1.7, color: "var(--navy)", opacity: 0.6 }}>{s.b}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <a href={WA_ORDER} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 32px", borderRadius: "3px", textDecoration: "none" }}>
            <IconWA size={15}/> Begin Your Order via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────
function ContactSection() {
  const ref = useReveal();
  return (
    <section id="kontak" className="batik-bg" style={{ padding: "100px 24px", background: "var(--navy-deep)" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
          <SectionEyebrow>Contact Us</SectionEyebrow>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 400, color: "var(--cream)", lineHeight: 1.25, marginBottom: "12px" }}>
            We Are Here to Help
          </h2>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.95rem", color: "var(--text-muted-navy)", fontStyle: "italic" }}>
            Questions, orders, or partnerships — reach us through any of the channels below.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "36px" }}>
          {[
            { href: WA_ORDER, icon: <IconWA size={20}/>, color: "#25D366", bg: "rgba(37,211,102,0.08)", border: "rgba(37,211,102,0.2)", label: "WhatsApp", value: "0882-0002-0979", sub: "Fastest response →" },
            { href: IG_URL, icon: <IconIG size={20}/>, color: "#C13584", bg: "rgba(193,53,132,0.08)", border: "rgba(193,53,132,0.2)", label: "Instagram", value: "@dzikracomppublishers", sub: "Follow our journey →" },
            { href: `mailto:${EMAIL}`, icon: <IconEmail size={20}/>, color: "var(--gold)", bg: "rgba(200,165,86,0.08)", border: "rgba(200,165,86,0.2)", label: "Email", value: EMAIL, sub: "Write to us →" },
          ].map(c => (
            <a key={c.label} href={c.href} target={c.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="card-feature reveal" style={{ borderRadius: "3px", padding: "24px", textDecoration: "none", display: "block" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: c.bg, border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: c.color, marginBottom: "14px" }}>{c.icon}</div>
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.57rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted-navy)", marginBottom: "6px" }}>{c.label}</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "0.9rem", color: "var(--gold)", marginBottom: "4px", wordBreak: "break-all" }}>{c.value}</div>
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.7rem", color: "var(--text-muted-navy)" }}>{c.sub}</div>
            </a>
          ))}
        </div>
        <div style={{ textAlign: "center", padding: "36px", border: "1px solid var(--border-gold)", borderRadius: "3px", background: "rgba(200,165,86,0.03)" }}>
          <div style={{ fontFamily: "Amiri, serif", fontSize: "1.4rem", color: "var(--gold)", marginBottom: "8px" }}>Quick Order</div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", color: "var(--cream)", marginBottom: "8px" }}>Order Directly Now</div>
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.78rem", color: "var(--text-muted-navy)", marginBottom: "20px" }}>Contact us via WhatsApp for the fastest response.</p>
          <a href={WA_ORDER} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "13px 28px", borderRadius: "3px", textDecoration: "none" }}>
            <IconWA size={15}/> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "var(--navy-deep)", borderTop: "1px solid rgba(200,165,86,0.1)", padding: "60px 24px 32px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "40px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <img src="/logo.png" alt="DZIKRA" style={{ width: "40px", height: "40px", objectFit: "contain", filter: "drop-shadow(0 0 5px rgba(200,165,86,0.25))" }}/>
              <div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "var(--gold)", letterSpacing: "0.14em" }}>DZIKRA</div>
                <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.48rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold-muted)", opacity: 0.7 }}>Crafted With Amanah</div>
              </div>
            </div>
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.75rem", lineHeight: 1.75, color: "var(--text-muted-navy)", maxWidth: "220px" }}>
              Publishing the Islamic classical tradition in editions worthy of the knowledge they carry.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              {[{ href: IG_URL, icon: <IconIG size={16}/>, label: "Instagram" }, { href: WA_ORDER, icon: <IconWA size={16}/>, label: "WhatsApp" }, { href: `mailto:${EMAIL}`, icon: <IconEmail size={16}/>, label: "Email" }].map(s => (
                <a key={s.label} href={s.href} target={s.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" style={{ color: "var(--gold-muted)", opacity: 0.5, transition: "opacity 0.2s" }} aria-label={s.label}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")}>{s.icon}</a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.56rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold-muted)", opacity: 0.7, marginBottom: "14px" }}>Navigate</div>
            {[{ l: "Why DZIKRA", h: "#mengapa" }, { l: "Collection", h: "#koleksi" }, { l: "How to Order", h: "#cara-pesan" }, { l: "Contact", h: "#kontak" }].map(l => (
              <a key={l.h} href={l.h} style={{ display: "block", fontFamily: "system-ui, sans-serif", fontSize: "0.76rem", color: "var(--text-muted-navy)", textDecoration: "none", marginBottom: "8px", opacity: 0.6, transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.6")}>{l.l}</a>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.56rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold-muted)", opacity: 0.7, marginBottom: "14px" }}>Contact</div>
            {[{ href: WA_ORDER, icon: <IconWA size={13}/>, label: "0882-0002-0979" }, { href: IG_URL, icon: <IconIG size={13}/>, label: "@dzikracomppublishers" }, { href: `mailto:${EMAIL}`, icon: <IconEmail size={13}/>, label: EMAIL }].map(c => (
              <a key={c.label} href={c.href} target={c.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.74rem", color: "var(--text-muted-navy)", textDecoration: "none", display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "9px", opacity: 0.6, transition: "opacity 0.2s", wordBreak: "break-all" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.6")}>
                <span style={{ marginTop: "2px", flexShrink: 0 }}>{c.icon}</span>{c.label}
              </a>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: "16px" }}><OrnamentDivider/></div>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
          <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.64rem", color: "var(--text-muted-navy)", opacity: 0.3 }}>© 2026 DZIKRA — Dzikra Company. NIB: 1208260078792</div>
          <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.64rem", color: "var(--text-muted-navy)", opacity: 0.3 }}>Crafted with Amanah · Rembang, Central Java</div>
        </div>
      </div>
    </footer>
  );
}

// ── SCROLL REVEAL ─────────────────────────────────────────────────
function ScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }), { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return null;
}

// ── MAIN ─────────────────────────────────────────────────────────
export default function Home() {
  const [bookOpen, setBookOpen] = useState(false);
  return (
    <>
      <ScrollReveal/>
      <Navigation/>
      <main>
        <HeroSection onOpenBook={() => setBookOpen(true)}/>
        <CollectionSection onOpenBook={() => setBookOpen(true)}/>
        <MengapaSection/>
        <CaraOrderSection/>
        <ContactSection/>
      </main>
      <Footer/>
      {/* Floating WA */}
      <a href={WA_ORDER} target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="Order via WhatsApp">
        <IconWA size={24}/>
      </a>
      {/* Book Modal */}
      {bookOpen && <BookModal onClose={() => setBookOpen(false)}/>}
    </>
  );
}
