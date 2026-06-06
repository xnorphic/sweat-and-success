/**
 * Payment Success Page
 *
 * In production this page will receive the success callback from your
 * payment gateway (Razorpay callback_url or Stripe success_url).
 *
 * After verifying the payment server-side, deliver the PDF download link
 * or send it to the user's WhatsApp number.
 *
 * For now it shows a placeholder success screen.
 */
export default function PaymentSuccess() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0A0A0A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "40px 24px",
        textAlign: "center",
        fontFamily: "'Work Sans', sans-serif",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          background: "#EF4444",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 32,
        }}
      >
        <span style={{ fontSize: 32 }}>✓</span>
      </div>

      <h1
        style={{
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: "clamp(32px, 5vw, 52px)",
          color: "#FAFAFA",
          lineHeight: 1.1,
          margin: "0 0 16px",
        }}
      >
        Payment Confirmed.
      </h1>

      <p
        style={{
          fontSize: 18,
          color: "#A3A3A3",
          lineHeight: 1.65,
          maxWidth: 520,
          margin: "0 auto 32px",
        }}
      >
        Your guide is on its way.{" "}
        {/* TODO: Replace with actual delivery mechanism — WhatsApp message or download link */}
        We&apos;ll send the download link to your WhatsApp number shortly.
      </p>

      <a
        href="/"
        style={{
          background: "transparent",
          color: "#FAFAFA",
          border: "2px solid #FAFAFA",
          fontFamily: "'Work Sans', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          padding: "12px 28px",
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        ← Back to Home
      </a>

      <p
        style={{
          fontSize: 12,
          color: "#525252",
          marginTop: 40,
          maxWidth: 400,
          lineHeight: 1.6,
        }}
      >
        Having trouble? Contact us on WhatsApp at the community link on the home page.
      </p>
    </main>
  );
}
