"use client";
import { useEffect, useRef } from "react";
import { useAuthModal } from "@/context/AuthModalContext";

const cards = [
  {
    number: "01",
    title: "The Science of Fat",
    body: "How fat is stored, why it accumulates around your organs, and the precise 4-step process your body uses to burn it. What you learn here changes every decision you make.",
    tag: "PAGES 5–9",
    featured: true,
  },
  {
    number: "02",
    title: "Hormones & Weight",
    body: "Insulin, cortisol, leptin, ghrelin — these four control your hunger, your fat storage, and your mood. Learn why you're not weak-willed. You're hormonally mis-calibrated.",
    tag: "PAGE 9",
    featured: false,
  },
  {
    number: "03",
    title: "Diet by Timeline",
    body: "Aggressive, moderate, or sustainable — the right deficit for your goal and timeline. Plus: Indian food decoded with real calorie data for roti, dal, rice, and more.",
    tag: "PAGES 10–13",
    featured: false,
  },
  {
    number: "04",
    title: "8-Week Training Plan",
    body: "Weeks 1–4 full-body foundation. Weeks 5–8 upper/lower split with HIIT. Equipment optional. Progressive overload built in. Designed for beginners and intermediate gym-goers.",
    tag: "PAGES 14–17",
    featured: false,
  },
  {
    number: "05",
    title: "Sleep & Recovery",
    body: "A sleep hygiene protocol that actually works, stress management techniques backed by cortisol research, and a guide to active recovery that prevents burnout.",
    tag: "PAGES 18–19",
    featured: false,
  },
  {
    number: "06",
    title: "Blood Tests & Markers",
    body: "8 key tests — HbA1c, lipid panel, thyroid profile, haemoglobin, PCOD panel and more — with target ranges and testing frequency. Stop guessing what's happening inside.",
    tag: "PAGE 20",
    featured: false,
  },
];

function ContentCard({ card, delay }: { card: typeof cards[0]; delay: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
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
      ref={ref}
      className="reveal"
      style={{
        border: card.featured ? "2px solid #0A0A0A" : "2px solid #E5E5E5",
        borderTop: card.featured ? "4px solid #EF4444" : "4px solid #0A0A0A",
        padding: 28,
        background: "#FAFAFA",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Number circle */}
      <div
        style={{
          width: 40,
          height: 40,
          background: "#0A0A0A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <span className="font-archivo" style={{ fontSize: 16, color: "#FAFAFA" }}>
          {card.number}
        </span>
      </div>

      <h3 className="font-archivo" style={{ fontSize: 18, color: "#0A0A0A", marginBottom: 12 }}>
        {card.title}
      </h3>
      <p className="font-work" style={{ fontSize: 15, color: "#525252", lineHeight: 1.7, marginBottom: 20 }}>
        {card.body}
      </p>

      <span
        className="font-work"
        style={{
          fontSize: 10,
          color: "#EF4444",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 700,
          display: "inline-block",
          borderBottom: "1px solid #EF4444",
          paddingBottom: 2,
        }}
      >
        {card.tag}
      </span>
    </div>
  );
}

export default function WhatsInside() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const { openModal } = useAuthModal();

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) el.querySelectorAll(".reveal").forEach((c) => c.classList.add("visible")); }),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="whats-inside" style={{ background: "#FAFAFA", padding: "96px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: 56 }}>
          <p className="reveal overline stagger-1" style={{ color: "#EF4444", marginBottom: 12 }}>
            THE GUIDE — 21 PAGES
          </p>
          <h2
            className="reveal font-archivo stagger-2"
            style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "#0A0A0A", marginBottom: 20 }}
          >
            Everything You Were Never Taught
          </h2>
          <p
            className="reveal font-work stagger-3"
            style={{ fontSize: 18, color: "#525252", lineHeight: 1.7 }}
          >
            One free download. No email needed. No upsell waiting at the end.
          </p>
        </div>

        {/* 3-column grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
          className="content-grid"
        >
          {cards.map((card, i) => (
            <ContentCard key={card.number} card={card} delay={i * 100} />
          ))}
        </div>

        {/* Full-width black bar */}
        <div
          style={{
            background: "#0A0A0A",
            marginTop: 48,
            padding: "32px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
          className="cta-banner"
        >
          <p className="font-work" style={{ fontSize: 18, color: "#FAFAFA", margin: 0, lineHeight: 1.5 }}>
            All 21 pages. No supplements. Verify via WhatsApp, pay once, get instant access.
          </p>
          <button onClick={openModal} className="btn-primary">
            Get the Guide →
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .content-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .content-grid { grid-template-columns: 1fr !important; }
          .cta-banner { flex-direction: column; text-align: center; }
          .cta-banner button { width: 100%; }
        }
      `}</style>
    </section>
  );
}
