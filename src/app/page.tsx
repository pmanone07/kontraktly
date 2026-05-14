"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  FileText, Users,
  ChevronRight, Check, ArrowRight, ArrowUp,
  Download, Lock, Zap, Globe,
} from "lucide-react";
import { CONTRACT_TYPES, type ContractType } from "@/lib/contracts";
import { ContractFlowProvider, useContractFlow } from "@/components/contracts/ContractFlow";
import { ContactForm } from "@/components/ContactForm";
import { SiteNav } from "@/components/SiteNav";

const STEPS = [
  { n: "01", title: "Velg kontraktstype", desc: "Finn typen som passer din situasjon." },
  { n: "02", title: "Bygg kontrakten", desc: "Svar på enkle spørsmål — vi formulerer paragrafene for deg." },
  { n: "03", title: "Betal & last ned", desc: "Betal med kort eller Vipps. Last ned din ferdige PDF." },
];

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
  itemListElement: CONTRACT_TYPES.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: c.label,
      description: c.description,
      brand: { "@type": "Brand", name: "Kontraktly" },
      category: "Juridiske kontrakter",
      url: `${SITE_URL}/kontrakter/${c.id}`,
      offers: {
        "@type": "Offer",
        price: c.price.toFixed(2),
        priceCurrency: "NOK",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/kontrakter/${c.id}`,
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

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Slik lager du en juridisk gyldig kontrakt på Kontraktly",
  description: "Tre enkle steg fra valg av kontraktstype til ferdig signert PDF — under 10 minutter.",
  inLanguage: "nb-NO",
  totalTime: "PT10M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "NOK", value: "59" },
  step: STEPS.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.desc,
    url: `${SITE_URL}/#kontrakter`,
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

const FAQS: { q: string; a: string }[] = [
  {
    q: "Er kontraktene juridisk gyldige i Norge?",
    a: "Ja. Alle malene er utformet etter norsk lovgivning — blant annet avtaleloven, husleieloven og arbeidsmiljøloven der det er relevant. Når begge parter har signert, er kontrakten bindende på lik linje med en avtale skrevet av en advokat.",
  },
  {
    q: "Trenger jeg advokat for å bruke kontraktene?",
    a: "Nei, ikke for standard situasjoner. Malene dekker de vanligste behovene for freelance-oppdrag, leieforhold, NDA, arbeidsavtaler og lignende. For spesielt komplekse forhold (f.eks. store aksjonæravtaler) anbefaler vi alltid en juridisk gjennomgang.",
  },
  {
    q: "Hvordan signeres kontrakten?",
    a: "Du laster ned kontrakten som PDF og kan enten skrive den ut og signere fysisk, eller bruke en e-signaturløsning som BankID, Signicat eller DocuSign. Begge formene er juridisk bindende i Norge.",
  },
  {
    q: "Kan jeg tilpasse innholdet i kontrakten?",
    a: "Ja. Du fyller inn dine egne opplysninger i et enkelt skjema, og kontrakten bygges automatisk med riktig formulering — du ser den ta form i forhåndsvisningen mens du skriver. Etter nedlasting er PDF-en din å redigere videre om du ønsker.",
  },
  {
    q: "Hva koster det?",
    a: "Du betaler kun per kontrakt — fra 59 kr. Ingen abonnement, ingen skjulte gebyrer, og ingen binding. Prisene er inkludert mva.",
  },
  {
    q: "Hvilke betalingsmetoder kan jeg bruke?",
    a: "Du kan betale med kort (Visa, Mastercard) via Stripe. Vipps kommer som betalingsmetode senere.",
  },
  {
    q: "Får jeg refusjon hvis jeg ikke er fornøyd?",
    a: "Siden produktet leveres som en digital fil med umiddelbar nedlasting, faller kjøpet utenfor angreretten etter angrerettsloven § 22. Vi anbefaler at du bruker forhåndsvisningen før du betaler. Ta kontakt om noe er feil — vi løser det.",
  },
  {
    q: "Hvor lagres dataene mine?",
    a: "Vi lagrer kun det som trengs for å levere kontrakten og fakturere. Skjemadataene oppbevares trygt i nettleseren under utfylling, og ingen kontraktinformasjon deles med tredjeparter utover betalingsleverandør.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

function ContractCard({ contract, index }: { contract: ContractType; index: number }) {
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
            Populær
          </Badge>
        </div>
      )}
      <Link href={href} className="flex flex-col flex-1 group/link" aria-label={`Mer om ${contract.label}`}>
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
              + {contract.features.length - 4} til...
            </li>
          )}
        </ul>
      </Link>
      <div className="flex gap-2">
        <Link href={href} className="flex-1">
          <Button size="sm" className="w-full rounded-sm h-9 text-xs font-medium"
            style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)", color: "#0a0a0b" }}>
            Lag kontrakt
          </Button>
        </Link>
        <Link href={href}>
          <Button size="sm" className="rounded-sm h-9 text-xs px-3"
            style={{ border: "1px solid rgba(201,168,92,0.2)", background: "transparent", color: "#7a7672" }}>
            Forhåndsvis
          </Button>
        </Link>
      </div>
    </Card>
  );
}

function HeroPreviewButton() {
  const { openPreview } = useContractFlow();
  return (
    <Button size="lg" onClick={() => openPreview(CONTRACT_TYPES[0])} className="rounded-sm h-12 px-8 text-sm"
      style={{ border: "1px solid rgba(201,168,92,0.25)", background: "transparent", color: "#f0ede6" }}>
      Se eksempel
    </Button>
  );
}

function PageContent() {
  const [infoOpen, setInfoOpen] = useState<null | "personvern" | "vilkar" | "kontakt">(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "#000" }}>
      <div className="relative z-10">
        {/* JSON-LD structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

        {/* NAV */}
        <SiteNav />

        {/* HERO */}
        <section className="mx-auto max-w-5xl px-6 pb-24 pt-16 text-center md:pt-24">
          <div className="animate-fade-up">
            <Badge className="mb-6 px-3 py-1 text-xs font-mono-custom tracking-widest uppercase"
              style={{ border: "1px solid rgba(201,168,92,0.3)", background: "rgba(201,168,92,0.08)", color: "#c9a85c" }}>
              Ingen abonnement · Betal kun per kontrakt
            </Badge>
          </div>
          <h1 className="font-display animate-fade-up delay-100 mb-6 font-bold leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", color: "#f0ede6" }}>
            Bygg kontrakter som{" "}
            <em className="not-italic gold-shimmer">bare fungerer</em>
            <br />
          </h1>
          <p className="animate-fade-up delay-200 mx-auto mb-10 max-w-2xl text-[1.1rem] leading-relaxed" style={{ color: "#7a7672" }}>
            Svar på enkle spørsmål, så formulerer vi en juridisk solid kontrakt tilpasset norsk
            lovgivning — fra freelance og leie til NDA og arbeidsavtale. Ferdig signeringsklar PDF
            på under 10 minutter.
          </p>
          <div className="animate-fade-up delay-300 flex flex-wrap items-center justify-center gap-4">
            <a href="#kontrakter">
              <Button size="lg" className="rounded-sm h-12 px-8 text-sm font-medium tracking-wide"
                style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)", color: "#0a0a0b" }}>
                Se alle kontrakter <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <HeroPreviewButton />
          </div>
          <div className="animate-fade-up delay-400 mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[{ icon: Lock, text: "256-bit kryptering" }, { icon: Zap, text: "Klar på under 10 min" },
              { icon: Globe, text: "Norsk lovgivning" }, { icon: Download, text: "Last ned PDF" }]
              .map(({ icon: Icon, text }) => (
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
              Slik fungerer det
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
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
              Velg kontrakt
            </span>
          </div>
          <h2 className="font-display animate-fade-up delay-100 mb-4 text-center font-bold"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#f0ede6" }}>
            Velg kontraktstype og bygg din egen
          </h2>
          <p className="animate-fade-up delay-150 mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed" style={{ color: "#7a7672" }}>
            Freelance, leie, NDA, arbeidsavtale og flere. Du fyller inn detaljene — vi formulerer
            paragrafene tilpasset norsk lovgivning. Ferdig signeringsklar PDF.
          </p>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CONTRACT_TYPES.map((contract, i) => (
              <ContractCard key={contract.id} contract={contract} index={i} />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-6 pb-24 scroll-mt-8">
          <div className="ornament mb-4 animate-fade-up">
            <span className="font-mono-custom text-[10px] tracking-[0.25em] uppercase" style={{ color: "#7a7672" }}>
              Ofte stilte spørsmål
            </span>
          </div>
          <h2 className="font-display animate-fade-up delay-100 mb-10 text-center font-bold"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#f0ede6" }}>
            Spørsmål og svar
          </h2>
          <div className="space-y-3">
            {FAQS.map((item, i) => (
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
              Klar til å lage kontrakt?
            </h2>
            <p className="mb-7 text-sm" style={{ color: "#7a7672" }}>
              Ingen binding — betal kun for det du trenger.
            </p>
            <a href="#kontrakter">
              <Button size="lg" className="rounded-sm h-11 px-10 text-sm font-medium"
                style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)", color: "#0a0a0b" }}>
                Kom i gang nå <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-6 py-8 md:px-12" style={{ borderTop: "1px solid rgba(201,168,92,0.1)" }}>
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
            <Image src="/logo.png" alt="Kontraktly" width={100} height={100} className="h-9 w-auto opacity-80" />
            <div className="flex gap-6 text-xs" style={{ color: "#7a7672" }}>
              {([
                { label: "Personvern", key: "personvern" as const },
                { label: "Vilkår", key: "vilkar" as const },
                { label: "Kontakt", key: "kontakt" as const },
              ]).map((link) => (
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
            <p className="text-xs" style={{ color: "#3d3d40" }}>© 2026 Kontraktly AS</p>
          </div>
        </footer>
      </div>

      {/* SCROLL TO TOP */}
      <button
        type="button"
        aria-label="Til toppen"
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
                      {infoOpen === "personvern" && "Personvernerklæring"}
                      {infoOpen === "vilkar" && "Bruksvilkår"}
                      {infoOpen === "kontakt" && "Kontakt oss"}
                    </DialogTitle>
                    <p className="text-xs" style={{ color: "#7a7672" }}>
                      {infoOpen === "personvern" && "Hvordan vi behandler dine data"}
                      {infoOpen === "vilkar" && "Vilkår for bruk av Kontraktly"}
                      {infoOpen === "kontakt" && "Vi svarer normalt innen 24 timer"}
                    </p>
                  </div>
                </div>
              </DialogHeader>
              <div className="px-6 py-5 flex-1 overflow-y-auto min-h-0 space-y-4 text-sm" style={{ color: "#9a9690" }}>
                {infoOpen === "personvern" && (
                  <>
                    <section>
                      <h3 className="font-display text-sm font-semibold mb-2" style={{ color: "#f0ede6" }}>1. Behandlingsansvarlig</h3>
                      <p className="text-xs leading-relaxed">
                        Kontraktly AS er behandlingsansvarlig for personopplysninger som samles inn gjennom tjenesten.
                        Vi følger personopplysningsloven og GDPR.
                      </p>
                    </section>
                    <section>
                      <h3 className="font-display text-sm font-semibold mb-2" style={{ color: "#f0ede6" }}>2. Hvilke data vi samler</h3>
                      <p className="text-xs leading-relaxed">
                        Vi samler kun det som er nødvendig for å generere din kontrakt: navn, adresse, organisasjonsnummer
                        og andre felter du selv fyller inn. Betalingsinformasjon håndteres av Stripe og lagres aldri hos oss.
                      </p>
                    </section>
                    <section>
                      <h3 className="font-display text-sm font-semibold mb-2" style={{ color: "#f0ede6" }}>3. Lagring</h3>
                      <p className="text-xs leading-relaxed">
                        Kontraktdata genereres on-demand og lagres ikke på våre servere etter at PDF-en er levert.
                        E-postkvitteringer fra Stripe oppbevares i henhold til norsk regnskapslov (5 år).
                      </p>
                    </section>
                    <section>
                      <h3 className="font-display text-sm font-semibold mb-2" style={{ color: "#f0ede6" }}>4. Dine rettigheter</h3>
                      <p className="text-xs leading-relaxed">
                        Du har rett til innsyn, retting og sletting av dine personopplysninger. Send forespørsel til
                        <span style={{ color: "#c9a85c" }}> patrick@rishaug-it.no</span>.
                      </p>
                    </section>
                    <section>
                      <h3 className="font-display text-sm font-semibold mb-2" style={{ color: "#f0ede6" }}>5. Cookies</h3>
                      <p className="text-xs leading-relaxed">
                        Vi bruker kun strengt nødvendige cookies for at tjenesten skal fungere. Ingen sporing eller analyse
                        uten ditt samtykke.
                      </p>
                    </section>
                  </>
                )}
                {infoOpen === "vilkar" && (
                  <>
                    <section>
                      <h3 className="font-display text-sm font-semibold mb-2" style={{ color: "#f0ede6" }}>1. Tjenesten</h3>
                      <p className="text-xs leading-relaxed">
                        Kontraktly leverer maler for juridiske dokumenter tilpasset norsk lovverk. Malene er utgangspunkt
                        og erstatter ikke individuell juridisk rådgivning.
                      </p>
                    </section>
                    <section>
                      <h3 className="font-display text-sm font-semibold mb-2" style={{ color: "#f0ede6" }}>2. Pris og betaling</h3>
                      <p className="text-xs leading-relaxed">
                        Pris per kontrakt er oppgitt før kjøp. Betaling skjer via Stripe. Mva. kommer i tillegg
                        for kunder med norsk fakturaadresse.
                      </p>
                    </section>
                    <section>
                      <h3 className="font-display text-sm font-semibold mb-2" style={{ color: "#f0ede6" }}>3. Levering</h3>
                      <p className="text-xs leading-relaxed">
                        Etter fullført betaling genereres PDF-en umiddelbart og kan lastes ned direkte i nettleseren.
                        Levering anses som fullført ved nedlasting.
                      </p>
                    </section>
                    <section>
                      <h3 className="font-display text-sm font-semibold mb-2" style={{ color: "#f0ede6" }}>4. Angrerett</h3>
                      <p className="text-xs leading-relaxed">
                        Da tjenesten er digitalt innhold som leveres umiddelbart, frafaller angreretten ved fullført
                        kjøp jf. angrerettloven §22 bokstav n.
                      </p>
                    </section>
                    <section>
                      <h3 className="font-display text-sm font-semibold mb-2" style={{ color: "#f0ede6" }}>5. Ansvarsbegrensning</h3>
                      <p className="text-xs leading-relaxed">
                        Kontraktly er ikke ansvarlig for økonomisk tap som følge av at malene brukes uten kvalifisert
                        gjennomgang. Bruken skjer på eget ansvar.
                      </p>
                    </section>
                    <section>
                      <h3 className="font-display text-sm font-semibold mb-2" style={{ color: "#f0ede6" }}>6. Tvister</h3>
                      <p className="text-xs leading-relaxed">
                        Avtalen reguleres av norsk rett. Eventuelle tvister søkes løst ved minnelig overenskomst, og
                        ellers ved Oslo tingrett.
                      </p>
                    </section>
                  </>
                )}
                {infoOpen === "kontakt" && (
                  <>
                    <section>
                      <p className="text-xs leading-relaxed mb-4">
                        Spørsmål om en kontrakt, faktura eller tjenesten generelt? Send oss en melding under, så svarer vi normalt innen 24 timer.
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
                  Lukk
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function Page() {
  return (
    <ContractFlowProvider>
      <PageContent />
    </ContractFlowProvider>
  );
}
