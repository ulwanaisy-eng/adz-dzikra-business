"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Objects({ stage }: { stage: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (group.current) group.current.rotation.y += delta * 0.18; });
  return <group ref={group}>
    {stage === 0 && <Float><mesh rotation={[0, 0, Math.PI]}><coneGeometry args={[1.8, 3.6, 5]} /><meshStandardMaterial color="#b9913d" metalness={.55} roughness={.28}/></mesh></Float>}
    {stage === 1 && <><mesh position={[0,-1.1,0]}><boxGeometry args={[3.8,.22,2.3]}/><meshStandardMaterial color="#7d4b2c"/></mesh><mesh position={[0,-.75,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[2.1,1.35]}/><meshStandardMaterial color="#eadfc9"/></mesh><mesh position={[.75,-.4,.2]} rotation={[0,0,-.5]}><cylinderGeometry args={[.05,.05,1.5]}/><meshStandardMaterial color="#c19640"/></mesh></>}
    {stage === 2 && <><mesh position={[0,-1.1,0]}><boxGeometry args={[3.8,.22,2.3]}/><meshStandardMaterial color="#163b3f"/></mesh><mesh position={[0,.25,0]}><boxGeometry args={[2.4,1.55,.18]}/><meshStandardMaterial color="#10272b"/></mesh><mesh position={[0,.25,.11]}><planeGeometry args={[2.05,1.22]}/><meshStandardMaterial color="#d5b75b" emissive="#5c4818"/></mesh><mesh position={[0,-.65,0]}><boxGeometry args={[.18,.75,.18]}/><meshStandardMaterial color="#b9913d"/></mesh></>}
    {stage === 3 && <><mesh position={[0,-.8,0]}><boxGeometry args={[3.3,1.4,2.2]}/><meshStandardMaterial color="#193b3d" metalness={.35}/></mesh><mesh position={[0,.15,1.13]}><boxGeometry args={[2.6,.18,.9]}/><meshStandardMaterial color="#eee1c5"/></mesh><mesh position={[0,.35,.2]}><boxGeometry args={[1.2,1.7,.5]}/><meshStandardMaterial color="#c1913a"/></mesh></>}
    {stage === 4 && <Float floatIntensity={.65}><group rotation={[.15,-.4,.1]}><mesh position={[0,0,0]}><boxGeometry args={[2.3,3.05,.5]}/><meshStandardMaterial color="#13373b"/></mesh><mesh position={[0,0,.27]}><boxGeometry args={[1.98,2.73,.03]}/><meshStandardMaterial color="#c1943d" metalness={.25}/></mesh></group></Float>}
  </group>;
}

const scenes = [["PEMBUKAAN","Gunungan membuka perjalanan"],["1992","Menulis dengan ketelitian"],["2010","Tradisi bertemu teknologi"],["PRODUKSI","Layout, koreksi, cetak"],["30+ TAHUN","Amanah menjadi fondasi"]];
export function DzikraStory() {
  const ref = useRef<HTMLElement>(null); const [stage,setStage]=useState(0);
  useEffect(()=>{const onScroll=()=>{const el=ref.current;if(!el)return;const p=Math.min(.999,Math.max(0,(innerHeight-el.getBoundingClientRect().top)/el.offsetHeight));setStage(Math.floor(p*5));};onScroll();addEventListener("scroll",onScroll,{passive:true});return()=>removeEventListener("scroll",onScroll);},[]);
  return <section ref={ref} className="three-story" id="tentang"><div className="three-sticky"><Canvas camera={{position:[0,0,6],fov:42}} dpr={[1,1.5]}><color attach="background" args={["#082329"]}/><ambientLight intensity={.7}/><spotLight position={[4,5,4]} intensity={180} color="#d5b75b"/><pointLight position={[-3,0,2]} intensity={35} color="#9a4e33"/><Stars radius={20} depth={12} count={500} factor={2}/><Objects stage={stage}/><OrbitControls enablePan={false} minDistance={4} maxDistance={8}/></Canvas><div className="three-copy"><p className="eyebrow">{scenes[stage][0]}</p><h2>{scenes[stage][1]}</h2><p>Scroll untuk menyusuri sejarah Dzikra · tarik objek untuk melihatnya dari sudut lain.</p></div><div className="three-progress">{scenes.map((_,i)=><i className={i===stage?"active":""} key={i}/>)}</div></div></section>;
}
