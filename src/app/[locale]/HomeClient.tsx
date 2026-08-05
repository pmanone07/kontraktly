"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  FileText, Users,
  ChevronRight, Check, ArrowRight, ArrowUp,
  Download, Lock, Zap, Globe,
} from "lucide-react";
import { getContractsByLocale, type ContractType } from "@/lib/contracts";
import { ContractFlowProvider, useContractFlow } from "@/components/contracts/ContractFlow";
import { ContactForm } from "@/components/ContactForm";
import { SiteNav } from "@/components/SiteNav";

const SITE_URL = "https://www.kontraktly.no";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kontraktly",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: "Norsk tjeneste for å lage profesjonelle, juridisk solide kontrakter på under 10 minutter.",
  areaServed: "NO",
  inLanguage: "nb-NO",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Kontraktly",
  url: SITE_URL,
  inLanguage: "nb-NO",
};

const productListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Kontrakter — maler tilpasset norsk lovgivning",
  itemListElement: getContractsByLocale("no").map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: c.label,
      description: c.description,
      image: [`${SITE_URL}/opengraph-image`, `${SITE_URL}/logo.png`],
      brand: { "@type": "Brand", name: "Kontraktly" },
      category: "Juridiske kontrakter",
      url: `${SITE_URL}/kontrakter/${c.id}`,
      offers: {
        "@type": "Offer",
        price: c.price.toFixed(2),
        priceCurrency: "NOK",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/kontrakter/${c.id}`,
        seller: { "@type": "Organization", name: "Kontraktly" },
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "NO",
          returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
          merchantReturnDays: 0,
        },
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "NOK" },
          shippingDestination: { "@type": "DefinedRegion", addressCountry: "NO" },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
            transitTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
          },
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: c.price.toFixed(2),
          priceCurrency: "NOK",
          valueAddedTaxIncluded: true,
        },
      },
    },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Forsiden", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Kontrakter", item: `${SITE_URL}/#kontrakter` },
    { "@type": "ListItem", position: 3, name: "Spørsmål og svar", item: `${SITE_URL}/#faq` },
  ],
};

const FAQ_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;

type InfoKey = "personvern" | "vilkar" | "kontakt";

function ContractCard({ contract, index }: { contract: ContractType; index: number }) {
  const t = useTranslations("Home");
  const Icon = contract.icon;
  const href = `/kontrakter/${contract.id}`;

  return (
    <Card
      className={`animate-scale-in delay-${index * 100} relative flex flex-col rounded-sm p-6 gold-glow-hover group`}
      style={{ border: "1px solid rgba(201,168,92,0.12)", background: "#111113" }}
    >
      {contract.popular && (
        <div className="absolute top-0 right-4">
          <Badge className="rounded-none rounded-b-sm text-[10px] font-medium tracking-widest uppercase px-2 py-0.5"
            style={{ background: "#c9a85c", color: "#0a0a0b" }}>
            {t("cardPopular")}
          </Badge>
        </div>
      )}
      <Link href={href} className="flex flex-col flex-1 group/link" aria-label={t("cardMore", { label: contract.label })}>
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm"
            style={{ background: `${contract.color}18`, border: `1px solid ${contract.color}30` }}>
            <Icon className="h-5 w-5" style={{ color: contract.color }} />
          </div>
          <span className="font-mono-custom text-xl font-medium" style={{ color: "#f0ede6" }}>
            {contract.price}<span className="text-sm ml-0.5" style={{ color: "#7a7672" }}>kr</span>
          </span>
        </div>
        <h3 className="font-display mb-1 text-[1.05rem] font-semibold transition-colors group-hover/link:text-[#c9a85c]" style={{ color: "#f0ede6" }}>
          {contract.label}
        </h3>
        <p className="mb-4 text-sm leading-relaxed" style={{ color: "#7a7672" }}>{contract.description}</p>
        <ul className="mb-6 space-y-1.5 flex-1">
          {contract.features.slice(0, 4).map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "#7a7672" }}>
              <Check className="h-3 w-3 flex-shrink-0" style={{ color: "#c9a85c" }} />
              {f}
            </li>
          ))}
          {contract.features.length > 4 && (
            <li className="text-xs" style={{ color: "rgba(201,168,92,0.5)" }}>
              {t("cardMoreFeatures", { count: contract.features.length - 4 })}
            </li>
          )}
        </ul>
      </Link>
      <div className="flex gap-2">
        <Link href={href} className="flex-1">
          <Button size="sm" className="w-full rounded-sm h-9 text-xs font-medium"
            style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)", color: "#0a0a0b" }}>
            {t("cardCreate")}
          </Button>
        </Link>
        <Link href={href}>
          <Button size="sm" className="rounded-sm h-9 text-xs px-3"
            style={{ border: "1px solid rgba(201,168,92,0.2)", background: "transparent", color: "#7a7672" }}>
            {t("cardPreview")}
          </Button>
        </Link>
      </div>
    </Card>
  );
}

function HeroPreviewButton() {
  const { openPreview } = useContractFlow();
  const t = useTranslations("Home");
  const locale = useLocale();
  const first = getContractsByLocale(locale === "en" ? "en" : "no")[0];
  if (!first) return null;
  return (
    <Button size="lg" onClick={() => openPreview(first)} className="rounded-sm h-12 px-8 text-sm"
      style={{ border: "1px solid rgba(201,168,92,0.25)", background: "transparent", color: "#f0ede6" }}>
      {t("ctaSeeExample")}
    </Button>
  );
}

function PageContent() {
  const [infoOpen, setInfoOpen] = useState<InfoKey | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const t = useTranslations("Home");
  const tFaq = useTranslations("Faq");
  const tFooter = useTranslations("Footer");
  const tLegal = useTranslations("Legal");
  const locale = useLocale();

  const isNo = locale === "no";

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const steps = [
    { n: "01", title: t("step1Title"), desc: t("step1Desc") },
    { n: "02", title: t("step2Title"), desc: t("step2Desc") },
    { n: "03", title: t("step3Title"), desc: t("step3Desc") },
  ];

  const faqs = FAQ_KEYS.map((k) => ({
    q: tFaq(`q${k}` as "q1"),
    a: tFaq(`a${k}` as "a1"),
  }));

  const trustBadges = [
    { icon: Lock, text: t("trustEncryption") },
    { icon: Zap, text: t("trustSpeed") },
    { icon: Globe, text: t("trustLaw") },
    { icon: Download, text: t("trustDownload") },
  ];

  const footerLinks: { label: string; key: InfoKey }[] = [
    { label: tFooter("privacy"), key: "personvern" },
    { label: tFooter("terms"), key: "vilkar" },
    { label: tFooter("contact"), key: "kontakt" },
  ];

  // JSON-LD FAQ og HowTo bygges kun for norsk versjon siden det er der SEO-verdien ligger
  const faqJsonLd = isNo ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  } : null;

  const howToJsonLd = isNo ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Slik lager du en juridisk gyldig kontrakt på Kontraktly",
    description: "Tre enkle steg fra valg av kontraktstype til ferdig signert PDF — under 10 minutter.",
    inLanguage: "nb-NO",
    totalTime: "PT10M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "NOK", value: "59" },
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.desc,
      url: `${SITE_URL}/#kontrakter`,
    })),
  } : null;

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "#000" }}>
      <div className="relative z-10">
        {/* JSON-LD structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        {isNo && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }} />
        )}
        {howToJsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
        )}
        {faqJsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        )}

        {/* NAV */}
        <SiteNav />

        {/* HERO */}
        <section className="mx-auto max-w-5xl px-6 pb-24 pt-16 text-center md:pt-24">
          <div className="animate-fade-up">
            <Badge className="mb-6 px-3 py-1 text-xs font-mono-custom tracking-widest uppercase"
              style={{ border: "1px solid rgba(201,168,92,0.3)", background: "rgba(201,168,92,0.08)", color: "#c9a85c" }}>
              {t("badge")}
            </Badge>
          </div>
          <h1 className="font-display animate-fade-up delay-100 mb-6 font-bold leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", color: "#f0ede6" }}>
            {t("heroTitleStart")}{" "}
            <em className="not-italic gold-shimmer">{t("heroTitleEmphasis")}</em>
            <br />
          </h1>
          <p className="animate-fade-up delay-200 mx-auto mb-10 max-w-2xl text-[1.1rem] leading-relaxed" style={{ color: "#7a7672" }}>
            {t("heroDescription")}
          </p>
          <div className="animate-fade-up delay-300 flex flex-wrap items-center justify-center gap-4">
            <a href="#kontrakter">
              <Button size="lg" className="rounded-sm h-12 px-8 text-sm font-medium tracking-wide"
                style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)", color: "#0a0a0b" }}>
                {t("ctaSeeAll")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <HeroPreviewButton />
          </div>
          <div className="animate-fade-up delay-400 mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustBadges.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm" style={{ color: "#7a7672" }}>
                <Icon className="h-3.5 w-3.5" style={{ color: "#c9a85c" }} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <div className="ornament mb-12 animate-fade-up">
            <span className="font-mono-custom text-[10px] tracking-[0.25em] uppercase" style={{ color: "#7a7672" }}>
              {t("howItWorksLabel")}
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.n} className={`animate-fade-up delay-${(i + 1) * 100} rounded-sm p-6 gold-glow-hover`}
                style={{ border: "1px solid rgba(201,168,92,0.12)", background: "#111113" }}>
                <span className="font-mono-custom text-4xl font-medium leading-none" style={{ color: "rgba(201,168,92,0.2)" }}>
                  {step.n}
                </span>
                <h3 className="font-display mt-3 text-lg font-semibold" style={{ color: "#f0ede6" }}>{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "#7a7672" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTRACTS */}
        <section id="kontrakter" className="mx-auto max-w-5xl px-6 pb-24 scroll-mt-8">
          <div className="ornament mb-4 animate-fade-up">
            <span className="font-mono-custom text-[10px] tracking-[0.25em] uppercase" style={{ color: "#7a7672" }}>
              {t("contractsLabel")}
            </span>
          </div>
          <h2 className="font-display animate-fade-up delay-100 mb-4 text-center font-bold"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#f0ede6" }}>
            {t("contractsTitle")}
          </h2>
          <p className="animate-fade-up delay-150 mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed" style={{ color: "#7a7672" }}>
            {t("contractsDescription")}
          </p>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {getContractsByLocale(isNo ? "no" : "en").map((contract, i) => (
              <ContractCard key={contract.id} contract={contract} index={i} />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-6 pb-24 scroll-mt-8">
          <div className="ornament mb-4 animate-fade-up">
            <span className="font-mono-custom text-[10px] tracking-[0.25em] uppercase" style={{ color: "#7a7672" }}>
              {t("faqLabel")}
            </span>
          </div>
          <h2 className="font-display animate-fade-up delay-100 mb-10 text-center font-bold"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#f0ede6" }}>
            {t("faqTitle")}
          </h2>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <details
                key={item.q}
                className={`group animate-fade-up delay-${Math.min((i + 1) * 50, 300)} rounded-sm overflow-hidden`}
                style={{ border: "1px solid rgba(201,168,92,0.12)", background: "#111113" }}
              >
                <summary
                  className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 list-none"
                  style={{ color: "#f0ede6" }}
                >
                  <span className="font-display text-[0.95rem] font-medium">{item.q}</span>
                  <ChevronRight
                    className="h-4 w-4 flex-shrink-0 transition-transform duration-200 group-open:rotate-90"
                    style={{ color: "#c9a85c" }}
                  />
                </summary>
                <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "#a09c97" }}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <div className="animate-fade-up rounded-sm p-10 text-center"
            style={{ border: "1px solid rgba(201,168,92,0.2)", background: "linear-gradient(135deg, #111113, #0d0d0f)" }}>
            <h2 className="font-display mb-3 font-bold" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "#f0ede6" }}>
              {t("ctaBannerTitle")}
            </h2>
            <p className="mb-7 text-sm" style={{ color: "#7a7672" }}>
              {t("ctaBannerDesc")}
            </p>
            <a href="#kontrakter">
              <Button size="lg" className="rounded-sm h-11 px-10 text-sm font-medium"
                style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)", color: "#0a0a0b" }}>
                {t("ctaBannerButton")} <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-6 py-8 md:px-12" style={{ borderTop: "1px solid rgba(201,168,92,0.1)" }}>
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
            <Image src="/logo.png" alt="Kontraktly" width={100} height={100} className="h-9 w-auto opacity-80" />
            <div className="flex gap-6 text-xs" style={{ color: "#7a7672" }}>
              {footerLinks.map((link) => (
                <button
                  key={link.key}
                  type="button"
                  onClick={() => setInfoOpen(link.key)}
                  className="cursor-pointer hover:text-[#c9a85c] transition-colors bg-transparent border-0 p-0 text-xs"
                  style={{ color: "#7a7672" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <p className="text-xs" style={{ color: "#3d3d40" }}>{tFooter("copyright")}</p>
          </div>
        </footer>
      </div>

      {/* SCROLL TO TOP */}
      <button
        type="button"
        aria-label={t("backToTop")}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-40 h-11 w-11 rounded-sm flex items-center justify-center transition-all duration-300 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        style={{
          background: "linear-gradient(135deg, #c9a85c, #a07c30)",
          color: "#0a0a0b",
          boxShadow: "0 8px 24px rgba(201,168,92,0.25)",
        }}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* INFO DIALOGS */}
      <Dialog open={infoOpen !== null} onOpenChange={(o) => !o && setInfoOpen(null)}>
        <DialogContent className="w-[95vw] max-w-2xl rounded-sm p-0 overflow-hidden flex flex-col"
          style={{ border: "1px solid rgba(201,168,92,0.2)", background: "#0f0f11", maxHeight: "min(92dvh, 700px)" }}>
          {infoOpen && (
            <>
              <DialogHeader className="px-6 pt-6 pb-4 flex-none" style={{ borderBottom: "1px solid rgba(201,168,92,0.1)" }}>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-sm"
                    style={{ background: "rgba(201,168,92,0.12)" }}>
                    {infoOpen === "personvern" && <Lock className="h-5 w-5" style={{ color: "#c9a85c" }} />}
                    {infoOpen === "vilkar" && <FileText className="h-5 w-5" style={{ color: "#c9a85c" }} />}
                    {infoOpen === "kontakt" && <Users className="h-5 w-5" style={{ color: "#c9a85c" }} />}
                  </div>
                  <div>
                    <DialogTitle className="font-display text-base font-semibold" style={{ color: "#f0ede6" }}>
                      {infoOpen === "personvern" && tLegal("privacyTitle")}
                      {infoOpen === "vilkar" && tLegal("termsTitle")}
                      {infoOpen === "kontakt" && tLegal("contactTitle")}
                    </DialogTitle>
                    <p className="text-xs" style={{ color: "#7a7672" }}>
                      {infoOpen === "personvern" && tLegal("privacySubtitle")}
                      {infoOpen === "vilkar" && tLegal("termsSubtitle")}
                      {infoOpen === "kontakt" && tLegal("contactSubtitle")}
                    </p>
                  </div>
                </div>
              </DialogHeader>
              <div className="px-6 py-5 flex-1 overflow-y-auto min-h-0 space-y-4 text-sm" style={{ color: "#9a9690" }}>
                {infoOpen === "personvern" && (
                  <>
                    {(["1", "2", "3", "4", "5"] as const).map((n) => (
                      <section key={n}>
                        <h3 className="font-display text-sm font-semibold mb-2" style={{ color: "#f0ede6" }}>
                          {tLegal(`privacy${n}Title` as "privacy1Title")}
                        </h3>
                        <p className="text-xs leading-relaxed">
                          {tLegal(`privacy${n}Body` as "privacy1Body")}
                          {n === "4" && <span style={{ color: "#c9a85c" }}> patrick@rishaug-it.no</span>}
                          {n === "4" && "."}
                        </p>
                      </section>
                    ))}
                  </>
                )}
                {infoOpen === "vilkar" && (
                  <>
                    {(["1", "2", "3", "4", "5", "6"] as const).map((n) => (
                      <section key={n}>
                        <h3 className="font-display text-sm font-semibold mb-2" style={{ color: "#f0ede6" }}>
                          {tLegal(`terms${n}Title` as "terms1Title")}
                        </h3>
                        <p className="text-xs leading-relaxed">
                          {tLegal(`terms${n}Body` as "terms1Body")}
                        </p>
                      </section>
                    ))}
                  </>
                )}
                {infoOpen === "kontakt" && (
                  <>
                    <section>
                      <p className="text-xs leading-relaxed mb-4">
                        {tLegal("contactIntro")}
                      </p>
                    </section>
                    <ContactForm />
                  </>
                )}
              </div>
              <div className="px-6 pb-6 flex-none">
                <Button className="w-full rounded-sm h-10 text-sm"
                  style={{ border: "1px solid rgba(201,168,92,0.2)", background: "transparent", color: "#7a7672" }}
                  onClick={() => setInfoOpen(null)}>
                  {tFooter("close")}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function HomeClient() {
  return (
    <ContractFlowProvider>
      <PageContent />
    </ContractFlowProvider>
  );
}
