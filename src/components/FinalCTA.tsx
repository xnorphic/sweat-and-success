"use client";
import { useEffect, useRef } from "react";

export default function FinalCTA() {
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
              el.querySelectorAll(".reveal, .red-bar").forEach((c) => c.classList.add("visible"));
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
    });
  }, []);

  return (
    <section id="final-cta" style={{ background: "#0A0A0A", padding: "120px 0" }}>
      <div
        ref={sectionRef}
        style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", textAlign: "center" }}
      >
        {/* Overline */}
        <p className="reveal overline stagger-1" style={{ color: "#EF4444", letterSpacing: "0.18em", marginBottom: 16 }}>
          YOUR MOVE
        </p>

        {/* Red Bar (centred) */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div ref={barRef} className="red-bar" />
        </div>

        {/* Headline */}
        <h2
          className="reveal font-archivo stagger-2"
          style={{
            fontSize: "clamp(44px, 7vw, 80px)",
            color: "#FAFAFA",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          Your Clueless Gym Days End Today.
        </h2>

        {/* Body */}
        <p
          className="reveal font-work stagger-3"
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "#A3A3A3",
            maxWidth: 560,
            margin: "28px auto 0",
            lineHeight: 1.65,
          }}
        >
          Download the free Sweat &amp; Success guide and join a community of women who are doing this properly — with science, support, and zero supplements.
        </p>

        {/* CTA Block */}
        <div className="reveal stagger-4" style={{ marginTop: 40 }}>
          {/* Primary Button */}
          <a
            href="/guide.pdf"
            download
            className="btn-primary btn-primary-lg"
            style={{ display: "inline-block" }}
          >
            Download the Free Guide →
          </a>

          {/* Or separator */}
          <p className="font-work" style={{ fontSize: 14, color: "#525252", margin: "20px 0" }}>
            — or —
          </p>

          {/* WhatsApp Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
              flexWrap: "wrap",
            }}
            className="whatsapp-row"
          >
            {/* QR Placeholder */}
            <div className="qr-placeholder">
              <span className="font-work" style={{ fontSize: 11, color: "#525252", textAlign: "center", padding: 12 }}>
                [ REPLACE WITH
                <br />
                WHATSAPP QR ]
              </span>
            </div>

            {/* Text Stack */}
            <div style={{ textAlign: "left", maxWidth: 280 }}>
              <p
                className="overline"
                style={{ color: "#EF4444", fontSize: 11, marginBottom: 10 }}
              >
                JOIN WHATSAPP COMMUNITY
              </p>
              <p
                className="font-work"
                style={{ fontSize: 16, color: "#FAFAFA", lineHeight: 1.6, marginBottom: 16 }}
              >
                Scan the QR code to join the group. Ask questions. Post your workouts. Hold each other accountable. Free.
              </p>
              <a
                href="https://wa.me/message/PLACEHOLDER"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ fontSize: 13, padding: "10px 24px" }}
              >
                Join on Mobile →
              </a>
            </div>
          </div>

          {/* Trust Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 24,
              marginTop: 40,
            }}
          >
            {["✓ No sign-up required", "✓ No supplements sold", "✓ All science cited", "✓ Free forever"].map((item) => (
              <span
                key={item}
                className="font-work"
                style={{ fontSize: 12, color: "#525252" }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .whatsapp-row {
            flex-direction: column !important;
            text-align: center !important;
          }
          .whatsapp-row > div {
            text-align: center !important;
          }
          .qr-placeholder {
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
