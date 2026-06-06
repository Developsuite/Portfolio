"use client";

import { useEffect, useRef, useCallback } from "react";

const TOTAL_FRAMES = 161;
const FRAME_PATH = "/SkilledSectionimages/ezgif-frame-";

function getFrameSrc(index: number): string {
  const num = String(index).padStart(3, "0");
  return `${FRAME_PATH}${num}.jpg`;
}

export default function SkillsCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Preload frames lazily to avoid blocking initial page load
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    
    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = getFrameSrc(1);
    images[0] = firstImg;
    
    const setFirst = () => {
      updateFrame(0);
    };
    
    if (images[0].complete) {
      setFirst();
    } else {
      images[0].addEventListener("load", setFirst, { once: true });
    }

    imagesRef.current = images;

    // Defer loading the remaining 160 frames until the browser is idle or after a delay.
    // This ensures the Hero section and initial page load are lightning fast!
    const loadRemainingFrames = () => {
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFrameSrc(i + 1);
        img.decode().catch(() => {}); // Force background decoding of JPEG
        images[i] = img;
      }
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => loadRemainingFrames(), { timeout: 2000 });
    } else {
      setTimeout(loadRemainingFrames, 1500);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const updateFrame = useCallback((frameIndex: number) => {
    if (frameIndex === currentFrameRef.current && frameIndex !== 0) return;
    currentFrameRef.current = frameIndex;

    const img = imagesRef.current[frameIndex];
    if (img && img.complete && img.naturalWidth && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { alpha: false }); // Boosts performance
      if (ctx) {
        if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
        }
        ctx.drawImage(img, 0, 0);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const scrollable = container.offsetHeight - window.innerHeight;
        if (scrollable <= 0) return;

        // Ensure we calculate progress smoothly from 0 to 1 as the section is scrolled
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
  }, [updateFrame]);

  return (
    <section
      className="relative w-full z-10"
      style={{ height: "400vh" }} // Provides the scroll distance needed for 161 frames
      ref={containerRef}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        {/* Native <canvas> — highly performant pixel rendering */}
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ objectFit: "cover" }}
        />
        
        {/* Gradients to seamlessly blend this section with the rest of the dark site */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
