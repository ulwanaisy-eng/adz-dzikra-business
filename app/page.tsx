"use client";

import { useEffect, useRef, useState } from "react";

// ─── WHATSAPP CONFIG ──────────────────────────────────────────────
const WA_NUMBER = "6288200002979";
const WA_MSG = encodeURIComponent(
  "Assalamu'alaikum, I'm interested in Adz Dzikra's publications. Could you please provide more information?"
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;
const IG_URL = "https://instagram.com/dzikracomppublishers";
const EMAIL = "dzikracompofficial05@gmail.com";

// ─── ICONS ────────────────────────────────────────────────────────
function IconWhatsApp({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconInstagram({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function IconEmail({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function IconMenu({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function IconClose({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconChevronDown({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ─── ORNAMENTAL ELEMENTS ───────────────────────────────────────────
function GoldDiamond() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="var(--gold)" opacity="0.8" />
    </svg>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="ornament-divider mb-6">
      <GoldDiamond />
      <span
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--gold)",
          opacity: 0.8,
        }}
      >
        {children}
      </span>
      <GoldDiamond />
    </div>
  );
}

// ─── REVEAL HOOK ──────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// ─── NAVIGATION ───────────────────────────────────────────────────
function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Why Adz Dzikra", href: "#why-us" },
    { label: "Collection", href: "#collection" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "How It Works", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className="nav-glass"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Logo */}
        <a
          href="#top"
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}
        >
          <span
            style={{
              fontFamily: "Amiri, serif",
              fontSize: "1.6rem",
              color: "var(--gold)",
            }}
          >
            ذ
          </span>
          <div>
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "0.95rem",
                color: "var(--gold-light)",
                letterSpacing: "0.05em",
                lineHeight: 1.1,
              }}
            >
              Adz Dzikra
            </div>
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--gold-muted)",
                opacity: 0.7,
              }}
            >
              Premium Islamic Publishing
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "rgba(250, 247, 242, 0.6)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250, 247, 242, 0.6)")}
            >
              {link.label}
            </a>
          ))}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{
              padding: "8px 20px",
              borderRadius: "2px",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <IconWhatsApp size={14} />
            Order via WhatsApp
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "var(--gold-light)",
            cursor: "pointer",
            display: "none",
            padding: "4px",
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {menuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--dark-2)",
            borderTop: "1px solid var(--border-dark)",
            padding: "20px 24px",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                fontFamily: "system-ui, sans-serif",
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
                color: "rgba(250, 247, 242, 0.7)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(184, 151, 58, 0.08)",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "2px",
              textDecoration: "none",
              marginTop: "16px",
            }}
          >
            <IconWhatsApp size={14} />
            Order via WhatsApp
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="top"
      className="pattern-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "64px",
        background: `
          radial-gradient(ellipse 80% 60% at 50% 0%, rgba(184, 151, 58, 0.06) 0%, transparent 60%),
          var(--dark)
        `,
      }}
    >
      {/* Geometric decorations */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "8%",
          width: "300px",
          height: "300px",
          border: "1px solid rgba(184, 151, 58, 0.06)",
          borderRadius: "50%",
          animation: "floatUp 7s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "8%",
          width: "200px",
          height: "200px",
          border: "1px solid rgba(184, 151, 58, 0.08)",
          borderRadius: "50%",
          marginTop: "50px",
          marginLeft: "50px",
          animation: "floatUp 7s ease-in-out infinite 1s",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "6%",
          width: "250px",
          height: "250px",
          border: "1px solid rgba(184, 151, 58, 0.05)",
          transform: "rotate(45deg)",
          animation: "floatUp 8s ease-in-out infinite 2s",
        }}
      />

      {/* Content */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "60px 24px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ animation: "fadeInUp 0.8s ease forwards", opacity: 0 }}>
          <SectionEyebrow>Handcrafted Editions Since 1992</SectionEyebrow>
        </div>

        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
            fontWeight: 400,
            lineHeight: 1.15,
            color: "var(--cream)",
            marginBottom: "8px",
            animation: "fadeInUp 0.8s ease 0.15s forwards",
            opacity: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Where Timeless Knowledge
        </h1>
        <h1
          className="text-gold-gradient"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
            fontWeight: 400,
            lineHeight: 1.15,
            marginBottom: "32px",
            animation: "fadeInUp 0.8s ease 0.25s forwards",
            opacity: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Meets Modern Reading
        </h1>

        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            lineHeight: 1.75,
            color: "rgba(250, 247, 242, 0.65)",
            maxWidth: "580px",
            margin: "0 auto 48px",
            animation: "fadeInUp 0.8s ease 0.4s forwards",
            opacity: 0,
            fontStyle: "italic",
          }}
        >
          Experience the beauty of classical Islamic scholarship through thoughtfully crafted editions designed for today's readers.
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
            animation: "fadeInUp 0.8s ease 0.55s forwards",
            opacity: 0,
          }}
        >
          <a
            href="#collection"
            className="btn-gold"
            style={{
              padding: "14px 32px",
              borderRadius: "2px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Explore the Collection
          </a>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold"
            style={{
              padding: "14px 32px",
              borderRadius: "2px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <IconWhatsApp size={14} />
            Enquire on WhatsApp
          </a>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(24px, 5vw, 64px)",
            marginTop: "72px",
            paddingTop: "40px",
            borderTop: "1px solid rgba(184, 151, 58, 0.12)",
            animation: "fadeInUp 0.8s ease 0.7s forwards",
            opacity: 0,
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "1", label: "Published Title" },
            { value: "100%", label: "Premium Edition" },
            { value: "2026", label: "Founded" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                className="text-gold-gradient"
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  fontWeight: 400,
                  lineHeight: 1,
                  marginBottom: "6px",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#why-us"
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          color: "var(--gold-muted)",
          opacity: 0.6,
          textDecoration: "none",
          animation: "pulse-gold 2s ease-in-out infinite",
        }}
        aria-label="Scroll down"
      >
        <div
          style={{
            width: "1px",
            height: "32px",
            background: "linear-gradient(to bottom, var(--gold-muted), transparent)",
          }}
        />
        <IconChevronDown size={14} />
      </a>
    </section>
  );
}

// ─── WHY ADZ DZIKRA ───────────────────────────────────────────────
function WhySection() {
  const ref = useReveal();

  const publishers = [
    "Duta Ilmu", "Mutiara Ilmu", "Darul Ilmi", "Daarul Abidin",
    "Al Hidayah", "Ibnu Abud", "Ali Imran Semarang", "Daarul Haddad",
    "Balai Buku", "Pustaka Progressif",
  ];

  return (
    <section
      id="why-us"
      style={{
        padding: "120px 24px",
        background: "var(--dark-2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--gold-muted), transparent)",
          opacity: 0.3,
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
          <SectionEyebrow>Why Adz Dzikra</SectionEyebrow>
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 400,
              color: "var(--cream)",
              lineHeight: 1.25,
              marginBottom: "32px",
              letterSpacing: "-0.01em",
            }}
          >
            Built on Three Decades of
            <br />
            <span className="text-gold-gradient">Publishing Excellence</span>
          </h2>

          <p
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1rem, 1.8vw, 1.1rem)",
              lineHeight: 1.85,
              color: "rgba(250, 247, 242, 0.65)",
              maxWidth: "680px",
              margin: "0 auto 48px",
              fontStyle: "italic",
            }}
          >
            Since 1992, our team has partnered with respected Islamic publishers across Indonesia, providing meticulous Arabic typesetting and book layout services. Today, Adz Dzikra carries that legacy forward by publishing premium editions crafted with the same precision, authenticity, and care.
          </p>

          {/* Publisher heritage block */}
          <div
            style={{
              border: "1px solid rgba(184, 151, 58, 0.12)",
              borderRadius: "4px",
              padding: "clamp(24px, 4vw, 40px)",
              maxWidth: "780px",
              margin: "0 auto",
              background: "rgba(184, 151, 58, 0.03)",
            }}
          >
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold-muted)",
                marginBottom: "16px",
                opacity: 0.6,
              }}
            >
              Publishing Expertise Trusted Since 1992
            </div>
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "0.85rem",
                lineHeight: 1.8,
                color: "rgba(250, 247, 242, 0.45)",
                marginBottom: "20px",
                fontStyle: "italic",
              }}
            >
              Our publishing and Arabic typesetting expertise has supported the work of respected Islamic publishers across Indonesia, including:
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px 20px",
                justifyContent: "center",
              }}
            >
              {publishers.map((pub, i) => (
                <span
                  key={pub}
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    fontSize: "0.68rem",
                    letterSpacing: "0.06em",
                    color: "var(--gold-muted)",
                    opacity: 0.55,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {pub}
                  {i < publishers.length - 1 && (
                    <span style={{ opacity: 0.3 }}>·</span>
                  )}
                </span>
              ))}
              <span
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.06em",
                  color: "var(--gold-muted)",
                  opacity: 0.4,
                  fontStyle: "italic",
                }}
              >
                &amp; many more
              </span>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1px",
            background: "rgba(184, 151, 58, 0.08)",
            border: "1px solid rgba(184, 151, 58, 0.08)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          {[
            {
              icon: "◈",
              title: "Built on Three Decades of Experience",
              body: "Since 1992, our team has specialized in Arabic typesetting and book layout for respected Islamic publishers across Indonesia. Every Adz Dzikra edition is built upon that legacy of precision and expertise.",
              delay: "0s",
            },
            {
              icon: "✦",
              title: "Refined Arabic Typesetting",
              body: "Meticulously arranged Arabic text with thoughtful layout, clear hierarchy, and comfortable spacing — designed to make studying and reading more enjoyable.",
              delay: "0.1s",
            },
            {
              icon: "◇",
              title: "Premium Materials",
              body: "Carefully selected paper and durable binding ensure every edition is comfortable to read and made to last through years of study.",
              delay: "0.2s",
            },
            {
              icon: "◉",
              title: "Authentic & Trustworthy",
              body: "Every edition is prepared with great care, preserving the integrity of the original text while maintaining clarity and accuracy.",
              delay: "0.3s",
            },
            {
              icon: "⬡",
              title: "Protected Delivery",
              body: "Every order is securely packed with protective materials to ensure your books arrive safely, wherever you are in Indonesia.",
              delay: "0.4s",
            },
            {
              icon: "✧",
              title: "Quality Without Compromise",
              body: "From manuscript preparation to the finished book, every step is guided by our commitment to quality, precision, and excellence.",
              delay: "0.5s",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="card-premium reveal"
              style={{
                padding: "clamp(28px, 3vw, 40px)",
                transitionDelay: card.delay,
              }}
            >
              <div
                style={{
                  fontSize: "1.2rem",
                  color: "var(--gold-muted)",
                  marginBottom: "16px",
                  opacity: 0.7,
                }}
              >
                {card.icon}
              </div>
              <h3
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1rem",
                  fontWeight: 400,
                  color: "var(--cream)",
                  marginBottom: "12px",
                  lineHeight: 1.4,
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: "0.82rem",
                  lineHeight: 1.75,
                  color: "rgba(250, 247, 242, 0.5)",
                }}
              >
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COLLECTION ───────────────────────────────────────────────────
function CollectionSection() {
  const ref = useReveal();

  return (
    <section
      id="collection"
      style={{
        padding: "120px 24px",
        background: "var(--dark)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--gold-muted), transparent)",
          opacity: 0.2,
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
          <SectionEyebrow>The Collection</SectionEyebrow>
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 400,
              color: "var(--cream)",
              lineHeight: 1.25,
              marginBottom: "24px",
              letterSpacing: "-0.01em",
            }}
          >
            Our Collection
          </h2>
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)",
              lineHeight: 1.85,
              color: "rgba(250, 247, 242, 0.55)",
              maxWidth: "600px",
              margin: "0 auto",
              fontStyle: "italic",
            }}
          >
            Our inaugural collection is currently in preparation. Every title will be carefully selected, meticulously designed, and published with the same dedication to quality, authenticity, and craftsmanship that has defined our work for over three decades. Stay tuned for our first release.
          </p>
        </div>

        {/* Placeholder Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {[
            { delay: "0s" },
            { delay: "0.15s" },
            { delay: "0.3s" },
          ].map((card, i) => (
            <div
              key={i}
              className="card-premium reveal"
              style={{
                borderRadius: "4px",
                overflow: "hidden",
                transitionDelay: card.delay,
              }}
            >
              {/* Placeholder cover */}
              <div
                style={{
                  height: "280px",
                  background: `
                    linear-gradient(135deg, rgba(36, 32, 24, 0.95), rgba(26, 24, 20, 1))
                  `,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  borderBottom: "1px solid rgba(184, 151, 58, 0.1)",
                }}
              >
                {/* Decorative Islamic geometric pattern */}
                <svg
                  style={{ position: "absolute", opacity: 0.04 }}
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                >
                  <polygon points="100,10 190,55 190,145 100,190 10,145 10,55" fill="none" stroke="#B8973A" strokeWidth="1" />
                  <polygon points="100,30 170,65 170,135 100,170 30,135 30,65" fill="none" stroke="#B8973A" strokeWidth="1" />
                  <circle cx="100" cy="100" r="50" fill="none" stroke="#B8973A" strokeWidth="1" />
                  <circle cx="100" cy="100" r="30" fill="none" stroke="#B8973A" strokeWidth="1" />
                </svg>

                <div
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    fontSize: "0.55rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--gold-muted)",
                    opacity: 0.5,
                    marginBottom: "16px",
                  }}
                >
                  Coming Soon
                </div>
                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "0.85rem",
                    color: "var(--gold)",
                    opacity: 0.4,
                    letterSpacing: "0.05em",
                  }}
                >
                  Adz Dzikra Premium Edition
                </div>
              </div>

              {/* Card info */}
              <div style={{ padding: "24px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 10px",
                    border: "1px solid rgba(184, 151, 58, 0.2)",
                    borderRadius: "2px",
                    marginBottom: "14px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      fontSize: "0.58rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--gold-muted)",
                    }}
                  >
                    In Development
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1.1rem",
                    fontWeight: 400,
                    color: "var(--cream)",
                    marginBottom: "10px",
                  }}
                >
                  Coming Soon
                </h3>

                <p
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    fontSize: "0.8rem",
                    lineHeight: 1.65,
                    color: "rgba(250, 247, 242, 0.4)",
                    marginBottom: "16px",
                  }}
                >
                  Our first collection is currently in preparation.
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(184, 151, 58, 0.08)",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "system-ui, sans-serif",
                        fontSize: "0.58rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        opacity: 0.5,
                        marginBottom: "4px",
                      }}
                    >
                      Release
                    </div>
                    <div
                      style={{
                        fontFamily: "system-ui, sans-serif",
                        fontSize: "0.78rem",
                        color: "var(--gold-muted)",
                        opacity: 0.6,
                      }}
                    >
                      To Be Announced
                    </div>
                  </div>
                </div>

                <button
                  disabled
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "rgba(184, 151, 58, 0.06)",
                    border: "1px solid rgba(184, 151, 58, 0.15)",
                    borderRadius: "2px",
                    fontFamily: "system-ui, sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--gold-muted)",
                    opacity: 0.5,
                    cursor: "not-allowed",
                  }}
                >
                  Coming Soon
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────
function TestimonialsSection() {
  const ref = useReveal();

  return (
    <section
      id="testimonials"
      style={{
        padding: "120px 24px",
        background: "var(--dark-2)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--gold-muted), transparent)",
          opacity: 0.2,
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
          <SectionEyebrow>Trusted Voices</SectionEyebrow>
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 400,
              color: "var(--cream)",
              lineHeight: 1.25,
              marginBottom: "24px",
              letterSpacing: "-0.01em",
            }}
          >
            Voices That Will Guide Our Journey
          </h2>
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)",
              lineHeight: 1.85,
              color: "rgba(250, 247, 242, 0.55)",
              maxWidth: "600px",
              margin: "0 auto",
              fontStyle: "italic",
            }}
          >
            The voices of our readers, scholars, and partners will be featured here as our journey begins. We look forward to sharing authentic experiences and reflections from those who accompany Adz Dzikra in preserving and publishing classical Islamic knowledge.
          </p>
        </div>

        {/* Placeholder Testimonial Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {[
            { delay: "0s" },
            { delay: "0.15s" },
            { delay: "0.3s" },
          ].map((card, i) => (
            <div
              key={i}
              className="card-premium reveal"
              style={{
                borderRadius: "4px",
                padding: "32px",
                transitionDelay: card.delay,
                position: "relative",
              }}
            >
              {/* Quote mark */}
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "4rem",
                  color: "var(--gold)",
                  opacity: 0.08,
                  lineHeight: 1,
                  position: "absolute",
                  top: "20px",
                  left: "28px",
                  fontStyle: "italic",
                }}
              >
                "
              </div>

              {/* Placeholder avatar */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(184, 151, 58, 0.08)",
                  border: "1px solid rgba(184, 151, 58, 0.15)",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-muted)" strokeWidth="1.2" opacity={0.4}>
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>

              <div
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold-muted)",
                  opacity: 0.5,
                  marginBottom: "12px",
                }}
              >
                Coming Soon
              </div>

              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "0.88rem",
                  lineHeight: 1.8,
                  color: "rgba(250, 247, 242, 0.35)",
                  fontStyle: "italic",
                }}
              >
                Authentic testimonials and endorsements will appear here after our first publications are released.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS ──────────────────────────────────────────────────────
function ProcessSection() {
  const ref = useReveal();

  const steps = [
    {
      num: "01",
      title: "Explore the Collection",
      body: "Browse our available titles and discover the works that suit your learning journey.",
    },
    {
      num: "02",
      title: "Select Your Edition",
      body: "Choose the book or edition you would like to order.",
    },
    {
      num: "03",
      title: "Place Your Order",
      body: "Complete your order through our official WhatsApp or available ordering channels.",
    },
    {
      num: "04",
      title: "Secure Your Purchase",
      body: "Confirm your order and complete the payment to reserve your copy.",
    },
    {
      num: "05",
      title: "Careful Preparation",
      body: "Your order is carefully prepared, quality checked, and securely packaged before shipment.",
    },
    {
      num: "06",
      title: "Delivered to Your Door",
      body: "Receive your books safely and begin your journey with timeless Islamic knowledge.",
    },
  ];

  return (
    <section
      id="process"
      style={{
        padding: "120px 24px",
        background: "var(--dark)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--gold-muted), transparent)",
          opacity: 0.2,
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ textAlign: "center", marginBottom: "80px" }}>
          <SectionEyebrow>How It Works</SectionEyebrow>
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 400,
              color: "var(--cream)",
              lineHeight: 1.25,
              marginBottom: "16px",
              letterSpacing: "-0.01em",
            }}
          >
            Six Simple Steps to Your Edition
          </h2>
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "0.95rem",
              color: "rgba(250, 247, 242, 0.45)",
              fontStyle: "italic",
            }}
          >
            A transparent, personal process from first message to final delivery.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            background: "rgba(184, 151, 58, 0.06)",
            border: "1px solid rgba(184, 151, 58, 0.06)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="card-premium reveal"
              style={{
                padding: "32px 28px",
                position: "relative",
                transitionDelay: `${i * 0.08}s`,
              }}
            >
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "3.5rem",
                  color: "rgba(184, 151, 58, 0.1)",
                  lineHeight: 1,
                  marginBottom: "16px",
                  letterSpacing: "-0.02em",
                }}
              >
                {step.num}
              </div>
              <h3
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1rem",
                  fontWeight: 400,
                  color: "var(--cream)",
                  marginBottom: "10px",
                  lineHeight: 1.35,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: "0.8rem",
                  lineHeight: 1.7,
                  color: "rgba(250, 247, 242, 0.45)",
                }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "56px",
          }}
        >
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 36px",
              borderRadius: "2px",
              textDecoration: "none",
            }}
          >
            <IconWhatsApp size={16} />
            Begin Your Order
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────
function ContactSection() {
  const ref = useReveal();

  return (
    <section
      id="contact"
      style={{
        padding: "120px 24px",
        background: "var(--dark-2)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--gold-muted), transparent)",
          opacity: 0.2,
        }}
      />

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
          <SectionEyebrow>Get in Touch</SectionEyebrow>
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 400,
              color: "var(--cream)",
              lineHeight: 1.25,
              marginBottom: "20px",
              letterSpacing: "-0.01em",
            }}
          >
            We Would Be Honoured to Help You
          </h2>
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "rgba(250, 247, 242, 0.5)",
              fontStyle: "italic",
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            Questions about an edition, a bulk order, or a custom request? Reach us through any channel below.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "48px",
          }}
        >
          {/* WhatsApp */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="card-premium reveal"
            style={{
              borderRadius: "4px",
              padding: "32px",
              textDecoration: "none",
              display: "block",
              transitionDelay: "0s",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(37, 211, 102, 0.08)",
                border: "1px solid rgba(37, 211, 102, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                color: "#25D366",
              }}
            >
              <IconWhatsApp size={20} />
            </div>
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "8px",
              }}
            >
              WhatsApp
            </div>
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "1.05rem",
                color: "var(--gold-light)",
                marginBottom: "6px",
              }}
            >
              0882-0000-2979
            </div>
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "0.75rem",
                color: "rgba(250, 247, 242, 0.4)",
              }}
            >
              Tap to open conversation →
            </div>
          </a>

          {/* Instagram */}
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="card-premium reveal"
            style={{
              borderRadius: "4px",
              padding: "32px",
              textDecoration: "none",
              display: "block",
              transitionDelay: "0.1s",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(193, 53, 132, 0.08)",
                border: "1px solid rgba(193, 53, 132, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                color: "#C13584",
              }}
            >
              <IconInstagram size={20} />
            </div>
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "8px",
              }}
            >
              Instagram
            </div>
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "1.05rem",
                color: "var(--gold-light)",
                marginBottom: "6px",
              }}
            >
              @dzikracomppublishers
            </div>
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "0.75rem",
                color: "rgba(250, 247, 242, 0.4)",
              }}
            >
              Follow our journey →
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${EMAIL}`}
            className="card-premium reveal"
            style={{
              borderRadius: "4px",
              padding: "32px",
              textDecoration: "none",
              display: "block",
              transitionDelay: "0.2s",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(184, 151, 58, 0.08)",
                border: "1px solid rgba(184, 151, 58, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                color: "var(--gold)",
              }}
            >
              <IconEmail size={20} />
            </div>
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "8px",
              }}
            >
              Email
            </div>
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "0.88rem",
                color: "var(--gold-light)",
                marginBottom: "6px",
                wordBreak: "break-all",
              }}
            >
              {EMAIL}
            </div>
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "0.75rem",
                color: "rgba(250, 247, 242, 0.4)",
              }}
            >
              Write to us →
            </div>
          </a>
        </div>

        {/* Primary CTA */}
        <div
          style={{
            textAlign: "center",
            padding: "48px 32px",
            border: "1px solid rgba(184, 151, 58, 0.12)",
            borderRadius: "4px",
            background: "rgba(184, 151, 58, 0.02)",
          }}
        >
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "1.3rem",
              color: "var(--cream)",
              marginBottom: "12px",
            }}
          >
            Ready to begin?
          </div>
          <p
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "0.82rem",
              color: "rgba(250, 247, 242, 0.45)",
              marginBottom: "28px",
              lineHeight: 1.7,
            }}
          >
            Reach us directly on WhatsApp for the fastest response.
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 32px",
              borderRadius: "2px",
              textDecoration: "none",
            }}
          >
            <IconWhatsApp size={16} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        background: "var(--dark)",
        borderTop: "1px solid rgba(184, 151, 58, 0.08)",
        padding: "64px 24px 40px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px",
            marginBottom: "48px",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <span
                style={{
                  fontFamily: "Amiri, serif",
                  fontSize: "2rem",
                  color: "var(--gold)",
                }}
              >
                ذ
              </span>
              <div>
                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1rem",
                    color: "var(--gold-light)",
                    letterSpacing: "0.05em",
                  }}
                >
                  Adz Dzikra
                </div>
                <div
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    fontSize: "0.55rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--gold-muted)",
                    opacity: 0.6,
                  }}
                >
                  Premium Islamic Publishing
                </div>
              </div>
            </div>
            <p
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "0.78rem",
                lineHeight: 1.75,
                color: "rgba(250, 247, 242, 0.35)",
                maxWidth: "260px",
              }}
            >
              Publishing the classical Islamic tradition in editions worthy of the knowledge they carry — crafted to be read, studied, and treasured for generations.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--gold-muted)",
                  opacity: 0.5,
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
                aria-label="Instagram"
              >
                <IconInstagram size={18} />
              </a>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--gold-muted)",
                  opacity: 0.5,
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
                aria-label="WhatsApp"
              >
                <IconWhatsApp size={18} />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                style={{
                  color: "var(--gold-muted)",
                  opacity: 0.5,
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
                aria-label="Email"
              >
                <IconEmail size={18} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--gold-muted)",
                opacity: 0.6,
                marginBottom: "16px",
              }}
            >
              Explore
            </div>
            {[
              { label: "Why Adz Dzikra", href: "#why-us" },
              { label: "Our Collection", href: "#collection" },
              { label: "Trusted Voices", href: "#testimonials" },
              { label: "How It Works", href: "#process" },
              { label: "Contact Us", href: "#contact" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  display: "block",
                  fontFamily: "system-ui, sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(250, 247, 242, 0.35)",
                  textDecoration: "none",
                  marginBottom: "10px",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-muted)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250, 247, 242, 0.35)")}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--gold-muted)",
                opacity: 0.6,
                marginBottom: "16px",
              }}
            >
              Contact
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(250, 247, 242, 0.35)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-muted)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250, 247, 242, 0.35)")}
              >
                <IconWhatsApp size={14} />
                0882-0000-2979
              </a>
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(250, 247, 242, 0.35)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-muted)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250, 247, 242, 0.35)")}
              >
                <IconInstagram size={14} />
                @dzikracomppublishers
              </a>
              <a
                href={`mailto:${EMAIL}`}
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(250, 247, 242, 0.35)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "color 0.2s ease",
                  wordBreak: "break-all",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-muted)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250, 247, 242, 0.35)")}
              >
                <IconEmail size={14} />
                {EMAIL}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(184, 151, 58, 0.06)",
            paddingTop: "24px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "0.7rem",
              color: "rgba(250, 247, 242, 0.2)",
            }}
          >
            © 2026 Adz Dzikra. All rights reserved.
          </div>
          <div
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "0.7rem",
              color: "rgba(250, 247, 242, 0.2)",
            }}
          >
            Premium Islamic Publishing · Indonesia
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── FLOATING WHATSAPP ────────────────────────────────────────────
function FloatingWhatsApp() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <IconWhatsApp size={26} />
    </a>
  );
}

// ─── SCROLL REVEAL INIT ───────────────────────────────────────────
function ScrollRevealInit() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}

// ─── MAIN ─────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <ScrollRevealInit />
      <Navigation />
      <main>
        <HeroSection />
        <WhySection />
        <CollectionSection />
        <TestimonialsSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
