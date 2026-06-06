"use client";
import { useEffect, useRef } from "react";
import { useCounterAnimation } from "@/hooks/useScrollReveal";

const pillars = [
  {
    number: 1,
    name: "EXERCISE",
    accent: "#EF4444",
    body: "Build and preserve muscle mass to raise your resting metabolic rate. Resistance training + progressive overload + HIIT in an 8-week programme designed for real gym-goers and beginners alike.",
    footer: "PAGES 14–17 · Section 3",
  },
  {
    number: 2,
    name: "DIET",
    accent: "#FAFAFA",
    body: "No meal plan survives contact with real life. We give you the calorie and macro framework to build around Indian food — roti, dal, rice, paneer — without guilt, restriction, or eliminating entire food groups.",
    footer: "PAGES 10–13 · Section 2",
  },
  {
    number: 3,
    name: "REST",
    accent: "#FAFAFA",
    body: "Sleep is the most underrated fat-loss tool. Two nights of poor sleep raises ghrelin by 28%, suppresses leptin, and spikes cortisol — making you hungrier and fatter. We fix the sleep and recovery cycle, not just the workout.",
    footer: "PAGE 18 · Section 4",
  },
  {
    number: 4,
    name: "RECOVERY",
    accent: "#EF4444",
    body: "Chronic stress is the silent fat-gain trigger nobody addresses. Elevated cortisol promotes visceral fat, breaks down muscle, and spikes appetite. We include stress management, active recovery, and mobility — because they're not optional.",
    footer: "PAGE 19 · Section 4",
  },
];

function PillarCard({ pillar, delay }: { pillar: typeof pillars[0]; delay: number }) {
  const counterRef = useCounterAnimation(pillar.number, 800);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) el.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="pillar-card reveal"
      style={{
        background: "#141414",
        border: "2px solid #1A1A1A",
        borderTop: `4px solid ${pillar.accent}`,
        padding: 32,
        transitionDelay: `${delay}ms`,
      }}
    >
      <span
        ref={counterRef}
        className="font-archivo"
        style={{ fontSize: 56, color: pillar.accent, lineHeight: 1, display: "block" }}
      >
        0{pillar.number}
      </span>
      <h3
        className="font-archivo"
        style={{ fontSize: 24, color: "#FAFAFA", margin: "8px 0" }}
      >
        {pillar.name}
      </h3>
      <p
        className="font-work"
        style={{ fontSize: 15, color: "#A3A3A3", lineHeight: 1.7 }}
      >
        {pillar.body}
      </p>
      <div style={{ borderTop: "1px solid #2A2A2A", margin: "20px 0" }} />
      <p
        className="font-work"
        style={{ fontSize: 12, color: "#525252", letterSpacing: "0.06em", textTransform: "uppercase" }}
      >
        {pillar.footer}
      </p>
    </div>
  );
}

export default function FourPillars() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const targets = [headerRef.current, barRef.current];
    targets.forEach((el) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { el.querySelectorAll(".reveal, .red-bar").forEach((c) => c.classList.add("visible")); } }),
        { threshold: 0.1 }
      );
      observer.observe(el);
    });
  }, []);

  return (
    <section id="pillars" style={{ background: "#0A0A0A", padding: "96px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: 56 }}>
          <p className="reveal overline stagger-1" style={{ color: "#EF4444", marginBottom: 12 }}>
            360° WELLNESS COVERAGE
          </p>
          <h2
            className="reveal font-archivo stagger-2"
            style={{ fontSize: "clamp(32px, 4vw, 52px)", color: "#FAFAFA", marginBottom: 20 }}
          >
            Four Pillars. One Complete System.
          </h2>
          <p
            className="reveal font-work stagger-3"
            style={{ fontSize: 18, color: "#A3A3A3", maxWidth: 600, lineHeight: 1.7 }}
          >
            Most programmes work one pillar and ignore the rest. We built a system where each pillar amplifies the others — so you stop guessing and start compounding results.
          </p>
          <div ref={barRef} className="red-bar" style={{ marginTop: 24 }} />
        </div>

        {/* 2×2 Grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          className="pillars-grid"
        >
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.name} pillar={pillar} delay={i * 100} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
