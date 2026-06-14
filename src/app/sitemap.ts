import type { MetadataRoute } from "next";
import { getContractSlugs } from "@/lib/contracts";
import { getAllBlogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.kontraktly.no";
  const lastModified = new Date();

  const home: MetadataRoute.Sitemap[number] = {
    url: baseUrl,
    lastModified,
    changeFrequency: "weekly",
    priority: 1,
  };

  const contractPages: MetadataRoute.Sitemap = getContractSlugs().map((slug) => ({
    url: `${baseUrl}/kontrakter/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogIndex: MetadataRoute.Sitemap[number] = {
    url: `${baseUrl}/blogg`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  };

  const blogPosts: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${baseUrl}/blogg/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [home, ...contractPages, blogIndex, ...blogPosts];
}
