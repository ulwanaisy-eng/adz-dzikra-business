"use client";

import Image from "next/image";
import { Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import styles from "./dzikra-hero-opening.module.css";

type HeroMotion = {
  sequence: number;
  portal: number;
};

function useHeroPreferences() {
  const [preferences, setPreferences] = useState({ reduced: false, compact: false });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 767px)");
    const update = () => setPreferences({ reduced: reduced.matches, compact: compact.matches });
    update();
    reduced.addEventListener("change", update);
    compact.addEventListener("change", update);
    return () => {
      reduced.removeEventListener("change", update);
      compact.removeEventListener("change", update);
    };
  }, []);

  return preferences;
}

function smooth(from: number, to: number, value: number) {
  return THREE.MathUtils.smoothstep(value, from, to);
}

function createKayonShape() {
  const path = new THREE.Shape();

  // Original, abstract Kayon silhouette. It is inspired by the stage-opening
  // role of a gunungan, not traced from a traditional artwork.
  path.moveTo(0, 1.82);
  path.bezierCurveTo(0.22, 1.54, 0.76, 1.2, 1.02, 0.74);
  path.bezierCurveTo(1.18, 0.42, 0.86, 0.05, 0.78, -0.28);
  path.bezierCurveTo(0.99, -0.68, 0.86, -1.08, 0.57, -1.42);
  path.bezierCurveTo(0.34, -1.68, 0.12, -1.62, 0, -1.45);
  path.bezierCurveTo(-0.12, -1.62, -0.34, -1.68, -0.57, -1.42);
  path.bezierCurveTo(-0.86, -1.08, -0.99, -0.68, -0.78, -0.28);
  path.bezierCurveTo(-0.86, 0.05, -1.18, 0.42, -1.02, 0.74);
  path.bezierCurveTo(-0.76, 1.2, -0.22, 1.54, 0, 1.82);
  path.closePath();
  return path;
}

function KayonShape() {
  const shape = useMemo(createKayonShape, []);

  const settings = useMemo<THREE.ExtrudeGeometryOptions>(
    () => ({
      depth: 0.17,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.035,
      bevelThickness: 0.05,
      curveSegments: 22,
    }),
    [],
  );

  return (
    <mesh castShadow receiveShadow>
      <extrudeGeometry args={[shape, settings]} />
      <meshPhysicalMaterial
        color="#0b4447"
        emissive="#0a2b2b"
        emissiveIntensity={0.58}
        metalness={0.6}
        roughness={0.27}
        clearcoat={0.45}
        clearcoatRoughness={0.24}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function KayonOutline() {
  const points = useMemo(() => {
    const contour = createKayonShape().getSpacedPoints(96);
    return [...contour, contour[0]].map((point) => new THREE.Vector3(point.x, point.y, 0.245));
  }, []);

  return <Line points={points} color="#f4cf75" lineWidth={1.15} transparent opacity={0.8} depthWrite={false} toneMapped={false} />;
}

function GoldRule({
  position,
  length,
  rotation = 0,
  thickness = 0.024,
}: {
  position: [number, number, number];
  length: number;
  rotation?: number;
  thickness?: number;
}) {
  return (
    <mesh position={position} rotation={[0, 0, rotation]}>
      <boxGeometry args={[length, thickness, 0.027]} />
      <meshBasicMaterial color="#f4cf75" transparent opacity={0.92} toneMapped={false} />
    </mesh>
  );
}

function KayonDoor() {
  return (
    <group>
      <KayonShape />
      <KayonOutline />
      <group position={[0, 0.02, 0.225]}>
        <GoldRule position={[0, -0.18, 0]} length={1.82} rotation={Math.PI / 2} />
        <GoldRule position={[0, -0.34, 0]} length={1.03} />
        <GoldRule position={[-0.34, 0.2, 0]} length={0.89} rotation={-0.86} />
        <GoldRule position={[0.34, 0.2, 0]} length={0.89} rotation={0.86} />
        <GoldRule position={[-0.38, -0.84, 0]} length={0.8} rotation={0.72} />
        <GoldRule position={[0.38, -0.84, 0]} length={0.8} rotation={-0.72} />
        <GoldRule position={[0, 0.82, 0]} length={0.66} rotation={Math.PI / 2} thickness={0.016} />
        <GoldRule position={[-0.52, 0.62, 0]} length={0.44} rotation={0.96} thickness={0.016} />
        <GoldRule position={[0.52, 0.62, 0]} length={0.44} rotation={-0.96} thickness={0.016} />
        <mesh position={[0, 0.36, 0]}>
          <octahedronGeometry args={[0.13, 0]} />
          <meshStandardMaterial color="#f5d889" emissive="#785111" emissiveIntensity={0.7} metalness={0.92} roughness={0.16} />
        </mesh>
        <mesh position={[0, -0.34, 0]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color="#f5d889" emissive="#785111" emissiveIntensity={0.9} metalness={0.92} roughness={0.16} />
        </mesh>
      </group>
    </group>
  );
}

function Dust({ motion, enabled }: { motion: React.MutableRefObject<HeroMotion>; enabled: boolean }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(132 * 3);
    for (let index = 0; index < 132; index += 1) {
      const seed = index * 97.37;
      values[index * 3] = Math.sin(seed) * 5.2;
      values[index * 3 + 1] = ((index % 19) / 18 - 0.5) * 5.8;
      values[index * 3 + 2] = Math.cos(seed * 1.31) * 2.8 - 0.4;
    }
    return values;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    const warm = smooth(0.33, 0.47, motion.current.sequence);
    const portal = motion.current.portal;
    points.current.rotation.y = state.clock.elapsedTime * 0.018;
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.17) * 0.07;
    const material = points.current.material as THREE.PointsMaterial;
    material.opacity = enabled ? (0.11 + warm * 0.48) * (1 - portal * 0.32) : 0;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#efd58d"
        size={0.034}
        sizeAttenuation
        transparent
        opacity={0}
        depthWrite={false}
      />
    </points>
  );
}

function HeroWorld({
  motion,
  reduced,
  compact,
  showKayon,
}: {
  motion: React.MutableRefObject<HeroMotion>;
  reduced: boolean;
  compact: boolean;
  showKayon: boolean;
}) {
  const rig = useRef<THREE.Group>(null);
  const leftDoor = useRef<THREE.Group>(null);
  const rightDoor = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    const sequence = reduced ? 1 : motion.current.sequence;
    const portal = reduced ? 0 : motion.current.portal;
    const swayProgress = THREE.MathUtils.clamp((sequence - 0.165) / 0.17, 0, 1);
    const sway = Math.sin(swayProgress * Math.PI * 6) * (1 - swayProgress * 0.42) * 0.15;
    const openedByIntro = smooth(0.42, 0.59, sequence);
    const open = Math.max(openedByIntro, portal * 0.92);
    const warm = smooth(0.32, 0.46, sequence);
    const breath = sequence > 0.72 ? Math.sin(state.clock.elapsedTime * 0.72) * 0.035 : 0;

    if (rig.current) {
      const pointerStrength = sequence > 0.58 && !reduced ? 1 : 0;
      rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, state.pointer.x * 0.045 * pointerStrength, 4.2, delta);
      rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -state.pointer.y * 0.025 * pointerStrength, 4.2, delta);
    }

    if (leftDoor.current && rightDoor.current) {
      const doorScale = THREE.MathUtils.lerp(1.64, 0.9, openedByIntro);
      leftDoor.current.position.x = THREE.MathUtils.lerp(-1.02, -2.04, open) - portal * 0.72;
      rightDoor.current.position.x = THREE.MathUtils.lerp(1.02, 2.04, open) + portal * 0.72;
      leftDoor.current.scale.set(doorScale, doorScale * 0.99, 1);
      rightDoor.current.scale.set(doorScale, doorScale * 0.99, 1);
      leftDoor.current.position.y = breath;
      rightDoor.current.position.y = -breath;
      leftDoor.current.rotation.z = sway - open * 0.075 - portal * 0.08;
      rightDoor.current.rotation.z = -sway + open * 0.075 + portal * 0.08;
      leftDoor.current.rotation.y = open * 0.18 + portal * 0.14;
      rightDoor.current.rotation.y = -open * 0.18 - portal * 0.14;
    }

    if (halo.current) {
      const scale = 0.3 + warm * 0.48 + portal * 1.65 + breath;
      halo.current.scale.setScalar(scale);
      halo.current.rotation.z = state.clock.elapsedTime * 0.017;
    }

    if (light.current) {
      light.current.intensity = 0.25 + warm * 25 + portal * 26 + breath * 5;
    }

    const camera = state.camera as THREE.PerspectiveCamera;
    camera.position.z = THREE.MathUtils.lerp(7.1, 5.72, open) - portal * 2.75;
    camera.fov = THREE.MathUtils.lerp(34, 30, open) + portal * 8;
    camera.updateProjectionMatrix();
  });

  return (
    <>
      <fogExp2 attach="fog" args={["#041a1e", 0.08]} />
      <ambientLight color="#a6c6b8" intensity={0.72} />
      <directionalLight position={[2.7, 3.6, 4.4]} color="#fff0ba" intensity={2.1} />
      <pointLight ref={light} position={[0, 0.25, -0.6]} color="#e6b75d" intensity={0.4} distance={11} />
      <pointLight position={[-3.4, -1.5, 3]} color="#1e7875" intensity={5.1} distance={8} />

      {showKayon && (
        <>
          <group ref={halo} position={[0, 0.12, -0.74]}>
            <mesh>
              <circleGeometry args={[1.42, 48]} />
              <meshBasicMaterial color="#e7b95e" transparent opacity={0.14} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            <mesh position={[0, 0, -0.03]} scale={0.68}>
              <circleGeometry args={[1.42, 48]} />
              <meshBasicMaterial color="#fff0b5" transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
          </group>

          <group ref={rig}>
            <group ref={leftDoor} position={[-1.02, -0.08, 0.2]} scale={[1.64, 1.62, 1]}>
              <KayonDoor />
            </group>
            <group ref={rightDoor} position={[1.02, -0.08, 0.16]} scale={[1.64, 1.62, 1]}>
              <KayonDoor />
            </group>
          </group>
        </>
      )}

      <Dust motion={motion} enabled={!reduced} />
    </>
  );
}

export function DzikraHeroOpening() {
  const rootRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const gununganFilmRef = useRef<HTMLVideoElement | null>(null);
  const gununganStillRef = useRef<HTMLDivElement | null>(null);
  const gununganFilmEndedRef = useRef(false);
  const gununganPlaybackRejectedRef = useRef(false);
  const portalCopyRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const wordmarkRef = useRef<HTMLDivElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const cueRef = useRef<HTMLParagraphElement | null>(null);
  const introTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const motion = useRef<HeroMotion>({ sequence: 0, portal: 0 });
  const [inViewport, setInViewport] = useState(true);
  const [gununganFilmFailed, setGununganFilmFailed] = useState(false);
  const { reduced, compact } = useHeroPreferences();
  const gununganDesktopFilmSrc = "/cinematic/dzikra-gunungan-opening.mp4";
  const gununganMobileFilmSrc = "/cinematic/dzikra-gunungan-opening-mobile-lite.mp4";

  const attemptGununganPlayback = () => {
    const video = gununganFilmRef.current;
    if (!video || gununganFilmFailed || !inViewport || gununganFilmEndedRef.current) return;

    // Mobile browsers only allow muted, inline media to start without a tap.
    // Set the DOM properties as well as JSX attributes immediately before play.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    void video.play()
      .then(() => {
        gununganPlaybackRejectedRef.current = false;
      })
      .catch(() => {
        // The film remains mounted. A loaded-data event or the first genuine
        // scroll/touch will retry once the browser grants a media gesture.
        gununganPlaybackRejectedRef.current = true;
      });
  };

  useEffect(() => {
    if (!rootRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = gununganFilmRef.current;
    if (!video || gununganFilmFailed) return;

    if (inViewport && !gununganFilmEndedRef.current) {
      attemptGununganPlayback();
    } else {
      video.pause();
    }
  }, [gununganFilmFailed, inViewport]);

  useEffect(() => {
    const video = gununganFilmRef.current;
    gununganFilmEndedRef.current = false;

    if (!video || gununganFilmFailed) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    video.load();
    attemptGununganPlayback();
  }, [gununganFilmFailed]);

  useEffect(() => {
    const retryAfterGesture = () => {
      if (gununganPlaybackRejectedRef.current) attemptGununganPlayback();
    };

    // This is a fallback only after a rejected autoplay promise; it does not
    // issue play() during ordinary scrolling.
    window.addEventListener("touchstart", retryAfterGesture, { passive: true });
    window.addEventListener("pointerdown", retryAfterGesture, { passive: true });
    window.addEventListener("scroll", retryAfterGesture, { passive: true });

    return () => {
      window.removeEventListener("touchstart", retryAfterGesture);
      window.removeEventListener("pointerdown", retryAfterGesture);
      window.removeEventListener("scroll", retryAfterGesture);
    };
  }, [gununganFilmFailed, inViewport]);

  useLayoutEffect(() => {
    if (!rootRef.current || !stageRef.current || reduced) return;

    const root = rootRef.current;
    const stage = stageRef.current;
    const gununganVisual = gununganFilmFailed ? gununganStillRef.current : gununganFilmRef.current;
    gsap.registerPlugin(ScrollTrigger);
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const configureMobileResizeHandling = () => {
      // Do not let mobile browser-chrome resize events recalculate this pin.
      // It is deliberately scoped to touch-only, narrow viewports; desktop is
      // left with ScrollTrigger's normal resize behavior.
      ScrollTrigger.config({
        ignoreMobileResize: ScrollTrigger.isTouch === 1 && mobileQuery.matches,
      });
    };
    configureMobileResizeHandling();
    mobileQuery.addEventListener("change", configureMobileResizeHandling);
    const context = gsap.context(() => {
      const revealTargets = [navRef.current, eyebrowRef.current, wordmarkRef.current, taglineRef.current, cueRef.current]
        .filter((target): target is HTMLElement => Boolean(target));

      gsap.set(gununganVisual, { autoAlpha: 1, scale: 1.16, transformOrigin: "50% 50%" });
      gsap.set(revealTargets, { autoAlpha: 0, y: 12 });
      gsap.set(wordmarkRef.current, { scale: 0.94 });
      const intro = gsap.timeline();
      const revealAt = compact
        ? { nav: 0.18, eyebrow: 0.28, wordmark: 0.44, tagline: 0.72, cue: 1.05 }
        : { nav: 7.04, eyebrow: 7.1, wordmark: 7.34, tagline: 7.82, cue: 10.25 };
      intro
        .to(motion.current, { sequence: 1, duration: compact ? 1.2 : 12, ease: "none" }, 0)
        .to(navRef.current, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, revealAt.nav)
        .to(eyebrowRef.current, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" }, revealAt.eyebrow)
        .to(wordmarkRef.current, { autoAlpha: 1, y: 0, scale: 1, duration: 0.72, ease: "power3.out" }, revealAt.wordmark)
        .to(taglineRef.current, { autoAlpha: 1, y: 0, duration: 0.56, ease: "power2.out" }, revealAt.tagline)
        .to(cueRef.current, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, revealAt.cue);
      introTimelineRef.current = intro;

      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => "+=" + Math.round(window.innerHeight * 1.18),
          pin: stage,
          scrub: 0.72,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (trigger) => {
            if (trigger.progress > 0.012 && introTimelineRef.current && introTimelineRef.current.progress() < 0.62) {
              introTimelineRef.current.pause().progress(0.62);
            }

          },
        },
      })
        .to(motion.current, { portal: 1, duration: 1 }, 0)
        .to(portalCopyRef.current, { autoAlpha: 0, scale: 0.72, y: -20, duration: 0.65 }, 0.06)
        .to(gununganVisual, { scale: 1.34, filter: "saturate(.8) contrast(1.06) brightness(.56)", duration: 0.78 }, 0)
        .to(stage, { backgroundColor: "#071f24", duration: 0.28 }, 0.72);
    }, root);

    return () => {
      mobileQuery.removeEventListener("change", configureMobileResizeHandling);
      context.revert();
    };
  }, [compact, gununganFilmFailed, reduced]);

  const motionMode = reduced ? "reduced" : compact ? "compact" : "full";
  const frameLoop = inViewport && !reduced ? "always" : "demand";

  return (
    <section
      ref={rootRef}
      id="top"
      className={styles.hero}
      data-motion={motionMode}
      aria-label="Pembukaan Dzikra"
    >
      <div ref={stageRef} className={styles.stage}>
        <div ref={gununganStillRef} className={styles.gununganStill} aria-hidden="true" />
        {!gununganFilmFailed && (
          <video
            ref={gununganFilmRef}
            className={styles.gununganFilm}
            poster="/cinematic/dzikra-gunungan-mobile-still.png"
            muted
            autoPlay
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            onLoadedData={(event) => {
              const video = event.currentTarget;
              video.muted = true;
              video.defaultMuted = true;
              video.playsInline = true;
              attemptGununganPlayback();
            }}
            onCanPlay={(event) => {
              const video = event.currentTarget;
              video.muted = true;
              video.defaultMuted = true;
              video.playsInline = true;
              attemptGununganPlayback();
            }}
            onEnded={() => {
              // Freeze the final frame of the real gunungan film. The logo
              // reveal is driven by the same intro timeline, so there is no
              // second/fake gunungan layer competing with the source video.
              gununganFilmEndedRef.current = true;
            }}
            onError={() => setGununganFilmFailed(true)}
          >
            <source media="(max-width: 767px)" src={gununganMobileFilmSrc} type="video/mp4" />
            <source src={gununganDesktopFilmSrc} type="video/mp4" />
          </video>
        )}
        <div className={styles.canvas} aria-hidden="true">
          <Canvas
            camera={{ position: [0, 0, 7.1], fov: 34 }}
            dpr={compact ? [1, 1.1] : [1, 1.45]}
            frameloop={frameLoop}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          >
            <HeroWorld motion={motion} reduced={reduced} compact={compact} showKayon={gununganFilmFailed} />
          </Canvas>
        </div>
        <div className={styles.fog} aria-hidden="true" />
        <div className={styles.grain} aria-hidden="true" />
        <div className={styles.frame} aria-hidden="true" />

        <div ref={portalCopyRef} className={styles.portalCopy}>
          <nav ref={navRef} className={[styles.nav, "nav"].join(" ")}>
            <a className="wordmark" href="#top">
              <Image className="brand-symbol" src="/images/dzikra-logo.jpg" alt="Logo kaligrafi Dzikra" width={34} height={34} />
              DZIKRA<span>®</span>
            </a>
            <div>
              <a href="#tentang">Tentang</a>
              <a href="#koleksi">Koleksi</a>
              <a href="#pesan">Cara Pesan</a>
            </div>
          </nav>

          <div className={styles.copy}>
            <p ref={eyebrowRef} className={styles.eyebrow}>PENERBIT &amp; DISTRIBUTOR KITAB<br />SEJAK 1992</p>
            <div ref={wordmarkRef} className={styles.wordmark}>
              <Image src="/images/dzikra-logo.jpg" alt="" width={72} height={72} priority />
              <h1>DZIKRA</h1>
            </div>
            <p ref={taglineRef} className={styles.tagline}>Crafted with Amanah,<br />Designed for Comfort</p>
          </div>

          <p ref={cueRef} className={styles.cue} aria-hidden="true">
            <span>Mulai Perjalanan Dzikra</span><b>↓</b>
          </p>
        </div>
        <a className={styles.skip} href="#tentang">Lewati pembuka</a>
      </div>
    </section>
  );
}
