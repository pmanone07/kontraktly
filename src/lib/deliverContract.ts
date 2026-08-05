import { Resend } from "resend";
import { getContract } from "@/lib/contracts";
import type { ContractLocale } from "@/lib/contracts";
import { generateContractPDF, safeFilename } from "@/lib/generatePDF";

const FROM_EMAIL = process.env.CONTRACT_FROM_EMAIL ?? "Kontraktly <onboarding@resend.dev>";

export interface DeliverArgs {
  contractId: string;
  contractLocale?: ContractLocale;
  values: Record<string, string>;
  toEmail: string;
  sessionId?: string;
}

export async function deliverContractByEmail({
  contractId,
  contractLocale = "no",
  values,
  toEmail,
  sessionId,
}: DeliverArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");

  const contract = getContract(contractId, contractLocale);
  if (!contract) throw new Error(`Unknown contract: ${contractId} (${contractLocale})`);

  const contractText = contract.buildPreview(values);
  const pdfBuffer = await generateContractPDF(contract.label, contractText, {
    locale: contract.locale,
    jurisdiction: contract.jurisdiction,
  });
  const filename = safeFilename(contract.label);

  const resend = new Resend(apiKey);
  const reference = sessionId ? sessionId.slice(-8).toUpperCase() : "—";
  const isEn = contract.locale === "en";
  const labelLower = contract.label.toLowerCase();

  const subject = isEn
    ? `Your ${labelLower} from Kontraktly`
    : `Din ${labelLower} fra Kontraktly`;

  const text = isEn
    ? `Hi!\n\nThank you for your purchase. Your ${labelLower} is attached to this email as a PDF.\n\nReceipt: ${reference}\n\nAny questions? Just reply to this email.\n\nBest,\nKontraktly`
    : `Hei!\n\nTakk for kjøpet. Din ${labelLower} er vedlagt denne e-posten som PDF.\n\nKvittering: ${reference}\n\nHar du spørsmål? Svar på denne e-posten.\n\nMvh,\nKontraktly`;

  const html = isEn
    ? `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#1a1a1a">
        <div style="border-bottom:2px solid #c9a85c;padding-bottom:12px;margin-bottom:24px">
          <span style="font-size:18px;letter-spacing:1px;color:#c9a85c;font-weight:600">KONTRAKTLY</span>
        </div>
        <h1 style="font-size:20px;margin:0 0 16px">Thanks for your purchase!</h1>
        <p style="line-height:1.6">Your <strong>${labelLower}</strong> is ready and attached to this email as a PDF.</p>
        <p style="line-height:1.6">The file is filled in with your details and ready to be printed or signed digitally.</p>
        <div style="background:#faf7f0;border:1px solid #e5d9b6;border-radius:4px;padding:16px;margin:24px 0;font-size:13px;color:#6b6660">
          <strong style="color:#1a1a1a">Receipt:</strong> ${reference}<br>
          <strong style="color:#1a1a1a">Product:</strong> ${contract.label}
        </div>
        <p style="line-height:1.6;font-size:14px;color:#6b6660">Didn't receive the attachment or need help? Just reply to this email.</p>
        <p style="margin-top:32px;font-size:12px;color:#9a9590">Kontraktly · kontraktly.no</p>
      </div>
    `
    : `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#1a1a1a">
        <div style="border-bottom:2px solid #c9a85c;padding-bottom:12px;margin-bottom:24px">
          <span style="font-size:18px;letter-spacing:1px;color:#c9a85c;font-weight:600">KONTRAKTLY</span>
        </div>
        <h1 style="font-size:20px;margin:0 0 16px">Takk for kjøpet!</h1>
        <p style="line-height:1.6">Din <strong>${labelLower}</strong> er klar og vedlagt denne e-posten som PDF.</p>
        <p style="line-height:1.6">Filen er ferdig utfylt med dine opplysninger og klar til å skrives ut eller signeres digitalt.</p>
        <div style="background:#faf7f0;border:1px solid #e5d9b6;border-radius:4px;padding:16px;margin:24px 0;font-size:13px;color:#6b6660">
          <strong style="color:#1a1a1a">Kvitteringsnummer:</strong> ${reference}<br>
          <strong style="color:#1a1a1a">Produkt:</strong> ${contract.label}
        </div>
        <p style="line-height:1.6;font-size:14px;color:#6b6660">Har du ikke fått vedlegget, eller trenger du hjelp? Svar på denne e-posten så hjelper vi deg.</p>
        <p style="margin-top:32px;font-size:12px;color:#9a9590">Kontraktly · kontraktly.no</p>
      </div>
    `;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: toEmail,
    subject,
    text,
    html,
    attachments: [
      {
        filename,
        content: pdfBuffer,
      },
    ],
  });

  if (error) throw new Error(`Resend error: ${JSON.stringify(error)}`);
  return data;
}

export function valuesFromStripeMetadata(metadata: Record<string, string> | null | undefined): Record<string, string> {
  if (!metadata) return {};
  const count = parseInt(metadata.values_count ?? "0", 10);
  if (!count) return {};
  let json = "";
  for (let i = 0; i < count; i++) {
    const chunk = metadata[`values_${i}`];
    if (typeof chunk !== "string") return {};
    json += chunk;
  }
  try {
    const parsed = JSON.parse(json);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}
