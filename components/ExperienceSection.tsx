"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const experiences = [
  {
    role: "AI/ML Engineer",
    company: "AI Solutions Inc.",
    period: "2023 — Present",
    description:
      "Leading development of production ML pipelines. Designed transformer-based NLP systems serving 1M+ daily requests. Reduced model inference time by 40% through architecture optimization.",
    tags: ["PyTorch", "Transformers", "AWS", "MLflow"],
    current: true,
  },
  {
    role: "Machine Learning Engineer",
    company: "DataTech Labs",
    period: "2022 — 2023",
    description:
      "Built computer vision pipelines for real-time object detection. Implemented automated model retraining workflows with drift monitoring. Collaborated with cross-functional teams on data strategy.",
    tags: ["TensorFlow", "OpenCV", "Docker", "GCP"],
    current: false,
  },
  {
    role: "Data Scientist",
    company: "Analytics Corp",
    period: "2021 — 2022",
    description:
      "Developed predictive models for customer churn and revenue forecasting. Created interactive dashboards for stakeholder communication. Implemented A/B testing frameworks for model evaluation.",
    tags: ["Python", "Scikit-Learn", "SQL", "Tableau"],
    current: false,
  },
  {
    role: "Research Assistant — ML",
    company: "University AI Lab",
    period: "2020 — 2021",
    description:
      "Conducted research on few-shot learning and meta-learning approaches. Published findings on efficient fine-tuning of large language models. Mentored junior researchers on ML experimentation.",
    tags: ["Research", "NLP", "Few-Shot", "Publications"],
    current: false,
  },
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-32 px-6 lg:px-8 section-gradient-alt"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 30 }}
          animate={isMobile ? { opacity: 1, y: 0 } : (isInView ? { opacity: 1, y: 0 } : {})}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 space-y-4"
        >
          <span className="code-tag">experience.timeline()</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            A track record of delivering impactful AI/ML solutions across
            industries and scale.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[19px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-electric/40 via-cyan/20 to-transparent" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.role}
              initial={isMobile ? false : { opacity: 0, y: 40 }}
              animate={isMobile ? { opacity: 1, y: 0 } : (isInView ? { opacity: 1, y: 0 } : {})}
              transition={{
                duration: 0.6,
                delay: idx * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={`relative flex flex-col md:flex-row gap-4 md:gap-8 mb-12 last:mb-0 ${
                idx % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-2">
                <div
                  className={`w-[18px] h-[18px] rounded-full border-2 ${
                    exp.current
                      ? "border-electric bg-electric/30 shadow-[0_0_12px_rgba(0,123,255,0.5)]"
                      : "border-white/20 bg-navy-800"
                  }`}
                />
              </div>

              {/* Content Card */}
              <div
                className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                  idx % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                }`}
              >
                <div
                  className={`glass-card p-6 ${
                    exp.current ? "border-electric/20" : ""
                  }`}
                >
                  {/* Period */}
                  <span className="text-xs font-mono text-electric/80 tracking-wider uppercase">
                    {exp.period}
                  </span>

                  {/* Role */}
                  <h3 className="text-xl font-bold text-white/90 mt-2">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-cyan/70 font-medium mt-0.5">
                    {exp.company}
                  </p>

                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed mt-3">
                    {exp.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-[11px] font-mono text-white/40 bg-white/[0.04] rounded-full border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
