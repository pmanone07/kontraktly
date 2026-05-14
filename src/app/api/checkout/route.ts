import { stripe } from "@/lib/stripe";
import { getContract } from "@/lib/contracts";
import { NextRequest } from "next/server";

const MAX_METADATA_VALUE_LENGTH = 450;

function chunkValues(values: Record<string, string>): Record<string, string> {
  const json = JSON.stringify(values);
  const chunks: Record<string, string> = {};
  for (let i = 0, idx = 0; i < json.length; i += MAX_METADATA_VALUE_LENGTH, idx++) {
    chunks[`values_${idx}`] = json.slice(i, i + MAX_METADATA_VALUE_LENGTH);
  }
  chunks.values_count = String(Object.keys(chunks).length);
  return chunks;
}

export async function POST(req: NextRequest) {
  const { contractId, values } = await req.json();

  if (!contractId || typeof contractId !== "string") {
    return Response.json({ error: "Missing contractId" }, { status: 400 });
  }

  const contract = getContract(contractId);
  if (!contract) {
    return Response.json({ error: "Unknown contract" }, { status: 404 });
  }

  const safeValues: Record<string, string> = {};
  if (values && typeof values === "object") {
    for (const [k, val] of Object.entries(values)) {
      if (typeof val === "string" && val.length <= 2000) safeValues[k] = val;
    }
  }

  const valueChunks = chunkValues(safeValues);
  if (Object.keys(valueChunks).length > 45) {
    return Response.json({ error: "Skjemadata er for stort." }, { status: 413 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "nok",
          product_data: {
            name: contract.label,
            description: "Juridisk bindende kontrakt — PDF sendes på e-post etter betaling",
          },
          unit_amount: Math.round(contract.price * 100),
        },
        quantity: 1,
      },
    ],
    customer_creation: "always",
    billing_address_collection: "auto",
    phone_number_collection: { enabled: false },
    metadata: {
      contractId,
      contractLabel: contract.label,
      ...valueChunks,
    },
    payment_intent_data: {
      metadata: { contractId, contractLabel: contract.label },
    },
    success_url: `${baseUrl}/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/`,
    locale: "nb",
  });

  return Response.json({ url: session.url });
}
