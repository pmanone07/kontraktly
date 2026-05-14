import { stripe } from "@/lib/stripe";
import { deliverContractByEmail, valuesFromStripeMetadata } from "@/lib/deliverContract";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const adminToken = process.env.ADMIN_RESEND_TOKEN;
  if (!adminToken) {
    return Response.json({ error: "ADMIN_RESEND_TOKEN not configured" }, { status: 500 });
  }

  const provided = req.headers.get("x-admin-token");
  if (provided !== adminToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sessionId, overrideEmail } = await req.json();
  if (!sessionId || typeof sessionId !== "string") {
    return Response.json({ error: "Missing sessionId" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    return Response.json({ error: `Session not paid (status: ${session.payment_status})` }, { status: 400 });
  }

  const contractId = session.metadata?.contractId;
  if (!contractId) {
    return Response.json({ error: "No contractId in session metadata" }, { status: 400 });
  }

  const toEmail = overrideEmail ?? session.customer_details?.email ?? session.customer_email;
  if (!toEmail) {
    return Response.json({ error: "No customer email — pass overrideEmail" }, { status: 400 });
  }

  const values = valuesFromStripeMetadata(session.metadata);

  try {
    await deliverContractByEmail({
      contractId,
      values,
      toEmail,
      sessionId: session.id,
    });
    return Response.json({ ok: true, to: toEmail, contractId, valueCount: Object.keys(values).length });
  } catch (err) {
    console.error("Manual resend failed:", err);
    return Response.json({ error: err instanceof Error ? err.message : "Delivery failed" }, { status: 500 });
  }
}
