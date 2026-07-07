import type { MetadataRoute } from 'next';
import {
  getAllSites,
  getAllCountries,
  getAllCategories,
  getAllBlogPosts,
  toSlug,
} from '@/lib/dating-db';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://50bestdatingsites.com';
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const sitePages: MetadataRoute.Sitemap = getAllSites().map((site) => ({
    url: `${baseUrl}/site/${site.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const countryPages: MetadataRoute.Sitemap = getAllCountries().map((c) => ({
    url: `${baseUrl}/country/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
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

  return [
    ...staticPages,
    ...sitePages,
    ...countryPages,
    ...categoryPages,
    ...blogPages,
  ];
}
