import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SiteNav } from "@/components/SiteNav";
import { getAllBlogPosts } from "@/lib/blog";

const SITE_URL = "https://www.kontraktly.no";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  const path = locale === "en" ? "/en/blogg" : "/blogg";

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: path,
      languages: {
        no: "/blogg",
        en: "/en/blogg",
      },
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${path}`,
      title: t("metaTitle"),
      description: t("metaDescription"),
      siteName: "Kontraktly",
      locale: locale === "en" ? "en_US" : "nb_NO",
    },
  };
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === "en" ? "en-US" : "nb-NO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage(
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Blog" });

  // Engelsk versjon: coming soon-side
  if (locale === "en") {
    return (
      <div className="relative min-h-screen overflow-x-hidden" style={{ background: "#000" }}>
        <div className="relative z-10">
          <SiteNav />
          <section className="mx-auto max-w-3xl px-6 pt-16 pb-24 text-center">
            <div className="ornament mb-6">
              <span className="font-mono-custom text-[10px] tracking-[0.25em] uppercase" style={{ color: "#7a7672" }}>
                {t("eyebrow")}
              </span>
            </div>
            <h1
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#f0ede6" }}
            >
              {t("comingSoonTitle")}
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-10 mx-auto max-w-2xl" style={{ color: "#9a9690" }}>
              {t("comingSoonIntro")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#kontrakter"
                className="inline-flex items-center gap-2 rounded-sm h-11 px-6 text-sm font-medium"
                style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)", color: "#0a0a0b" }}
              >
                {t("comingSoonCta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-sm h-11 px-6 text-sm"
                style={{ border: "1px solid rgba(201,168,92,0.25)", background: "transparent", color: "#f0ede6" }}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {t("comingSoonBack")}
              </Link>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // Norsk versjon: full blogg
  const posts = getAllBlogPosts();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Kontraktly Blogg",
    url: `${SITE_URL}/blogg`,
    description:
      "Guider om norske kontrakter — freelance, leie, NDA, arbeid og mer.",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blogg/${p.slug}`,
      datePublished: p.publishedAt,
      author: { "@type": "Organization", name: p.author },
    })),
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "#000" }}>
      <div className="relative z-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />

        <SiteNav />

        {/* HEADER */}
        <header className="mx-auto max-w-4xl px-6 pt-12 pb-10">
          <div className="ornament mb-6">
            <span className="font-mono-custom text-[10px] tracking-[0.25em] uppercase" style={{ color: "#7a7672" }}>
              {t("eyebrow")}
            </span>
          </div>
          <h1
            className="font-display font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#f0ede6" }}
          >
            {t("title")}
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: "#9a9690" }}>
            {t("intro")}
          </p>
        </header>

        {/* POST LIST */}
        <section className="mx-auto max-w-4xl px-6 pb-20">
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blogg/${post.slug}`}
                  className="block rounded-sm p-6 transition-colors gold-glow-hover"
                  style={{
                    border: "1px solid rgba(201,168,92,0.12)",
                    background: "#111113",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3 text-[10px] uppercase tracking-widest font-mono-custom" style={{ color: "rgba(201,168,92,0.5)" }}>
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
                    <span style={{ color: "#3d3d40" }}>·</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {t("readingTime", { minutes: post.readingMinutes })}
                    </span>
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-bold mb-2" style={{ color: "#f0ede6" }}>
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#9a9690" }}>
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono-custom" style={{ color: "#c9a85c" }}>
                    {t("readGuide")}
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <footer className="px-6 py-8 md:px-12" style={{ borderTop: "1px solid rgba(201,168,92,0.1)" }}>
          <div className="mx-auto max-w-5xl">
            <Link href="/" className="inline-flex items-center gap-2 text-xs" style={{ color: "#7a7672" }}>
              <ArrowLeft className="h-3.5 w-3.5" />
              {t("backToFrontpage")}
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
