"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./cinematic-history.module.css";

type FilmScene = {
  id: string;
  chapter: string;
  label: string;
  title: string;
  lead: string;
  body: string;
  src: string;
  position: string;
};

type TahqiqPillar = {
  arabic: string;
  transliteration: string;
  description: string;
};

const tahqiqPillars: readonly TahqiqPillar[] = [
  {
    arabic: "أصالة",
    transliteration: "Aṣālah",
    description: "Keaslian naskah yang terjaga.",
  },
  {
    arabic: "صِحَّة",
    transliteration: "Ṣiḥḥah",
    description: "Kesahihan teks yang dapat dipertanggungjawabkan.",
  },
  {
    arabic: "دِقَّة",
    transliteration: "Diqqah",
    description: "Ketelitian pada setiap huruf, tanda, dan referensi.",
  },
  {
    arabic: "أمانة",
    transliteration: "Amānah",
    description: "Menjaga warisan ilmu sebagaimana mestinya.",
  },
];

const filmScenes: readonly FilmScene[] = [
  {
    id: "1992",
    chapter: "1992",
    label: "AWAL SEBUAH PERJALANAN",
    title: "Semua berawal dari ketekunan.",
    lead: "Berawal dari satu komitmen sederhana:",
    body: "menjaga dan menyebarkan ilmu melalui kitab-kitab Islam. Sebelum ada teknologi, setiap halaman dikerjakan dengan ketelitian, kesabaran, dan tanggung jawab.",
    src: "/cinematic/dzikra-1992-manuscript.mp4",
    position: "center center",
  },
  {
    id: "2010",
    chapter: "2010",
    label: "BERADAPTASI DENGAN TEKNOLOGI",
    title: "Teknologi berkembang. Kami ikut berkembang.",
    lead: "Dari pekerjaan manual menuju proses digital.",
    body: "Menggunakan teknologi untuk bekerja lebih cepat tanpa mengorbankan kualitas yang kami jaga sejak awal.",
    src: "/cinematic/dzikra-2010-layout-crt.mp4",
    position: "center center",
  },
  {
    id: "tahqiq",
    chapter: "TAHQIQ & KOREKSI",
    label: "MENJAGA SETIAP DETAIL",
    title: "Teknologi berubah. Standar kami tidak.",
    lead: "Karena satu huruf yang keliru dapat mengubah makna sebuah ilmu.",
    body: "Setiap naskah ditelaah ulang dengan amanah sebelum menjadi kitab yang sampai ke tangan pembaca.",
    src: "/cinematic/dzikra-manuscript-correction.mp4",
    position: "center center",
  },
  {
    id: "2026",
    chapter: "2026",
    label: "BABAK BARU DIMULAI",
    title: "Dari menjaga karya. Menjadi pencipta karya.",
    lead: "Dibangun dari pengalaman lebih dari tiga dekade.",
    body: "Selama puluhan tahun, Dzikra membantu penerbit, pesantren, ulama, dan penulis melalui pengetikan, layout, koreksi, serta persiapan kitab. Kini kami melangkah lebih jauh.",
    src: "/cinematic/dzikra-print-production.mp4",
    position: "center center",
  },
];

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function playVideo(video: HTMLVideoElement | null) {
  if (!video) return;
  // Keep the media in the configuration accepted by mobile autoplay policies.
  // React's `muted` attribute is not always reflected early enough on iOS,
  // so set the DOM properties immediately before attempting playback.
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  void video.play().catch(() => {
    // Autoplay can be declined by the browser. The visible play control remains available.
  });
}

export function CinematicHistory() {
  const rootRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const finaleRef = useRef<HTMLDivElement | null>(null);
  const sceneRefs = useRef<Array<HTMLElement | null>>([]);
  const copyRefs = useRef<Array<HTMLDivElement | null>>([]);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const progressRefs = useRef<Array<HTMLLIElement | null>>([]);
  const activeSceneRef = useRef(0);
  const [activeScene, setActiveScene] = useState(0);
  const [playingScene, setPlayingScene] = useState<number | null>(null);
  const [failedVideos, setFailedVideos] = useState<Record<string, boolean>>({});
  const [historyVisible, setHistoryVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const setActiveFilmScene = (nextIndex: number) => {
    if (activeSceneRef.current === nextIndex) return;
    activeSceneRef.current = nextIndex;
    setActiveScene(nextIndex);
  };

  useEffect(() => {
    if (!rootRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHistoryVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || !historyVisible) {
      videoRefs.current.forEach((video) => video?.pause());
      setPlayingScene(null);
      return;
    }

    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeScene) {
        playVideo(video);
      } else {
        video.pause();
      }
    });
  }, [activeScene, historyVisible, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || window.matchMedia("(min-width: 768px)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        const index = mostVisible ? Number(mostVisible.target.getAttribute("data-scene-index")) : NaN;
        if (!Number.isNaN(index)) setActiveFilmScene(index);
      },
      { threshold: [0.35, 0.6, 0.8] },
    );

    sceneRefs.current.forEach((scene) => {
      if (scene) observer.observe(scene);
    });

    return () => observer.disconnect();
  }, [reducedMotion]);

  useLayoutEffect(() => {
    if (reducedMotion || !rootRef.current || !stageRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    const stage = stageRef.current;
    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(min-width: 768px)", () => {
        const scenes = sceneRefs.current.filter((scene): scene is HTMLElement => Boolean(scene));
        const copies = copyRefs.current.filter((copy): copy is HTMLDivElement => Boolean(copy));
        const progress = progressRefs.current.filter((item): item is HTMLLIElement => Boolean(item));
        const finale = finaleRef.current;
        const pillars = scenes[2]?.querySelectorAll<HTMLElement>("[data-pillar]");
        const sceneThreeLine = scenes[2]?.querySelector<HTMLElement>("[data-precision-line]");

        if (scenes.length !== filmScenes.length || copies.length !== filmScenes.length || !finale) return;

        gsap.set(scenes, { autoAlpha: 0, scale: 1.12, yPercent: 5, transformOrigin: "center center" });
        gsap.set(scenes[0], { autoAlpha: 1, scale: 1.075, yPercent: 0 });
        gsap.set(copies, { autoAlpha: 0, y: 34 });
        gsap.set(progress, { autoAlpha: 0.42, x: 0 });
        gsap.set(progress[0], { autoAlpha: 1, x: -7 });
        gsap.set(finale, { autoAlpha: 0, y: 38, scale: 0.98 });
        if (pillars) gsap.set(pillars, { autoAlpha: 0, y: 22 });
        if (sceneThreeLine) gsap.set(sceneThreeLine, { scaleX: 0, transformOrigin: "left center" });

        const setProgress = (index: number, at: number) => {
          progress.forEach((item, itemIndex) => {
            timeline.to(item, {
              autoAlpha: itemIndex === index ? 1 : 0.42,
              x: itemIndex === index ? -7 : 0,
              duration: 0.2,
              ease: "none",
            }, at);
          });
        };

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => "+=" + Math.round(window.innerHeight * 7.1),
            pin: stage,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (trigger) => {
              const progressValue = trigger.progress;
              const nextIndex = progressValue < 0.22 ? 0 : progressValue < 0.43 ? 1 : progressValue < 0.72 ? 2 : 3;
              setActiveFilmScene(nextIndex);
            },
            onEnter: () => setHistoryVisible(true),
            onLeave: () => {
              videoRefs.current.forEach((video) => video?.pause());
              setPlayingScene(null);
              setHistoryVisible(false);
            },
            onEnterBack: () => {
              setHistoryVisible(true);
              playVideo(videoRefs.current[activeSceneRef.current]);
            },
            onLeaveBack: () => setHistoryVisible(false),
          },
        });

        // 1992 — quiet, warm, deliberate.
        timeline.to(scenes[0], { scale: 1, duration: 0.82 }, 0);
        timeline.to(copies[0], { autoAlpha: 1, y: 0, duration: 0.45 }, 0.14);
        timeline.to(scenes[0].querySelector("[data-depth]"), { yPercent: -4, duration: 1.25 }, 0.1);
        timeline.to(copies[0], { autoAlpha: 0, y: -18, duration: 0.28 }, 1.25);
        timeline.to(scenes[0], { autoAlpha: 0, scale: 0.965, yPercent: -3, duration: 0.54 }, 1.18);

        // 2010 — a cooler, more structured transition.
        timeline.to(scenes[1], { autoAlpha: 1, scale: 1, yPercent: 0, duration: 0.63 }, 1.08);
        timeline.to(copies[1], { autoAlpha: 1, y: 0, duration: 0.44 }, 1.43);
        timeline.to(scenes[1].querySelector("[data-depth]"), { yPercent: 3, duration: 1.2 }, 1.22);
        setProgress(1, 1.17);
        timeline.to(copies[1], { autoAlpha: 0, y: -18, duration: 0.28 }, 2.55);
        timeline.to(scenes[1], { autoAlpha: 0, scale: 1.08, yPercent: -4, duration: 0.55 }, 2.48);

        // Tahqiq — linger longer. The important words deliberately take more of the scroll.
        timeline.to(scenes[2], { autoAlpha: 1, scale: 1, yPercent: 0, duration: 0.64 }, 2.38);
        timeline.to(copies[2], { autoAlpha: 1, y: 0, duration: 0.44 }, 2.7);
        timeline.to(scenes[2].querySelector("[data-depth]"), { yPercent: -2, duration: 1.8 }, 2.5);
        if (pillars) {
          timeline.to(pillars, { autoAlpha: 1, y: 0, duration: 0.34, stagger: 0.31 }, 3.22);
        }
        if (sceneThreeLine) timeline.to(sceneThreeLine, { scaleX: 1, duration: 0.78 }, 4.54);
        setProgress(2, 2.53);
        timeline.to(copies[2], { autoAlpha: 0, y: -18, duration: 0.3 }, 4.98);
        timeline.to(scenes[2], { autoAlpha: 0, scale: 0.975, yPercent: -3, duration: 0.58 }, 4.92);

        // 2026 — the gold bloom and final statement earn the ending.
        timeline.to(scenes[3], { autoAlpha: 1, scale: 1, yPercent: 0, duration: 0.7 }, 4.8);
        timeline.to(copies[3], { autoAlpha: 1, y: 0, duration: 0.48 }, 5.14);
        timeline.to(scenes[3].querySelector("[data-gold-bloom]"), { autoAlpha: 1, duration: 1.05 }, 5.05);
        timeline.to(scenes[3].querySelector("[data-depth]"), { yPercent: -3, duration: 1.8 }, 5.05);
        setProgress(3, 4.98);
        timeline.to(copies[3], { autoAlpha: 0, y: -22, duration: 0.35 }, 6.24);
        timeline.to(finale, { autoAlpha: 1, y: 0, scale: 1, duration: 0.64 }, 6.43);
      });
    }, root);

    return () => context.revert();
  }, [reducedMotion]);

  const toggleVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    setActiveFilmScene(index);

    if (video.paused) {
      playVideo(video);
    } else {
      video.pause();
    }
  };

  return (
    <section
      ref={rootRef}
      className={[styles.film, reducedMotion ? styles.reducedMotion : ""].filter(Boolean).join(" ")}
      aria-label="Perjalanan sejarah Dzikra dari 1992 hingga 2026"
    >
      <div className={styles.stage} ref={stageRef}>
        <div className={styles.ambient} aria-hidden="true" />

        <ol className={styles.progress} aria-label="Progress perjalanan Dzikra">
          {filmScenes.map((scene, index) => (
            <li
              key={scene.id}
              ref={(node) => {
                progressRefs.current[index] = node;
              }}
              className={index === activeScene ? styles.progressActive : ""}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{scene.chapter}</b>
            </li>
          ))}
        </ol>

        <a className={styles.skip} href="#koleksi">
          Lewati perjalanan <span aria-hidden="true">↓</span>
        </a>

        <div className={styles.layers}>
          {filmScenes.map((scene, index) => {
            const failed = failedVideos[scene.id];
            const sceneClass = [styles.scene, styles["scene" + (index + 1)], index === activeScene ? styles.sceneActive : ""]
              .filter(Boolean)
              .join(" ");
            return (
              <article
                key={scene.id}
                ref={(node) => {
                  sceneRefs.current[index] = node;
                }}
                data-scene-index={index}
                className={sceneClass}
                aria-label={scene.chapter + ": " + scene.title}
              >
                <div className={styles.videoShell} data-depth>
                  {failed ? (
                    <div className={styles.fallback} role="status">
                      <span>FILM DZIKRA</span>
                      <strong>{scene.chapter}</strong>
                      <p>Rekaman sedang disiapkan.</p>
                    </div>
                  ) : (
                    <video
                      ref={(node) => {
                        videoRefs.current[index] = node;
                      }}
                      className={styles.video}
                      style={{ objectPosition: scene.position }}
                      src={scene.src}
                      muted
                      autoPlay={index === activeScene}
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={"Rekaman " + scene.label}
                      onLoadedData={(event) => {
                        if (activeSceneRef.current === index && historyVisible && !reducedMotion) {
                          playVideo(event.currentTarget);
                        }
                      }}
                      onError={() => {
                        setFailedVideos((current) => ({ ...current, [scene.id]: true }));
                      }}
                      onPlay={() => setPlayingScene(index)}
                      onPause={() => {
                        setPlayingScene((current) => (current === index ? null : current));
                      }}
                    />
                  )}
                </div>

                <div className={styles.shade} aria-hidden="true" />
                <div className={styles.grain} aria-hidden="true" />
                <div className={styles.edge} aria-hidden="true" />
                {index === 3 && <div className={styles.goldBloom} data-gold-bloom aria-hidden="true" />}

                <div
                  ref={(node) => {
                    copyRefs.current[index] = node;
                  }}
                  className={styles.copy}
                >
                  <p className={styles.eyebrow}>
                    <span>{scene.chapter}</span>
                    {scene.label}
                  </p>
                  <h2>{scene.title}</h2>
                  <p className={styles.lead}>{scene.lead}</p>
                  <p className={styles.body}>{scene.body}</p>

                  {index === 2 && (
                    <div className={styles.pillars} aria-label="Empat nilai tahqiq Dzikra">
                      {tahqiqPillars.map((pillar) => (
                        <div className={styles.pillar} key={pillar.transliteration} data-pillar>
                          <span className={styles.pillarArabic} lang="ar" dir="rtl">
                            {pillar.arabic}
                          </span>
                          <span className={styles.pillarLatin}>{pillar.transliteration}</span>
                          <p className={styles.pillarDescription}>{pillar.description}</p>
                        </div>
                      ))}
                      <i data-precision-line aria-hidden="true" />
                    </div>
                  )}
                </div>

                <button
                  className={styles.playControl}
                  type="button"
                  onClick={() => toggleVideo(index)}
                  aria-label={
                    playingScene === index
                      ? "Jeda film " + scene.chapter
                      : "Putar film " + scene.chapter
                  }
                >
                  <span aria-hidden="true">{playingScene === index ? "Ⅱ" : "▶"}</span>
                  {playingScene === index ? "Jeda" : "Putar"}
                </button>
              </article>
            );
          })}
        </div>

        <div className={styles.finale} ref={finaleRef}>
          <p>2026 · DZIKRA COMP</p>
          <h2>Crafted with Amanah,<br /><em>Designed for Comfort.</em></h2>
          <span>Dari menjaga karya, menjadi pencipta karya.</span>
          <a href="#koleksi">Jelajahi koleksi <b aria-hidden="true">↓</b></a>
        </div>

        <p className={styles.scrollNote} aria-hidden="true">
          <span>{String(activeScene + 1).padStart(2, "0")}</span> GULIR UNTUK MELANJUTKAN
        </p>
      </div>
    </section>
  );
}
