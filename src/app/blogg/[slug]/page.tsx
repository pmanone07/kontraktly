import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight, ChevronRight, Clock } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { getAllBlogPosts, getBlogPost, getBlogSlugs } from "@/lib/blog";
import { CONTRACT_TYPES } from "@/lib/contracts";

const SITE_URL = "https://www.kontraktly.no";

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blogg/${post.slug}`;
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blogg/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.metaTitle,
      description: post.metaDescription,
      siteName: "Kontraktly",
      locale: "nb_NO",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blogg/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: post.author, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Kontraktly",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.tags.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forsiden", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blogg", item: `${SITE_URL}/blogg` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const relatedContracts = post.relatedContractSlugs
    .map((id) => CONTRACT_TYPES.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const otherPosts = getAllBlogPosts().filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "#000" }}>
      <div className="relative z-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <SiteNav />

        {/* BREADCRUMB */}
        <div className="mx-auto max-w-3xl px-6 pt-4">
          <nav aria-label="Brødsmuler" className="text-xs flex items-center gap-2" style={{ color: "#7a7672" }}>
            <Link href="/" className="hover:text-[#c9a85c] transition-colors">Forsiden</Link>
            <ChevronRight className="h-3 w-3" style={{ color: "#3d3d40" }} />
            <Link href="/blogg" className="hover:text-[#c9a85c] transition-colors">Blogg</Link>
            <ChevronRight className="h-3 w-3" style={{ color: "#3d3d40" }} />
            <span style={{ color: "#a09c97" }} className="truncate">{post.title}</span>
          </nav>
        </div>

        {/* HEADER */}
        <header className="mx-auto max-w-3xl px-6 pt-8 pb-10">
          <div className="flex items-center gap-3 mb-5 text-[10px] uppercase tracking-widest font-mono-custom" style={{ color: "rgba(201,168,92,0.5)" }}>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span style={{ color: "#3d3d40" }}>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              {post.readingMinutes} min lesetid
            </span>
          </div>
          <h1
            className="font-display font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.8rem)", color: "#f0ede6" }}
          >
            {post.title}
          </h1>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: "#9a9690" }}>
            {post.excerpt}
          </p>
        </header>

        {/* ARTICLE */}
        <article className="mx-auto max-w-3xl px-6 pb-12 blog-prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => (
                <h2 className="font-display text-2xl font-bold mt-12 mb-4" style={{ color: "#f0ede6" }}>
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-display text-lg font-semibold mt-8 mb-3" style={{ color: "#f0ede6" }}>
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-base leading-relaxed mb-5" style={{ color: "#a09c97" }}>
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="space-y-2 mb-5 pl-5 list-disc marker:text-[#c9a85c]" style={{ color: "#a09c97" }}>
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="space-y-2 mb-5 pl-5 list-decimal marker:text-[#c9a85c]" style={{ color: "#a09c97" }}>
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
              a: ({ href, children }) => (
                <Link
                  href={href ?? "#"}
                  className="underline transition-colors"
                  style={{ color: "#c9a85c", textDecorationColor: "rgba(201,168,92,0.3)" }}
                >
                  {children}
                </Link>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold" style={{ color: "#f0ede6" }}>
                  {children}
                </strong>
              ),
              code: ({ children }) => (
                <code
                  className="font-mono-custom text-sm rounded px-1.5 py-0.5"
                  style={{ background: "rgba(201,168,92,0.08)", color: "#c9a85c" }}
                >
                  {children}
                </code>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        {/* RELATED CONTRACTS */}
        {relatedContracts.length > 0 && (
          <section className="mx-auto max-w-4xl px-6 pb-12">
            <div
              className="rounded-sm p-6"
              style={{ border: "1px solid rgba(201,168,92,0.15)", background: "#0d0d0f" }}
            >
              <p className="font-mono-custom text-[10px] tracking-widest uppercase mb-4" style={{ color: "rgba(201,168,92,0.5)" }}>
                Bygg kontrakten nå
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                {relatedContracts.map((c) => {
                  const Icon = c.icon;
                  return (
                    <Link
                      key={c.id}
                      href={`/kontrakter/${c.id}`}
                      className="rounded-sm p-4 gold-glow-hover block"
                      style={{ border: "1px solid rgba(201,168,92,0.12)", background: "#111113" }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-sm"
                          style={{ background: `${c.color}18`, border: `1px solid ${c.color}30` }}
                        >
                          <Icon className="h-4 w-4" style={{ color: c.color }} />
                        </div>
                        <span className="font-mono-custom text-sm" style={{ color: "#f0ede6" }}>
                          {c.price}
                          <span className="text-xs ml-0.5" style={{ color: "#7a7672" }}>kr</span>
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
            </div>
          </section>
        )}

        {/* OTHER POSTS */}
        {otherPosts.length > 0 && (
          <section className="mx-auto max-w-4xl px-6 pb-20">
            <div className="ornament mb-6">
              <span className="font-mono-custom text-[10px] tracking-[0.25em] uppercase" style={{ color: "#7a7672" }}>
                Flere guider
              </span>
            </div>
            <ul className="grid gap-4 md:grid-cols-3">
              {otherPosts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blogg/${p.slug}`}
                    className="block rounded-sm p-5 gold-glow-hover h-full"
                    style={{ border: "1px solid rgba(201,168,92,0.12)", background: "#111113" }}
                  >
                    <p className="font-mono-custom text-[10px] uppercase tracking-widest mb-2" style={{ color: "rgba(201,168,92,0.5)" }}>
                      {p.readingMinutes} min
                    </p>
                    <h3 className="font-display text-sm font-semibold mb-2" style={{ color: "#f0ede6" }}>
                      {p.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono-custom" style={{ color: "#c9a85c" }}>
                      Les
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="px-6 py-8 md:px-12" style={{ borderTop: "1px solid rgba(201,168,92,0.1)" }}>
          <div className="mx-auto max-w-5xl">
            <Link href="/blogg" className="inline-flex items-center gap-2 text-xs" style={{ color: "#7a7672" }}>
              <ArrowLeft className="h-3.5 w-3.5" />
              Tilbake til bloggen
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
