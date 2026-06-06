"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useIsMobile } from "@/hooks/useIsMobile";

// Dynamically import Lanyard with SSR disabled to prevent Canvas rendering issues
const Lanyard = dynamic(() => import("./Lanyard"), { ssr: false });

const aiTags = [
  { text: "Deep Learning", top: "20%", left: "10%", delay: 0 },
  { text: "Neural Networks", top: "60%", left: "15%", delay: 1.2, hideOnMobile: true },
  { text: "Generative AI", top: "30%", right: "12%", delay: 0.5 },
  { text: "Computer Vision", top: "70%", right: "8%", delay: 1.8, hideOnMobile: true },
  { text: "NLP Models", top: "85%", left: "25%", delay: 2.1, hideOnMobile: true },
  { text: "LLM Orchestration", top: "15%", right: "25%", delay: 0.8, hideOnMobile: true },
];

export default function LanyardSection() {
  const isMobile = useIsMobile();

  return (
    <motion.section 
      initial={isMobile ? false : { opacity: 0 }}
      whileInView={isMobile ? undefined : { opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative w-full h-[75vh] md:h-[100vh] bg-black overflow-hidden border-t border-white/10"
    >
      {/* Cinematic Top Spotlight Glow */}
      <div className="absolute top-[-100px] md:top-[-200px] left-1/2 -translate-x-1/2 w-[150%] md:w-[800px] h-[200px] md:h-[400px] bg-white/[0.07] blur-[60px] md:blur-[100px] rounded-[100%] pointer-events-none z-0" />
      <div className="absolute top-[-50px] md:top-[-100px] left-1/2 -translate-x-1/2 w-[100%] md:w-[300px] h-[100px] md:h-[200px] bg-white/[0.15] blur-[40px] md:blur-[80px] rounded-[100%] pointer-events-none z-0" />

      {/* Floating AI/ML Tags */}
      {aiTags.map((tag, index) => (
        <motion.div
          key={index}
          className={`absolute z-0 pointer-events-none px-3 py-1.5 md:px-5 md:py-2.5 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md text-white/90 font-mono text-[10px] sm:text-xs md:text-sm lg:text-base whitespace-nowrap shadow-[0_0_15px_rgba(255,255,255,0.05)] md:shadow-[0_0_25px_rgba(255,255,255,0.05)] ${tag.hideOnMobile ? 'hidden md:flex' : 'flex'}`}
          style={{ top: tag.top, left: tag.left, right: tag.right }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: tag.delay,
          }}
        >
          {tag.text}
        </motion.div>
      ))}

      {/* 3D Interactive Lanyard Background */}
      <div className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-10">
        <Lanyard position={[0, 0, 25]} gravity={[0, -40, 0]} />
      </div>

    </motion.section>
  );
}
