// Lightweight search index for client-side search
// Only contains the minimum data needed for search results display

import { getAllSites, getAllCountries, getAllBlogPosts, getAllCategories, toSlug } from './dating-db';

export interface SearchSiteEntry {
  slug: string;
  name: string;
  logo: string;
  category: string;
  bestFor: string;
  score: number;
}

export interface SearchCountryEntry {
  slug: string;
  name: string;
  emoji: string;
}

export interface SearchBlogEntry {
  slug: string;
  title: string;
  category: string;
  tags: string[];
}

export interface SearchIndex {
  sites: SearchSiteEntry[];
  countries: SearchCountryEntry[];
  blogs: SearchBlogEntry[];
  categories: string[];
}

let _cachedIndex: SearchIndex | null = null;

export function getSearchIndex(): SearchIndex {
  if (_cachedIndex) return _cachedIndex;
  
  _cachedIndex = {
    sites: getAllSites().map(s => ({
      slug: s.slug,
      name: s.name,
      logo: s.logo,
      category: s.category,
      bestFor: s.bestFor,
      score: s.metrics.overallScore,
    })),
    countries: getAllCountries().map(c => ({
      slug: c.slug,
      name: c.name,
      emoji: c.emoji,
    })),
    blogs: getAllBlogPosts().map(p => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      tags: p.tags,
    })),
    categories: getAllCategories(),
  };
  
  return _cachedIndex;
}

export { toSlug };
