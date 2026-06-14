export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  readingMinutes: number;
  tags: string[];
  relatedContractSlugs: string[];
  content: string;
};
