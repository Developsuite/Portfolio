"use client";

import { useEffect, useRef, useState } from "react";

const techs = [
  "PyTorch",
  "TensorFlow",
  "LangChain",
  "Hugging Face",
  "OpenAI",
  "CUDA",
  "Scikit-Learn",
  "MLflow",
  "OpenCV",
  "Pandas",
];

export default function TechStackCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [, forceRender] = useState(0);

  useEffect(() => {
    const gap = 300; // px between each item
    const totalSetWidth = techs.length * gap;
    const speed = 0.5;

    const loop = () => {
      offsetRef.current -= speed;
      if (Math.abs(offsetRef.current) >= totalSetWidth) {
        offsetRef.current += totalSetWidth;
      }
      forceRender((n) => n + 1);
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // Triple the items for seamless looping
  const allItems = [...techs, ...techs, ...techs];
  const gap = 300;
  const totalLen = allItems.length * gap;
  const containerWidth =
    typeof window !== "undefined" ? window.innerWidth : 1200;
  const centerX = containerWidth / 2;

  return (
    <section className="relative py-24 md:py-32 bg-navy-950 overflow-hidden flex flex-col items-center justify-center">
      {/* Subtle background glow */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-[500px] h-[200px] bg-blue-500/30 blur-[100px] rounded-full" />
      </div>

      {/* Heading */}
      <div className="text-center mb-16 md:mb-24 z-10 px-4">
        <h2 className="text-xs md:text-sm font-semibold tracking-[0.25em] text-blue-500 uppercase mb-4">
          Core Technologies
        </h2>
        <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          Machine Learning & AI Stack
        </h3>
      </div>

      {/* 3D Curved Carousel */}
      <div
        ref={containerRef}
        className="relative w-full h-[100px] md:h-[160px] overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        <div ref={trackRef} className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
          {allItems.map((text, i) => {
            let x = i * gap + offsetRef.current;

            // Wrap
            while (x < -gap * 2) x += totalLen;
            while (x > totalLen - gap * 2) x -= totalLen;

            // How far from center (normalized -1 to 1)
            const distNorm = (x - centerX) / (containerWidth / 2);
            const clampedDist = Math.max(-1, Math.min(1, distNorm));

            // rotateY: items at edges rotate away (curve into the distance)
            // Left edge items rotate positively (turn right face away)
            // Right edge items rotate negatively (turn left face away)
            const rotateY = clampedDist * -55; // max 55° rotation at edges

            // translateZ: items at center come toward you, edges push back
            const absD = Math.abs(clampedDist);
            const translateZ = (1 - absD) * 150; // front items 150px closer

            // Scale: center = 1, edges = 0.6
            const scale = 1.0 - absD * 0.4;

            // Blur: center = 0, edges = 7px
            const blur = absD * absD * 7;

            // Opacity: center = 1, edges = 0.2
            const opacity = 1.0 - absD * 0.8;

            // Skip items that are way off screen
            if (absD > 1.3) return null;

            return (
              <div
                key={`${text}-${i}`}
                className="absolute top-1/2 select-none pointer-events-none whitespace-nowrap"
                style={{
                  left: `${x}px`,
                  transform: `translateY(-50%) perspective(1200px) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
                  filter: `blur(${blur}px)`,
                  opacity,
                  willChange: "transform, filter, opacity",
                }}
              >
                <span className="text-4xl md:text-7xl font-black text-white tracking-tight">
                  {text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
