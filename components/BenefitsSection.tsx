"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";

const benefits = [
  {
    id: "machine-learning",
    title: "Machine Learning Engineering",
    description: "Architecting, training, and deploying high-performance ML models that solve complex real-world problems efficiently.",
    image: "/why/hello.png"
  },
  {
    id: "scalable",
    title: "Scalable Architecture",
    description: "Building robust, scalable AI models and architectures designed to handle complex, enterprise-level workloads.",
    image: "/why/hi.png"
  },
  {
    id: "data",
    title: "Data Strategy",
    description: "Driving innovation through advanced data analytics, extracting meaningful insights to power your next big leap.",
    image: "/why/bye.png"
  }
];

export default function BenefitsSection() {
  const [activeId, setActiveId] = useState(benefits[0].id);
  const isMobile = useIsMobile();

  return (
    <section className="relative w-full py-12 md:py-16 xl:py-24 px-6 lg:px-8 bg-black text-white overflow-hidden z-20">
      <motion.div 
        initial={isMobile ? false : { opacity: 0, y: 40 }}
        whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-[940px] xl:max-w-6xl mx-auto transition-all duration-300"
      >
        
        {/* Heading container */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 md:mb-12 xl:mb-16 gap-8 relative transition-all duration-300">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight transition-all duration-300" style={{ fontFamily: 'var(--font-outfit), "Outfit", sans-serif', letterSpacing: '-0.04em' }}>
            Why Kinz?
          </h2>

          {/* Doodle Label (visible on wide screens) */}
          <div className="hidden lg:flex absolute bottom-[-30px] xl:bottom-[-45px] right-[12%] items-center gap-3 xl:gap-4 text-white/50 -rotate-3 select-none transition-all duration-300">
            <span 
              className="text-2xl xl:text-4xl font-medium tracking-wide transition-all duration-300" 
              style={{ fontFamily: 'var(--font-caveat), "Caveat", cursive' }}
            >
              Hover it
            </span>
            <svg viewBox="0 0 70 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 translate-y-2 xl:translate-y-3 w-[50px] h-[40px] xl:w-[70px] xl:h-[50px] transition-all duration-300">
              <path d="M10 10 Q 35 12, 50 35" />
              <path d="M38 30 L50 35 L48 20" />
            </svg>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="flex flex-col lg:flex-row w-full gap-4 h-auto lg:h-[300px] xl:h-[400px] transition-all duration-300">
          {benefits.map((benefit, idx) => {
            const isActive = activeId === benefit.id;
            return (
              <motion.div
                key={benefit.id}
                initial={isMobile ? false : { opacity: 0, y: 30 }}
                whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                className={`relative rounded-[20px] xl:rounded-[24px] overflow-hidden cursor-pointer group transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] flex-shrink-0 lg:flex-shrink
                  ${isActive ? 'h-[220px] lg:h-full lg:flex-[2.5]' : 'h-[80px] lg:h-full lg:flex-[1]'}`}
                onMouseEnter={() => setActiveId(benefit.id)}
                onClick={() => setActiveId(benefit.id)}
              >
                {/* Background Image */}
                <Image
                  src={benefit.image}
                  alt={benefit.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay (Performant) */}
                <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

                {/* Content (Active State) */}
                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 lg:p-6 xl:p-8 flex flex-col justify-end h-full">
                  <h3 className={`text-base sm:text-lg lg:text-2xl xl:text-3xl font-bold whitespace-normal lg:whitespace-nowrap mb-1 lg:mb-2 transition-all duration-500 delay-100
                    ${isActive ? 'opacity-100 translate-x-0' : 'opacity-100 lg:opacity-0 lg:-translate-x-8'}`}>
                    {benefit.title}
                  </h3>
                  
                  <div className={`overflow-hidden transition-all duration-500 delay-200
                    ${isActive ? 'max-h-40 opacity-100 mt-1 lg:mt-2' : 'max-h-0 opacity-0'}`}>
                    <p className="text-white/70 text-xs lg:text-sm xl:text-base pr-4 lg:pr-12 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>

                {/* Closed State Title (Vertical for desktop) */}
                <div className={`hidden lg:flex absolute inset-0 transition-opacity duration-500 
                  ${!isActive ? 'opacity-100 delay-300' : 'opacity-0'}`}>
                  <h3 className="absolute bottom-6 xl:bottom-8 left-1/2 -translate-x-1/2 origin-left -rotate-90 text-sm xl:text-lg font-bold whitespace-nowrap tracking-wider text-white/80 transition-all duration-300">
                    {benefit.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
}
