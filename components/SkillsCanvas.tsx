"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLenis } from 'lenis/react';
import { useInView } from "framer-motion";

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

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(containerRef, { margin: "1000px" });
  const [framesLoaded, setFramesLoaded] = useState(false);

  // Preload frames lazily to avoid blocking initial page load
  useEffect(() => {
    if (isMobile) return;
    if (!isInView || framesLoaded) return;

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
    let chunkStartIndex = 1;
    const CHUNK_SIZE = 20;

    const loadNextChunk = () => {
      if (chunkStartIndex >= TOTAL_FRAMES) {
        setFramesLoaded(true);
        return;
      }
      
      const end = Math.min(chunkStartIndex + CHUNK_SIZE, TOTAL_FRAMES);
      for (let i = chunkStartIndex; i < end; i++) {
        const img = new Image();
        img.src = getFrameSrc(i + 1);
        img.decode().catch(() => {}); // Force background decoding of JPEG
        images[i] = img;
      }
      
      chunkStartIndex = end;
      if (chunkStartIndex < TOTAL_FRAMES) {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(loadNextChunk, { timeout: 2000 });
        } else {
          setTimeout(loadNextChunk, 100);
        }
      } else {
        setFramesLoaded(true);
      }
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => loadNextChunk(), { timeout: 2000 });
    } else {
      setTimeout(loadNextChunk, 1500);
    }
  }, [isMobile, isInView, framesLoaded]);

  const updateFrame = useCallback((frameIndex: number) => {
    if (isMobile) return;
    if (frameIndex === currentFrameRef.current && frameIndex !== 0) return;
    currentFrameRef.current = frameIndex;

    requestAnimationFrame(() => {
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
    });
  }, [isMobile]);

  useLenis(() => {
    if (isMobile) return;
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

  return (
    <section
      className={isMobile ? "relative w-full z-10 bg-black" : "relative w-full z-10"}
      style={{ height: isMobile ? "100vh" : "400vh" }} // Provides the scroll distance needed for 161 frames
      ref={containerRef}
    >
      <div className={isMobile ? "absolute inset-0 w-full h-full overflow-hidden" : "sticky top-0 w-full h-screen overflow-hidden bg-black"} style={isMobile ? undefined : { willChange: 'transform', transform: 'translateZ(0)' }}>
        {isMobile ? (
          <img src="/mobile_view/3.webp" alt="Skills Mobile" className="w-full h-full object-cover" />
        ) : (
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ objectFit: "cover" }}
          />
        )}
        
        {/* Gradients to seamlessly blend this section with the rest of the dark site */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
