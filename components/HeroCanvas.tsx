"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const TOTAL_FRAMES = 151;
const FRAME_PATH = "/frames/ezgif-frame-";

function getFrameSrc(index: number): string {
  const num = String(index).padStart(3, "0");
  return `${FRAME_PATH}${num}.jpg`;
}

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();

  // Smoothly animate the progress number
  useEffect(() => {
    if (displayProgress < loadProgress) {
      const timer = setTimeout(() => {
        setDisplayProgress((prev) => Math.min(prev + 1, loadProgress));
      }, 15);
      return () => clearTimeout(timer);
    }
  }, [displayProgress, loadProgress]);

  // When loading is complete, wait a beat then trigger the split-open
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 400); // small pause before the split animation begins
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  // Preload ALL frames before allowing the page to open to guarantee zero scroll lag
  useEffect(() => {
    if (isMobile) {
      // On mobile, skip heavy frame preloading to ensure zero lag
      const timer = setTimeout(() => setIsLoaded(true), 1500);
      return () => clearTimeout(timer);
    }

    const SKILLS_PRELOAD_COUNT = 80;
    const TOTAL_TO_LOAD = TOTAL_FRAMES + SKILLS_PRELOAD_COUNT;
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let framesLoaded = false;
    let minTimeElapsed = false;

    const checkDone = () => {
      if (framesLoaded && minTimeElapsed) {
        setIsLoaded(true);
      }
    };

    // Force loader to show for at least 2.5 seconds for the cinematic effect
    setTimeout(() => {
      minTimeElapsed = true;
      checkDone();
    }, 2500);

    const onLoad = () => {
      loadedCount++;
      const progress = Math.round((loadedCount / TOTAL_TO_LOAD) * 100);
      setLoadProgress(Math.min(progress, 100));
      if (loadedCount >= TOTAL_TO_LOAD && !framesLoaded) {
        framesLoaded = true;
        checkDone();
      }
    };

    // 1. Load ALL 151 frames of Hero section
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i + 1);
      
      // Force background decoding to prevent scroll lag
      img.decode().then(() => {
        onLoad();
      }).catch(() => {
        // Fallback for browsers that don't support decode() or if it fails
        if (img.complete) onLoad();
        else {
          img.onload = onLoad;
          img.onerror = onLoad;
        }
      });
      images[i] = img;
    }

    // 2. Load the first 80 frames of the Skills section so they are cached
    for (let i = 0; i < SKILLS_PRELOAD_COUNT; i++) {
      const num = String(i + 1).padStart(3, "0");
      const img = new Image();
      img.src = `/SkilledSectionimages/ezgif-frame-${num}.jpg`;
      img.decode().then(onLoad).catch(() => {
        if (img.complete) onLoad();
        else {
          img.onload = onLoad;
          img.onerror = onLoad;
        }
      });
    }

    imagesRef.current = images;

    // Set first frame once loaded
    const firstImg = images[0];
    const setFirst = () => {
      updateFrame(0);
    };
    if (firstImg.complete) {
      setFirst();
    } else {
      firstImg.addEventListener("load", setFirst, { once: true });
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  // Scroll-to-frame mapping
  const updateFrame = useCallback((frameIndex: number) => {
    if (isMobile) return;
    if (frameIndex === currentFrameRef.current && frameIndex !== 0) return; // Allow initial draw (index 0)
    currentFrameRef.current = frameIndex;

    const img = imagesRef.current[frameIndex];
    if (img && img.complete && img.naturalWidth && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { alpha: false }); // Optimization: disables transparency
      
      if (ctx) {
        // Match canvas internal resolution to the image
        if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
        }
        ctx.drawImage(img, 0, 0);
      }
    }
  }, [isMobile]);

  // Scroll handler
  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const scrollable = container.offsetHeight - window.innerHeight;
        if (scrollable <= 0) return;

        const rawProgress = -rect.top / scrollable;
        const progress = Math.min(Math.max(rawProgress, 0), 1);
        const frameIndex = Math.min(
          Math.floor(progress * (TOTAL_FRAMES - 1)),
          TOTAL_FRAMES - 1
        );

        updateFrame(frameIndex);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateFrame, isMobile]);

  /* ---- Shared loader content (rendered inside BOTH halves) ---- */
  const loaderContent = (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Giant Background Text — two lines */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden gap-0">
        <span className="text-[12vw] md:text-[11vw] font-black text-black/[0.06] tracking-tight uppercase leading-none whitespace-nowrap">
          AI ENGINEER
        </span>
        <span className="text-[12vw] md:text-[11vw] font-black text-black/[0.06] tracking-tight uppercase leading-none whitespace-nowrap">
          ML SPECIALIST
        </span>
      </div>

      {/* Name — top left */}
      <div className="absolute top-6 left-8 md:top-8 md:left-12">
        <span className="text-sm md:text-base font-semibold text-black/60 tracking-tight">
          Kinz ul Eman
        </span>
      </div>

      {/* Decorative bars — top right */}
      <div className="absolute top-6 right-8 md:top-8 md:right-12 flex items-end gap-1.5 h-6">
        <div className="w-[3px] h-3 bg-black/20 rounded-full" />
        <div className="w-[3px] h-5 bg-black/30 rounded-full" />
        <div className="w-[3px] h-4 bg-black/20 rounded-full" />
        <div className="w-[3px] h-6 bg-black/30 rounded-full" />
      </div>

      {/* Loading Pill — center, 3D feel */}
      <div className="relative z-10 flex items-center justify-between gap-12 px-8 md:px-10 py-4 md:py-5 rounded-full min-w-[280px] md:min-w-[340px]"
        style={{
          background: "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 60%, #050505 100%)",
          boxShadow: "0 8px 32px rgba(0,123,255,0.3), 0 0 80px rgba(0,123,255,0.15), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Left blue glow edge */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="absolute -left-2 top-0 bottom-0 w-24 bg-gradient-to-r from-blue-500/40 to-transparent" />
        </div>
        {/* Top highlight for 3D depth */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        <span className="relative text-sm md:text-base font-bold tracking-[0.25em] text-white uppercase">
          Loading
        </span>
        <div className="relative flex items-center gap-2">
          <span className="text-sm md:text-base font-mono text-white/80 tabular-nums">
            {isMobile ? 100 : displayProgress}%
          </span>
          {/* Blinking cursor block */}
          <motion.div
            className="w-[6px] h-[18px] bg-white rounded-[1px]"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="home"
      className={isMobile ? "relative w-full h-[100vh] bg-black overflow-hidden" : "hero-canvas-wrapper relative"}
      style={{ height: isMobile ? "100vh" : "400vh" }}
      ref={containerRef}
    >
      {/* ============ Split-Open Loading Screen ============ */}
      <AnimatePresence>
        {showLoader && (
          <>
            {/* TOP HALF */}
            <motion.div
              key="loader-top"
              className="fixed inset-0 z-[100] overflow-hidden"
              style={{ clipPath: "inset(0 0 50% 0)" }}
              initial={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="absolute inset-0 bg-[#E8E6E3]">
                {loaderContent}
              </div>
            </motion.div>

            {/* BOTTOM HALF */}
            <motion.div
              key="loader-bottom"
              className="fixed inset-0 z-[100] overflow-hidden"
              style={{ clipPath: "inset(50% 0 0 0)" }}
              initial={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="absolute inset-0 bg-[#E8E6E3]">
                {loaderContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ============ Sticky Frame Display ============ */}
      <div className={isMobile ? "absolute inset-0 w-full h-full" : "hero-canvas-sticky"}>
        {isMobile ? (
          <img src="/mobile_view/2.webp" alt="Hero Mobile" className="w-full h-full object-cover" />
        ) : (
          <canvas
            ref={canvasRef}
            className="hero-frame-img"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}

        {/* Bottom fade — cinematic merge into content */}
        <div className="absolute bottom-0 left-0 right-0 h-[35vh] pointer-events-none z-[2]"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.7) 60%, #000000 100%)",
          }}
        />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: !showLoader ? 1 : 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <span className="text-xs text-white/40 font-mono tracking-[0.2em] uppercase">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Social Links - Left Side */}
        <motion.div
          className="hidden md:block group absolute left-6 md:left-10 top-[30%] -translate-y-1/2 z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: !showLoader ? 1 : 0, x: !showLoader ? 0 : -20 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {/* Liquid fill background layer */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none -z-10 border border-transparent transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] group-hover:border-blue-400/30">
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]" />
          </div>

          {/* Icons container */}
          <div className="flex flex-col items-center gap-5 md:gap-6 px-2 py-4 md:px-2.5 md:py-5">
            <a href="#" className="group/icon relative flex items-center justify-center text-white/50 group-hover:text-white transition-all duration-300 hover:scale-125 transform" aria-label="GitHub">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            <span className="absolute left-full ml-4 px-2.5 py-1.5 bg-black/80 backdrop-blur-md rounded-md text-xs font-semibold text-white opacity-0 -translate-x-2 group-hover/icon:opacity-100 group-hover/icon:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg">GitHub</span>
          </a>
          <a href="#" className="group/icon relative flex items-center justify-center text-white/50 group-hover:text-white transition-all duration-300 hover:scale-125 transform" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="absolute left-full ml-4 px-2.5 py-1.5 bg-black/80 backdrop-blur-md rounded-md text-xs font-semibold text-white opacity-0 -translate-x-2 group-hover/icon:opacity-100 group-hover/icon:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg">LinkedIn</span>
          </a>
          <a href="#" className="group/icon relative flex items-center justify-center text-white/50 group-hover:text-white transition-all duration-300 hover:scale-125 transform" aria-label="X (Twitter)">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="absolute left-full ml-4 px-2.5 py-1.5 bg-black/80 backdrop-blur-md rounded-md text-xs font-semibold text-white opacity-0 -translate-x-2 group-hover/icon:opacity-100 group-hover/icon:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg">X (Twitter)</span>
          </a>
          <a href="#" className="group/icon relative flex items-center justify-center text-white/50 group-hover:text-white transition-all duration-300 hover:scale-125 transform" aria-label="Instagram">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            <span className="absolute left-full ml-4 px-2.5 py-1.5 bg-black/80 backdrop-blur-md rounded-md text-xs font-semibold text-white opacity-0 -translate-x-2 group-hover/icon:opacity-100 group-hover/icon:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg">Instagram</span>
          </a>
          </div>
        </motion.div>


      </div>
    </section>
  );
}
