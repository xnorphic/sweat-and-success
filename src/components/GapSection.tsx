"use client";
import { useEffect, useRef } from "react";

const rows = [
  {
    problem: {
      title: "Supplements Pushed",
      body: "Gyms, trainers, and apps push expensive supplements as essential — protein powders, fat burners, pre-workouts — profiting from your dependency.",
    },
    solution: {
      title: "Zero Supplements. Full Stop.",
      body: "We sell zero supplements. Not one. Our programme works entirely on whole food, science-backed training, and lifestyle — because that's what the research actually supports.",
    },
  },
  {
    problem: {
      title: "Generic Plans",
      body: "One-size-fits-all diet plans ignore your body weight, TDEE, hormone profile, and cultural food context. Indian food is treated as the enemy.",
    },
    solution: {
      title: "Indian Food Decoded",
      body: "We decode real Indian food — roti, dal, rice, paneer — within your caloric targets. You don't need to eat like a Western bodybuilder to lose fat.",
    },
  },
  {
    problem: {
      title: "No Science Taught",
      body: "No programme teaches you how fat actually burns, why your hormones are working against you, or what your blood tests mean. You stay dependent.",
    },
    solution: {
      title: "Every Claim Cited",
      body: "Every claim in our guide is cited from peer-reviewed journals. You learn the science so you understand your own body — not just follow instructions blindly.",
    },
  },
  {
    problem: {
      title: "Recovery Ignored",
      body: "Most programmes focus only on workout and diet. Sleep deprivation, chronic stress, and cortisol are never addressed — even though they directly cause fat storage.",
    },
    solution: {
      title: "All Four Pillars Covered",
      body: "We cover all four pillars: Exercise, Diet, Rest, and Recovery. Sleep hygiene and cortisol management are part of the programme — not afterthoughts.",
    },
  },
  {
    problem: {
      title: "No Community",
      body: "You download a PDF, close it, and you're alone. There's no accountability, no one to ask questions, and no real community behind the plan.",
    },
    solution: {
      title: "The Community IS the Programme",
      body: "Join the Sweat & Success WhatsApp community — post workouts, ask questions, share meals, and hold each other accountable.",
    },
  },
];

function ComparisonRow({ problem, solution, index }: { problem: { title: string; body: string }; solution: { title: string; body: string }; index: number }) {
  const rowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = el.querySelectorAll(".reveal");
            cards.forEach((c) => c.classList.add("visible"));
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}
      className="comparison-row"
    >
      {/* Problem Card */}
      <div
        className="reveal problem-card stagger-1"
        style={{ padding: 28, border: "2px solid #FEE2E2" }}
      >
        <p className="overline" style={{ color: "#EF4444", marginBottom: 10, fontSize: 10 }}>
          ✕ THE PROBLEM
        </p>
        <h3
          className="font-archivo"
          style={{ fontSize: 18, color: "#0A0A0A", marginBottom: 12 }}
        >
          {problem.title}
        </h3>
        <p className="font-work" style={{ fontSize: 15, color: "#525252", lineHeight: 1.7 }}>
          {problem.body}
        </p>
      </div>

      {/* Solution Card */}
      <div
        className="reveal solution-card stagger-2"
        style={{ padding: 28, border: "2px solid #BBF7D0" }}
      >
        <p className="overline" style={{ color: "#16A34A", marginBottom: 10, fontSize: 10 }}>
          ✓ SWEAT &amp; SUCCESS
        </p>
        <h3
          className="font-archivo"
          style={{ fontSize: 18, color: "#0A0A0A", marginBottom: 12 }}
        >
          {solution.title}
        </h3>
        <p className="font-work" style={{ fontSize: 15, color: "#525252", lineHeight: 1.7 }}>
          {solution.body}
        </p>
      </div>
    </div>
  );
}

export default function GapSection() {
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll(".reveal").forEach((c) => c.classList.add("visible"));
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="gap" style={{ background: "#FAFAFA", padding: "96px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: 56 }}>
          <p className="reveal overline stagger-1" style={{ color: "#EF4444", marginBottom: 12 }}>
            THE PROBLEM WITH EXISTING PROGRAMMES
          </p>
          <h2
            className="reveal font-archivo stagger-2"
            style={{ fontSize: "clamp(32px, 4vw, 52px)", color: "#0A0A0A", marginBottom: 20 }}
          >
            The Industry Keeps You Confused. We Don&apos;t.
          </h2>
          <p
            className="reveal font-work stagger-3"
            style={{ fontSize: 18, color: "#525252", maxWidth: 640, lineHeight: 1.7 }}
          >
            Every gym programme, influencer plan, and diet app misses at least 3 of the 4 pillars of real fat loss. Here&apos;s exactly where they fall short — and where we close the gap.
          </p>
        </div>

        {/* Column Headers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginBottom: 16,
            borderBottom: "2px solid #E5E5E5",
            paddingBottom: 12,
          }}
          className="comparison-headers"
        >
          <p className="overline" style={{ color: "#EF4444" }}>THE PROBLEM</p>
          <p className="overline" style={{ color: "#16A34A" }}>SWEAT &amp; SUCCESS</p>
        </div>

        {/* Comparison Rows */}
        {rows.map((row, i) => (
          <ComparisonRow key={i} index={i} problem={row.problem} solution={row.solution} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .comparison-row { grid-template-columns: 1fr !important; }
          .comparison-headers { display: none !important; }
        }
      `}</style>
    </section>
  );
}
