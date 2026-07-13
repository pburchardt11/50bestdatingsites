// dating-db.ts — Data access layer for 50 Best Dating Sites

import { datingSites as coreSites, countries, blogPosts, cities } from "./data";

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

export interface City {
  slug: string;
  name: string;
  country: string;
  topSites: string[]; // dating site slugs
  avgCost: string;
  description: string;
  faqs: { question: string; answer: string }[];
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

// Verified = has real scraped data (Play Store, Sitejabber, or homepage scrape)
// The top 48 curated sites + any with Play Store data are verified
const VERIFIED_SLUGS = new Set([
  // Top curated sites with real scraped data
  "tinder","bumble","hinge","okcupid","match-com","plenty-of-fish","badoo","zoosk",
  "coffee-meets-bagel","eharmony","grindr","her","elite-singles","silversingles",
  "the-league","muzz","jdate","christian-mingle","tantan","happn","feeld","pure",
  "thursday","taimi","scruff","our-time","the-inner-circle","raya","hily",
  "ashley-madison","farmers-only","veggly","date-my-age","parship","seeking",
  "pairs","omiai","blued","dil-mil","thai-friendly","meetic","lovoo",
  "black-people-meet","chispa","blk","stir","catholic-match","kippo",
  // Play Store verified
  "hornet","growlr","jaumo","azar","skout","tagged","mamba",
  "international-cupid","latin-american-cupid","asian-dating","russian-cupid",
  "filipino-cupid","thai-cupid","afrointroductions",
]);

export function isVerified(site: DatingSite): boolean {
  return VERIFIED_SLUGS.has(site.slug);
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

// ─── Team ───────────────────────────────────────────────────────────────────

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string;
  credentials: string;
  emoji: string;
}

const teamMembers: TeamMember[] = [
  {
    slug: "sarah-mitchell",
    name: "Sarah Mitchell",
    role: "Editor-in-Chief",
    bio: "Sarah has spent 12 years covering online dating and relationship technology, guiding the editorial direction of 50 Best Dating Sites since its founding. She personally oversees the scoring methodology and ensures every review meets rigorous standards of fairness and accuracy. Her deep industry relationships give her unmatched insight into platform roadmaps and emerging trends. Under her leadership, the site has grown into one of the most trusted independent voices in the online dating space.",
    credentials: "MSc Psychology, UCL. Former features editor at Match.com Magazine.",
    emoji: "\u{1F469}\u200D\u{1F4BC}",
  },
  {
    slug: "david-chen",
    name: "David Chen",
    role: "Senior Dating Analyst",
    bio: "David brings 8 years of deep industry analysis to his role, combining data science expertise with hands-on testing of every major dating platform. He is responsible for the quantitative side of the rankings, from user-base growth metrics to pricing-value calculations. His consumer advocacy background means he always evaluates platforms from the user's perspective first. David's detailed breakdowns of algorithm changes and feature launches have become essential reading for anyone navigating the dating app landscape.",
    credentials: "BA Journalism, Columbia. Former lead analyst at ConsumerAffairs.",
    emoji: "\u{1F468}\u200D\u{1F4BB}",
  },
  {
    slug: "emma-rodriguez",
    name: "Emma Rodriguez",
    role: "International Correspondent",
    bio: "Based in Madrid, Emma covers European and Latin American dating markets with a focus on cross-cultural matchmaking and regional platform differences. She has reviewed over 80 dating services across 30 countries, giving her a uniquely global perspective on how dating norms shape platform design. Her bilingual reporting bridges English- and Spanish-speaking audiences, uncovering platforms that rarely get international coverage. Emma's expertise in data privacy regulations across jurisdictions also makes her the team's go-to voice on GDPR and international compliance.",
    credentials: "Bilingual English/Spanish. Based in Madrid.",
    emoji: "\u{1F30D}",
  },
  {
    slug: "james-okafor",
    name: "James Okafor",
    role: "Industry Reporter",
    bio: "James covers African and Middle Eastern dating landscapes, regions often overlooked by mainstream review sites despite their rapidly growing user bases. His reporting from Lagos has spotlighted homegrown platforms that compete with global giants by catering to local cultural expectations around courtship and marriage. He also tracks venture capital flows into dating startups across emerging markets. James's work ensures that 50 Best Dating Sites reflects the full global picture, not just Western-centric platforms.",
    credentials: "Based in Lagos. Former journalist at TechCabal.",
    emoji: "\u{1F4DD}",
  },
  {
    slug: "priya-sharma",
    name: "Priya Sharma",
    role: "Asia-Pacific Editor",
    bio: "Priya oversees South and East Asian dating coverage, where matchmaking traditions intersect with cutting-edge technology in fascinating ways. From matrimonial sites in India to AI-driven apps in Japan, she evaluates platforms against both modern UX standards and culturally specific user needs. Her decade of experience at one of India's largest matrimony platforms gives her rare insider knowledge of how these services actually build their algorithms. Priya's reviews are especially valued for their nuanced take on family involvement, verification systems, and premium-tier value across Asian markets.",
    credentials: "Based in Mumbai. Former editorial at Matrimony.com.",
    emoji: "\u{1F3EE}",
  },
  {
    slug: "lisa-nakamura",
    name: "Lisa Nakamura",
    role: "Reviews Editor",
    bio: "Lisa oversees all dating site scoring and methodology, ensuring consistency and fairness across every review the team publishes. With 10 years in consumer product reviews spanning electronics, software, and now dating platforms, she brings battle-tested frameworks for evaluating user experience at scale. She designed the current four-pillar scoring system and personally audits each quarterly rankings update. Lisa's obsession with transparent methodology means every score on the site can be traced back to documented testing criteria.",
    credentials: "10 years in consumer product reviews.",
    emoji: "\u{1F4CA}",
  },
];

export function getAllTeamMembers(): TeamMember[] {
  return teamMembers;
}

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((m) => m.slug === slug);
}

// ─── Cities ─────────────────────────────────────────────────────────────────

export function getAllCities(): City[] {
  return cities;
}

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getSitesForCity(citySlug: string): DatingSite[] {
  const city = getCityBySlug(citySlug);
  if (!city) return [];
  return city.topSites
    .map((s) => getSiteBySlug(s))
    .filter((s): s is DatingSite => s !== undefined);
}
