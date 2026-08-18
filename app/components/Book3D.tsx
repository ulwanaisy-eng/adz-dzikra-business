"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Book3D
 * -------------------------------------------------------------------------
 * Interactive CSS-3D representation of the physical Riyadhussalihin cover.
 * Built from three source textures cropped from the single print-ready
 * cover artwork (front / spine / back), composed into a real 3D box using
 * CSS transforms (no WebGL / three.js) so it can tilt, float and react to
 * the cursor like a premium physical object.
 *
 * Proportions:
 *  - Front & back cover faces use the book's true trim ratio (A5, 148×210mm)
 *  - Spine thickness uses the true physical ratio from the book spec (±35mm)
 *  - Pages (fore-edge) & top/bottom edges are pure CSS — no image needed
 */

const FRONT_ASPECT = 1289 / 900; // height / width, from the cropped front-cover art
const THICKNESS_RATIO = 35 / 148; // spine thickness relative to trim width, per book spec
const MAX_TILT = 10; // degrees — keep subtle & premium, never "spinning card"

interface Book3DProps {
  onClick: () => void;
  /** Optional caption shown under the book (defaults to the existing hero copy) */
  caption?: string;
  className?: string;
}

export default function Book3D({ onClick, caption = "Click to view details →", className = "" }: Book3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 18, mass: 0.6 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      rotateY.set((px - 0.5) * 2 * MAX_TILT);
      rotateX.set(-(py - 0.5) * 2 * MAX_TILT);
    },
    [rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  }, [rotateX, rotateY]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        ref={containerRef}
        role="button"
        tabIndex={0}
        aria-label="View Riyadhussalihin book details"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className="relative select-none cursor-pointer outline-none [--book-w:200px] sm:[--book-w:250px] lg:[--book-w:300px]"
        style={{
          perspective: "1800px",
          // Derived box dimensions, all driven off --book-w so the whole
          // object stays perfectly proportional at every breakpoint.
          ["--book-h" as string]: `calc(var(--book-w) * ${FRONT_ASPECT})`,
          ["--book-t" as string]: `calc(var(--book-w) * ${THICKNESS_RATIO})`,
        }}
      >
        {/* Ambient contact shadow */}
        <motion.div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-black blur-2xl pointer-events-none"
          style={{ bottom: "-8%", width: "72%", height: "24px" }}
          animate={{ opacity: hovered ? 0.5 : 0.32, scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Idle float + cursor tilt + hover scale — Framer composes all transform
            sub-properties (y, rotateX, rotateY, scale) into one transform automatically */}
        <motion.div
          style={{
            transformStyle: "preserve-3d",
            rotateX: springRotateX,
            rotateY: springRotateY,
            width: "var(--book-w)",
            height: "var(--book-h)",
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.045 }}
          className="relative mx-auto"
        >
          {/* FRONT COVER */}
          <div
            className="absolute inset-0 rounded-[3px] overflow-hidden"
            style={{
              transform: "translateZ(calc(var(--book-t) / 2))",
              backgroundImage: "url(/book/front-cover.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow:
                "inset 2px 0 0 rgba(0,0,0,0.18), inset -1px 0 0 rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.55), -8px 8px 30px rgba(200,165,86,0.12)",
            }}
          >
            {/* Static soft sheen */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 26%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.06) 100%)",
                mixBlendMode: "overlay",
              }}
            />
            {/* Hover shimmer sweep */}
            <motion.div
              aria-hidden
              className="absolute inset-y-0 pointer-events-none"
              style={{
                width: "40%",
                background:
                  "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.22) 45%, transparent 100%)",
                transform: "skewX(-18deg)",
              }}
              initial={{ x: "-160%", opacity: 0 }}
              animate={hovered ? { x: "220%", opacity: 1 } : { x: "-160%", opacity: 0 }}
              transition={{ duration: 0.85, ease: "easeInOut" }}
            />
          </div>

          {/* BACK COVER */}
          <div
            className="absolute inset-0 rounded-[3px] overflow-hidden"
            style={{
              transform: "rotateY(180deg) translateZ(calc(var(--book-t) / 2))",
              backgroundImage: "url(/book/back-cover.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)",
            }}
          />

          {/* SPINE (left edge) */}
          <div
            className="absolute top-0 left-0 rounded-l-[3px] overflow-hidden"
            style={{
              width: "var(--book-t)",
              height: "var(--book-h)",
              transform: "translateX(calc(var(--book-t) * -0.5)) rotateY(-90deg)",
              backgroundImage: "url(/book/spine.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "inset -3px 0 6px rgba(0,0,0,0.4)",
            }}
          />

          {/* PAGES (right / fore-edge) — pure CSS, no image needed */}
          <div
            className="absolute top-0 right-0 rounded-r-[2px] overflow-hidden"
            style={{
              width: "var(--book-t)",
              height: "var(--book-h)",
              transform: "translateX(calc(var(--book-t) * 0.5)) rotateY(90deg)",
              background:
                "repeating-linear-gradient(180deg, #F2E8CC 0px, #F2E8CC 2px, #DECBA0 2px, #DECBA0 3px)",
              boxShadow: "inset 6px 0 10px rgba(0,0,0,0.25), inset -2px 0 4px rgba(0,0,0,0.15)",
            }}
          />

          {/* TOP EDGE */}
          <div
            className="absolute top-0 left-0"
            style={{
              width: "var(--book-w)",
              height: "var(--book-t)",
              transform: "translateY(calc(var(--book-t) * -0.5)) rotateX(90deg)",
              background: "linear-gradient(180deg, #EADFBB, #D9C79A)",
              boxShadow: "inset 0 -4px 8px rgba(0,0,0,0.2)",
            }}
          />

          {/* BOTTOM EDGE */}
          <div
            className="absolute bottom-0 left-0"
            style={{
              width: "var(--book-w)",
              height: "var(--book-t)",
              transform: "translateY(calc(var(--book-t) * 0.5)) rotateX(-90deg)",
              background: "linear-gradient(180deg, #D9C79A, #C9B586)",
              boxShadow: "inset 0 4px 8px rgba(0,0,0,0.25)",
            }}
          />
        </motion.div>

        {/* Floating PRE-ORDER chip — overlay only, artwork itself is untouched.
            Kept outside the 3D/preserve-3d group so it never gets clipped by
            perspective or ancestor overflow, but still tracks hover state. */}
        <motion.div
          className="absolute pointer-events-none flex flex-col items-end"
          style={{ right: "2%", bottom: "6%" }}
          animate={{ y: hovered ? -3 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="badge-po shadow-lg">PRE-ORDER</div>
          <div
            className="mt-1"
            style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "var(--gold-bright)", textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
          >
            Rp 199.999
          </div>
        </motion.div>
      </div>

      {caption && (
        <div
          className="text-center mt-3"
          style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.65rem", color: "var(--gold-muted)", opacity: 0.6 }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}
