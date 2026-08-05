import type { MetadataRoute } from "next";
import { getContractSlugs } from "@/lib/contracts";
import { getAllBlogPosts } from "@/lib/blog";

const BASE_URL = "https://www.kontraktly.no";

function withAlternates(path: string): {
  url: string;
  alternates: { languages: Record<string, string> };
} {
  return {
    url: `${BASE_URL}${path}`,
    alternates: {
      languages: {
        no: `${BASE_URL}${path}`,
        en: `${BASE_URL}/en${path}`,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const home: MetadataRoute.Sitemap[number] = {
    ...withAlternates(""),
    lastModified,
    changeFrequency: "weekly",
    priority: 1,
  };

  const contractPages: MetadataRoute.Sitemap = getContractSlugs().map((slug) => ({
    ...withAlternates(`/kontrakter/${slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogIndex: MetadataRoute.Sitemap[number] = {
    ...withAlternates("/blogg"),
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  };

  const blogPosts: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    ...withAlternates(`/blogg/${post.slug}`),
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [home, ...contractPages, blogIndex, ...blogPosts];
}
