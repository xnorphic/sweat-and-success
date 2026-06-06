"use client";
import { useEffect, useRef } from "react";

const trustCards = [
  {
    title: "No Supplements",
    body: "We've never sold a supplement and we never will. Everything in this guide is achievable through food, training, and lifestyle alone.",
  },
  {
    title: "No Paid Upsell",
    body: "No premium tier locked behind a paywall. The full guide is free. The community is free. There is no secret paid programme hiding behind the QR code.",
  },
  {
    title: "No Made-Up Claims",
    body: "Every fact in this guide cites a peer-reviewed journal — Nature, Lancet, Annals of Internal Medicine. If we can't cite it, we don't say it.",
  },
];

export default function NoSupplements() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const targets = [sectionRef.current, barRef.current];
    targets.forEach((el) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              el.querySelectorAll(".reveal, .red-bar-full").forEach((c) => c.classList.add("visible"));
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
    });
  }, []);

  return (
    <section id="no-supplements" style={{ background: "#0A0A0A", padding: "96px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        {/* Overline */}
        <p className="overline" style={{ color: "#EF4444", letterSpacing: "0.18em", marginBottom: 24 }}>
          OUR PROMISE
        </p>

        {/* Giant Statement */}
        <h2
          className="font-archivo"
          style={{
            fontSize: "clamp(44px, 7vw, 80px)",
            color: "#FAFAFA",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            margin: "0 0 24px",
          }}
        >
          We Sell Zero
          <br />
          Supplements.
        </h2>

        <p
          className="font-work"
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "#A3A3A3",
            maxWidth: 600,
            margin: "0 auto 48px",
            lineHeight: 1.7,
          }}
        >
          Not protein powder. Not fat burners. Not meal replacements. Not pre-workout. Not anything. Our business model is not built on your dependency — it&apos;s built on your results.
        </p>

        {/* Red Horizontal Rule */}
        <div ref={barRef} style={{ margin: "0 0 48px" }}>
          <div className="red-bar-full" style={{ maxWidth: "100%" }} />
        </div>

        {/* Three Trust Columns */}
        <div
          ref={sectionRef}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
          className="trust-grid"
        >
          {trustCards.map((card, i) => (
            <div
              key={card.title}
              className="reveal"
              style={{
                background: "#141414",
                border: "2px solid #1A1A1A",
                padding: 32,
                textAlign: "center",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <span
                className="font-archivo"
                style={{ fontSize: 64, color: "#EF4444", lineHeight: 1, display: "block", marginBottom: 16 }}
              >
                ✕
              </span>
              <h3 className="font-archivo" style={{ fontSize: 20, color: "#FAFAFA", marginBottom: 16 }}>
                {card.title}
              </h3>
              <p className="font-work" style={{ fontSize: 15, color: "#A3A3A3", lineHeight: 1.7 }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Line */}
        <p
          className="font-archivo"
          style={{ fontSize: "clamp(20px, 3vw, 28px)", color: "#FAFAFA", marginTop: 56 }}
        >
          Real results. Real science. Real community.
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .trust-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
