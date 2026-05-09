import type { MetadataRoute } from "next";
import { getContractSlugs } from "@/lib/contracts";

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

  return [home, ...contractPages];
}
