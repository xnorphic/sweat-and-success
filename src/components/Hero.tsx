"use client";
import { useEffect, useRef } from "react";
import { useCounterAnimation } from "@/hooks/useScrollReveal";
import { useAuthModal } from "@/context/AuthModalContext";

function StatBlock({ number, label, borderAccent }: { number: number; label: string; borderAccent: boolean }) {
  const counterRef = useCounterAnimation(number);
  return (
    <div style={{ border: "2px solid #1A1A1A", padding: 24 }}>
      <span
        ref={counterRef}
        className="font-archivo"
        style={{ fontSize: "clamp(48px, 8vw, 80px)", color: borderAccent ? "#EF4444" : "#FAFAFA", lineHeight: 1, display: "block" }}
      >
        0
      </span>
      <span
        className="font-work"
        style={{ fontSize: 14, color: "#A3A3A3", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, display: "block", marginTop: 8 }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const { openModal } = useAuthModal();

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) bar.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      className="hero-texture"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: 120,
        paddingBottom: 96,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "55% 45%",
          gap: 48,
          alignItems: "center",
          width: "100%",
        }}
        className="hero-grid"
      >
        {/* Left Column */}
        <div>
          {/* Overline */}
          <p
            className="overline"
            style={{ color: "#EF4444", letterSpacing: "0.18em", marginBottom: 16 }}
          >
            SCIENCE-BACKED · NO FADS · FREE TO JOIN
          </p>

          {/* Red Accent Bar */}
          <div ref={barRef} className="red-bar visible" style={{ width: 56, marginBottom: 20 }} />

          {/* Headline */}
          <h1
            className="font-archivo"
            style={{
              fontSize: "clamp(44px, 7vw, 96px)",
              color: "#FAFAFA",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Stop Guessing.
            <br />
            Start Losing.
          </h1>

          {/* Subheadline */}
          <p
            className="font-work"
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "#A3A3A3",
              lineHeight: 1.6,
              maxWidth: 520,
              marginTop: 20,
            }}
          >
            Most people spend months at the gym following random advice and losing nothing. Sweat &amp; Success gives you the science, the programme, and the community to actually change your body — free, forever.
          </p>

          {/* CTA Row */}
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 32 }}
            className="cta-row"
          >
            <button onClick={openModal} className="btn-primary">
              Get the Guide →
            </button>
            <a
              href="https://wa.me/message/PLACEHOLDER"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Join WhatsApp Community ↗
            </a>
          </div>

          {/* Trust Line */}
          <p
            className="font-work"
            style={{ fontSize: 12, color: "#525252", marginTop: 20 }}
          >
            ✓ 21 pages &nbsp;·&nbsp; ✓ All science cited &nbsp;·&nbsp; ✓ No supplements sold &nbsp;·&nbsp; ✓ Verify via WhatsApp
          </p>
        </div>

        {/* Right Column — Stat Block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <StatBlock number={21} label="PAGES OF SCIENCE" borderAccent={true} />
          <StatBlock number={0} label="SUPPLEMENTS SOLD" borderAccent={false} />
          <StatBlock number={4} label="PILLARS COVERED" borderAccent={true} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .cta-row a, .cta-row button {
            width: 100%;
            text-align: center;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
