"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/* ── Career data ─────────────────────────────────────────── */
const milestones = [
  {
    year: "NOW",
    title: "Learning Something New",
    subtitle: "Self-Development",
    description:
      "Continuously exploring emerging technologies, researching advanced AI systems, and pushing the boundaries of what's possible in tech.",
  },
  {
    year: "2025",
    title: "AI Engineer",
    subtitle: "Freelance & Projects",
    description:
      "Developing intelligent AI systems, chatbots, and machine learning solutions. Building next-gen conversational AI agents and JARVIS-like personal assistants.",
  },
  {
    year: "2024",
    title: "Full-Stack Developer",
    subtitle: "Freelance & Projects",
    description:
      "Built complete web applications from frontend to backend. Developed responsive UIs, RESTful APIs, and database solutions for various clients and projects.",
  },
  {
    year: "2023",
    title: "ML Researcher",
    subtitle: "Academic & Research",
    description:
      "Explored deep learning architectures, published research on NLP techniques, and built prototype models for sentiment analysis and text generation.",
  },
  {
    year: "2022",
    title: "The Beginning",
    subtitle: "Foundations",
    description:
      "Started the journey into programming and data science. Learned Python, statistics, and the fundamentals of machine learning through intensive self-study.",
  },
];

/* ── Single milestone card (left side) ───────────────────── */
function MilestoneCard({
  m,
  index,
}: {
  m: (typeof milestones)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="tl-card"
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Year badge */}
      <div className={`tl-year-badge ${index === 0 ? "tl-year-badge--now" : ""}`}>
        {m.year}
      </div>

      {/* Title & Subtitle */}
      <h3 className="tl-card-title">{m.title}</h3>
      <span className="tl-card-subtitle">{m.subtitle}</span>

      {/* Description */}
      <p className="tl-card-desc">{m.description}</p>

      {/* Dot on the line */}
      <div className={`tl-line-dot ${index === 0 ? "tl-line-dot--active" : ""}`} />
    </motion.div>
  );
}

/* ── Main section ────────────────────────────────────────── */
export default function CareerTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  /* scroll-driven bulb + line fill */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.65"],
  });

  /* The glowing fill line grows from 0% → 100% */
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /* The bulb travels from top → bottom of the line (in %) */
  const bulbTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /* Bulb glow intensity ramps up quickly then stays */
  const bulbGlow = useTransform(scrollYProgress, [0, 0.08, 1], [0.2, 1, 1]);

  /* heading */
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section ref={sectionRef} id="career" className="tl-section">
      {/* ── Heading ───────────────────────────────── */}
      <motion.div
        ref={headRef}
        className="tl-heading"
        initial={{ opacity: 0, y: 30 }}
        animate={headInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <h2 className="tl-heading-text">
          My career &amp;{"\n"}
          <span className="tl-heading-accent">experience</span>
        </h2>
      </motion.div>

      {/* ── Timeline body ─────────────────────────── */}
      <div className="tl-body">
        {/* ── The vertical line (right side) ──────── */}
        <div className="tl-rail">
          {/* faint background track */}
          <div className="tl-rail-track" />

          {/* glowing filled portion */}
          <motion.div className="tl-rail-fill" style={{ height: fillHeight }} />

          {/* ── 3D Bulb orb that travels down ─────── */}
          <motion.div
            className="tl-bulb-wrapper"
            style={{ top: bulbTop, opacity: bulbGlow }}
          >
            {/* Outer bloom / ambient glow */}
            <div className="tl-bulb-bloom" />
            {/* Mid glow ring */}
            <div className="tl-bulb-mid" />
            {/* Core bright spot */}
            <div className="tl-bulb-core" />
            {/* Lens-flare streaks */}
            <div className="tl-bulb-flare tl-bulb-flare--h" />
            <div className="tl-bulb-flare tl-bulb-flare--v" />
          </motion.div>
        </div>

        {/* ── Milestone cards (left side) ─────────── */}
        <div className="tl-cards">
          {milestones.map((m, i) => (
            <MilestoneCard key={m.year} m={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
