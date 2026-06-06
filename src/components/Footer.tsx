"use client";

const navLinks = [
  { label: "Programme", href: "#whats-inside" },
  { label: "Science", href: "#pillars" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "WhatsApp Community", href: "https://wa.me/message/PLACEHOLDER" },
];

export default function Footer() {
  const handleClick = (href: string) => {
    if (href.startsWith("http")) {
      window.open(href, "_blank");
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "#0A0A0A", borderTop: "2px solid #1A1A1A", padding: "40px 24px" }}>
      <div
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        {/* Three columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 24,
            alignItems: "start",
            marginBottom: 24,
          }}
          className="footer-grid"
        >
          {/* Left — Logo */}
          <div>
            <span
              className="font-archivo"
              style={{ fontSize: 18, color: "#FAFAFA", display: "block" }}
            >
              SWEAT &amp; SUCCESS
            </span>
            <span
              className="font-work"
              style={{ fontSize: 12, color: "#525252", display: "block", marginTop: 6 }}
            >
              Science · Community · Results
            </span>
          </div>

          {/* Centre — Nav Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleClick(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#A3A3A3",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  padding: 0,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#EF4444")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#A3A3A3")}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right — Copyright */}
          <div style={{ textAlign: "right" }}>
            <p className="font-work" style={{ fontSize: 11, color: "#525252", margin: 0 }}>
              © 2025 Sweat &amp; Success. All content is educational only.
            </p>
            <p className="font-work" style={{ fontSize: 11, color: "#525252", marginTop: 6 }}>
              Not a substitute for medical advice.
            </p>
          </div>
        </div>

        {/* Bottom Line */}
        <div style={{ borderTop: "1px solid #1A1A1A", paddingTop: 24, textAlign: "center" }}>
          <p
            className="font-work"
            style={{ fontSize: 11, color: "#525252", margin: 0, lineHeight: 1.7 }}
          >
            All scientific citations are peer-reviewed and publicly verifiable. We do not sell supplements. We do not have a paid tier.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
          }
          .footer-grid > div:last-child {
            text-align: center !important;
          }
          .footer-grid > div:nth-child(2) {
            align-items: center !important;
          }
        }
      `}</style>
    </footer>
  );
}
