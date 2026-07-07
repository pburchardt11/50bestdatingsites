// dating-db.ts — Data access layer for 50 Best Dating Sites

import { datingSites as coreSites, countries, blogPosts } from "./data";

// Try to load generated extended sites
let extendedSites: DatingSite[] = [];
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const generated = require("./generated-sites.json") as DatingSite[];
  extendedSites = generated;
} catch {
  // File doesn't exist yet — that's fine
}

const datingSites: DatingSite[] = [...coreSites, ...extendedSites];

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DatingSite {
  slug: string;
  name: string;
  logo: string; // emoji placeholder
  url: string;
  founded: number;
  headquarters: string;
  globalRank: number;
  category: string;
  pricing: {
    free: boolean;
    premiumMonthly: number;
    currency: string;
  };
  demographics: {
    minAge: number;
    maxAge: number;
    primaryAge: string;
    genderRatio: string;
  };
  metrics: {
    userBase: string;
    activeMonthly: string;
    successRate: string;
    avgMatchTime: string;
    safetyScore: number; // 1-10
    easeOfUse: number; // 1-10
    valueForMoney: number; // 1-10
    matchQuality: number; // 1-10
    overallScore: number;
  };
  features: string[];
  bestFor: string;
  countries: string[];
  editorial: string;
  prosAndCons: {
    pros: string[];
    cons: string[];
  };
}

export interface Country {
  slug: string;
  name: string;
  emoji: string;
  topSites: string[]; // slugs
  population: string;
  internetPenetration: string;
  onlineDatingPopularity: "high" | "medium" | "low";
  legalNotes: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // full markdown
  date: string;
  author: string;
  category: string;
  readTime: string;
  tags: string[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getAllSites(): DatingSite[] {
  return datingSites;
}

export function getSiteBySlug(slug: string): DatingSite | undefined {
  return datingSites.find((s) => s.slug === slug);
}

export function getAllCountries(): Country[] {
  return countries;
}

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug);
}

export function getSitesForCountry(countrySlug: string): DatingSite[] {
  const country = getCountryBySlug(countrySlug);
  if (!country) return [];
  return country.topSites
    .map((siteSlug) => getSiteBySlug(siteSlug))
    .filter((s): s is DatingSite => s !== undefined);
}

export function getTopSitesGlobal(limit: number = 10): DatingSite[] {
  return [...datingSites]
    .sort((a, b) => b.metrics.overallScore - a.metrics.overallScore)
    .slice(0, limit);
}

export function getSitesByCategory(category: string): DatingSite[] {
  return datingSites.filter(
    (s) => s.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllCategories(): string[] {
  const cats = new Set(datingSites.map((s) => s.category));
  return Array.from(cats).sort();
}

export function searchSites(query: string): DatingSite[] {
  const q = query.toLowerCase();
  return datingSites.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.bestFor.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.features.some((f) => f.toLowerCase().includes(q)) ||
      s.editorial.toLowerCase().includes(q)
  );
}

export function hasDetailedReview(site: DatingSite): boolean {
  return site.globalRank <= 500 && site.prosAndCons.pros.length >= 3;
}

export function getDetailedSites(): DatingSite[] {
  return datingSites.filter(hasDetailedReview);
}

export function getBasicSites(): DatingSite[] {
  return datingSites.filter((s) => !hasDetailedReview(s));
}

export function getTotalSiteCount(): number {
  return datingSites.length;
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
