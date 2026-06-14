import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { getAllBlogPosts } from "@/lib/blog";

const SITE_URL = "https://www.kontraktly.no";

export const metadata: Metadata = {
  title: "Blogg — guider om norske kontrakter",
  description:
    "Praktiske guider om freelance-kontrakter, leiekontrakter, NDA og andre kontrakter etter norsk rett. Hva må med, hva må unngås, og hvordan formulere det.",
  alternates: { canonical: "/blogg" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blogg`,
    title: "Blogg — guider om norske kontrakter",
    description: "Praktiske guider om freelance-kontrakter, leiekontrakter, NDA og andre kontrakter etter norsk rett.",
    siteName: "Kontraktly",
    locale: "nb_NO",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
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
              Kontraktly journal
            </span>
          </div>
          <h1
            className="font-display font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#f0ede6" }}
          >
            Guider om norske kontrakter
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: "#9a9690" }}>
            Praktiske, oppdaterte guider om kontrakter etter norsk rett — hva må med,
            hva må unngås, og hvordan skrive det så det faktisk holder.
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
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    <span style={{ color: "#3d3d40" }}>·</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {post.readingMinutes} min
                    </span>
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-bold mb-2" style={{ color: "#f0ede6" }}>
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#9a9690" }}>
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono-custom" style={{ color: "#c9a85c" }}>
                    Les guiden
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
              Tilbake til forsiden
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
