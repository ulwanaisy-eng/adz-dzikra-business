"use client";

import Image from "next/image";
import { useState } from "react";

export function BookGallery({ images, title }: { images?: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const photos = images ?? [];
  if (!photos.length) return <div className="cover-placeholder"><span>Foto kitab<br/>akan hadir</span></div>;
  const move = (step: number) => setActive(current => (current + step + photos.length) % photos.length);
  return <div className="gallery" aria-label={`Foto ${title}`}>
    <Image src={photos[active]} alt={`${title}, foto ${active + 1}`} fill sizes="(max-width: 700px) 85vw, 40vw"/>
    {photos.length > 1 && <><button className="gallery-prev" aria-label="Foto sebelumnya" onClick={() => move(-1)}>←</button><button className="gallery-next" aria-label="Foto berikutnya" onClick={() => move(1)}>→</button><div className="gallery-dots">{photos.map((_, index) => <button className={index === active ? "active" : ""} key={index} aria-label={`Lihat foto ${index + 1}`} onClick={() => setActive(index)}/>)}</div></>}
  </div>;
}
