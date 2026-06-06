import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

/**
 * POST /api/auth/verify-otp
 *
 * Verifies the OTP sent via WhatsApp and issues a short-lived signed JWT
 * (the "session token") that must be passed to /api/payment/create-order.
 *
 * Body:    { phone: string, otp: string }
 * Returns: { token: string }   — signed JWT, valid for 15 minutes
 *
 * ─── HOW TO WIRE YOUR PROVIDER ─────────────────────────────────────────────
 *
 * Option A — Twilio Verify
 *   Replace the TODO block below with:
 *
 *   import twilio from "twilio";
 *   const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
 *   const check = await client.verify.v2
 *     .services(process.env.TWILIO_VERIFY_SID!)
 *     .verificationChecks.create({ to: phone, code: otp });
 *   if (check.status !== "approved") throw new Error("OTP invalid or expired");
 *
 * Option B — Custom OTP (if you generated & stored it in send-otp)
 *   1. Retrieve the stored OTP from Redis / Vercel KV by phone key.
 *   2. Compare constant-time: if (storedOtp !== otp) throw new Error("OTP invalid");
 *   3. Delete the key so it can only be used once.
 *
 * ─── ENV VARS REQUIRED ─────────────────────────────────────────────────────
 *   JWT_SECRET  — random 32+ char secret string (openssl rand -base64 32)
 *   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SID  (Option A)
 *
 * ────────────────────────────────────────────────────────────────────────────
 */

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "REPLACE_WITH_A_REAL_SECRET_IN_ENV"
);

export async function POST(req: NextRequest) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json({ error: "phone and otp are required." }, { status: 400 });
    }
    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json({ error: "OTP must be 6 digits." }, { status: 400 });
    }

    // ── TODO: Replace this block with your OTP verification logic ──────────
    //
    // Twilio Verify example:
    //   const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    //   const check = await client.verify.v2
    //     .services(process.env.TWILIO_VERIFY_SID!)
    //     .verificationChecks.create({ to: phone, code: otp });
    //   if (check.status !== "approved") {
    //     return NextResponse.json({ error: "OTP is incorrect or has expired." }, { status: 401 });
    //   }
    //
    // ─── DEVELOPMENT STUB ────────────────────────────────────────────────────
    // Accept any 6-digit OTP during development. Remove before going live.
    console.log(`[verify-otp] Stub verification for ${phone}, otp: ${otp}`);
    // ─────────────────────────────────────────────────────────────────────

    // Issue a signed JWT — valid 15 minutes
    const token = await new SignJWT({ phone, verified: true })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("15m")
      .sign(JWT_SECRET);

    return NextResponse.json({ token }, { status: 200 });
  } catch (err) {
    console.error("[verify-otp] Error:", err);
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 500 }
    );
  }
}
