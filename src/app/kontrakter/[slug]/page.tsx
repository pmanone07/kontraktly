import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CONTRACT_TYPES, getContract, getContractSlugs } from "@/lib/contracts";
import { ContractFlowProvider } from "@/components/contracts/ContractFlow";
import { ContractCTA } from "@/components/contracts/ContractCTA";
import { SiteNav } from "@/components/SiteNav";
import { ArrowLeft, Check, ChevronRight, Scale, ShieldCheck } from "lucide-react";

const SITE_URL = "https://www.kontraktly.no";

export function generateStaticParams() {
  return getContractSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const contract = getContract(slug);
  if (!contract) return {};

  const url = `${SITE_URL}/kontrakter/${contract.id}`;
  return {
    title: contract.seo.metaTitle,
    description: contract.seo.metaDescription,
    alternates: { canonical: `/kontrakter/${contract.id}` },
    openGraph: {
      type: "website",
      url,
      title: contract.seo.metaTitle,
      description: contract.seo.metaDescription,
      siteName: "Kontraktly",
      locale: "nb_NO",
    },
    twitter: {
      card: "summary_large_image",
      title: contract.seo.metaTitle,
      description: contract.seo.metaDescription,
    },
  };
}

export default async function ContractPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const contract = getContract(slug);
  if (!contract) notFound();

  const Icon = contract.icon;
  const url = `${SITE_URL}/kontrakter/${contract.id}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: contract.label,
    description: contract.seo.metaDescription,
    brand: { "@type": "Brand", name: "Kontraktly" },
    category: "Juridiske kontrakter",
    url,
    offers: {
      "@type": "Offer",
      price: contract.price.toFixed(2),
      priceCurrency: "NOK",
      availability: "https://schema.org/InStock",
      url,
      priceSpecification: {
        "@type": "PriceSpecification",
        price: contract.price.toFixed(2),
        priceCurrency: "NOK",
        valueAddedTaxIncluded: true,
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forsiden", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Kontrakter", item: `${SITE_URL}/#kontrakter` },
      { "@type": "ListItem", position: 3, name: contract.label, item: url },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: contract.seo.faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const related = CONTRACT_TYPES.filter((c) => c.id !== contract.id).slice(0, 3);

  return (
    <ContractFlowProvider>
      <div className="relative min-h-screen overflow-x-hidden" style={{ background: "#000" }}>
        <div className="relative z-10">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />

          {/* NAV */}
          <SiteNav />

          {/* BREADCRUMB */}
          <div className="mx-auto max-w-4xl px-6 pt-4">
            <nav aria-label="Brødsmuler" className="text-xs flex items-center gap-2" style={{ color: "#7a7672" }}>
              <Link href="/" className="hover:text-[#c9a85c] transition-colors">Forsiden</Link>
              <ChevronRight className="h-3 w-3" style={{ color: "#3d3d40" }} />
              <Link href="/#kontrakter" className="hover:text-[#c9a85c] transition-colors">Kontrakter</Link>
              <ChevronRight className="h-3 w-3" style={{ color: "#3d3d40" }} />
              <span style={{ color: "#a09c97" }}>{contract.label}</span>
            </nav>
          </div>

          {/* HERO */}
          <header className="mx-auto max-w-4xl px-6 pt-10 pb-12">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-sm"
                style={{ background: `${contract.color}18`, border: `1px solid ${contract.color}30` }}
              >
                <Icon className="h-7 w-7" style={{ color: contract.color }} />
              </div>
              <div>
                <p className="font-mono-custom text-[10px] uppercase tracking-widest" style={{ color: "rgba(201,168,92,0.5)" }}>
                  Bygg din egen — {contract.price} kr
                </p>
                <h1 className="font-display font-bold leading-tight"
                  style={{ fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)", color: "#f0ede6" }}>
                  {contract.label}
                </h1>
              </div>
            </div>
            <p className="text-base md:text-lg leading-relaxed mb-8 max-w-2xl" style={{ color: "#9a9690" }}>
              {contract.seo.longDescription}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <ContractCTA slug={contract.id} price={contract.price} />
              <ContractCTA slug={contract.id} price={contract.price} variant="preview" />
            </div>
          </header>

          {/* USE CASES */}
          <section className="mx-auto max-w-4xl px-6 pb-12">
            <div className="ornament mb-6">
              <span className="font-mono-custom text-[10px] tracking-[0.25em] uppercase" style={{ color: "#7a7672" }}>
                Når trenger du dette?
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "#f0ede6" }}>
              Typiske bruksområder
            </h2>
            <ul className="space-y-3">
              {contract.seo.useCases.map((uc) => (
                <li key={uc} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "#a09c97" }}>
                  <Check className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#c9a85c" }} />
                  <span>{uc}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* INCLUDES */}
          <section className="mx-auto max-w-4xl px-6 pb-12">
            <div className="ornament mb-6">
              <span className="font-mono-custom text-[10px] tracking-[0.25em] uppercase" style={{ color: "#7a7672" }}>
                Hva inkluderer kontrakten
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "#f0ede6" }}>
              Kontrakten dekker
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {contract.seo.includes.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-sm p-3 text-sm"
                  style={{ border: "1px solid rgba(201,168,92,0.1)", background: "#0d0d0f", color: "#a09c97" }}
                >
                  <ShieldCheck className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#c9a85c" }} />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* LEGAL BASIS */}
          <section className="mx-auto max-w-4xl px-6 pb-12">
            <div
              className="rounded-sm p-6 flex items-start gap-4"
              style={{ border: "1px solid rgba(201,168,92,0.15)", background: "#0d0d0f" }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-sm flex-none"
                style={{ background: "rgba(201,168,92,0.1)", border: "1px solid rgba(201,168,92,0.2)" }}
              >
                <Scale className="h-5 w-5" style={{ color: "#c9a85c" }} />
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold mb-2" style={{ color: "#f0ede6" }}>
                  Juridisk grunnlag
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "#9a9690" }}>
                  {contract.seo.legalBasis}
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mx-auto max-w-3xl px-6 pb-12">
            <div className="ornament mb-6">
              <span className="font-mono-custom text-[10px] tracking-[0.25em] uppercase" style={{ color: "#7a7672" }}>
                Spørsmål om {contract.label.toLowerCase()}
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold mb-6 text-center" style={{ color: "#f0ede6" }}>
              Ofte stilte spørsmål
            </h2>
            <div className="space-y-3">
              {contract.seo.faqs.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-sm overflow-hidden"
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
          <section className="mx-auto max-w-4xl px-6 pb-16">
            <div className="rounded-sm p-8 text-center"
              style={{ border: "1px solid rgba(201,168,92,0.2)", background: "linear-gradient(135deg, #111113, #0d0d0f)" }}>
              <h2 className="font-display mb-3 font-bold" style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", color: "#f0ede6" }}>
                Kom i gang med {contract.label.toLowerCase()}
              </h2>
              <p className="mb-6 text-sm" style={{ color: "#7a7672" }}>
                Fyll inn dine opplysninger, betal {contract.price} kr og last ned PDF — under 10 minutter.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <ContractCTA slug={contract.id} price={contract.price} />
                <ContractCTA slug={contract.id} price={contract.price} variant="preview" />
              </div>
            </div>
          </section>

          {/* RELATED */}
          <section className="mx-auto max-w-5xl px-6 pb-20">
            <div className="ornament mb-6">
              <span className="font-mono-custom text-[10px] tracking-[0.25em] uppercase" style={{ color: "#7a7672" }}>
                Andre kontrakter
              </span>
            </div>
            <h2 className="font-display text-xl font-bold mb-6" style={{ color: "#f0ede6" }}>
              Andre kontrakter du kan bygge
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((c) => {
                const RIcon = c.icon;
                return (
                  <Link
                    key={c.id}
                    href={`/kontrakter/${c.id}`}
                    className="rounded-sm p-5 gold-glow-hover block"
                    style={{ border: "1px solid rgba(201,168,92,0.12)", background: "#111113" }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-sm"
                        style={{ background: `${c.color}18`, border: `1px solid ${c.color}30` }}>
                        <RIcon className="h-4 w-4" style={{ color: c.color }} />
                      </div>
                      <span className="font-mono-custom text-sm" style={{ color: "#f0ede6" }}>
                        {c.price}<span className="text-xs ml-0.5" style={{ color: "#7a7672" }}>kr</span>
                      </span>
                    </div>
                    <h3 className="font-display text-sm font-semibold mb-1" style={{ color: "#f0ede6" }}>
                      {c.label}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: "#7a7672" }}>
                      {c.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>

          <footer className="px-6 py-8 md:px-12" style={{ borderTop: "1px solid rgba(201,168,92,0.1)" }}>
            <div className="mx-auto max-w-5xl">
              <Link href="/" className="inline-flex items-center gap-2 text-xs" style={{ color: "#7a7672" }}>
                <ArrowLeft className="h-3.5 w-3.5" />
                Tilbake til forsiden
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </ContractFlowProvider>
  );
}
