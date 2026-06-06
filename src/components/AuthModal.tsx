"use client";
import { useState, useEffect, useRef, FormEvent } from "react";
import { useAuthModal } from "@/context/AuthModalContext";

type Step = "phone" | "otp" | "redirecting";

const STEPS = ["phone", "otp", "redirecting"] as const;
const STEP_LABELS = ["Verify", "Confirm", "Pay"];
const RESEND_SECONDS = 30;

export default function AuthModal() {
  const { isOpen, closeModal } = useAuthModal();

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);
  const [sessionToken, setSessionToken] = useState("");

  const firstOtpRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Focus first OTP box when step changes
  useEffect(() => {
    if (step === "otp") setTimeout(() => firstOtpRef.current?.focus(), 100);
  }, [step]);

  // Auto-redirect when in redirecting step
  useEffect(() => {
    if (step !== "redirecting" || !sessionToken) return;
    const timer = setTimeout(async () => {
      try {
        const res = await fetch("/api/payment/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: `+91${phone}`, token: sessionToken }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Payment setup failed");
        window.location.href = data.paymentUrl;
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        setStep("phone");
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [step, sessionToken, phone]);

  // Resend countdown
  const startResendTimer = () => {
    setResendCountdown(RESEND_SECONDS);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendCountdown((c) => {
        if (c <= 1) { clearInterval(timerRef.current!); return 0; }
        return c - 1;
      });
    }, 1000);
  };

  const resetModal = () => {
    setStep("phone");
    setPhone("");
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setLoading(false);
    setSessionToken("");
    if (timerRef.current) clearInterval(timerRef.current);
    setResendCountdown(0);
  };

  const handleClose = () => {
    resetModal();
    closeModal();
  };

  // ---------- STEP 1: Send OTP ----------
  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: `+91${digits}` }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");
      setPhone(digits);
      setStep("otp");
      startResendTimer();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------- STEP 2: Verify OTP ----------
  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const code = otp.join("");
    if (code.length !== 6) { setError("Enter the 6-digit OTP from WhatsApp."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: `+91${phone}`, otp: code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid OTP");
      setSessionToken(data.token);
      setStep("redirecting");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // OTP box key handling
  const handleOtpKey = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) {
      (document.getElementById(`otp-${index + 1}`) as HTMLInputElement)?.focus();
    }
  };

  const handleOtpBackspace = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      (document.getElementById(`otp-${index - 1}`) as HTMLInputElement)?.focus();
    }
  };

  const handleResend = async () => {
    if (resendCountdown > 0) return;
    setError("");
    setOtp(["", "", "", "", "", ""]);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: `+91${phone}` }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to resend");
      startResendTimer();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const stepIndex = STEPS.indexOf(step);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.85)",
          zIndex: 300,
          backdropFilter: "blur(2px)",
        }}
      />

      {/* Modal Box */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Verify your WhatsApp number"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 301,
          width: "min(520px, calc(100vw - 32px))",
          background: "#0A0A0A",
          border: "2px solid #1A1A1A",
          padding: "40px 36px",
        }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 16,
            right: 20,
            background: "none",
            border: "none",
            color: "#525252",
            fontSize: 22,
            cursor: "pointer",
            lineHeight: 1,
            fontFamily: "'Work Sans', sans-serif",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#FAFAFA")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#525252")}
        >
          ✕
        </button>

        {/* Step Indicator */}
        {step !== "redirecting" && (
          <div style={{ display: "flex", gap: 8, marginBottom: 32, alignItems: "center" }}>
            {STEP_LABELS.slice(0, 2).map((label, i) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    border: `2px solid ${i <= stepIndex ? "#EF4444" : "#2A2A2A"}`,
                    background: i < stepIndex ? "#EF4444" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    className="font-work"
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: i < stepIndex ? "#FAFAFA" : i === stepIndex ? "#EF4444" : "#2A2A2A",
                    }}
                  >
                    {i < stepIndex ? "✓" : i + 1}
                  </span>
                </div>
                <span
                  className="font-work"
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    color: i <= stepIndex ? "#FAFAFA" : "#2A2A2A",
                  }}
                >
                  {label}
                </span>
                {i < 1 && (
                  <div
                    style={{
                      width: 40,
                      height: 2,
                      background: stepIndex > i ? "#EF4444" : "#2A2A2A",
                      marginRight: 4,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── STEP 1: Phone ── */}
        {step === "phone" && (
          <form onSubmit={handleSendOtp}>
            <p className="overline" style={{ color: "#EF4444", marginBottom: 8 }}>
              STEP 1 OF 2
            </p>
            <h2
              className="font-archivo"
              style={{ fontSize: 26, color: "#FAFAFA", marginBottom: 8, lineHeight: 1.1 }}
            >
              Verify your WhatsApp number
            </h2>
            <p
              className="font-work"
              style={{ fontSize: 14, color: "#A3A3A3", lineHeight: 1.6, marginBottom: 28 }}
            >
              We&apos;ll send a one-time code to your WhatsApp to confirm your number before checkout.
            </p>

            {/* Phone Input */}
            <label
              className="font-work"
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.10em", color: "#525252", textTransform: "uppercase", display: "block", marginBottom: 8 }}
            >
              WhatsApp Number
            </label>
            <div style={{ display: "flex", border: "2px solid #2A2A2A", marginBottom: 6, transition: "border-color 0.2s" }}
              onFocusCapture={(e) => (e.currentTarget.style.borderColor = "#EF4444")}
              onBlurCapture={(e) => (e.currentTarget.style.borderColor = "#2A2A2A")}
            >
              <div
                style={{
                  padding: "14px 14px",
                  background: "#141414",
                  borderRight: "2px solid #2A2A2A",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 16 }}>🇮🇳</span>
                <span className="font-work" style={{ fontSize: 15, color: "#FAFAFA", fontWeight: 600 }}>+91</span>
              </div>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                maxLength={10}
                required
                autoFocus
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  padding: "14px 16px",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: 18,
                  color: "#FAFAFA",
                  letterSpacing: "0.08em",
                }}
              />
            </div>
            <p className="font-work" style={{ fontSize: 12, color: "#525252", marginBottom: 24 }}>
              Indian numbers only (+91). WhatsApp must be active on this number.
            </p>

            {error && (
              <p
                className="font-work"
                style={{ fontSize: 13, color: "#EF4444", marginBottom: 16, padding: "10px 14px", border: "1px solid #EF444440", background: "#EF444410" }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || phone.length !== 10}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "16px",
                fontSize: 14,
                opacity: (loading || phone.length !== 10) ? 0.5 : 1,
                cursor: (loading || phone.length !== 10) ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {loading ? (
                <span>Sending OTP…</span>
              ) : (
                <>
                  <span style={{ fontSize: 16 }}>💬</span>
                  <span>Send OTP on WhatsApp</span>
                </>
              )}
            </button>

            <p className="font-work" style={{ fontSize: 11, color: "#525252", marginTop: 16, textAlign: "center", lineHeight: 1.6 }}>
              By continuing you agree to our terms. We never spam. Your number is only used for verification and order confirmation.
            </p>
          </form>
        )}

        {/* ── STEP 2: OTP ── */}
        {step === "otp" && (
          <form onSubmit={handleVerifyOtp}>
            <p className="overline" style={{ color: "#EF4444", marginBottom: 8 }}>
              STEP 2 OF 2
            </p>
            <h2
              className="font-archivo"
              style={{ fontSize: 26, color: "#FAFAFA", marginBottom: 8, lineHeight: 1.1 }}
            >
              Enter your OTP
            </h2>
            <p
              className="font-work"
              style={{ fontSize: 14, color: "#A3A3A3", lineHeight: 1.6, marginBottom: 28 }}
            >
              We sent a 6-digit code to{" "}
              <span style={{ color: "#FAFAFA", fontWeight: 600 }}>+91 {phone.slice(0, 5)} {phone.slice(5)}</span>{" "}
              on WhatsApp.
            </p>

            {/* 6 OTP Boxes */}
            <div style={{ display: "flex", gap: 10, marginBottom: 8, justifyContent: "center" }}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  ref={i === 0 ? firstOtpRef : undefined}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpKey(i, e.target.value)}
                  onKeyDown={(e) => handleOtpBackspace(i, e)}
                  style={{
                    width: 52,
                    height: 64,
                    textAlign: "center",
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: 24,
                    color: "#FAFAFA",
                    background: "#141414",
                    border: `2px solid ${digit ? "#EF4444" : "#2A2A2A"}`,
                    outline: "none",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#EF4444")}
                  onBlur={(e) => (e.target.style.borderColor = otp[i] ? "#EF4444" : "#2A2A2A")}
                />
              ))}
            </div>

            {/* Resend */}
            <p className="font-work" style={{ fontSize: 13, color: "#525252", textAlign: "center", marginBottom: 24 }}>
              Didn&apos;t get it?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={resendCountdown > 0 || loading}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: resendCountdown > 0 ? "#525252" : "#EF4444",
                  cursor: resendCountdown > 0 ? "not-allowed" : "pointer",
                  padding: 0,
                  textDecoration: resendCountdown > 0 ? "none" : "underline",
                }}
              >
                {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : "Resend OTP"}
              </button>
            </p>

            {error && (
              <p
                className="font-work"
                style={{ fontSize: 13, color: "#EF4444", marginBottom: 16, padding: "10px 14px", border: "1px solid #EF444440", background: "#EF444410" }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || otp.join("").length !== 6}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "16px",
                fontSize: 14,
                opacity: (loading || otp.join("").length !== 6) ? 0.5 : 1,
                cursor: (loading || otp.join("").length !== 6) ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Verifying…" : "Verify & Continue to Payment →"}
            </button>

            <button
              type="button"
              onClick={() => { setStep("phone"); setError(""); setOtp(["", "", "", "", "", ""]); }}
              style={{
                background: "none",
                border: "none",
                color: "#525252",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: 13,
                cursor: "pointer",
                marginTop: 14,
                display: "block",
                width: "100%",
                textAlign: "center",
              }}
            >
              ← Change number
            </button>
          </form>
        )}

        {/* ── STEP 3: Redirecting ── */}
        {step === "redirecting" && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            {/* Spinner */}
            <div
              style={{
                width: 48,
                height: 48,
                border: "3px solid #1A1A1A",
                borderTop: "3px solid #EF4444",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto 28px",
              }}
            />
            <h2
              className="font-archivo"
              style={{ fontSize: 26, color: "#FAFAFA", marginBottom: 12, lineHeight: 1.1 }}
            >
              Verified. Taking you to checkout.
            </h2>
            <p
              className="font-work"
              style={{ fontSize: 15, color: "#A3A3A3", lineHeight: 1.6 }}
            >
              Setting up your secure payment session…
            </p>
            {error && (
              <p
                className="font-work"
                style={{ fontSize: 13, color: "#EF4444", marginTop: 20, padding: "10px 14px", border: "1px solid #EF444440", background: "#EF444410" }}
              >
                {error}
              </p>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
