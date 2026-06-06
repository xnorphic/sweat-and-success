import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/auth/send-otp
 *
 * Sends a WhatsApp OTP to the given phone number.
 *
 * Body: { phone: string }  — E.164 format, e.g. "+919876543210"
 * Returns: { success: true, message: string }
 *
 * ─── HOW TO WIRE YOUR PROVIDER ─────────────────────────────────────────────
 *
 * Option A — Twilio Verify (WhatsApp channel)
 *   1. Install: npm install twilio
 *   2. Set env vars: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SID
 *   3. Replace the TODO block below with:
 *
 *   import twilio from "twilio";
 *   const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
 *   await client.verify.v2
 *     .services(process.env.TWILIO_VERIFY_SID!)
 *     .verifications.create({ to: phone, channel: "whatsapp" });
 *
 * Option B — Meta WhatsApp Business API (direct)
 *   1. Set env vars: META_ACCESS_TOKEN, META_PHONE_NUMBER_ID, META_TEMPLATE_NAME
 *   2. Call: POST https://graph.facebook.com/v19.0/{PHONE_NUMBER_ID}/messages
 *      with your OTP message template.
 *   3. Store the generated OTP in a KV store (Redis / Vercel KV) keyed by phone,
 *      with a 10-minute TTL, and verify it in /api/auth/verify-otp.
 *
 * Option C — Indian WhatsApp API providers (Interakt, Wati, Gupshup, etc.)
 *   Follow your provider's REST API docs. Store and verify OTP server-side.
 *
 * ────────────────────────────────────────────────────────────────────────────
 */
export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone || !/^\+91\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number. Must be a valid Indian (+91) number." },
        { status: 400 }
      );
    }

    // ── TODO: Replace this block with your WhatsApp OTP provider ──────────
    // Example using Twilio Verify:
    //
    // import twilio from "twilio";
    // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    // await client.verify.v2
    //   .services(process.env.TWILIO_VERIFY_SID!)
    //   .verifications.create({ to: phone, channel: "whatsapp" });
    //
    // ─────────────────────────────────────────────────────────────────────

    // Stub: log and return success so the UI flow works during development
    console.log(`[send-otp] OTP requested for ${phone}`);

    return NextResponse.json(
      { success: true, message: "OTP sent to WhatsApp." },
      { status: 200 }
    );
  } catch (err) {
    console.error("[send-otp] Error:", err);
    return NextResponse.json(
      { error: "Failed to send OTP. Please try again." },
      { status: 500 }
    );
  }
}
