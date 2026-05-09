import { Resend } from "resend";
import { NextRequest } from "next/server";

const TO_EMAIL = "patrick@rishaug-it.no";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "Kontraktly <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "E-posttjeneste er ikke konfigurert." }, { status: 500 });
  }

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Ugyldig forespørsel." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return Response.json({ error: "Alle felt må fylles ut." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Ugyldig e-postadresse." }, { status: 400 });
  }
  if (message.length > 4000) {
    return Response.json({ error: "Meldingen er for lang." }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const safeName = name.replace(/[<>]/g, "");
  const safeEmail = email.replace(/[<>]/g, "");
  const safeMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Kontaktskjema fra ${safeName}`,
      text: `Fra: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>Fra:</strong> ${safeName} &lt;${safeEmail}&gt;</p><p style="white-space:pre-wrap">${safeMessage}</p>`,
    });
    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Kunne ikke sende meldingen. Prøv igjen senere." }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return Response.json({ error: "Noe gikk galt." }, { status: 500 });
  }
}
