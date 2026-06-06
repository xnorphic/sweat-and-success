"use client";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Science", href: "#pillars" },
  { label: "Programme", href: "#whats-inside" },
  { label: "Community", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: scrolled ? "#0A0A0A" : "rgba(10,10,10,0.85)",
          borderBottom: "2px solid #1A1A1A",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          transition: "background 0.3s ease",
        }}
      >
        {/* Logo */}
        <span
          className="font-archivo"
          style={{ fontSize: 18, color: "#FAFAFA", letterSpacing: "-0.01em", cursor: "pointer" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          SWEAT &amp; SUCCESS
        </span>

        {/* Desktop Nav Links */}
        <div
          className="desktop-nav"
          style={{ display: "flex", gap: 32, alignItems: "center" }}
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              style={{
                background: "none",
                border: "none",
                color: "#FAFAFA",
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#EF4444")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#FAFAFA")}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#final-cta")}
            style={{
              background: "#EF4444",
              color: "#FAFAFA",
              border: "2px solid #EF4444",
              fontFamily: "'Work Sans', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              padding: "8px 20px",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#DC2626";
              e.currentTarget.style.borderColor = "#DC2626";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#EF4444";
              e.currentTarget.style.borderColor = "#EF4444";
            }}
          >
            JOIN FREE →
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="mobile-hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "none",
            flexDirection: "column",
            gap: 5,
            padding: 4,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{ display: "block", width: 24, height: 2, background: "#FAFAFA" }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <div
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        style={{ position: "fixed", inset: 0, background: "#0A0A0A", zIndex: 200, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 32, opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "all" : "none", transition: "opacity 0.3s ease" }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "#FAFAFA", fontSize: 28, cursor: "pointer", fontFamily: "'Work Sans', sans-serif" }}
        >
          ✕
        </button>
        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => handleNavClick(link.href)}
            style={{
              background: "none",
              border: "none",
              color: "#FAFAFA",
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 32,
              cursor: "pointer",
              padding: 0,
            }}
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => handleNavClick("#final-cta")}
          className="btn-primary"
          style={{ marginTop: 16 }}
        >
          JOIN FREE →
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
