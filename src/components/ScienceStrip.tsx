"use client";
import { useEffect, useRef } from "react";

const publications = [
  { name: "Nature", year: "2008" },
  { name: "The Lancet", year: "2011" },
  { name: "Ann Intern Med", year: "2004" },
  { name: "N Engl J Med", year: "1995" },
  { name: "Diabetes", year: "1988" },
];

export default function ScienceStrip() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) el.querySelectorAll(".reveal").forEach((c) => c.classList.add("visible")); }),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="science"
      style={{
        background: "#F5F5F5",
        borderTop: "2px solid #E5E5E5",
        borderBottom: "2px solid #E5E5E5",
        padding: "48px 0",
      }}
    >
      <div
        ref={sectionRef}
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", textAlign: "center" }}
      >
        {/* Header */}
        <p className="reveal overline stagger-1" style={{ color: "#EF4444", marginBottom: 12 }}>
          EVIDENCE BASE
        </p>
        <h2
          className="reveal font-archivo stagger-2"
          style={{ fontSize: "clamp(24px, 3vw, 36px)", color: "#0A0A0A", marginBottom: 32 }}
        >
          Built on Peer-Reviewed Science
        </h2>

        {/* Publication Chips */}
        <div
          className="reveal stagger-3"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {publications.map((pub) => (
            <div
              key={pub.name}
              style={{
                border: "2px solid #D4D4D4",
                padding: "10px 20px",
                background: "#FAFAFA",
              }}
            >
              <span
                className="font-work"
                style={{ fontSize: 13, fontWeight: 700, color: "#0A0A0A" }}
              >
                {pub.name} · {pub.year}
              </span>
            </div>
          ))}
        </div>

        {/* Caption */}
        <p
          className="reveal font-work stagger-4"
          style={{ fontSize: 14, color: "#525252" }}
        >
          15 peer-reviewed citations. All verifiable. All included in the guide.
        </p>
      </div>
    </section>
  );
}
