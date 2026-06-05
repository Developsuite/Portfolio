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

  // Preload frames lazily to avoid blocking initial page load
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    
    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = getFrameSrc(1);
    images[0] = firstImg;
    
    const setFirst = () => {
      if (imgRef.current && images[0]) {
        imgRef.current.src = images[0].src;
      }
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
    if (frameIndex === currentFrameRef.current) return;
    currentFrameRef.current = frameIndex;

    const img = imagesRef.current[frameIndex];
    if (img && img.complete && img.naturalWidth && imgRef.current) {
      imgRef.current.src = img.src;
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
        {/* We use a native img tag instead of next/image to prevent Next.js from reducing the quality and to ensure perfectly instantaneous frame switching */}
        <img
          ref={imgRef}
          src={getFrameSrc(1)}
          alt="Skills 3D Animation"
          className="w-full h-full object-cover"
          draggable={false}
        />
        
        {/* Gradients to seamlessly blend this section with the rest of the dark site */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
