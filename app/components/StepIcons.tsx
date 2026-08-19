"use client";

/**
 * StepIcons — four custom, looping SVG animations for the "How to Order"
 * section. Built with plain SVG + CSS keyframe animations (see globals.css,
 * "STEP ICON ANIMATIONS" block) rather than JS-driven animation, so the
 * rotation always pivots reliably around each shape's own visual center
 * (`transform-box: fill-box; transform-origin: center;`) and keeps running
 * smoothly with zero runtime cost.
 */

const GOLD = "var(--gold)";
const GOLD_MUTED = "var(--gold-muted)";
const NAVY = "var(--navy)";
const CREAM = "var(--cream-3)";

// ── 01 · BROWSE — a rotating globe inside a browser window, with a
//    slow orbiting satellite dot ────────────────────────────────────
export function IconBrowse({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Browser window frame */}
      <rect x="8" y="14" width="84" height="72" rx="6" stroke={GOLD_MUTED} strokeWidth="2" opacity="0.35" />
      <line x1="8" y1="30" x2="92" y2="30" stroke={GOLD_MUTED} strokeWidth="2" opacity="0.35" />
      <circle cx="17" cy="22" r="1.8" fill={GOLD_MUTED} opacity="0.5" />
      <circle cx="24" cy="22" r="1.8" fill={GOLD_MUTED} opacity="0.5" />
      <circle cx="31" cy="22" r="1.8" fill={GOLD_MUTED} opacity="0.5" />

      {/* Orbit ring + satellite dot */}
      <g className="icon-spin-slow">
        <ellipse cx="50" cy="58" rx="30" ry="10" stroke={GOLD} strokeWidth="1.4" strokeDasharray="3 4" opacity="0.55" />
        <circle cx="80" cy="58" r="2.4" fill={GOLD} />
      </g>

      {/* Globe */}
      <g className="icon-spin-med">
        <circle cx="50" cy="58" r="19" stroke={GOLD} strokeWidth="2" fill="rgba(200,165,86,0.06)" />
        <ellipse cx="50" cy="58" rx="19" ry="7" stroke={GOLD} strokeWidth="1.2" opacity="0.6" />
        <ellipse cx="50" cy="58" rx="8" ry="19" stroke={GOLD} strokeWidth="1.2" opacity="0.6" />
        <line x1="31" y1="58" x2="69" y2="58" stroke={GOLD} strokeWidth="1.2" opacity="0.6" />
      </g>
    </svg>
  );
}

// ── 02 · FILL FORM — a document with ruled lines, and a pencil that
//    repeatedly "writes" one line at a time ─────────────────────────
export function IconForm({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Paper */}
      <rect x="24" y="16" width="46" height="62" rx="3" fill="rgba(200,165,86,0.06)" stroke={GOLD_MUTED} strokeWidth="2" />
      <rect x="24" y="16" width="46" height="14" rx="3" fill="rgba(200,165,86,0.10)" />

      {/* Ruled text lines that "write themselves" in, one after another */}
      <line x1="31" y1="34" x2="63" y2="34" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" className="icon-write-32" style={{ animationDelay: "0s" }} />
      <line x1="31" y1="44" x2="63" y2="44" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" className="icon-write-32" style={{ animationDelay: "0.55s" }} />
      <line x1="31" y1="54" x2="63" y2="54" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" className="icon-write-32" style={{ animationDelay: "1.1s" }} />
      <line x1="31" y1="64" x2="50" y2="64" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" className="icon-write-19" style={{ animationDelay: "1.65s" }} />

      {/* Pencil, bobbing as if writing across the lines */}
      <g className="icon-pencil">
        <g transform="translate(58, 46) rotate(45)">
          <rect x="-3" y="-16" width="6" height="22" rx="1.5" fill={GOLD} />
          <polygon points="-3,6 3,6 0,13" fill={GOLD_MUTED} />
          <rect x="-3" y="-16" width="6" height="5" rx="1.5" fill={CREAM} opacity="0.8" />
        </g>
      </g>
    </svg>
  );
}

// ── 03 · PAYMENT — a wallet with a coin ("Rp") popping out on a loop,
//    plus a small sparkle accent ────────────────────────────────────
export function IconPayment({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Wallet body */}
      <rect x="18" y="42" width="64" height="40" rx="6" fill="rgba(200,165,86,0.08)" stroke={GOLD_MUTED} strokeWidth="2" />
      <path d="M18 52 L18 48 Q18 42 24 42 L70 42 Q76 42 76 48" stroke={GOLD_MUTED} strokeWidth="2" fill="none" />
      <rect x="60" y="56" width="18" height="14" rx="3" fill={NAVY} stroke={GOLD} strokeWidth="1.6" />
      <circle cx="66" cy="63" r="2" fill={GOLD} />

      {/* Coins popping out, looping upward with fade */}
      <g className="icon-coin" style={{ animationDelay: "0s" }}>
        <circle cx="34" cy="40" r="8" fill="var(--navy-deep)" stroke={GOLD} strokeWidth="1.6" />
        <text x="34" y="43.5" textAnchor="middle" fontSize="7" fontFamily="Georgia, serif" fill={GOLD}>Rp</text>
      </g>
      <g className="icon-coin" style={{ animationDelay: "0.7s" }}>
        <circle cx="42" cy="40" r="8" fill="var(--navy-deep)" stroke={GOLD} strokeWidth="1.6" />
        <text x="42" y="43.5" textAnchor="middle" fontSize="7" fontFamily="Georgia, serif" fill={GOLD}>Rp</text>
      </g>
      <g className="icon-coin" style={{ animationDelay: "1.4s" }}>
        <circle cx="50" cy="40" r="8" fill="var(--navy-deep)" stroke={GOLD} strokeWidth="1.6" />
        <text x="50" y="43.5" textAnchor="middle" fontSize="7" fontFamily="Georgia, serif" fill={GOLD}>Rp</text>
      </g>

      {/* Sparkle accent */}
      <path
        className="icon-sparkle"
        style={{ animationDelay: "0.3s" }}
        d="M50 20 l1.6 4.4 4.4 1.6 -4.4 1.6 -1.6 4.4 -1.6 -4.4 -4.4 -1.6 4.4 -1.6 z"
        fill={GOLD}
      />
    </svg>
  );
}

// ── 04 · DELIVERY — a delivery truck with spinning wheels and moving
//    speed lines beneath it, as if driving ──────────────────────────
export function IconDelivery({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Truck body */}
      <rect x="14" y="38" width="42" height="26" rx="3" fill="rgba(200,165,86,0.08)" stroke={GOLD} strokeWidth="2" />
      <path d="M56 46 H72 L80 56 V64 H56 Z" fill="rgba(200,165,86,0.08)" stroke={GOLD} strokeWidth="2" strokeLinejoin="round" />
      <rect x="63" y="50" width="8" height="7" rx="1" fill={GOLD_MUTED} opacity="0.7" />
      <line x1="14" y1="48" x2="56" y2="48" stroke={GOLD_MUTED} strokeWidth="1.2" opacity="0.5" />

      {/* Wheels — continuous spin, each pivoting on its own center */}
      <g className="icon-wheel-spin">
        <circle cx="28" cy="68" r="7" fill="var(--navy-deep)" stroke={GOLD} strokeWidth="2" />
        <line x1="28" y1="62" x2="28" y2="74" stroke={GOLD} strokeWidth="1.4" />
        <line x1="22" y1="68" x2="34" y2="68" stroke={GOLD} strokeWidth="1.4" />
      </g>
      <g className="icon-wheel-spin">
        <circle cx="70" cy="68" r="7" fill="var(--navy-deep)" stroke={GOLD} strokeWidth="2" />
        <line x1="70" y1="62" x2="70" y2="74" stroke={GOLD} strokeWidth="1.4" />
        <line x1="64" y1="68" x2="76" y2="68" stroke={GOLD} strokeWidth="1.4" />
      </g>

      {/* Speed lines sweeping right-to-left beneath the truck */}
      <line x1="88" y1="78" x2="96" y2="78" stroke={GOLD_MUTED} strokeWidth="2" strokeLinecap="round" className="icon-speedline" style={{ animationDelay: "0s" }} />
      <line x1="88" y1="74" x2="96" y2="74" stroke={GOLD_MUTED} strokeWidth="2" strokeLinecap="round" className="icon-speedline" style={{ animationDelay: "0.25s" }} />
      <line x1="88" y1="70" x2="96" y2="70" stroke={GOLD_MUTED} strokeWidth="2" strokeLinecap="round" className="icon-speedline" style={{ animationDelay: "0.5s" }} />
    </svg>
  );
}
