"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-10 md:py-16 px-6 lg:px-8 z-20"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 50 }}
          whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12"
        >
          {/* Left Side Container */}
          <div className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left relative z-30">
            <div className="relative inline-block cursor-default">
              <h2 
                className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter mb-3 uppercase relative z-10 transition-colors duration-300 hover:text-blue-400"
                style={{ fontFamily: 'var(--font-outfit), "Outfit", sans-serif' }}
              >
                Kinz ul eman
              </h2>
            </div>
            <p className="text-white/60 text-sm md:text-base font-medium max-w-md leading-relaxed">
              AI/ML Engineer & Full-Stack Developer specializing in scalable, intelligent solutions and complete product development.
            </p>
          </div>

          {/* Right Side Container */}
          <div className="flex-1 flex flex-col items-center lg:items-end text-center lg:text-right gap-3 md:gap-4 w-full mt-4 lg:mt-0">
            
            <div className="w-full flex flex-col items-center lg:items-end">
              <h3 className="text-blue-400/80 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">
                Contact through E-mail
              </h3>
              <a 
                href="mailto:kinzuleman018@gmail.com" 
                className="text-base md:text-xl font-bold text-white hover:text-blue-400 transition-colors"
              >
                kinzuleman018@gmail.com
              </a>
            </div>

            <div className="w-full h-px bg-white/5 my-0.5 md:my-1" />

            <div className="w-full flex flex-col items-center lg:items-end">
              <h3 className="text-blue-400/80 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">
                LinkedIn Profile
              </h3>
              <a 
                href="https://linkedin.com/in/kinzuleman" 
                target="_blank" 
                rel="noreferrer"
                className="text-base md:text-lg font-bold text-white hover:text-blue-400 transition-colors"
              >
                linkedin.com/in/kinzuleman
              </a>
            </div>
            
            <div className="w-full h-px bg-white/5 my-0.5 md:my-1" />

            <div className="w-full flex flex-col items-center lg:items-end">
              <h3 className="text-blue-400/80 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">
                GitHub Profile
              </h3>
              <a 
                href="https://github.com/kinzuleman" 
                target="_blank" 
                rel="noreferrer"
                className="text-base md:text-lg font-bold text-white hover:text-blue-400 transition-colors"
              >
                github.com/kinzuleman
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
