"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left — Brand */}
          <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-2 md:gap-6">
            <span className="text-base font-bold text-white/70 tracking-tight">
              Kinz<span className="text-blue-500 font-light">.dev</span>
            </span>
            <span className="text-xs sm:text-sm text-white/50">
              © 2026 Kinz ul Eman. Built by someone who believes in her brilliance. ♥
            </span>
          </div>

          {/* Right — Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono text-white/40 hover:text-white/70 bg-white/[0.03] hover:bg-white/[0.06] rounded-lg border border-white/[0.05] transition-all duration-300 uppercase tracking-wider"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
