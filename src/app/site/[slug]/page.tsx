import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import ScoreBar from '@/components/ScoreBar';
import SiteCard from '@/components/SiteCard';
import AdUnit from '@/components/AdUnit';
import {
  getSiteBySlug,
  getAllSites,
  getSitesByCategory,
} from '@/lib/dating-db';
import playStoreData from '@/lib/play-store-data.json';
import scrapedData from '@/lib/scraped-data.json';
import enrichedEditorials from '@/lib/enriched-editorials.json';

export const revalidate = 604800;
export const dynamicParams = true;

export async function generateStaticParams() {
  const sites = getAllSites();
  return sites
    .sort((a, b) => a.globalRank - b.globalRank)
    .slice(0, 200)
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const site = getSiteBySlug(slug);
  if (!site) return { title: 'Site Not Found' };

  return {
    title: `${site.name} Review 2026 — Rating ${site.metrics.overallScore}/10 | 50 Best Dating Sites`,
    description: `In-depth review of ${site.name}: safety score ${site.metrics.safetyScore}/10, ${site.bestFor}. Read our expert analysis, pros & cons, and pricing breakdown.`,
    openGraph: {
      title: `${site.name} Review — ${site.metrics.overallScore}/10`,
      description: site.bestFor,
      type: 'article',
    },
  };
}

export default async function SiteDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const site = getSiteBySlug(slug);
  if (!site) notFound();

  const similarSites = getSitesByCategory(site.category)
    .filter((s) => s.slug !== site.slug)
    .slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'WebApplication',
      name: site.name,
      url: site.url,
      applicationCategory: 'DatingApplication',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: site.metrics.overallScore,
      bestRating: 10,
      worstRating: 1,
    },
    author: {
      '@type': 'Organization',
      name: '50 Best Dating Sites',
    },
    publisher: {
      '@type': 'Organization',
      name: '50 Best Dating Sites',
    },
  };

  // Parse gender ratio for visualization (only if real data available)
  const genderMatch = site.demographics.genderRatio.match(/(\d+)%\s*male\s*\/\s*(\d+)%\s*female/i);
  const malePct = genderMatch ? parseInt(genderMatch[1]) : null;
  const femalePct = genderMatch ? parseInt(genderMatch[2]) : null;
  const hasGenderData = malePct !== null && femalePct !== null;

  // Play Store ratings (real scraped data)
  const storeRatings = (playStoreData as unknown as Record<string, { googlePlayRating: number; googlePlayReviews: number; googlePlayInstalls: string | null; googlePlayUrl: string; verified: boolean }>)[site.slug];

  // Real scraped reviews only — no fake/generated reviews
  type ScrapedSite = { realRating?: { score: number; count: number }; realReviews?: Array<{ author: string; rating: number; text: string; date: string }>; realFeatures?: string[]; realPricing?: { free: boolean; plans: Array<{ name: string; price: string }> }; realDescription?: string };
  const scraped = (scrapedData as Record<string, ScrapedSite>)[site.slug];
  const realReviews = scraped?.realReviews || [];
  const reviews = realReviews.length > 0
    ? realReviews.map(r => ({ name: r.author, location: '', rating: r.rating, date: r.date, text: r.text, verified: true }))
    : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative border-b border-card-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,168,124,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-text/40">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/category/${site.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="hover:text-gold transition-colors">
              {site.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text/60">{site.name}</span>
          </nav>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gold/5 text-5xl">
                {site.logo}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">
                    {site.name}
                  </h1>
                  <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold/80">
                    {site.category}
                  </span>
                </div>
                <p className="mt-2 text-lg text-text/50">{site.bestFor}</p>
                <p className="mt-1 text-xs text-text/30">Last Updated: July 2026</p>
              </div>
            </div>

            {/* Overall score */}
            <div className="flex flex-col items-center rounded-2xl border border-gold/20 bg-gold/5 px-8 py-6">
              <span className="text-xs font-medium uppercase tracking-widest text-gold/60">
                Overall Score
              </span>
              <span className="font-serif text-5xl font-bold text-gold">
                {site.metrics.overallScore.toFixed(1)}
              </span>
              <span className="text-sm text-text/40">out of 10</span>
            </div>
          </div>

          {/* Prominent CTA */}
          <div className="mt-8">
            <a
              href={site.url}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold to-gold-light px-8 py-4 font-serif text-lg font-bold text-[#080808] transition-opacity hover:opacity-90"
            >
              Visit {site.name}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* ── Main content ──────────────────────────────── */}
          <div className="lg:col-span-2 space-y-12">
            {/* Metrics dashboard */}
            <section>
              <h2 className="mb-2 font-serif text-2xl font-bold text-text">
                Performance Scores
              </h2>
              <p className="mb-6 text-xs text-text/40">Editorial scores based on our assessment methodology</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-card-border bg-card-bg p-5">
                  <ScoreBar label="Safety & Privacy" score={site.metrics.safetyScore} />
                </div>
                <div className="rounded-xl border border-card-border bg-card-bg p-5">
                  <ScoreBar label="Ease of Use" score={site.metrics.easeOfUse} />
                </div>
                <div className="rounded-xl border border-card-border bg-card-bg p-5">
                  <ScoreBar label="Value for Money" score={site.metrics.valueForMoney} />
                </div>
                <div className="rounded-xl border border-card-border bg-card-bg p-5">
                  <ScoreBar label="Match Quality" score={site.metrics.matchQuality} />
                </div>
              </div>
            </section>

            <AdUnit format="horizontal" />

            {/* Real aggregate rating */}
            {scraped?.realRating && (
              <section>
                <h2 className="mb-4 font-serif text-2xl font-bold text-text">
                  Independent User Rating
                </h2>
                <div className="rounded-xl border border-card-border bg-card-bg p-6 flex items-center gap-6">
                  <div className="text-center">
                    <span className="font-serif text-5xl font-bold text-gold">{scraped.realRating.score.toFixed(1)}</span>
                    <span className="text-text/40 text-lg"> / 5</span>
                    <div className="mt-1 flex items-center justify-center gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <span key={s} className={`text-lg ${s <= Math.round(scraped.realRating!.score) ? "text-yellow-400" : "text-text/15"}`}>★</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-text/70">Based on <strong className="text-text">{scraped.realRating.count.toLocaleString()}</strong> verified user reviews</p>
                    <p className="text-xs text-text/30 mt-1">Aggregated from independent review platforms</p>
                  </div>
                </div>
              </section>
            )}

            {/* Editorial review */}
            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-text">
                Our Expert Review
              </h2>
              <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-4">
                {scraped?.realDescription && (
                  <p className="leading-relaxed text-text/80 italic border-l-2 border-gold/30 pl-4">{scraped.realDescription}</p>
                )}
                <div className="leading-relaxed text-text/70 whitespace-pre-line">
                  {(enrichedEditorials as Record<string, string>)[site.slug] || site.editorial}
                </div>
              </div>
            </section>

            {/* Real features from their site */}
            {scraped?.realFeatures && scraped.realFeatures.length > 0 && (
              <section>
                <h2 className="mb-4 font-serif text-2xl font-bold text-text">
                  Verified Features
                </h2>
                <div className="rounded-xl border border-card-border bg-card-bg p-6">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {scraped.realFeatures.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-text/70">
                        <span className="text-gold">✦</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-text/25">Features sourced from {site.name}&apos;s official website</p>
                </div>
              </section>
            )}

            {/* Real pricing plans */}
            {scraped?.realPricing && scraped.realPricing.plans.length > 0 && (
              <section>
                <h2 className="mb-4 font-serif text-2xl font-bold text-text">
                  Actual Pricing
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {scraped.realPricing.free && (
                    <div className="rounded-xl border border-emerald-800/30 bg-emerald-950/20 p-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Free Tier</span>
                      <p className="font-serif text-2xl font-bold text-text mt-1">$0</p>
                      <p className="text-xs text-text/40 mt-1">Basic features</p>
                    </div>
                  )}
                  {scraped.realPricing.plans.map((plan, i) => (
                    <div key={i} className="rounded-xl border border-gold/20 bg-gold/5 p-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gold">{plan.name}</span>
                      <p className="font-serif text-2xl font-bold text-gold mt-1">{plan.price}</p>
                      <p className="text-xs text-text/40 mt-1">per month</p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-text/25">Prices may vary by region. Last verified July 2026.</p>
              </section>
            )}

            {/* Google Play Store Rating */}
            {storeRatings && storeRatings.verified && storeRatings.googlePlayRating > 0 && (
              <section>
                <h2 className="mb-4 font-serif text-2xl font-bold text-text">
                  App Store Rating
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-card-border bg-card-bg p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">▶️</span>
                      <span className="font-semibold text-text">Google Play</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-4xl font-bold text-text">{storeRatings.googlePlayRating.toFixed(1)}</span>
                      <span className="text-text/40">/ 5.0</span>
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                      {[1,2,3,4,5].map(s => (
                        <span key={s} className={s <= Math.round(storeRatings.googlePlayRating) ? "text-yellow-400" : "text-text/20"}>★</span>
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-text/40">{storeRatings.googlePlayReviews.toLocaleString()} reviews</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-text/30">Source: Google Play Store. Last checked July 2026.</p>
              </section>
            )}

            {/* Pricing Plans */}
            <section>
              <h2 className="mb-6 font-serif text-2xl font-bold text-text">
                Pricing Plans
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Free tier */}
                {site.pricing.free && (
                  <div className="rounded-xl border border-card-border bg-card-bg p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full bg-emerald-900/30 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">Free</span>
                    </div>
                    <p className="font-serif text-3xl font-bold text-text">{site.pricing.currency} 0</p>
                    <p className="mt-1 text-sm text-text/40">Basic features included</p>
                    <ul className="mt-4 space-y-2 text-sm text-text/60">
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-400">&#10003;</span> Create profile
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-400">&#10003;</span> Browse matches
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-400">&#10003;</span> Limited messaging
                      </li>
                    </ul>
                  </div>
                )}

                {/* Premium tier */}
                <div className="rounded-xl border border-gold/20 bg-gold/5 p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-semibold text-gold">Premium</span>
                  </div>
                  <p className="font-serif text-3xl font-bold text-gold">
                    {site.pricing.currency} {site.pricing.premiumMonthly}
                    <span className="text-base font-normal text-text/40">/mo</span>
                  </p>
                  <p className="mt-1 text-sm text-text/40">All features unlocked</p>
                  <ul className="mt-4 space-y-2 text-sm text-text/60">
                    <li className="flex items-center gap-2">
                      <span className="text-gold">&#10003;</span> Unlimited messaging
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold">&#10003;</span> Advanced filters
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold">&#10003;</span> See who likes you
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold">&#10003;</span> Priority visibility
                    </li>
                  </ul>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-gold to-gold-light px-4 py-2.5 text-sm font-bold text-[#080808] transition-opacity hover:opacity-90"
                  >
                    Get Premium
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </a>
                </div>
              </div>
            </section>

            {/* User Demographics */}
            <section>
              <h2 className="mb-6 font-serif text-2xl font-bold text-text">
                User Demographics
              </h2>
              <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
                {/* Age range */}
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-text/60">Age Range</span>
                    <span className="font-medium text-text/80">{site.demographics.minAge} - {site.demographics.maxAge}</span>
                  </div>
                  <div className="relative h-3 rounded-full bg-card-border overflow-hidden">
                    <div
                      className="absolute h-full rounded-full bg-gradient-to-r from-gold/60 to-gold"
                      style={{
                        left: `${((site.demographics.minAge - 18) / (65 - 18)) * 100}%`,
                        right: `${((65 - site.demographics.maxAge) / (65 - 18)) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-[11px] text-text/30">
                    <span>18</span>
                    <span>Primary: {site.demographics.primaryAge}</span>
                    <span>65+</span>
                  </div>
                </div>

                {/* Gender ratio — only show visualization if real data available */}
                {hasGenderData ? (
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-text/60">Gender Ratio</span>
                      <span className="font-medium text-text/80">{site.demographics.genderRatio}</span>
                    </div>
                    <div className="flex h-3 overflow-hidden rounded-full">
                      <div
                        className="bg-blue-500/60 transition-all"
                        style={{ width: `${malePct}%` }}
                      />
                      <div
                        className="bg-pink-500/60 transition-all"
                        style={{ width: `${femalePct}%` }}
                      />
                    </div>
                    <div className="mt-1 flex justify-between text-[11px] text-text/30">
                      <span>Male {malePct}%</span>
                      <span>Female {femalePct}%</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-text/60">Gender Ratio</span>
                      <span className="font-medium text-text/80">{site.demographics.genderRatio}</span>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Pros & Cons */}
            <section>
              <h2 className="mb-6 font-serif text-2xl font-bold text-text">
                Pros &amp; Cons
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-emerald-900/30 bg-emerald-950/20 p-6">
                  <h3 className="mb-4 font-serif text-lg font-bold text-emerald-400">
                    Pros
                  </h3>
                  <ul className="space-y-3">
                    {site.prosAndCons.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-3">
                        <svg className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-text/70">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-red-900/30 bg-red-950/20 p-6">
                  <h3 className="mb-4 font-serif text-lg font-bold text-red-400">
                    Cons
                  </h3>
                  <ul className="space-y-3">
                    {site.prosAndCons.cons.map((con) => (
                      <li key={con} className="flex items-start gap-3">
                        <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-sm text-text/70">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-text">
                Key Features
              </h2>
              <div className="flex flex-wrap gap-2">
                {site.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-card-border bg-card-bg px-4 py-2 text-sm text-text/60"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </section>

            {/* Available countries */}
            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-text">
                Available In
              </h2>
              <div className="flex flex-wrap gap-2">
                {site.countries.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-gold/5 px-3 py-1.5 text-sm text-text/60"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* ── Sidebar ───────────────────────────────────── */}
          <aside className="space-y-6">
            {/* Visit CTA */}
            <a
              href={site.url}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-gold-light px-6 py-4 font-serif text-lg font-bold text-[#080808] transition-opacity hover:opacity-90"
            >
              Visit {site.name}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {/* Key facts */}
            <div className="rounded-xl border border-card-border bg-card-bg p-6">
              <h3 className="mb-4 font-serif text-lg font-bold text-text">
                Key Facts
              </h3>
              <dl className="space-y-3">
                {[
                  ['Founded', String(site.founded)],
                  ['Headquarters', site.headquarters],
                  ['Global Rank', `#${site.globalRank}`],
                  ['User Base', site.metrics.userBase],
                  ['Monthly Active', site.metrics.activeMonthly],
                  ['Success Rate', site.metrics.successRate],
                  ['Avg Match Time', site.metrics.avgMatchTime],
                  ['Age Range', `${site.demographics.minAge}-${site.demographics.maxAge}`],
                  ['Primary Age', site.demographics.primaryAge],
                  ['Gender Ratio', site.demographics.genderRatio],
                  [
                    'Pricing',
                    site.pricing.free
                      ? `Free + ${site.pricing.currency} ${site.pricing.premiumMonthly}/mo`
                      : `${site.pricing.currency} ${site.pricing.premiumMonthly}/mo`,
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-start justify-between gap-4 border-b border-card-border pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="text-sm text-text/40">{label}</dt>
                    <dd className="text-right text-sm font-medium text-text/80">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-center text-[11px] text-text/30">Last Updated: July 2026</p>
            </div>

            {/* Compare link */}
            <Link
              href={`/compare?site=${site.slug}`}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-card-border bg-card-bg px-6 py-4 text-sm font-medium text-text/60 transition-colors hover:border-gold/30 hover:text-gold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Compare with other sites
            </Link>

            <AdUnit format="rectangle" />
          </aside>
        </div>

        {/* ── User Reviews ─────────────────────────────── */}
        <section className="mt-16">
          <h2 className="mb-2 font-serif text-2xl font-bold text-text">
            User Reviews
          </h2>
          {reviews.length > 0 ? (
            <>
              <p className="mb-8 text-sm text-text/40">
                What real users are saying about {site.name}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {reviews.map((review, i) => (
                  <div key={i} className="rounded-xl border border-card-border bg-card-bg p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="font-medium text-text">{review.name}</span>
                        {review.verified && (
                          <span className="ml-2 rounded-full bg-emerald-900/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">Verified</span>
                        )}
                        <p className="text-xs text-text/30 mt-0.5">{review.location ? `${review.location} · ` : ''}{review.date}</p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1,2,3,4,5].map(s => (
                          <span key={s} className={`text-sm ${s <= review.rating ? "text-yellow-400" : "text-text/15"}`}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-text/60 leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-text/20 text-center">
                Source: Independent review platforms. Individual experiences may vary.
              </p>
            </>
          ) : (
            <p className="mt-4 text-sm text-text/40">
              No independent reviews available yet.
            </p>
          )}
        </section>

        {/* ── Similar Sites ─────────────────────────────── */}
        {similarSites.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 font-serif text-2xl font-bold text-text">
              Similar Sites
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {similarSites.map((s) => (
                <SiteCard key={s.slug} site={s} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
