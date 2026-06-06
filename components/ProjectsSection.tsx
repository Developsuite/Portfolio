"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";

const projects = [
  { id: "01", image: "/projects_images/1.png", link: "https://github.com/MQ-06/Aurora" },
  { id: "02", image: "/projects_images/2.png", link: "https://github.com/kinzamalik18/FlowCraft" },
  { id: "03", image: "/projects_images/3.png", link: "https://github.com/MQ-06/STREETLIGHT-PK" },
  { id: "04", image: "/projects_images/4.png", link: "https://github.com/kinzamalik18/Openclaw-security-analysis" },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isHovering) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [isHovering]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-16 md:py-24 xl:py-32 px-6 lg:px-8 bg-black z-20 transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 40 }}
          whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-row items-center justify-center gap-4 md:gap-8 mb-12 md:mb-16 xl:mb-20 w-full transition-all duration-300"
        >
          <div className="h-[2px] md:h-[3px] flex-1 max-w-[80px] md:max-w-[200px] bg-gradient-to-r from-transparent to-white/40" />
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-none font-black text-white text-center whitespace-nowrap transition-all duration-300"
            style={{
              fontFamily: 'var(--font-outfit), "Outfit", sans-serif',
              letterSpacing: '-0.04em',
            }}
          >
            My Projects
          </h2>
          <div className="h-[2px] md:h-[3px] flex-1 max-w-[80px] md:max-w-[200px] bg-gradient-to-l from-transparent to-white/40" />
        </motion.div>

        {/* Carousel Container */}
        <motion.div 
          initial={isMobile ? false : { opacity: 0, y: 50, scale: 0.95 }}
          whileInView={isMobile ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative max-w-4xl mx-auto flex items-center justify-center min-h-[250px] sm:min-h-[350px] lg:min-h-[400px] xl:min-h-[500px] transition-all duration-300"
        >
          
          {/* Previous Button */}
          <button 
            onClick={handlePrev}
            className="absolute left-2 sm:-left-12 lg:-left-24 xl:-left-28 z-20 flex items-center justify-center hover:scale-125 active:scale-95 text-white/80 sm:text-white/60 hover:text-white transition-all bg-black/40 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none rounded-full p-2 sm:p-0"
            aria-label="Previous project"
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 xl:w-14 xl:h-14 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image Track */}
          <a 
            href={projects[currentIndex].link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block w-full h-[250px] sm:h-[350px] lg:h-[400px] xl:h-[500px] overflow-hidden rounded-[20px] lg:rounded-[24px] border border-white/10 shadow-2xl bg-[#0a0a0a] cursor-none transition-all duration-300"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <Image
                  src={projects[currentIndex].image}
                  alt={`Project ${projects[currentIndex].id}`}
                  fill
                  quality={100}
                  className="object-cover object-top"
                />
                {/* Subtle dark overlay to match overall theme */}
                <div className="absolute inset-0 bg-black/5 pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </a>

          {/* Next Button */}
          <button 
            onClick={handleNext}
            className="absolute right-2 sm:-right-12 lg:-right-24 xl:-right-28 z-20 flex items-center justify-center hover:scale-125 active:scale-95 text-white/80 sm:text-white/60 hover:text-white transition-all bg-black/40 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none rounded-full p-2 sm:p-0"
            aria-label="Next project"
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 xl:w-14 xl:h-14 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Custom Cursor Overlay */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed pointer-events-none z-50 flex items-center justify-center bg-white text-black font-black uppercase tracking-wider text-[10px] rounded-full w-16 h-16 shadow-2xl"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              x: "-50%",
              y: "-50%",
            }}
          >
            Open
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
