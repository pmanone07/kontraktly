import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const GOOGLE_ADS_ID = "AW-18150878770";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    metadataBase: new URL("https://www.kontraktly.no"),
    title: {
      default: isEn
        ? "Kontraktly — Norwegian contract templates in under 10 minutes"
        : "Kontraktly — Norske kontraktmaler på under 10 minutter",
      template: "%s | Kontraktly",
    },
    description: isEn
      ? "Create professional, legally sound contracts under Norwegian law. Freelance contract, lease, NDA, employment agreement and more. Download as PDF — from NOK 59."
      : "Lag profesjonelle, juridisk solide kontrakter tilpasset norsk lovgivning. Freelance-kontrakt, leiekontrakt, NDA, arbeidsavtale og flere. Last ned som PDF — fra 59 kr.",
    applicationName: "Kontraktly",
    alternates: {
      canonical: isEn ? "/en" : "/",
      languages: {
        no: "/",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "nb_NO",
      url: isEn ? "https://www.kontraktly.no/en" : "https://www.kontraktly.no",
      siteName: "Kontraktly",
      title: isEn
        ? "Kontraktly — Norwegian contract templates in under 10 minutes"
        : "Kontraktly — Norske kontraktmaler på under 10 minutter",
      description: isEn
        ? "Professional, legally sound contracts under Norwegian law — from NOK 59."
        : "Profesjonelle, juridisk solide kontrakter tilpasset norsk lovgivning — fra 59 kr.",
    },
    twitter: {
      card: "summary_large_image",
      title: isEn
        ? "Kontraktly — Norwegian contract templates"
        : "Kontraktly — Norske kontraktmaler",
      description: isEn
        ? "Professional, legally sound contracts under Norwegian law — from NOK 59."
        : "Profesjonelle, juridisk solide kontrakter tilpasset norsk lovgivning — fra 59 kr.",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "h17zDkGqYNgCfBD0p622NywMkbLRHxRTCZ-Gi9z1DVQ",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale === "en" ? "en" : "no"} className="h-full">
      <body className="min-h-full antialiased" style={{ background: "#000" }}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Analytics />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
