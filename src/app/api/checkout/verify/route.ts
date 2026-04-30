import { stripe } from "@/lib/stripe";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return Response.json({ error: "Missing session_id" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    return Response.json({ error: "Payment not completed" }, { status: 402 });
  }

  return Response.json({
    contractId: session.metadata?.contractId,
    contractLabel: session.metadata?.contractLabel,
    paid: true,
  });
}
