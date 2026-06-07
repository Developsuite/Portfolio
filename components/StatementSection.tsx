"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const Word = ({
  children,
  progress,
  range,
  isMobile,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  isMobile: boolean;
}) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span
      style={isMobile ? { opacity: 1 } : { opacity }}
      className="inline-block transition-opacity duration-300"
    >
      {children}
    </motion.span>
  );
};

export default function StatementSection() {
  const text = "I architect intelligent AI/ML models and scalable full-stack applications that turn complex problems into seamless, high-impact solutions.";
  const words = text.split(" ");
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "center center"],
  });

  return (
    <section id="about" ref={containerRef} className="relative w-full py-12 md:py-16 lg:py-24 flex flex-col items-center justify-center overflow-hidden bg-black">

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 flex flex-col items-center min-h-[150px] justify-center">
        
        {/* "Tag" - Hello! */}
        <motion.div 
          initial={isMobile ? false : { opacity: 0, y: 20 }}
          whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4 md:mb-6"
        >
          <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-white/40" />
          <span className="text-white/60 text-[10px] md:text-xs tracking-[0.15em] font-semibold">Hello!</span>
          <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-white/40" />
        </motion.div>

        {/* Main Text Content */}
        <h2 
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center leading-[1.3] tracking-tight text-white max-w-4xl z-10 flex flex-wrap justify-center gap-x-[0.25em] gap-y-1 sm:gap-y-2"
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 4 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]} isMobile={isMobile}>
                {word}
              </Word>
            );
          })}
        </h2>

        {/* Desktop Absolute Pills (Only visible on wide screens to prevent overlap on 150% zoom) */}
        <FloatingPill 
          text="Machine Learning"
          iconBg="#FFD500" iconColor="#660080" 
          delay={0.3} floatDelay={0}
          className="hidden xl:block top-[10%] left-[5%] 2xl:left-[10%]"
        />
        <FloatingPill 
          text="Full-Stack Web"
          iconBg="#474747" iconColor="#BAFFD0" 
          delay={0.4} floatDelay={1}
          className="hidden xl:block bottom-[15%] left-[8%] 2xl:left-[15%]"
        />
        <FloatingPill 
          text="Data Science"
          iconBg="#FF45AB" iconColor="#C9FFFF" 
          delay={0.5} floatDelay={0.5}
          className="hidden xl:block top-[15%] right-[5%] 2xl:right-[10%]"
        />
        <FloatingPill 
          text="System Arch."
          iconBg="#3B82F6" iconColor="#FFFFFF" 
          delay={0.6} floatDelay={1.5}
          className="hidden xl:block bottom-[20%] right-[8%] 2xl:right-[15%]"
        />

        {/* Mobile, Tablet, and Zoomed-in Pills (Flexible Row) */}
        <div className="xl:hidden flex flex-wrap items-center justify-center gap-3 mt-8 w-full max-w-3xl">
          <FloatingPill text="Machine Learning" iconBg="#FFD500" iconColor="#660080" delay={0.3} isAbsolute={false} />
          <FloatingPill text="Full-Stack Web" iconBg="#474747" iconColor="#BAFFD0" delay={0.4} isAbsolute={false} />
          <FloatingPill text="Data Science" iconBg="#FF45AB" iconColor="#C9FFFF" delay={0.5} isAbsolute={false} />
          <FloatingPill text="System Arch." iconBg="#3B82F6" iconColor="#FFFFFF" delay={0.6} isAbsolute={false} />
        </div>
        
      </div>
    </section>
  );
}

const FloatingPill = ({ text, iconBg, iconColor, delay, className = "", floatDelay = 0, isAbsolute = true }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={`${isAbsolute ? 'absolute' : 'relative'} z-20 ${className}`}
    >
      {/* Using CSS animation instead of Framer Motion infinite loop — 
           CSS animations run on the compositor thread and don't block scroll */}
      <div
        className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md rounded-full p-[5px] pr-5 cursor-pointer hover:scale-105 transition-transform border border-white/10"
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          animation: `floatPill 4s ${floatDelay}s ease-in-out infinite`,
        }}
      >
        <div 
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" 
          style={{ backgroundColor: iconBg }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill={iconColor}>
            <path d="M4 2L20 12L4 22V2Z" />
          </svg>
        </div>
        <span className="text-white font-medium text-[13px] whitespace-nowrap">{text}</span>
      </div>
    </motion.div>
  );
}
