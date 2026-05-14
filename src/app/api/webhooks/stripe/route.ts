import { stripe } from "@/lib/stripe";
import { deliverContractByEmail, valuesFromStripeMetadata } from "@/lib/deliverContract";
import { NextRequest } from "next/server";
import type Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return new Response("Webhook not configured", { status: 500 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return new Response("ok", { status: 200 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (session.payment_status !== "paid") {
    return new Response("not paid", { status: 200 });
  }

  const contractId = session.metadata?.contractId;
  const toEmail = session.customer_details?.email ?? session.customer_email;

  if (!contractId) {
    console.error(`Webhook ${event.id}: missing contractId in metadata`);
    return new Response("missing contract", { status: 200 });
  }

  if (!toEmail) {
    console.error(`Webhook ${event.id}: missing customer email for session ${session.id}`);
    return new Response("missing email", { status: 200 });
  }

  const values = valuesFromStripeMetadata(session.metadata);

  try {
    await deliverContractByEmail({
      contractId,
      values,
      toEmail,
      sessionId: session.id,
    });
    console.log(`Webhook ${event.id}: delivered ${contractId} to ${toEmail}`);
  } catch (err) {
    console.error(`Webhook ${event.id}: delivery failed`, err);
    // Returner 500 så Stripe prøver igjen
    return new Response("delivery failed", { status: 500 });
  }

  return new Response("ok", { status: 200 });
}
