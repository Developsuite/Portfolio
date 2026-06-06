"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const navLinks = [
  { 
    label: "Home", 
    href: "#home",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 lg:w-4 lg:h-4 2xl:w-5 2xl:h-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  { 
    label: "About", 
    href: "#about",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 lg:w-4 lg:h-4 2xl:w-5 2xl:h-5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  },
  { 
    label: "Skills", 
    href: "#skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 lg:w-4 lg:h-4 2xl:w-5 2xl:h-5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  },
  { 
    label: "Projects", 
    href: "#projects",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 lg:w-4 lg:h-4 2xl:w-5 2xl:h-5">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 12 12 17 22 12" />
        <polyline points="2 17 12 22 22 17" />
      </svg>
    )
  },
  { 
    label: "Experience", 
    href: "#experience",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 lg:w-4 lg:h-4 2xl:w-5 2xl:h-5">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    )
  },
  { 
    label: "Contact", 
    href: "#contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 lg:w-4 lg:h-4 2xl:w-5 2xl:h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    )
  },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [showLogo, setShowLogo] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Handle Logo Visibility (Hide on scroll down, show on scroll up)
    if (latest > lastScrollY.current && latest > 50) {
      setShowLogo(false);
    } else if (latest < lastScrollY.current || latest <= 50) {
      setShowLogo(true);
    }
    lastScrollY.current = latest;

    // Determine active section
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 300) {
          setActiveSection(sections[i]);
          break;
        }
      }
    }
  });

  useEffect(() => {
    // Initial active section calculation on mount if needed
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const el = document.getElementById(href.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <>
      {/* Top Left Title */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden md:block fixed top-6 left-6 md:top-8 md:left-10 z-50 pointer-events-none"
          >
            <span className="text-xs md:text-sm font-medium tracking-widest text-white/50 uppercase">
              AI/ML Engineer
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Center Logo */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ y: -20, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: -20, opacity: 0, x: "-50%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 left-1/2 z-50 h-10 flex items-center"
          >
            <a
              href="#home"
              onClick={(e) => handleClick(e, "#home")}
              className="flex items-center gap-2 group"
            >
              <span className="text-xl md:text-2xl font-bold text-white/90 tracking-tight group-hover:text-white transition-colors">
                Kinz <span className="text-blue-500">Ul</span> Eman
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Right Resume Button */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 left-6 md:top-8 md:right-10 md:left-auto z-50 h-10 flex items-center"
          >
            <a
              href="/kinzuleman-ASE.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 md:gap-2 text-white/60 hover:text-white transition-all duration-300"
              aria-label="Resume"
              title="Resume"
            >
              <span className="text-sm md:text-base font-semibold tracking-wide">Resume</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-0.5">
                <rect x="5" y="3" width="14" height="18" rx="2" ry="2" />
                <line x1="9" y1="9" x2="15" y2="9" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="12" y2="17" />
              </svg>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Hamburger Button */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-6 right-6 z-50 h-10 flex items-center"
          >
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex flex-col justify-center items-center gap-[5px] w-10 h-10"
              aria-label="Toggle menu"
            >
              <motion.span animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="w-5 h-[2px] bg-white origin-center" />
              <motion.span animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-5 h-[2px] bg-white" />
              <motion.span animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="w-5 h-[2px] bg-white origin-center" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vertical Navigation Pill (Desktop) */}
      <div className="hidden md:block fixed right-4 lg:right-6 xl:right-8 top-[48%] -translate-y-1/2 z-50">
        <motion.nav
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
        <div className="flex flex-col items-center gap-3 lg:gap-4 2xl:gap-6 px-1.5 py-3 lg:px-2 lg:py-4 2xl:px-2.5 2xl:py-5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="group relative flex items-center justify-center p-1.5 lg:p-2 2xl:p-2.5 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label={link.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <div
                  className={`relative z-10 transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/40 group-hover:text-white"
                  }`}
                >
                  {link.icon}
                </div>
                
                {/* Hover Tooltip (Left Side) */}
                <div className="absolute right-full mr-4 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg text-xs font-semibold text-white opacity-0 translate-x-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap shadow-xl">
                  {link.label}
                </div>
              </a>
            );
          })}
        </div>
      </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl md:hidden flex flex-col items-center justify-center"
          >
            {/* Nav Links */}
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    const el = document.getElementById(link.href.replace("#", ""));
                    if (el) {
                      e.preventDefault();
                      el.scrollIntoView({ behavior: "smooth" });
                      setMobileMenuOpen(false);
                    }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-2xl font-medium text-white/70 hover:text-white"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Social Links inside Mobile Menu */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-6 mt-16"
            >
              <a href="https://github.com/kinzamalik18" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="GitHub">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </a>
              <a href="https://linkedin.com/in/kinzamalik18" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="X (Twitter)">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="Instagram">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
