"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export function BookGallery({ images, title, sizes }: { images?: string[]; title: string; sizes?: string }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const photos = images ?? [];
  if (!photos.length) return <div className="cover-placeholder"><span>Foto kitab<br/>akan hadir</span></div>;
  const index = Math.min(active, photos.length - 1);
  const scrollTo = (nextIndex: number) => {
    const track = trackRef.current;
    if (!track) return;
    const safeIndex = (nextIndex + photos.length) % photos.length;
    track.scrollTo({ left: track.clientWidth * safeIndex, behavior: "smooth" });
    setActive(safeIndex);
  };
  const move = (step: number) => scrollTo(index + step);
  const updateActiveFromScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const nextIndex = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
    setActive(current => current === nextIndex ? current : Math.min(nextIndex, photos.length - 1));
  };

  return <div className="gallery" aria-label={`Foto ${title}`}>
    <div className="gallery-track" ref={trackRef} onScroll={updateActiveFromScroll}>
      {photos.map((photo, photoIndex) => <div className="gallery-slide" key={photo + photoIndex}>
        <Image src={photo} alt={`${title}, foto ${photoIndex + 1}`} fill unoptimized sizes={sizes ?? "(max-width: 700px) 85vw, 40vw"}/>
      </div>)}
    </div>
    {photos.length > 1 && <>
      <button className="gallery-prev" aria-label="Foto sebelumnya" onClick={() => move(-1)}>←</button>
      <button className="gallery-next" aria-label="Foto berikutnya" onClick={() => move(1)}>→</button>
      <div className="gallery-dots">{photos.map((_, photoIndex) => <button className={photoIndex === index ? "active" : ""} key={photoIndex} aria-label={`Lihat foto ${photoIndex + 1}`} onClick={() => scrollTo(photoIndex)}/>)}</div>
      <p className="gallery-counter" aria-live="polite">{index + 1}/{photos.length}</p>
    </>}
  </div>;
}
