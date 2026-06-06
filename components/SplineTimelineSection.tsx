"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

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

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start 90%", "start 40%"]
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const headingY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const headingScale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <section id="leadership" ref={headerRef} className="relative py-12 md:py-24 px-6 lg:px-8 bg-black z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Matches "My Skills" strictly */}
        <motion.div
          style={{ opacity: headingOpacity, y: headingY, scale: headingScale }}
          className="flex flex-row items-center justify-center gap-4 md:gap-8 pb-16 w-full relative z-30"
        >
          <div className="h-[2px] md:h-[3px] flex-1 max-w-[80px] md:max-w-[200px] bg-gradient-to-r from-transparent to-white/40" />
          
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none font-black text-white text-center whitespace-nowrap uppercase tracking-tighter"
            style={{
              fontFamily: 'var(--font-outfit), "Outfit", sans-serif',
            }}
          >
            Leadership
          </h2>

          <div className="h-[2px] md:h-[3px] flex-1 max-w-[80px] md:max-w-[200px] bg-gradient-to-l from-transparent to-white/40" />
        </motion.div>

        {/* Content Container - Centered Spline with Floating Cards */}
        <div className="w-full min-h-[500px] lg:min-h-[600px] bg-transparent relative flex flex-col items-center mt-0">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          
          {/* Spline 3D Scene - Centered */}
          <div className="w-full h-[350px] md:absolute md:inset-0 md:m-auto md:w-[500px] md:h-[600px] z-10">
            <div className="absolute inset-0 bg-gradient-to-b md:bg-[radial-gradient(ellipse_at_center,transparent_30%,black_70%)] pointer-events-none z-10" />
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full object-cover scale-90"
            />
          </div>

          {/* Zigzag Content Cards - Absolute on Desktop, Stacked on Mobile */}
          <div className="relative md:absolute md:inset-0 w-full h-full z-20 flex flex-col md:block mt-2 md:mt-0 px-4 md:px-0 pointer-events-none">
            
            {/* Card 1: Top Left */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="pointer-events-auto md:absolute md:top-[40%] md:left-[5%] lg:left-[15%] w-full md:w-auto mb-6 md:mb-0 group"
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-b from-blue-500 to-blue-700 shadow-[0_4px_15px_rgba(59,130,246,0.6),inset_0_2px_4px_rgba(255,255,255,0.4)] border border-blue-400 mb-2 transition-transform group-hover:scale-105 cursor-default">
                <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest">{affiliations[0].role}</span>
              </div>
              <span className="text-xs font-mono text-white/80 block tracking-wider pl-4">@ {affiliations[0].organization}</span>
              
              {/* SVG Connecting Arrow */}
              <svg className="absolute top-4 left-full w-24 h-24 overflow-visible pointer-events-none hidden lg:block opacity-60 group-hover:opacity-100 transition-opacity">
                <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1 }}
                  d="M 0 0 L 30 0 L 90 30" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="90" cy="30" r="3" fill="#3b82f6" />
              </svg>
            </motion.div>

            {/* Card 2: Middle Right */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="pointer-events-auto md:absolute md:top-[60%] md:-translate-y-1/2 md:right-[5%] lg:right-[15%] w-full md:w-auto mb-6 md:mb-0 group flex flex-col items-start md:items-end"
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-b from-blue-500 to-blue-700 shadow-[0_4px_15px_rgba(59,130,246,0.6),inset_0_2px_4px_rgba(255,255,255,0.4)] border border-blue-400 mb-2 transition-transform group-hover:scale-105 cursor-default">
                <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest">{affiliations[1].role}</span>
              </div>
              <span className="text-xs font-mono text-white/80 block tracking-wider pr-4">@ {affiliations[1].organization}</span>
              
              {/* SVG Connecting Arrow */}
              <svg className="absolute top-4 right-full w-24 h-10 overflow-visible pointer-events-none hidden lg:block opacity-60 group-hover:opacity-100 transition-opacity">
                <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }}
                  d="M 0 0 L -70 0" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="-70" cy="0" r="3" fill="#3b82f6" />
              </svg>
            </motion.div>

            {/* Card 3: Bottom Left */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pointer-events-auto md:absolute md:top-[80%] md:left-[5%] lg:left-[15%] w-full md:w-auto mb-6 md:mb-0 group"
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-b from-blue-500 to-blue-700 shadow-[0_4px_15px_rgba(59,130,246,0.6),inset_0_2px_4px_rgba(255,255,255,0.4)] border border-blue-400 mb-2 transition-transform group-hover:scale-105 cursor-default">
                <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest">{affiliations[2].role}</span>
              </div>
              <span className="text-xs font-mono text-white/80 block tracking-wider pl-4">@ {affiliations[2].organization}</span>
              
              {/* SVG Connecting Arrow */}
              <svg className="absolute top-4 left-full w-24 h-24 overflow-visible pointer-events-none hidden lg:block opacity-60 group-hover:opacity-100 transition-opacity">
                <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.4 }}
                  d="M 0 0 L 30 0 L 90 -30" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="90" cy="-30" r="3" fill="#3b82f6" />
              </svg>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
