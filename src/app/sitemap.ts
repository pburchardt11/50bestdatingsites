import type { MetadataRoute } from 'next';
import {
  getAllSites,
  getAllCountries,
  getAllCategories,
  getAllBlogPosts,
  toSlug,
} from '@/lib/dating-db';

const baseUrl = 'https://50bestdatingsites.com';

const bestForSlugs = [
  'serious-relationships', 'over-50', 'free', 'lgbtq', 'hookups',
  'professionals', 'single-parents', 'christians', 'muslims', 'asian',
  'black', 'latino', 'seniors', 'women', 'introverts',
];

// Sitemap 0: Static, categories, best-for, blog (~100 URLs)
// Sitemap 1: Countries (200 URLs)
// Sitemap 2: Dating sites ranks 1-500 (500 URLs)
// Sitemap 3: Dating sites ranks 501+ (~523 URLs)

export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  if (id === 0) {
    // Static pages + categories + best-for + blog
    const staticPages: MetadataRoute.Sitemap = [
      { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
      { url: `${baseUrl}/rankings`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
      { url: `${baseUrl}/reviews`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
      { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
      { url: `${baseUrl}/compare`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${baseUrl}/submit`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
      { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
      { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
      { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
      { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    ];

    const bestForPages: MetadataRoute.Sitemap = bestForSlugs.map((slug) => ({
      url: `${baseUrl}/best-for/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }));

    const categoryPages: MetadataRoute.Sitemap = getAllCategories().map((cat) => ({
      url: `${baseUrl}/category/${toSlug(cat)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    const blogPages: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...bestForPages, ...categoryPages, ...blogPages];
  }

  if (id === 1) {
    // Countries
    return getAllCountries().map((c) => ({
      url: `${baseUrl}/country/${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  }

  // Dating sites
  const allSites = getAllSites().sort((a, b) => a.globalRank - b.globalRank);

  if (id === 2) {
    // Top 500 sites
    return allSites.slice(0, 500).map((site) => ({
      url: `${baseUrl}/site/${site.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: site.globalRank <= 50 ? 0.9 : 0.7,
    }));
  }

  // Remaining sites (501+)
  return allSites.slice(500).map((site) => ({
    url: `${baseUrl}/site/${site.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));
}
