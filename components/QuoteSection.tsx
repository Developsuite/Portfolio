"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function QuoteSection() {
  return (
    <section className="relative py-8 md:py-16 px-5 lg:px-8 bg-black z-20 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col lg:flex-row bg-[#0a0a0a] rounded-[24px] lg:rounded-[32px] overflow-hidden border border-white/10 shadow-2xl"
        >
          {/* Content Container (Left Side) */}
          <div className="flex-[1.2] p-6 md:p-10 lg:p-12 flex flex-col justify-center relative">
            {/* Large Decorative Quote */}
            <span className="text-5xl md:text-7xl font-black text-blue-500 leading-none absolute top-4 left-4 md:top-8 md:left-8 opacity-80 select-none">
              &ldquo;
            </span>

            <div className="relative z-10 mt-3 md:mt-6">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-white/90 leading-relaxed mb-6 md:mb-8">
                I focus on building solutions that are technically strong and useful in real-world situations. My background in AI, databases, and mobile applications allows me to understand product development from idea to implementation.
              </p>

              <div className="h-px w-full bg-white/10 mb-5 md:mb-6" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <h4 className="text-sm md:text-base font-bold text-white">Kinz ul eman</h4>
                  <p className="text-white/50 text-[10px] md:text-xs mt-0.5 md:mt-1">AI/ML Engineer & Full-Stack Developer</p>
                </div>

                {/* 5 Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 md:w-5 md:h-5 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Image Container (Right Side) */}
          <div className="flex-1 relative min-h-[200px] sm:min-h-[300px] lg:min-h-[400px] overflow-hidden bg-black lg:border-l border-t lg:border-t-0 border-white/5">
            <Image
              src="/kinz.png"
              alt="Kinz ul eman"
              fill
              className="object-cover object-center"
            />
            {/* Bottom Fade Gradient over the image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
