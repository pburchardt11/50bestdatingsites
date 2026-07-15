import type { MetadataRoute } from 'next';
import {
  getAllSites,
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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/rankings`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/reviews`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/compare`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/quiz`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/team`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/submit`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
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

  const countryPages: MetadataRoute.Sitemap = getAllCountries().map((c) => ({
    url: `${baseUrl}/country/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const sitePages: MetadataRoute.Sitemap = getAllSites()
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
