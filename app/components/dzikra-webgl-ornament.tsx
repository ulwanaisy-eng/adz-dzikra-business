"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type DzikraWebglOrnamentProps = {
  /** Lets the hero control the footprint without coupling this accent to its CSS. */
  className?: string;
};

function useReducedMotion() {
  // Start in the safest state: the scene only begins to animate after the browser
  // has confirmed that the visitor has not requested reduced motion.
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(query.matches);
    syncPreference();
    query.addEventListener("change", syncPreference);
    return () => query.removeEventListener("change", syncPreference);
  }, []);

  return reducedMotion;
}

function GoldRule({
  position,
  length,
  rotation = 0,
  thickness = 0.025,
}: {
  position: [number, number, number];
  length: number;
  rotation?: number;
  thickness?: number;
}) {
  return (
    <mesh position={position} rotation={[0, 0, rotation]}>
      <boxGeometry args={[length, thickness, 0.026]} />
      <meshStandardMaterial color="#f5d784" emissive="#5e3f0d" emissiveIntensity={0.32} metalness={0.88} roughness={0.21} />
    </mesh>
  );
}

function GununganForm() {
  const silhouette = useMemo(() => {
    const shape = new THREE.Shape();

    // A simplified, original gunungan-inspired outline. It is intentionally an
    // abstract ornament instead of a copied wayang artwork.
    shape.moveTo(0, 1.68);
    shape.bezierCurveTo(0.16, 1.43, 0.56, 1.11, 0.78, 0.7);
    shape.bezierCurveTo(0.96, 0.35, 0.7, 0.06, 0.6, -0.26);
    shape.bezierCurveTo(0.77, -0.66, 0.71, -1.01, 0.5, -1.33);
    shape.bezierCurveTo(0.35, -1.55, 0.13, -1.54, 0, -1.41);
    shape.bezierCurveTo(-0.13, -1.54, -0.35, -1.55, -0.5, -1.33);
    shape.bezierCurveTo(-0.71, -1.01, -0.77, -0.66, -0.6, -0.26);
    shape.bezierCurveTo(-0.7, 0.06, -0.96, 0.35, -0.78, 0.7);
    shape.bezierCurveTo(-0.56, 1.11, -0.16, 1.43, 0, 1.68);
    shape.closePath();

    return shape;
  }, []);

  const extrudeSettings = useMemo<THREE.ExtrudeGeometryOptions>(
    () => ({
      depth: 0.18,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.035,
      bevelThickness: 0.045,
      curveSegments: 28,
    }),
    [],
  );

  return (
    <group>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[silhouette, extrudeSettings]} />
        <meshPhysicalMaterial
          color="#c79937"
          emissive="#352006"
          emissiveIntensity={0.18}
          metalness={0.9}
          roughness={0.2}
          clearcoat={0.48}
          clearcoatRoughness={0.18}
        />
      </mesh>

      <group position={[0, 0.02, 0.235]}>
        <GoldRule position={[0, -0.2, 0]} length={1.7} rotation={Math.PI / 2} />
        <GoldRule position={[0, -0.32, 0]} length={0.9} />
        <GoldRule position={[-0.29, 0.19, 0]} length={0.8} rotation={-0.88} />
        <GoldRule position={[0.29, 0.19, 0]} length={0.8} rotation={0.88} />
        <GoldRule position={[-0.3, -0.8, 0]} length={0.72} rotation={0.73} />
        <GoldRule position={[0.3, -0.8, 0]} length={0.72} rotation={-0.73} />
        <GoldRule position={[0, 0.73, 0]} length={0.58} rotation={Math.PI / 2} thickness={0.019} />
        <mesh position={[0, 0.38, 0]}>
          <octahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial color="#f5d784" emissive="#6a470f" emissiveIntensity={0.5} metalness={0.92} roughness={0.17} />
        </mesh>
        <mesh position={[0, -0.32, 0]}>
          <sphereGeometry args={[0.052, 16, 16]} />
          <meshStandardMaterial color="#f5d784" emissive="#6a470f" emissiveIntensity={0.65} metalness={0.9} roughness={0.18} />
        </mesh>
      </group>
    </group>
  );
}

function KitabForm() {
  return (
    <group position={[1.32, -0.53, -0.22]} rotation={[0.04, -0.33, 0.09]}>
      <mesh position={[0, 0, -0.1]} castShadow>
        <boxGeometry args={[0.86, 1.28, 0.12]} />
        <meshStandardMaterial color="#9d7530" metalness={0.7} roughness={0.29} />
      </mesh>
      <mesh position={[0, 0, -0.01]} castShadow>
        <boxGeometry args={[0.79, 1.19, 0.13]} />
        <meshStandardMaterial color="#e2d4b5" metalness={0.05} roughness={0.76} />
      </mesh>
      <mesh position={[0, 0, 0.085]} castShadow>
        <boxGeometry args={[0.9, 1.34, 0.06]} />
        <meshPhysicalMaterial color="#123d3f" metalness={0.35} roughness={0.3} clearcoat={0.42} clearcoatRoughness={0.22} />
      </mesh>
      <GoldRule position={[0, 0.47, 0.126]} length={0.58} thickness={0.014} />
      <GoldRule position={[0, -0.47, 0.126]} length={0.58} thickness={0.014} />
      <GoldRule position={[-0.285, 0, 0.126]} length={0.92} rotation={Math.PI / 2} thickness={0.014} />
      <GoldRule position={[0.285, 0, 0.126]} length={0.92} rotation={Math.PI / 2} thickness={0.014} />
      <GoldRule position={[-0.47, 0, 0.04]} length={1.14} rotation={Math.PI / 2} thickness={0.028} />
      <mesh position={[0, 0, 0.13]}>
        <circleGeometry args={[0.075, 24]} />
        <meshStandardMaterial color="#d8ae4b" emissive="#573a0a" emissiveIntensity={0.42} metalness={0.87} roughness={0.18} />
      </mesh>
    </group>
  );
}

function OrnamentScene({ reducedMotion }: { reducedMotion: boolean }) {
  const rig = useRef<THREE.Group>(null);
  const gunungan = useRef<THREE.Group>(null);
  const kitab = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (reducedMotion || !rig.current || !gunungan.current || !kitab.current) return;

    const pointerRotationY = state.pointer.x * 0.17;
    const pointerRotationX = -state.pointer.y * 0.1;
    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, pointerRotationY, 5.5, delta);
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, pointerRotationX, 5.5, delta);

    const breath = Math.sin(state.clock.elapsedTime * 0.68) * 0.026;
    gunungan.current.position.y = breath;
    gunungan.current.rotation.z = THREE.MathUtils.damp(gunungan.current.rotation.z, -state.pointer.x * 0.035, 4.5, delta);
    kitab.current.position.y = -breath * 1.15;
    kitab.current.rotation.z = THREE.MathUtils.damp(kitab.current.rotation.z, 0.09 + state.pointer.x * 0.022, 4.5, delta);
  });

  return (
    <group ref={rig} position={[-0.14, -0.02, 0]} rotation={[-0.015, -0.08, 0]}>
      <group ref={gunungan} position={[-0.48, 0, 0]}>
        <GununganForm />
      </group>
      <group ref={kitab}>
        <KitabForm />
      </group>
    </group>
  );
}

/**
 * A small decorative WebGL object for the Dzikra hero.
 *
 * It purposefully stays independent from the cinematic-history film: no media,
 * product data, router dependencies, or global styles are required to render it.
 */
export function DzikraWebglOrnament({ className }: DzikraWebglOrnamentProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`dzikra-webgl-ornament${className ? ` ${className}` : ""}`} data-motion={reducedMotion ? "reduced" : "full"}>
      <div className="dzikra-webgl-ornament__gl" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0.04, 6.25], fov: 33 }}
          dpr={[1, 1.35]}
          frameloop={reducedMotion ? "never" : "always"}
          gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        >
          <ambientLight intensity={1.28} color="#fff3d5" />
          <directionalLight position={[2.8, 4.2, 4.8]} intensity={3.1} color="#ffe9ab" />
          <pointLight position={[-3.1, 0.9, 2.6]} intensity={15} distance={6.5} color="#d6a142" />
          <pointLight position={[2.2, -1.1, 2.2]} intensity={5.5} distance={4} color="#1f7877" />
          <OrnamentScene reducedMotion={reducedMotion} />
        </Canvas>
      </div>
      <span className="dzikra-webgl-ornament__halo" aria-hidden="true" />
      <p className="dzikra-webgl-ornament__note" aria-hidden="true">
        {reducedMotion ? "Ornamen Dzikra" : "Gerakkan penunjuk untuk melihat sudutnya"}
      </p>

      <style>{`
        .dzikra-webgl-ornament {
          position: relative;
          isolation: isolate;
          width: min(100%, 500px);
          min-width: 0;
          min-height: clamp(290px, 38vw, 500px);
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border: 1px solid rgba(235, 202, 119, .26);
          background:
            radial-gradient(circle at 48% 43%, rgba(216, 169, 65, .18), transparent 31%),
            radial-gradient(circle at 77% 69%, rgba(30, 115, 113, .27), transparent 38%),
            linear-gradient(142deg, #071d22, #0a2d31 58%, #07171b);
          box-shadow: inset 0 0 70px rgba(0, 0, 0, .24);
          touch-action: pan-y;
        }
        .dzikra-webgl-ornament::before,
        .dzikra-webgl-ornament::after {
          position: absolute;
          z-index: 2;
          content: "";
          pointer-events: none;
        }
        .dzikra-webgl-ornament::before {
          inset: 13px;
          border: 1px solid rgba(245, 215, 132, .3);
        }
        .dzikra-webgl-ornament::after {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: linear-gradient(90deg, rgba(3, 15, 18, .22), transparent 42%, rgba(3, 15, 18, .16)), linear-gradient(0deg, rgba(3, 15, 18, .34), transparent 45%);
        }
        .dzikra-webgl-ornament__gl {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .dzikra-webgl-ornament__gl > div,
        .dzikra-webgl-ornament__gl canvas {
          width: 100% !important;
          height: 100% !important;
          display: block;
        }
        .dzikra-webgl-ornament__halo {
          position: absolute;
          z-index: 0;
          width: 56%;
          aspect-ratio: 1;
          left: 19%;
          top: 19%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245, 207, 112, .17), rgba(245, 207, 112, 0) 69%);
          filter: blur(14px);
          pointer-events: none;
        }
        .dzikra-webgl-ornament__note {
          position: absolute;
          z-index: 3;
          right: 27px;
          bottom: 24px;
          left: 27px;
          margin: 0;
          color: rgba(253, 242, 214, .83);
          font: 500 9px/1.35 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          letter-spacing: .13em;
          text-transform: uppercase;
          text-align: center;
          pointer-events: none;
        }
        .dzikra-webgl-ornament[data-motion="full"] { cursor: crosshair; }
        @media (max-width: 680px) {
          .dzikra-webgl-ornament {
            width: min(100%, 420px);
            min-height: 300px;
            margin-inline: auto;
          }
          .dzikra-webgl-ornament::before { inset: 10px; }
          .dzikra-webgl-ornament__note { right: 18px; bottom: 17px; left: 18px; font-size: 8px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .dzikra-webgl-ornament { cursor: default; }
        }
      `}</style>
    </div>
  );
}
