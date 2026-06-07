"use client";

import Navbar from "@/components/Navbar";
import HeroCanvas from "@/components/HeroCanvas";
import StatementSection from "@/components/StatementSection";
import LanyardSection from "@/components/LanyardSection";
import SkillsSection from "@/components/SkillsSection";
import SplineTimelineSection from "@/components/SplineTimelineSection";
import BenefitsSection from "@/components/BenefitsSection";
import ProjectsSection from "@/components/ProjectsSection";
import QuoteSection from "@/components/QuoteSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <main className="relative bg-navy-950 min-h-screen">
      <Navbar />

      {/* Hero — Scroll-driven image-sequence canvas */}
      <HeroCanvas />

      <StatementSection />

      {/* Section divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <SkillsSection />

      {/* Section divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <div className="section-3d-optimized">
        <SplineTimelineSection />
      </div>

      {/* Section divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <BenefitsSection />


      {/* Section divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <ProjectsSection />

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <div className="section-3d-optimized">
        <LanyardSection />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <QuoteSection />

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <ContactSection />

      <Footer />

      <ChatBot />
    </main>
  );
}
