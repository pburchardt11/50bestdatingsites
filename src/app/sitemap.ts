import type { MetadataRoute } from 'next';
import {
  getCoreSites,
  getAllCountries,
  getAllCategories,
  getAllBlogPosts,
  toSlug,
} from '@/lib/dating-db';

export const dynamic = 'force-dynamic';

const baseUrl = 'https://50bestdatingsites.com';

const bestForSlugs = [
  'serious-relationships', 'over-50', 'free', 'lgbtq', 'hookups',
  'professionals', 'single-parents', 'christians', 'muslims', 'asian',
  'black', 'latino', 'seniors', 'women', 'introverts',
];

const teamMembers = [
  'sarah-mitchell', 'david-chen', 'emma-rodriguez',
  'james-okafor', 'priya-sharma', 'lisa-nakamura',
];

const citySlugs = [
  'new-york', 'los-angeles', 'london', 'chicago', 'miami',
  'san-francisco', 'toronto', 'sydney', 'paris', 'berlin',
  'tokyo', 'singapore', 'dubai', 'mumbai', 'hong-kong',
  'seattle', 'boston', 'austin', 'denver', 'portland',
  'barcelona', 'amsterdam', 'melbourne', 'vancouver', 'atlanta',
  'dallas', 'houston', 'philadelphia', 'washington-dc', 'san-diego',
];

const LAST_UPDATED = new Date("2026-09-11");

// Only include countries with meaningful content (high/medium dating popularity)
const TOP_COUNTRY_SLUGS = new Set([
  'usa', 'uk', 'canada', 'australia', 'germany', 'france', 'spain', 'italy',
  'netherlands', 'sweden', 'norway', 'denmark', 'brazil', 'mexico', 'india',
  'japan', 'south-korea', 'singapore', 'thailand', 'philippines', 'indonesia',
  'turkey', 'south-africa', 'nigeria', 'egypt', 'uae', 'israel', 'new-zealand',
  'ireland', 'switzerland', 'austria', 'belgium', 'portugal', 'poland', 'russia',
  'ukraine', 'colombia', 'argentina', 'chile', 'peru', 'malaysia', 'vietnam',
  'taiwan', 'hong-kong', 'china', 'kenya', 'ghana', 'pakistan', 'bangladesh',
  'czech-republic',
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = LAST_UPDATED;

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/rankings`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/reviews`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/team`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/cities`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const teamPages: MetadataRoute.Sitemap = teamMembers.map((slug) => ({
    url: `${baseUrl}/team/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${baseUrl}/city/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

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

  // Only include top 50 countries with meaningful dating markets
  const countryPages: MetadataRoute.Sitemap = getAllCountries()
    .filter((c) => TOP_COUNTRY_SLUGS.has(c.slug))
    .map((c) => ({
      url: `${baseUrl}/country/${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  // Only include core sites (from data.ts) — exclude generated thin pages
  const sitePages: MetadataRoute.Sitemap = getCoreSites()
    .sort((a, b) => a.globalRank - b.globalRank)
    .map((site) => ({
      url: `${baseUrl}/site/${site.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: site.globalRank <= 50 ? 0.9 : 0.7,
    }));

  return [
    ...staticPages,
    ...teamPages,
    ...cityPages,
    ...bestForPages,
    ...categoryPages,
    ...blogPages,
    ...countryPages,
    ...sitePages,
  ];
}
