"use client";
import { useEffect, useRef } from "react";

const testimonials = [
  {
    quote: "I had been doing cardio for 6 months with zero results. After reading the fat science section, I finally understood why. Changed my approach completely. Down 6kg in 10 weeks — no supplements, just the programme.",
    name: "Priya S.",
    detail: "Mumbai, 28 · Software Engineer",
    result: "Lost 6kg in 10 weeks",
    featured: true,
  },
  {
    quote: "The hormones chapter was a revelation. I didn't know cortisol was literally storing fat around my stomach. Once I sorted my sleep, my waist started responding even before I changed my diet.",
    name: "Ananya R.",
    detail: "Bangalore, 31 · Marketing Manager",
    result: "4cm waist reduction",
    featured: false,
  },
  {
    quote: "Every other programme made me feel like I had to give up Indian food. This guide showed me how to eat roti and dal and still hit my macros. First time I've actually stuck to a programme for more than 3 weeks.",
    name: "Kavya M.",
    detail: "Delhi, 26 · CA Student",
    result: "Lost 4kg · 8 weeks",
    featured: false,
  },
  {
    quote: "The blood tests page alone was worth the download. Found out my Vitamin D was at 12 ng/mL — no wonder I had no energy. Got it sorted and my gym performance improved noticeably within 6 weeks.",
    name: "Shreya P.",
    detail: "Pune, 33 · Doctor",
    result: "Blood markers now optimal",
    featured: false,
  },
  {
    quote: "I was spending ₹4,000/month on supplements my trainer pushed. Read the guide, spoke to my doctor, and stopped all of them. Lost more weight in the following month than the previous three. No joke.",
    name: "Ritu A.",
    detail: "Hyderabad, 29 · Product Manager",
    result: "Saved ₹4k/month",
    featured: false,
  },
  {
    quote: "The WhatsApp community is the real game-changer. Having people to check in with every day — people who are going through the exact same thing — makes you actually show up. I've not missed a session in 5 weeks.",
    name: "Nisha K.",
    detail: "Chennai, 27 · Teacher",
    result: "5-week streak · down 3.5kg",
    featured: false,
  },
];

function TestimonialCard({ t, delay }: { t: typeof testimonials[0]; delay: number }) {
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
      className="reveal testimonial-card"
      style={{
        border: "2px solid #E5E5E5",
        borderTop: t.featured ? "4px solid #EF4444" : "4px solid #0A0A0A",
        padding: 28,
        background: "#FAFAFA",
        transitionDelay: `${delay}ms`,
        minWidth: 300,
      }}
    >
      <span
        className="font-archivo"
        style={{ fontSize: 48, color: "#EF4444", lineHeight: 1, display: "block", marginBottom: 8 }}
      >
        &ldquo;
      </span>
      <p
        className="font-work"
        style={{
          fontSize: 16,
          color: "#0A0A0A",
          lineHeight: 1.75,
          fontStyle: "italic",
          marginBottom: 20,
        }}
      >
        {t.quote}
      </p>
      <div style={{ borderTop: "1px solid #E5E5E5", margin: "16px 0" }} />
      <p className="font-work" style={{ fontSize: 13, fontWeight: 700, color: "#0A0A0A", marginBottom: 4 }}>
        {t.name}
      </p>
      <p className="font-work" style={{ fontSize: 12, color: "#525252", marginBottom: 12 }}>
        {t.detail}
      </p>
      <span
        className="font-work"
        style={{
          background: "#0A0A0A",
          color: "#FAFAFA",
          padding: "3px 10px",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          display: "inline-block",
        }}
      >
        {t.result}
      </span>
    </div>
  );
}

export default function Testimonials() {
  const headerRef = useRef<HTMLDivElement | null>(null);

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
    <section id="testimonials" style={{ background: "#FAFAFA", padding: "96px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: 56 }}>
          <p className="reveal overline stagger-1" style={{ color: "#EF4444", marginBottom: 12 }}>
            THE COMMUNITY
          </p>
          <h2
            className="reveal font-archivo stagger-2"
            style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "#0A0A0A", marginBottom: 20 }}
          >
            Real People. Real Results.
          </h2>
          <p
            className="reveal font-work stagger-3"
            style={{ fontSize: 18, color: "#525252", maxWidth: 600, lineHeight: 1.7 }}
          >
            No before/after photos. No dramatic claims. Just honest accounts from people who followed the programme.
          </p>
        </div>

        {/* Desktop: 3-column grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
          className="testimonials-grid"
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} delay={i * 100} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .testimonials-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .testimonials-grid {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 16px !important;
            padding-bottom: 16px !important;
          }
          .testimonials-grid > * {
            flex: 0 0 300px !important;
            scroll-snap-align: start !important;
          }
        }
      `}</style>
    </section>
  );
}
