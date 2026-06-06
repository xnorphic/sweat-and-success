import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

/**
 * POST /api/payment/create-order
 *
 * Validates the session token from verify-otp, then creates a payment order
 * via your payment gateway and returns the hosted checkout URL.
 *
 * Body:    { phone: string, token: string }
 * Returns: { paymentUrl: string, orderId: string }
 *
 * ─── HOW TO WIRE YOUR PAYMENT GATEWAY ──────────────────────────────────────
 *
 * Option A — Razorpay (recommended for India)
 *   1. npm install razorpay
 *   2. Set env vars: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
 *   3. Replace TODO block with:
 *
 *   import Razorpay from "razorpay";
 *   const razorpay = new Razorpay({
 *     key_id: process.env.RAZORPAY_KEY_ID!,
 *     key_secret: process.env.RAZORPAY_KEY_SECRET!,
 *   });
 *   const order = await razorpay.orders.create({
 *     amount: Number(process.env.GUIDE_PRICE_PAISE ?? 19900), // amount in paise (199 = ₹1.99)
 *     currency: "INR",
 *     receipt: `order_${Date.now()}`,
 *     notes: { phone },
 *   });
 *   // For Razorpay hosted checkout, redirect to their standard checkout page
 *   // OR use the Razorpay Payment Links API for a hosted URL:
 *   const link = await razorpay.paymentLink.create({
 *     amount: Number(process.env.GUIDE_PRICE_PAISE ?? 19900),
 *     currency: "INR",
 *     description: "Sweat & Success Guide",
 *     customer: { contact: phone },
 *     notify: { sms: false, email: false },
 *     callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
 *     callback_method: "get",
 *   });
 *   return NextResponse.json({ paymentUrl: link.short_url, orderId: link.id });
 *
 * Option B — Stripe (with Indian rupee support)
 *   1. npm install stripe
 *   2. Set env vars: STRIPE_SECRET_KEY
 *   3. Create a Checkout Session:
 *
 *   import Stripe from "stripe";
 *   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
 *   const session = await stripe.checkout.sessions.create({
 *     payment_method_types: ["card"],
 *     line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
 *     mode: "payment",
 *     success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
 *     cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/#final-cta`,
 *     metadata: { phone },
 *   });
 *   return NextResponse.json({ paymentUrl: session.url!, orderId: session.id });
 *
 * ─── ENV VARS REQUIRED ─────────────────────────────────────────────────────
 *   JWT_SECRET                 — same secret used in verify-otp
 *   NEXT_PUBLIC_BASE_URL       — your production domain, e.g. https://sweat-and-success.com
 *
 *   Razorpay:
 *     RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, GUIDE_PRICE_PAISE
 *
 *   Stripe:
 *     STRIPE_SECRET_KEY, STRIPE_PRICE_ID
 *
 * ────────────────────────────────────────────────────────────────────────────
 */

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "REPLACE_WITH_A_REAL_SECRET_IN_ENV"
);

export async function POST(req: NextRequest) {
  try {
    const { phone, token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Missing session token." }, { status: 401 });
    }

    // Verify the JWT issued by verify-otp
    let payload: { phone?: string; verified?: boolean };
    try {
      const result = await jwtVerify(token, JWT_SECRET);
      payload = result.payload as { phone?: string; verified?: boolean };
    } catch {
      return NextResponse.json({ error: "Session expired or invalid. Please verify again." }, { status: 401 });
    }

    if (!payload.verified || payload.phone !== phone) {
      return NextResponse.json({ error: "Token does not match this phone number." }, { status: 403 });
    }

    // ── TODO: Replace this block with your payment gateway ─────────────────
    //
    // Razorpay Payment Links example:
    //   const razorpay = new Razorpay({ key_id: ..., key_secret: ... });
    //   const link = await razorpay.paymentLink.create({ ... });
    //   return NextResponse.json({ paymentUrl: link.short_url, orderId: link.id });
    //
    // ─── DEVELOPMENT STUB ────────────────────────────────────────────────────
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const stubOrderId = `stub_order_${Date.now()}`;
    const stubPaymentUrl = `${baseUrl}/payment/success?order=${stubOrderId}&phone=${encodeURIComponent(phone)}`;

    console.log(`[create-order] Stub order created for ${phone}: ${stubOrderId}`);

    return NextResponse.json(
      { paymentUrl: stubPaymentUrl, orderId: stubOrderId },
      { status: 200 }
    );
    // ─────────────────────────────────────────────────────────────────────

  } catch (err) {
    console.error("[create-order] Error:", err);
    return NextResponse.json(
      { error: "Could not create payment session. Please try again." },
      { status: 500 }
    );
  }
}
