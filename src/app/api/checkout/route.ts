import { stripe } from "@/lib/stripe";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { contractId, contractLabel, price, contractText } = await req.json();

  if (!contractId || !contractLabel || !price || !contractText) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "nok",
          product_data: {
            name: contractLabel,
            description: "Juridisk bindende kontrakt — PDF-nedlasting etter betaling",
          },
          unit_amount: Math.round(price * 100), // øre, prisen er allerede inkl. MVA
        },
        quantity: 1,
      },
    ],
    metadata: {
      contractId,
      contractLabel,
      contractText: contractText.slice(0, 500), // Stripe metadata limit 500 chars per value
    },
    payment_intent_data: {
      metadata: { contractId, contractLabel },
    },
    success_url: `${baseUrl}/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/`,
    locale: "nb",
  });

  return Response.json({ url: session.url });
}
