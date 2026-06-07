"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const affiliations = [
  {
    role: "Media Lead",
    organization: "GDSC",
  },
  {
    role: "Co-Media Head",
    organization: "Sports Society",
  },
  {
    role: "Production Head",
    organization: "Event Management",
  },
];

export default function SplineTimelineSection() {
  const headerRef = useRef(null);
  const isMobile = useIsMobile();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  const [splineApp, setSplineApp] = useState<any>(null);
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    if (isInView && !hasRendered) {
      setHasRendered(true);
    }
  }, [isInView, hasRendered]);

  useEffect(() => {
    if (splineApp) {
      if (isInView) {
        if (typeof splineApp.play === 'function') splineApp.play();
      } else {
        if (typeof splineApp.stop === 'function') splineApp.stop();
        else if (typeof splineApp.pause === 'function') splineApp.pause();
      }
    }
  }, [isInView, splineApp]);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start 90%", "start 40%"]
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const headingY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const headingScale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  if (isMobile) {
    return (
      <section id="leadership" className="w-full relative bg-black flex flex-col items-center justify-center pt-12">
        <div className="flex flex-row items-center justify-center gap-4 md:gap-8 pb-8 w-full px-4">
          <div className="h-[2px] md:h-[3px] flex-1 max-w-[80px] md:max-w-[200px] bg-gradient-to-r from-transparent to-white/40" />
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none font-black text-white text-center whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-outfit), "Outfit", sans-serif',
              letterSpacing: '-0.04em',
            }}
          >
            Leadership
          </h2>
          <div className="h-[2px] md:h-[3px] flex-1 max-w-[80px] md:max-w-[200px] bg-gradient-to-l from-transparent to-white/40" />
        </div>
        <img src="/mobile_view/robot.webp" alt="Leadership Timeline" className="w-full h-auto object-cover max-w-md" />
      </section>
    );
  }

  return (
    <section id="leadership" ref={headerRef} className="relative py-12 md:py-24 px-6 lg:px-8 bg-black z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Matches "My Skills" strictly */}
        <motion.div
          style={isMobile ? undefined : { opacity: headingOpacity, y: headingY, scale: headingScale }}
          className="flex flex-row items-center justify-center gap-4 md:gap-8 pb-16 w-full relative z-30"
        >
          <div className="h-[2px] md:h-[3px] flex-1 max-w-[80px] md:max-w-[200px] bg-gradient-to-r from-transparent to-white/40" />
          
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none font-black text-white text-center whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-outfit), "Outfit", sans-serif',
              letterSpacing: '-0.04em',
            }}
          >
            Leadership
          </h2>
          
          <div className="h-[2px] md:h-[3px] flex-1 max-w-[80px] md:max-w-[200px] bg-gradient-to-l from-transparent to-white/40" />
        </motion.div>

        {/* Content Container - Centered Spline with Floating Cards */}
        <div className="w-full h-[450px] md:h-[500px] lg:h-[600px] bg-transparent relative flex flex-col items-center mt-0">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          
          {/* Top Right Spotlight (Mirrored) */}
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ transform: 'scaleX(-1)' }}>
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="white"
            />
          </div>
          
          {/* Spline 3D Scene - Centered */}
          <div 
            ref={containerRef}
            className="absolute inset-0 m-auto w-full h-full md:w-[900px] md:h-[600px] z-10 origin-center scale-75 md:scale-100"
            style={{
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)',
              visibility: isInView ? 'visible' : 'hidden'
            }}
          >
            {hasRendered && (
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full object-cover"
                onLoad={(app) => setSplineApp(app)}
              />
            )}
          </div>

          {/* Zigzag Content Cards - Absolute positioning for all screens */}
          <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
            
            {/* Card 1: Top Left */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="pointer-events-auto absolute top-[5%] md:top-[35%] left-[5%] md:left-[2%] lg:left-[2%] group"
            >
              <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-gradient-to-b from-blue-500 to-blue-700 shadow-[0_4px_15px_rgba(59,130,246,0.6),inset_0_2px_4px_rgba(255,255,255,0.4)] border border-blue-400 mb-1 md:mb-2 transition-transform group-hover:scale-105 cursor-default">
                <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest">{affiliations[0].role}</span>
              </div>
              <span className="text-[10px] md:text-xs font-mono text-white/80 block tracking-wider pl-2 md:pl-4">@ {affiliations[0].organization}</span>
              
              {/* SVG Connecting Arrow */}
              <svg className="absolute top-4 left-full w-64 h-32 overflow-visible pointer-events-none hidden lg:block opacity-60 group-hover:opacity-100 transition-opacity">
                <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1 }}
                  d="M 0 0 L 80 0 L 160 40" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="160" cy="40" r="4" fill="#3b82f6" />
              </svg>
            </motion.div>

            {/* Card 2: Bottom Right */}
            <motion.div 
              initial={isMobile ? false : { opacity: 0, x: 30 }}
              whileInView={isMobile ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="pointer-events-auto absolute top-[25%] md:top-[55%] -translate-y-1/2 right-[5%] md:right-[2%] lg:right-[2%] group flex flex-col items-end"
            >
              <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-gradient-to-b from-blue-500 to-blue-700 shadow-[0_4px_15px_rgba(59,130,246,0.6),inset_0_2px_4px_rgba(255,255,255,0.4)] border border-blue-400 mb-1 md:mb-2 transition-transform group-hover:scale-105 cursor-default">
                <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest">{affiliations[1].role}</span>
              </div>
              <span className="text-[10px] md:text-xs font-mono text-white/80 block tracking-wider pr-2 md:pr-4">@ {affiliations[1].organization}</span>
              
              {/* SVG Connecting Arrow */}
              <svg className="absolute top-4 right-full w-64 h-10 overflow-visible pointer-events-none hidden lg:block opacity-60 group-hover:opacity-100 transition-opacity">
                <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }}
                  d="M 256 0 L 116 0" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="116" cy="0" r="4" fill="#3b82f6" />
              </svg>
            </motion.div>

            {/* Card 3: Bottom Left */}
            <motion.div 
              initial={isMobile ? false : { opacity: 0, x: -30 }}
              whileInView={isMobile ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pointer-events-auto absolute bottom-[5%] md:bottom-auto md:top-[75%] left-[5%] md:left-[2%] lg:left-[2%] group"
            >
              <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-gradient-to-b from-blue-500 to-blue-700 shadow-[0_4px_15px_rgba(59,130,246,0.6),inset_0_2px_4px_rgba(255,255,255,0.4)] border border-blue-400 mb-1 md:mb-2 transition-transform group-hover:scale-105 cursor-default">
                <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest">{affiliations[2].role}</span>
              </div>
              <span className="text-[10px] md:text-xs font-mono text-white/80 block tracking-wider pl-2 md:pl-4">@ {affiliations[2].organization}</span>
              
              {/* SVG Connecting Arrow */}
              <svg className="absolute top-4 left-full w-64 h-32 overflow-visible pointer-events-none hidden lg:block opacity-60 group-hover:opacity-100 transition-opacity">
                <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.4 }}
                  d="M 0 0 L 80 0 L 160 -40" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="160" cy="-40" r="4" fill="#3b82f6" />
              </svg>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
