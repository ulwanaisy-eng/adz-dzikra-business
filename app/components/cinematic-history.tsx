"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
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
  poster: string;
  position: string;
  mobilePosition: string;
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
    poster: "/cinematic/dzikra-1992-manuscript-poster.jpg",
    position: "52% center",
    mobilePosition: "52% center",
  },
  {
    id: "2010",
    chapter: "2010",
    label: "BERADAPTASI DENGAN TEKNOLOGI",
    title: "Teknologi berkembang. Kami ikut berkembang.",
    lead: "Dari pekerjaan manual menuju proses digital.",
    body: "Menggunakan teknologi untuk bekerja lebih cepat tanpa mengorbankan kualitas yang kami jaga sejak awal.",
    src: "/cinematic/dzikra-2010-layout-crt.mp4",
    poster: "/cinematic/dzikra-2010-layout-crt-poster.jpg",
    position: "78% center",
    // Bapak remains on the right throughout this clip. On a portrait phone,
    // prioritise him over the full-width CRT desk composition.
    mobilePosition: "70% center",
  },
  {
    id: "tahqiq",
    chapter: "TAHQIQ & KOREKSI",
    label: "MENJAGA SETIAP DETAIL",
    title: "Teknologi berubah. Standar kami tidak.",
    lead: "Karena satu huruf yang keliru dapat mengubah makna sebuah ilmu.",
    body: "Setiap naskah ditelaah ulang dengan amanah sebelum menjadi kitab yang sampai ke tangan pembaca.",
    src: "/cinematic/dzikra-manuscript-correction.mp4",
    poster: "/cinematic/dzikra-manuscript-correction-poster.jpg",
    position: "76% center",
    // The correction film is stable, but this gentler right focus retains
    // Bapak's face instead of cutting into it on narrow screens.
    mobilePosition: "71% center",
  },
  {
    id: "2026",
    chapter: "2026",
    label: "BABAK BARU DIMULAI",
    title: "Dari menjaga karya. Menjadi pencipta karya.",
    lead: "Dibangun dari pengalaman lebih dari tiga dekade.",
    body: "Selama puluhan tahun, Dzikra membantu penerbit, pesantren, ulama, dan penulis melalui pengetikan, layout, koreksi, serta persiapan kitab. Kini kami melangkah lebih jauh.",
    src: "/cinematic/dzikra-print-production.mp4",
    poster: "/cinematic/dzikra-print-production-poster.jpg",
    position: "77% center",
    // The press is deliberately secondary on phone screens: Bapak is the
    // character carrying the 2026 story and stays in the visible crop.
    mobilePosition: "70% center",
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
    // Autoplay can be declined until the first scroll/touch; the listener
    // above retries playback as soon as the visitor interacts with the page.
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
  const refreshRafRef = useRef<number | null>(null);
  const activeSceneRef = useRef(0);
  const [activeScene, setActiveScene] = useState(0);
  const [failedVideos, setFailedVideos] = useState<Record<string, boolean>>({});
  const [videoReady, setVideoReady] = useState<Record<string, boolean>>({});
  const [copyFallback, setCopyFallback] = useState<Record<string, boolean>>({});
  const [historyVisible, setHistoryVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const setActiveFilmScene = (nextIndex: number) => {
    if (activeSceneRef.current === nextIndex) return;
    activeSceneRef.current = nextIndex;
    setActiveScene(nextIndex);
  };

  const markVideoReady = (sceneId: string) => {
    setVideoReady((current) => current[sceneId] ? current : { ...current, [sceneId]: true });
  };

  const queueScrollTriggerRefresh = () => {
    if (window.matchMedia("(max-width: 767px)").matches) return;
    if (refreshRafRef.current) cancelAnimationFrame(refreshRafRef.current);
    refreshRafRef.current = requestAnimationFrame(() => {
      refreshRafRef.current = null;
      ScrollTrigger.refresh();
    });
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

  useEffect(() => () => {
    if (refreshRafRef.current) cancelAnimationFrame(refreshRafRef.current);
  }, []);

  useEffect(() => {
    if (reducedMotion || !historyVisible) return;

    const sceneId = filmScenes[activeScene]?.id;
    if (!sceneId || videoReady[sceneId] || copyFallback[sceneId]) return;

    // On a slower network the poster is already visible. Give the background
    // film a short head start, then reveal copy so the narrative never hangs.
    const timeout = window.setTimeout(() => {
      setCopyFallback((current) => current[sceneId] ? current : { ...current, [sceneId]: true });
    }, 1050);

    return () => window.clearTimeout(timeout);
  }, [activeScene, copyFallback, historyVisible, reducedMotion, videoReady]);

  useEffect(() => {
    if (reducedMotion || !historyVisible) {
      videoRefs.current.forEach((video) => video?.pause());
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
    if (reducedMotion) return;

    // A scroll or touch is a user gesture on mobile. Retrying here makes the
    // experience resilient to Safari/Android autoplay timing differences while
    // keeping every film muted and inline.
    const resumeActiveVideo = () => {
      if (!historyVisible) return;
      playVideo(videoRefs.current[activeSceneRef.current]);
    };

    window.addEventListener("touchstart", resumeActiveVideo, { passive: true });
    window.addEventListener("pointerdown", resumeActiveVideo, { passive: true });
    document.addEventListener("visibilitychange", resumeActiveVideo);

    return () => {
      window.removeEventListener("touchstart", resumeActiveVideo);
      window.removeEventListener("pointerdown", resumeActiveVideo);
      document.removeEventListener("visibilitychange", resumeActiveVideo);
    };
  }, [historyVisible, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || window.matchMedia("(min-width: 768px)").matches) return;

    // The virtual viewport ends at 62%, so a new scene becomes active as its
    // TOP crosses that line. IntersectionObserver avoids layout reads inside
    // a scroll callback, which is gentler on mobile compositing.
    const visibleScenes = new Set<number>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = Number((entry.target as HTMLElement).dataset.sceneIndex);
        if (entry.isIntersecting) visibleScenes.add(index);
        else visibleScenes.delete(index);
      });
      setActiveFilmScene(Math.max(0, ...visibleScenes));
    }, { rootMargin: "0px 0px -38% 0px", threshold: 0 });

    sceneRefs.current.forEach((scene) => {
      if (scene) observer.observe(scene);
    });

    return () => {
      observer.disconnect();
    };
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
        timeline.to(copies[0], { autoAlpha: 0, y: -18, duration: 0.54 }, 1.18);
        timeline.to(scenes[0], { autoAlpha: 0, scale: 0.965, yPercent: -3, duration: 0.54 }, 1.18);

        // 2010 — a cooler, more structured transition.
        timeline.to(scenes[1], { autoAlpha: 1, scale: 1, yPercent: 0, duration: 0.54 }, 1.18);
        timeline.to(copies[1], { autoAlpha: 1, y: 0, duration: 0.54 }, 1.18);
        timeline.to(scenes[1].querySelector("[data-depth]"), { yPercent: 3, duration: 1.2 }, 1.22);
        setProgress(1, 1.17);
        timeline.to(copies[1], { autoAlpha: 0, y: -18, duration: 0.5 }, 2.48);
        timeline.to(scenes[1], { autoAlpha: 0, scale: 1.08, yPercent: -4, duration: 0.5 }, 2.48);

        // Tahqiq — linger longer. The important words deliberately take more of the scroll.
        timeline.to(scenes[2], { autoAlpha: 1, scale: 1, yPercent: 0, duration: 0.5 }, 2.48);
        timeline.to(copies[2], { autoAlpha: 1, y: 0, duration: 0.5 }, 2.48);
        timeline.to(scenes[2].querySelector("[data-depth]"), { yPercent: -2, duration: 1.8 }, 2.5);
        if (pillars) {
          timeline.to(pillars, { autoAlpha: 1, y: 0, duration: 0.34, stagger: 0.31 }, 3.22);
        }
        if (sceneThreeLine) timeline.to(sceneThreeLine, { scaleX: 1, duration: 0.78 }, 4.54);
        setProgress(2, 2.53);
        timeline.to(copies[2], { autoAlpha: 0, y: -18, duration: 0.58 }, 4.92);
        timeline.to(scenes[2], { autoAlpha: 0, scale: 0.975, yPercent: -3, duration: 0.58 }, 4.92);

        // 2026 — the gold bloom and final statement earn the ending.
        timeline.to(scenes[3], { autoAlpha: 1, scale: 1, yPercent: 0, duration: 0.58 }, 4.92);
        timeline.to(copies[3], { autoAlpha: 1, y: 0, duration: 0.58 }, 4.92);
        timeline.to(scenes[3].querySelector("[data-gold-bloom]"), { autoAlpha: 1, duration: 1.05 }, 5.05);
        timeline.to(scenes[3].querySelector("[data-depth]"), { yPercent: -3, duration: 1.8 }, 5.05);
        setProgress(3, 4.98);
        timeline.to(copies[3], { autoAlpha: 0, y: -22, duration: 0.35 }, 6.24);
        timeline.to(finale, { autoAlpha: 1, y: 0, scale: 1, duration: 0.64 }, 6.43);
      });
    }, root);

    return () => context.revert();
  }, [reducedMotion]);

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
            const copyMayEnter = Boolean(videoReady[scene.id] || copyFallback[scene.id] || failed);
            const preload = index <= activeScene + 1 ? "auto" : "metadata";
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
                      style={{
                        objectPosition: scene.position,
                        "--mobile-position": scene.mobilePosition,
                      } as CSSProperties}
                      src={scene.src}
                      poster={scene.poster}
                      muted
                      autoPlay={index === activeScene}
                      loop
                      playsInline
                      preload={preload}
                      aria-label={"Rekaman " + scene.label}
                      onLoadedMetadata={queueScrollTriggerRefresh}
                      onLoadedData={(event) => {
                        markVideoReady(scene.id);
                        if (activeSceneRef.current === index && historyVisible && !reducedMotion) {
                          playVideo(event.currentTarget);
                        }
                      }}
                      onCanPlay={(event) => {
                        if (activeSceneRef.current === index && historyVisible && !reducedMotion) {
                          playVideo(event.currentTarget);
                        }
                      }}
                      onPlaying={() => markVideoReady(scene.id)}
                      onError={() => {
                        setFailedVideos((current) => ({ ...current, [scene.id]: true }));
                        setCopyFallback((current) => ({ ...current, [scene.id]: true }));
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
                  className={[
                    styles.copy,
                    index === activeScene ? styles.copyActive : "",
                    copyMayEnter ? "" : styles.copyPending,
                  ].filter(Boolean).join(" ")}
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
