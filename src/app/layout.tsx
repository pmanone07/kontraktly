import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kontraktly.no"),
  title: {
    default: "Kontraktly — Norske kontraktmaler på under 10 minutter",
    template: "%s | Kontraktly",
  },
  description:
    "Lag profesjonelle, juridisk solide kontrakter tilpasset norsk lovgivning. Freelance-kontrakt, leiekontrakt, NDA, arbeidsavtale og flere. Last ned som PDF — fra 59 kr.",
  applicationName: "Kontraktly",
  keywords: [
    "kontraktmal",
    "freelance-kontrakt",
    "leiekontrakt",
    "NDA mal norsk",
    "arbeidskontrakt",
    "konsulentavtale",
    "samboerkontrakt",
    "låneavtale",
    "aksjonæravtale",
    "kjøpskontrakt bil",
    "kontrakt PDF",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    url: "https://www.kontraktly.no",
    siteName: "Kontraktly",
    title: "Kontraktly — Norske kontraktmaler på under 10 minutter",
    description:
      "Profesjonelle, juridisk solide kontrakter tilpasset norsk lovgivning. Freelance, leie, NDA, arbeid og flere — fra 59 kr.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontraktly — Norske kontraktmaler på under 10 minutter",
    description:
      "Profesjonelle, juridisk solide kontrakter tilpasset norsk lovgivning — fra 59 kr.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    google: "h17zDkGqYNgCfBD0p622NywMkbLRHxRTCZ-Gi9z1DVQ",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no" className="h-full">
      <body className="min-h-full antialiased" style={{ background: "#000" }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
