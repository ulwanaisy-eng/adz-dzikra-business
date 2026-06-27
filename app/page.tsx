"use client";

import { useEffect, useRef, useState } from "react";

// ─── CONFIG ───────────────────────────────────────────────────────
const WA_NUMBER = "62882000020979";
const WA_MSG = encodeURIComponent(
  "Assalamu'alaikum, I'm interested in Dzikra's publications. Could you please provide more information?"
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
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function IconClose({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
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

// ═══════════════════════════════════════════════════════════════════
// ORNAMENT SYSTEM — Mathematically precise Islamic geometric SVGs
// Inspired by: Andalusian geometry, Ottoman illumination, Persian tazhib,
// Mamluk ornament, Damascus borders, Jerusalem mosaics
// ═══════════════════════════════════════════════════════════════════

// Hero radial ornament — 12-fold symmetry, layered petal geometry
function OrnamentHeroRadial({ size = 520, opacity = 0.07 }: { size?: number; opacity?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2;

  // Generate 12-fold petal paths
  const petals12 = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 360) / 12;
    const rad = (a * Math.PI) / 180;
    const r1 = R * 0.42;
    const r2 = R * 0.22;
    const spread = 15 * (Math.PI / 180);
    const x1 = cx + r1 * Math.cos(rad - spread);
    const y1 = cy + r1 * Math.sin(rad - spread);
    const x2 = cx + r1 * Math.cos(rad + spread);
    const y2 = cy + r1 * Math.sin(rad + spread);
    const x3 = cx + R * 0.48 * Math.cos(rad);
    const y3 = cy + R * 0.48 * Math.sin(rad);
    const xm = cx + r2 * Math.cos(rad);
    const ym = cy + r2 * Math.sin(rad);
    return `M ${xm} ${ym} Q ${x1} ${y1} ${x3} ${y3} Q ${x2} ${y2} ${xm} ${ym} Z`;
  }).join(" ");

  // Inner 8-pointed star
  const star8 = Array.from({ length: 8 }, (_, i) => {
    const a = (i * 360) / 8;
    const b = a + 22.5;
    const ra = (a * Math.PI) / 180;
    const rb = (b * Math.PI) / 180;
    const outer = R * 0.18;
    const inner = R * 0.09;
    return `${cx + outer * Math.cos(ra)} ${cy + outer * Math.sin(ra)} ${cx + inner * Math.cos(rb)} ${cy + inner * Math.sin(rb)}`;
  }).join(" ");

  // Outer 24-fold tick marks
  const ticks24 = Array.from({ length: 24 }, (_, i) => {
    const a = ((i * 360) / 24) * (Math.PI / 180);
    const r1 = R * 0.88;
    const r2 = R * 0.93;
    return `M ${cx + r1 * Math.cos(a)} ${cy + r1 * Math.sin(a)} L ${cx + r2 * Math.cos(a)} ${cy + r2 * Math.sin(a)}`;
  }).join(" ");

  // Arabesque flourish arcs — 6 large lobes
  const lobes6 = Array.from({ length: 6 }, (_, i) => {
    const a = ((i * 60 - 30) * Math.PI) / 180;
    const b = ((i * 60 + 30) * Math.PI) / 180;
    const rm = R * 0.64;
    const rp = R * 0.72;
    const x1 = cx + rm * Math.cos(a);
    const y1 = cy + rm * Math.sin(a);
    const x2 = cx + rm * Math.cos(b);
    const y2 = cy + rm * Math.sin(b);
    const cpAngle = ((i * 60) * Math.PI) / 180;
    const cpx = cx + rp * Math.cos(cpAngle);
    const cpy = cy + rp * Math.sin(cpAngle);
    return `M ${x1} ${y1} Q ${cpx} ${cpy} ${x2} ${y2}`;
  }).join(" ");

  // Mid ring 16-petal small florals
  const florals16 = Array.from({ length: 16 }, (_, i) => {
    const a = ((i * 360) / 16) * (Math.PI / 180);
    const rm = R * 0.56;
    const px = cx + rm * Math.cos(a);
    const py = cy + rm * Math.sin(a);
    const pr = R * 0.028;
    const pb = ((i * 360) / 16 + 90) * (Math.PI / 180);
    return `M ${px} ${py} m ${-pr} 0 a ${pr} ${pr} 0 1 1 ${pr * 2} 0 a ${pr} ${pr} 0 1 1 ${-pr * 2} 0
            M ${px + pr * Math.cos(pb)} ${py + pr * Math.sin(pb)} L ${px + pr * 1.8 * Math.cos(pb)} ${py + pr * 1.8 * Math.sin(pb)}`;
  }).join(" ");

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ opacity, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="og1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8A556" stopOpacity="1" />
          <stop offset="60%" stopColor="#8A6D2F" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8A6D2F" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Outermost ring */}
      <circle cx={cx} cy={cy} r={R * 0.96} fill="none" stroke="url(#og1)" strokeWidth="0.6" />
      <circle cx={cx} cy={cy} r={R * 0.92} fill="none" stroke="url(#og1)" strokeWidth="0.3" />
      {/* 24-tick outer border */}
      <path d={ticks24} stroke="#C8A556" strokeWidth="0.8" fill="none" />
      {/* Main 12-petal rosette */}
      <path d={petals12} fill="#C8A556" fillOpacity="0.9" />
      {/* 6-lobe arabesque arcs */}
      <path d={lobes6} fill="none" stroke="#C8A556" strokeWidth="1.2" />
      {/* Mid-ring florals */}
      <path d={florals16} fill="#C8A556" stroke="#C8A556" strokeWidth="0.5" />
      {/* Inner rings */}
      <circle cx={cx} cy={cy} r={R * 0.28} fill="none" stroke="#C8A556" strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r={R * 0.21} fill="none" stroke="#C8A556" strokeWidth="0.4" />
      {/* 8-point inner star */}
      <polygon points={star8} fill="#C8A556" fillOpacity="0.6" />
      {/* Centre dot */}
      <circle cx={cx} cy={cy} r={R * 0.04} fill="#C8A556" />
      {/* Secondary petal ring at 0.35 */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = ((i * 30 + 15) * Math.PI) / 180;
        const rm = R * 0.33;
        const px = cx + rm * Math.cos(a);
        const py = cy + rm * Math.sin(a);
        return <circle key={i} cx={px} cy={py} r={R * 0.022} fill="#C8A556" fillOpacity="0.7" />;
      })}
    </svg>
  );
}

// Corner ornament — Andalusian quarter-arc with floral tip
function OrnamentCorner({ size = 120, flip = false, flipY = false, opacity = 0.12 }: { size?: number; flip?: boolean; flipY?: boolean; opacity?: number }) {
  const s = size;
  return (
    <svg
      width={s} height={s}
      viewBox="0 0 120 120"
      style={{
        opacity,
        pointerEvents: "none",
        transform: `${flip ? "scaleX(-1)" : ""} ${flipY ? "scaleY(-1)" : ""}`,
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C8A556" />
          <stop offset="100%" stopColor="#8A6D2F" />
        </linearGradient>
      </defs>
      {/* Main quarter-arc frame */}
      <path d="M 8 8 L 8 60 Q 8 112 60 112 L 112 112" fill="none" stroke="url(#cg1)" strokeWidth="1.2" />
      <path d="M 14 8 L 14 57 Q 14 106 63 106 L 112 106" fill="none" stroke="url(#cg1)" strokeWidth="0.5" />
      {/* Corner bracket lines */}
      <path d="M 8 8 L 38 8" stroke="url(#cg1)" strokeWidth="1.2" fill="none" />
      <path d="M 8 8 L 8 38" stroke="url(#cg1)" strokeWidth="1.2" fill="none" />
      {/* Corner rosette */}
      <circle cx="8" cy="8" r="4" fill="none" stroke="#C8A556" strokeWidth="0.8" />
      <circle cx="8" cy="8" r="1.5" fill="#C8A556" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return <line key={i} x1={8 + 1.5 * Math.cos(a)} y1={8 + 1.5 * Math.sin(a)} x2={8 + 4 * Math.cos(a)} y2={8 + 4 * Math.sin(a)} stroke="#C8A556" strokeWidth="0.5" />;
      })}
      {/* Arabesque leaf along vertical */}
      <path d="M 8 30 Q 16 35 8 40 Q 0 35 8 30 Z" fill="#C8A556" fillOpacity="0.7" />
      <path d="M 8 55 Q 16 60 8 65 Q 0 60 8 55 Z" fill="#C8A556" fillOpacity="0.5" />
      {/* Arabesque leaf along horizontal */}
      <path d="M 30 8 Q 35 16 40 8 Q 35 0 30 8 Z" fill="#C8A556" fillOpacity="0.7" />
      <path d="M 55 8 Q 60 16 65 8 Q 60 0 55 8 Z" fill="#C8A556" fillOpacity="0.5" />
      {/* Small diamond at midpoint of arc */}
      <path d="M 30 82 L 34 86 L 30 90 L 26 86 Z" fill="#C8A556" fillOpacity="0.6" />
    </svg>
  );
}

// Manuscript border — thin Damascus-style repeating vine
function OrnamentBorderLine({ width = 600, opacity = 0.1 }: { width?: number; opacity?: number }) {
  const unit = 40;
  const count = Math.ceil(width / unit);
  const w = count * unit;
  return (
    <svg width="100%" height="24" viewBox={`0 0 ${w} 24`} preserveAspectRatio="xMidYMid slice" style={{ opacity, pointerEvents: "none", width: "100%" }} aria-hidden="true">
      <defs>
        <pattern id="vine" x="0" y="0" width={unit} height="24" patternUnits="userSpaceOnUse">
          {/* Vine stem */}
          <path d={`M 0 12 Q 10 4 20 12 Q 30 20 ${unit} 12`} fill="none" stroke="#C8A556" strokeWidth="0.8" />
          {/* Left leaf */}
          <path d="M 10 8 Q 14 4 18 8 Q 14 6 10 8 Z" fill="#C8A556" />
          {/* Right leaf */}
          <path d="M 30 16 Q 34 20 38 16 Q 34 18 30 16 Z" fill="#C8A556" />
          {/* Node dot */}
          <circle cx="20" cy="12" r="1.2" fill="#C8A556" />
        </pattern>
      </defs>
      <rect width={w} height="24" fill="url(#vine)" />
    </svg>
  );
}

// Section divider — Ottoman illumination style with central medallion
function OrnamentDivider({ opacity = 0.13 }: { opacity?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, width: "100%", pointerEvents: "none" }} aria-hidden="true">
      <svg width="260" height="28" viewBox="0 0 260 28" style={{ opacity }}>
        <defs>
          <linearGradient id="dg1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C8A556" stopOpacity="0" />
            <stop offset="50%" stopColor="#C8A556" stopOpacity="1" />
            <stop offset="100%" stopColor="#C8A556" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {/* Main line */}
        <line x1="0" y1="14" x2="220" y2="14" stroke="url(#dg1)" strokeWidth="0.8" />
        {/* Parallel fine line */}
        <line x1="0" y1="17" x2="200" y2="17" stroke="url(#dg1)" strokeWidth="0.3" />
        {/* Repeating diamonds along line */}
        {[40, 80, 120, 160].map((x) => (
          <path key={x} d={`M ${x} 14 L ${x + 4} 11 L ${x + 8} 14 L ${x + 4} 17 Z`} fill="#C8A556" />
        ))}
        {/* Floral end tip */}
        <path d="M 210 10 Q 220 14 210 18 Q 200 14 210 10 Z" fill="#C8A556" fillOpacity="0.8" />
        <circle cx="224" cy="14" r="3" fill="none" stroke="#C8A556" strokeWidth="0.8" />
        <circle cx="224" cy="14" r="1" fill="#C8A556" />
      </svg>
      {/* Central medallion */}
      <svg width="36" height="36" viewBox="0 0 36 36" style={{ opacity: opacity * 1.3, flexShrink: 0 }}>
        <circle cx="18" cy="18" r="14" fill="none" stroke="#C8A556" strokeWidth="0.8" />
        <circle cx="18" cy="18" r="9" fill="none" stroke="#C8A556" strokeWidth="0.5" />
        {Array.from({ length: 8 }, (_, i) => {
          const a = ((i * 45) * Math.PI) / 180;
          const x1 = 18 + 9 * Math.cos(a); const y1 = 18 + 9 * Math.sin(a);
          const x2 = 18 + 14 * Math.cos(a); const y2 = 18 + 14 * Math.sin(a);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C8A556" strokeWidth="0.5" />;
        })}
        <circle cx="18" cy="18" r="3" fill="#C8A556" fillOpacity="0.8" />
      </svg>
      {/* Mirror */}
      <svg width="260" height="28" viewBox="0 0 260 28" style={{ opacity, transform: "scaleX(-1)" }}>
        <defs>
          <linearGradient id="dg2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C8A556" stopOpacity="0" />
            <stop offset="50%" stopColor="#C8A556" stopOpacity="1" />
            <stop offset="100%" stopColor="#C8A556" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <line x1="0" y1="14" x2="220" y2="14" stroke="url(#dg2)" strokeWidth="0.8" />
        <line x1="0" y1="17" x2="200" y2="17" stroke="url(#dg2)" strokeWidth="0.3" />
        {[40, 80, 120, 160].map((x) => (
          <path key={x} d={`M ${x} 14 L ${x + 4} 11 L ${x + 8} 14 L ${x + 4} 17 Z`} fill="#C8A556" />
        ))}
        <path d="M 210 10 Q 220 14 210 18 Q 200 14 210 10 Z" fill="#C8A556" fillOpacity="0.8" />
        <circle cx="224" cy="14" r="3" fill="none" stroke="#C8A556" strokeWidth="0.8" />
        <circle cx="224" cy="14" r="1" fill="#C8A556" />
      </svg>
    </div>
  );
}

// Footer radial — smaller, stronger Mamluk-style medallion
function OrnamentFooterMedallion({ size = 180, opacity = 0.15 }: { size?: number; opacity?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 2;
  const petals = Array.from({ length: 16 }, (_, i) => {
    const a = ((i * 360) / 16) * (Math.PI) / 180;
    const b = ((i * 360 / 16) + 11.25) * Math.PI / 180;
    const ro = R * 0.82;
    const ri = R * 0.52;
    const x1 = cx + ro * Math.cos(a); const y1 = cy + ro * Math.sin(a);
    const x2 = cx + ri * Math.cos(b); const y2 = cy + ri * Math.sin(b);
    const x3 = cx + ro * Math.cos(b + (11.25 * Math.PI / 180));
    const y3 = cy + ro * Math.sin(b + (11.25 * Math.PI / 180));
    return `M ${cx} ${cy} L ${x1} ${y1} Q ${cx + R * 0.88 * Math.cos(b)} ${cy + R * 0.88 * Math.sin(b)} ${x3} ${y3} Z`;
  }).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ opacity, pointerEvents: "none" }} aria-hidden="true">
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#C8A556" strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r={R * 0.88} fill="none" stroke="#C8A556" strokeWidth="0.4" />
      <path d={petals} fill="#C8A556" fillOpacity="0.5" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = ((i * 45) * Math.PI) / 180;
        const rm = R * 0.42;
        return <circle key={i} cx={cx + rm * Math.cos(a)} cy={cy + rm * Math.sin(a)} r={R * 0.04} fill="#C8A556" />;
      })}
      <circle cx={cx} cy={cy} r={R * 0.22} fill="none" stroke="#C8A556" strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r={R * 0.08} fill="#C8A556" fillOpacity="0.8" />
    </svg>
  );
}

// Geometric background tile — Andalusian 8-point star grid
function OrnamentBgTile({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <pattern id="bgTile" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M30 0 L38 22 L60 22 L44 36 L50 58 L30 46 L10 58 L16 36 L0 22 L22 22 Z"
            fill="none" stroke="#C8A556" strokeWidth="0.4" opacity={opacity * 30} />
          <circle cx="30" cy="30" r="8" fill="none" stroke="#C8A556" strokeWidth="0.3" opacity={opacity * 20} />
        </pattern>
      </defs>
    </svg>
  );
}

// ─── SECTION EYEBROW ──────────────────────────────────────────────
function GoldDiamond() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10">
      <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="#C8A556" opacity="0.85" />
    </svg>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "24px" }}>
      <GoldDiamond />
      <span style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C8A556", opacity: 0.85 }}>
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── NAVIGATION ───────────────────────────────────────────────────
function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
    { label: "Why DZIKRA", href: "#why-us" },
    { label: "Collection", href: "#collection" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "How It Works", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="nav-glass" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transition: "all 0.3s ease", boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
        {/* Logo */}
        <a href="#top" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "14px" }}>
          <img src="/logo.png" alt="DZIKRA" style={{ width: "42px", height: "42px", objectFit: "contain", filter: "drop-shadow(0 0 6px rgba(200,165,86,0.3))" }} />
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "1.15rem", color: "#C8A556", letterSpacing: "0.15em", lineHeight: 1.0, fontWeight: 400 }}>DZIKRA</div>
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8A6D2F", opacity: 0.8 }}>Premium Islamic Publishing</div>
          </div>
        </a>
        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }} className="desktop-nav">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(250,247,242,0.55)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#C8A556")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(250,247,242,0.55)")}>{l.label}</a>
          ))}
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding: "9px 20px", borderRadius: "2px", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
            <IconWhatsApp size={13} />Order via WhatsApp
          </a>
        </div>
        {/* Mobile toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: "#C8A556", cursor: "pointer", display: "none", padding: "4px" }} className="mobile-menu-btn" aria-label="Toggle menu">
          {menuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>
      {menuOpen && (
        <div style={{ background: "var(--dark-2)", borderTop: "1px solid rgba(200,165,86,0.1)", padding: "16px 24px" }}>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "12px 0", fontFamily: "system-ui, sans-serif", fontSize: "0.82rem", color: "rgba(250,247,242,0.65)", textDecoration: "none", borderBottom: "1px solid rgba(200,165,86,0.07)" }}>{l.label}</a>
          ))}
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-gold" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "12px 24px", borderRadius: "2px", textDecoration: "none", marginTop: "14px" }}>
            <IconWhatsApp size={13} />Order via WhatsApp
          </a>
        </div>
      )}
      <style>{`@media (max-width: 900px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: flex !important; } }`}</style>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="top" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: "68px", background: "radial-gradient(ellipse 70% 55% at 60% 40%, rgba(200,165,86,0.05) 0%, transparent 65%), var(--dark)" }}>
      <OrnamentBgTile />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(#bgTile)", pointerEvents: "none" }} />

      {/* Large radial ornament — right side */}
      <div style={{ position: "absolute", right: "-60px", top: "50%", transform: "translateY(-50%)", animation: "floatUp 8s ease-in-out infinite", zIndex: 0 }}>
        <OrnamentHeroRadial size={580} opacity={0.09} />
      </div>
      {/* Secondary smaller radial — top left */}
      <div style={{ position: "absolute", left: "-140px", top: "-100px", animation: "floatUp 10s ease-in-out infinite 3s", zIndex: 0 }}>
        <OrnamentHeroRadial size={320} opacity={0.04} />
      </div>

      {/* Content — left aligned like reference */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ maxWidth: "580px" }}>
          <div style={{ animation: "fadeInUp 0.7s ease forwards", opacity: 0 }}>
            <SectionEyebrow>Handcrafted Editions Since 1992</SectionEyebrow>
          </div>

          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--cream)", marginBottom: "24px", animation: "fadeInUp 0.8s ease 0.1s forwards", opacity: 0, letterSpacing: "-0.01em" }}>
            Where<br />
            <span className="text-gold-gradient">Timeless Knowledge</span><br />
            Meets Modern Reading
          </h1>

          {/* Ornamental divider below headline */}
          <div style={{ marginBottom: "28px", animation: "fadeInUp 0.8s ease 0.25s forwards", opacity: 0 }}>
            <OrnamentDivider opacity={0.2} />
          </div>

          <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", lineHeight: 1.8, color: "rgba(250,247,242,0.6)", marginBottom: "44px", animation: "fadeInUp 0.8s ease 0.35s forwards", opacity: 0, fontStyle: "italic", maxWidth: "480px" }}>
            Experience the beauty of classical Islamic scholarship through thoughtfully crafted editions designed for today's readers.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", animation: "fadeInUp 0.8s ease 0.45s forwards", opacity: 0 }}>
            <a href="#collection" className="btn-gold" style={{ padding: "14px 30px", borderRadius: "2px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              Explore the Collection
            </a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ padding: "14px 30px", borderRadius: "2px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <IconWhatsApp size={14} />Enquire on WhatsApp
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "clamp(24px, 5vw, 56px)", marginTop: "64px", paddingTop: "36px", borderTop: "1px solid rgba(200,165,86,0.12)", animation: "fadeInUp 0.8s ease 0.6s forwards", opacity: 0, flexWrap: "wrap" }}>
            {[{ value: "1", label: "Published Title" }, { value: "100%", label: "Premium Edition" }, { value: "2026", label: "Founded" }].map((s) => (
              <div key={s.label} style={{ textAlign: "left" }}>
                <div className="text-gold-gradient" style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 400, lineHeight: 1, marginBottom: "5px" }}>{s.value}</div>
                <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#why-us" style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", color: "var(--gold-muted)", opacity: 0.5, textDecoration: "none", animation: "pulse-gold 2.5s ease-in-out infinite" }} aria-label="Scroll down">
        <div style={{ width: "1px", height: "28px", background: "linear-gradient(to bottom, #8A6D2F, transparent)" }} />
        <IconChevronDown size={13} />
      </a>
    </section>
  );
}

// ─── WHY DZIKRA ───────────────────────────────────────────────────
function WhySection() {
  const ref = useReveal();
  const publishers = ["Duta Ilmu", "Mutiara Ilmu", "Darul Ilmi", "Daarul Abidin", "Al Hidayah", "Ibnu Abud", "Ali Imran Semarang", "Daarul Haddad", "Balai Buku", "Pustaka Progressif"];

  return (
    <section id="why-us" style={{ padding: "120px 24px", background: "var(--dark-2)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, #8A6D2F, transparent)", opacity: 0.3 }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Corner ornaments on the why section */}
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: -20, left: -20 }}><OrnamentCorner size={100} opacity={0.1} /></div>
          <div style={{ position: "absolute", top: -20, right: -20 }}><OrnamentCorner size={100} flip opacity={0.1} /></div>

          <div ref={ref} className="reveal" style={{ textAlign: "center", marginBottom: "64px", paddingTop: "16px" }}>
            <SectionEyebrow>Why DZIKRA</SectionEyebrow>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: "var(--cream)", lineHeight: 1.25, marginBottom: "28px", letterSpacing: "-0.01em" }}>
              Built on Three Decades of<br /><span className="text-gold-gradient">Publishing Excellence</span>
            </h2>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(0.95rem, 1.7vw, 1.08rem)", lineHeight: 1.85, color: "rgba(250,247,242,0.6)", maxWidth: "640px", margin: "0 auto 44px", fontStyle: "italic" }}>
              Since 1992, our team has partnered with respected Islamic publishers across Indonesia, providing meticulous Arabic typesetting and book layout services. Today, DZIKRA carries that legacy forward by publishing premium editions crafted with the same precision, authenticity, and care.
            </p>

            {/* Publisher heritage block */}
            <div style={{ border: "1px solid rgba(200,165,86,0.12)", borderRadius: "3px", padding: "clamp(20px, 4vw, 36px)", maxWidth: "760px", margin: "0 auto", background: "rgba(200,165,86,0.025)", position: "relative" }}>
              <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)" }}>
                <OrnamentDivider opacity={0.18} />
              </div>
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8A6D2F", marginBottom: "14px", opacity: 0.7, marginTop: "16px" }}>
                Publishing Expertise Trusted Since 1992
              </div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", lineHeight: 1.8, color: "rgba(250,247,242,0.4)", marginBottom: "16px", fontStyle: "italic" }}>
                Our publishing and Arabic typesetting expertise has supported the work of respected Islamic publishers across Indonesia, including:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px", justifyContent: "center" }}>
                {publishers.map((pub, i) => (
                  <span key={pub} style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.66rem", letterSpacing: "0.06em", color: "#8A6D2F", opacity: 0.6, display: "flex", alignItems: "center", gap: "8px" }}>
                    {pub}{i < publishers.length - 1 && <span style={{ opacity: 0.3 }}>·</span>}
                  </span>
                ))}
                <span style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.66rem", color: "#8A6D2F", opacity: 0.4, fontStyle: "italic" }}>&amp; many more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1px", background: "rgba(200,165,86,0.07)", border: "1px solid rgba(200,165,86,0.07)", borderRadius: "3px", overflow: "hidden" }}>
          {[
            { icon: "◈", title: "Built on Three Decades of Experience", body: "Since 1992, our team has specialized in Arabic typesetting and book layout for respected Islamic publishers across Indonesia. Every DZIKRA edition is built upon that legacy of precision and expertise.", delay: "0s" },
            { icon: "✦", title: "Refined Arabic Typesetting", body: "Meticulously arranged Arabic text with thoughtful layout, clear hierarchy, and comfortable spacing — designed to make studying and reading more enjoyable.", delay: "0.08s" },
            { icon: "◇", title: "Premium Materials", body: "Carefully selected paper and durable binding ensure every edition is comfortable to read and made to last through years of study.", delay: "0.16s" },
            { icon: "◉", title: "Authentic & Trustworthy", body: "Every edition is prepared with great care, preserving the integrity of the original text while maintaining clarity and accuracy.", delay: "0.24s" },
            { icon: "⬡", title: "Protected Delivery", body: "Every order is securely packed with protective materials to ensure your books arrive safely, wherever you are in Indonesia.", delay: "0.32s" },
            { icon: "✧", title: "Quality Without Compromise", body: "From manuscript preparation to the finished book, every step is guided by our commitment to quality, precision, and excellence.", delay: "0.4s" },
          ].map((card) => (
            <div key={card.title} className="card-premium reveal" style={{ padding: "clamp(24px, 3vw, 38px)", transitionDelay: card.delay }}>
              <div style={{ fontSize: "1.1rem", color: "#8A6D2F", marginBottom: "14px", opacity: 0.8 }}>{card.icon}</div>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "0.98rem", fontWeight: 400, color: "var(--cream)", marginBottom: "10px", lineHeight: 1.4 }}>{card.title}</h3>
              <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.8rem", lineHeight: 1.75, color: "rgba(250,247,242,0.48)" }}>{card.body}</p>
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
    <section id="collection" style={{ padding: "120px 24px", background: "var(--dark)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, #8A6D2F, transparent)", opacity: 0.2 }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ textAlign: "center", marginBottom: "56px" }}>
          <SectionEyebrow>The Collection</SectionEyebrow>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: "var(--cream)", lineHeight: 1.25, marginBottom: "20px", letterSpacing: "-0.01em" }}>
            Our Collection
          </h2>
          {/* Thin manuscript border below heading */}
          <div style={{ maxWidth: "480px", margin: "0 auto 24px" }}>
            <OrnamentBorderLine opacity={0.14} />
          </div>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(0.92rem, 1.7vw, 1.02rem)", lineHeight: 1.85, color: "rgba(250,247,242,0.5)", maxWidth: "580px", margin: "0 auto", fontStyle: "italic" }}>
            Our inaugural collection is currently in preparation. Every title will be carefully selected, meticulously designed, and published with the same dedication to quality, authenticity, and craftsmanship that has defined our work for over three decades. Stay tuned for our first release.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {[{ delay: "0s" }, { delay: "0.12s" }, { delay: "0.24s" }].map((card, i) => (
            <div key={i} className="card-premium reveal" style={{ borderRadius: "3px", overflow: "hidden", transitionDelay: card.delay }}>
              {/* Placeholder cover */}
              <div style={{ height: "270px", background: "linear-gradient(160deg, #1c1a15, #0f0e0c)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", borderBottom: "1px solid rgba(200,165,86,0.08)" }}>
                <div style={{ position: "absolute", opacity: 1 }}>
                  <OrnamentFooterMedallion size={160} opacity={0.18} />
                </div>
                <div style={{ position: "relative", textAlign: "center", zIndex: 1 }}>
                  <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.52rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#8A6D2F", opacity: 0.6, marginBottom: "10px" }}>Coming Soon</div>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: "0.78rem", color: "#C8A556", opacity: 0.45, letterSpacing: "0.06em" }}>DZIKRA Premium Edition</div>
                </div>
              </div>
              {/* Card info */}
              <div style={{ padding: "22px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "3px 9px", border: "1px solid rgba(200,165,86,0.18)", borderRadius: "2px", marginBottom: "12px" }}>
                  <span style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.56rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8A6D2F" }}>In Development</span>
                </div>
                <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 400, color: "var(--cream)", marginBottom: "8px" }}>Coming Soon</h3>
                <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.78rem", lineHeight: 1.65, color: "rgba(250,247,242,0.38)", marginBottom: "14px" }}>Our first collection is currently in preparation.</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid rgba(200,165,86,0.07)", marginBottom: "14px" }}>
                  <div>
                    <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.56rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", opacity: 0.5, marginBottom: "3px" }}>Release</div>
                    <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.76rem", color: "#8A6D2F", opacity: 0.6 }}>To Be Announced</div>
                  </div>
                </div>
                <button disabled style={{ width: "100%", padding: "11px", background: "rgba(200,165,86,0.05)", border: "1px solid rgba(200,165,86,0.13)", borderRadius: "2px", fontFamily: "system-ui, sans-serif", fontSize: "0.66rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A6D2F", opacity: 0.45, cursor: "not-allowed" }}>
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
    <section id="testimonials" style={{ padding: "120px 24px", background: "var(--dark-2)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, #8A6D2F, transparent)", opacity: 0.2 }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ textAlign: "center", marginBottom: "56px" }}>
          <SectionEyebrow>Trusted Voices</SectionEyebrow>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: "var(--cream)", lineHeight: 1.25, marginBottom: "20px", letterSpacing: "-0.01em" }}>
            Voices That Will Guide Our Journey
          </h2>
          {/* Subtle divider ornament */}
          <div style={{ maxWidth: "560px", margin: "0 auto 20px" }}>
            <OrnamentDivider opacity={0.12} />
          </div>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(0.92rem, 1.7vw, 1.02rem)", lineHeight: 1.85, color: "rgba(250,247,242,0.5)", maxWidth: "580px", margin: "0 auto", fontStyle: "italic" }}>
            The voices of our readers, scholars, and partners will be featured here as our journey begins. We look forward to sharing authentic experiences and reflections from those who accompany DZIKRA in preserving and publishing classical Islamic knowledge.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "22px" }}>
          {[{ delay: "0s" }, { delay: "0.12s" }, { delay: "0.24s" }].map((card, i) => (
            <div key={i} className="card-premium reveal" style={{ borderRadius: "3px", padding: "30px", transitionDelay: card.delay, position: "relative" }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "3.5rem", color: "#C8A556", opacity: 0.07, lineHeight: 1, position: "absolute", top: "18px", left: "26px", fontStyle: "italic" }}>"</div>
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(200,165,86,0.07)", border: "1px solid rgba(200,165,86,0.14)", marginBottom: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A6D2F" strokeWidth="1.2" opacity={0.45}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
              </div>
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8A6D2F", opacity: 0.5, marginBottom: "10px" }}>Coming Soon</div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.85rem", lineHeight: 1.8, color: "rgba(250,247,242,0.32)", fontStyle: "italic" }}>
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
    { num: "01", title: "Explore the Collection", body: "Browse our available titles and discover the works that suit your learning journey." },
    { num: "02", title: "Select Your Edition", body: "Choose the book or edition you would like to order." },
    { num: "03", title: "Place Your Order", body: "Complete your order through our official WhatsApp or available ordering channels." },
    { num: "04", title: "Secure Your Purchase", body: "Confirm your order and complete the payment to reserve your copy." },
    { num: "05", title: "Careful Preparation", body: "Your order is carefully prepared, quality checked, and securely packaged before shipment." },
    { num: "06", title: "Delivered to Your Door", body: "Receive your books safely and begin your journey with timeless Islamic knowledge." },
  ];

  return (
    <section id="process" style={{ padding: "120px 24px", background: "var(--dark)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, #8A6D2F, transparent)", opacity: 0.2 }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ textAlign: "center", marginBottom: "70px" }}>
          <SectionEyebrow>How It Works</SectionEyebrow>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: "var(--cream)", lineHeight: 1.25, marginBottom: "14px", letterSpacing: "-0.01em" }}>
            Six Simple Steps to Your Edition
          </h2>
          {/* Decorative manuscript line */}
          <div style={{ maxWidth: "440px", margin: "0 auto 14px" }}>
            <OrnamentBorderLine opacity={0.12} />
          </div>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.92rem", color: "rgba(250,247,242,0.42)", fontStyle: "italic" }}>
            A transparent, personal process from first message to final delivery.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "rgba(200,165,86,0.06)", border: "1px solid rgba(200,165,86,0.06)", borderRadius: "3px", overflow: "hidden" }}>
          {steps.map((step, i) => (
            <div key={step.num} className="card-premium reveal" style={{ padding: "30px 26px", position: "relative", transitionDelay: `${i * 0.07}s` }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "3.2rem", color: "rgba(200,165,86,0.1)", lineHeight: 1, marginBottom: "14px", letterSpacing: "-0.02em" }}>{step.num}</div>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "0.96rem", fontWeight: 400, color: "var(--cream)", marginBottom: "9px", lineHeight: 1.35 }}>{step.title}</h3>
              <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.78rem", lineHeight: 1.7, color: "rgba(250,247,242,0.44)" }}>{step.body}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "52px" }}>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "15px 34px", borderRadius: "2px", textDecoration: "none" }}>
            <IconWhatsApp size={15} />Begin Your Order
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
    <section id="contact" style={{ padding: "120px 24px", background: "var(--dark-2)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, #8A6D2F, transparent)", opacity: 0.2 }} />

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ textAlign: "center", marginBottom: "56px", position: "relative" }}>
          {/* Corner ornaments */}
          <div style={{ position: "absolute", top: -24, left: -24 }}><OrnamentCorner size={90} opacity={0.1} /></div>
          <div style={{ position: "absolute", top: -24, right: -24 }}><OrnamentCorner size={90} flip opacity={0.1} /></div>
          <SectionEyebrow>Get in Touch</SectionEyebrow>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: "var(--cream)", lineHeight: 1.25, marginBottom: "18px", letterSpacing: "-0.01em" }}>
            We Would Be Honoured to Help You
          </h2>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.98rem", lineHeight: 1.8, color: "rgba(250,247,242,0.48)", fontStyle: "italic", maxWidth: "500px", margin: "0 auto" }}>
            Questions about an edition, a bulk order, or a custom request? Reach us through any channel below.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "18px", marginBottom: "40px" }}>
          {/* WhatsApp */}
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="card-premium reveal" style={{ borderRadius: "3px", padding: "28px", textDecoration: "none", display: "block", transitionDelay: "0s" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(37,211,102,0.07)", border: "1px solid rgba(37,211,102,0.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px", color: "#25D366" }}><IconWhatsApp size={18} /></div>
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.57rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "7px" }}>WhatsApp</div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "#C8A556", marginBottom: "5px" }}>0882-0002-0979</div>
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.72rem", color: "rgba(250,247,242,0.35)" }}>Tap to open conversation →</div>
          </a>
          {/* Instagram */}
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="card-premium reveal" style={{ borderRadius: "3px", padding: "28px", textDecoration: "none", display: "block", transitionDelay: "0.1s" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(193,53,132,0.07)", border: "1px solid rgba(193,53,132,0.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px", color: "#C13584" }}><IconInstagram size={18} /></div>
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.57rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "7px" }}>Instagram</div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "#C8A556", marginBottom: "5px" }}>@dzikracomppublishers</div>
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.72rem", color: "rgba(250,247,242,0.35)" }}>Follow our journey →</div>
          </a>
          {/* Email */}
          <a href={`mailto:${EMAIL}`} className="card-premium reveal" style={{ borderRadius: "3px", padding: "28px", textDecoration: "none", display: "block", transitionDelay: "0.2s" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(200,165,86,0.07)", border: "1px solid rgba(200,165,86,0.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px", color: "#C8A556" }}><IconEmail size={18} /></div>
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.57rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "7px" }}>Email</div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "0.85rem", color: "#C8A556", marginBottom: "5px", wordBreak: "break-all" }}>{EMAIL}</div>
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.72rem", color: "rgba(250,247,242,0.35)" }}>Write to us →</div>
          </a>
        </div>

        <div style={{ textAlign: "center", padding: "40px 28px", border: "1px solid rgba(200,165,86,0.1)", borderRadius: "3px", background: "rgba(200,165,86,0.02)" }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", color: "var(--cream)", marginBottom: "10px" }}>Ready to begin?</div>
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.8rem", color: "rgba(250,247,242,0.4)", marginBottom: "24px", lineHeight: 1.7 }}>Reach us directly on WhatsApp for the fastest response.</p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "13px 30px", borderRadius: "2px", textDecoration: "none" }}>
            <IconWhatsApp size={15} />Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "var(--dark)", borderTop: "1px solid rgba(200,165,86,0.07)", padding: "72px 24px 36px", position: "relative", overflow: "hidden" }}>
      {/* Footer medallion — strongest ornament */}
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%) translateY(40%)", pointerEvents: "none" }}>
        <OrnamentFooterMedallion size={280} opacity={0.08} />
      </div>
      {/* Corner ornaments — footer */}
      <div style={{ position: "absolute", bottom: 0, left: 0 }}><OrnamentCorner size={110} flipY opacity={0.09} /></div>
      <div style={{ position: "absolute", bottom: 0, right: 0 }}><OrnamentCorner size={110} flip flipY opacity={0.09} /></div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "44px", marginBottom: "48px" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
              <img src="/logo.png" alt="DZIKRA" style={{ width: "40px", height: "40px", objectFit: "contain", filter: "drop-shadow(0 0 5px rgba(200,165,86,0.2))" }} />
              <div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: "1.05rem", color: "#C8A556", letterSpacing: "0.15em" }}>DZIKRA</div>
                <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.5rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8A6D2F", opacity: 0.7 }}>Premium Islamic Publishing</div>
              </div>
            </div>
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.76rem", lineHeight: 1.75, color: "rgba(250,247,242,0.3)", maxWidth: "240px" }}>
              Publishing the classical Islamic tradition in editions worthy of the knowledge they carry — crafted to be read, studied, and treasured for generations.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              {[{ href: IG_URL, icon: <IconInstagram size={16} />, label: "Instagram" }, { href: WA_URL, icon: <IconWhatsApp size={16} />, label: "WhatsApp" }, { href: `mailto:${EMAIL}`, icon: <IconEmail size={16} />, label: "Email" }].map((s) => (
                <a key={s.label} href={s.href} target={s.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" style={{ color: "#8A6D2F", opacity: 0.45, transition: "opacity 0.2s" }} aria-label={s.label}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.45")}>{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.57rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8A6D2F", opacity: 0.6, marginBottom: "14px" }}>Explore</div>
            {[{ label: "Why DZIKRA", href: "#why-us" }, { label: "Our Collection", href: "#collection" }, { label: "Trusted Voices", href: "#testimonials" }, { label: "How It Works", href: "#process" }, { label: "Contact Us", href: "#contact" }].map((l) => (
              <a key={l.href} href={l.href} style={{ display: "block", fontFamily: "system-ui, sans-serif", fontSize: "0.78rem", color: "rgba(250,247,242,0.3)", textDecoration: "none", marginBottom: "9px", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#8A6D2F")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(250,247,242,0.3)")}>{l.label}</a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.57rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8A6D2F", opacity: 0.6, marginBottom: "14px" }}>Contact</div>
            {[{ href: WA_URL, icon: <IconWhatsApp size={13} />, label: "0882-0002-0979", ext: true },
              { href: IG_URL, icon: <IconInstagram size={13} />, label: "@dzikracomppublishers", ext: true },
              { href: `mailto:${EMAIL}`, icon: <IconEmail size={13} />, label: EMAIL, ext: false }].map((c) => (
              <a key={c.label} href={c.href} target={c.ext ? "_blank" : undefined} rel="noopener noreferrer" style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.76rem", color: "rgba(250,247,242,0.3)", textDecoration: "none", display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "10px", transition: "color 0.2s", wordBreak: "break-all" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#8A6D2F")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(250,247,242,0.3)")}>
                <span style={{ marginTop: "2px", flexShrink: 0 }}>{c.icon}</span>{c.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar with ornament */}
        <div style={{ marginBottom: "16px" }}>
          <OrnamentDivider opacity={0.1} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.66rem", color: "rgba(250,247,242,0.18)" }}>© 2026 DZIKRA. All rights reserved.</div>
          <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.66rem", color: "rgba(250,247,242,0.18)" }}>Premium Islamic Publishing · Rembang, Indonesia</div>
        </div>
      </div>
    </footer>
  );
}

// ─── FLOATING WHATSAPP ────────────────────────────────────────────
function FloatingWhatsApp() {
  return (
    <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
      <IconWhatsApp size={26} />
    </a>
  );
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────
function ScrollRevealInit() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
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
