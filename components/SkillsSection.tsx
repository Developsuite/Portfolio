"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SkillsCanvas from "./SkillsCanvas";

export default function SkillsSection() {
  const headerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start 90%", "start 40%"]
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const headingY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const headingScale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <>
      <section
        id="skills"
        ref={headerRef}
        className="relative pt-16 pb-8 px-6 lg:px-8 bg-black z-20"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            style={{ opacity: headingOpacity, y: headingY, scale: headingScale }}
            className="flex flex-row items-center justify-center gap-4 md:gap-8 pb-4 w-full"
          >
            {/* Left Line */}
            <div className="h-[2px] md:h-[3px] flex-1 max-w-[80px] md:max-w-[200px] bg-gradient-to-r from-transparent to-white/40" />
            
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none font-black text-white text-center whitespace-nowrap"
              style={{
                fontFamily: 'var(--font-outfit), "Outfit", sans-serif',
                letterSpacing: '-0.04em',
              }}
            >
              My Skills
            </h2>

            {/* Right Line */}
            <div className="h-[2px] md:h-[3px] flex-1 max-w-[80px] md:max-w-[200px] bg-gradient-to-l from-transparent to-white/40" />
          </motion.div>
      </div>
      </section>

      <SkillsCanvas />
    </>
  );
}
