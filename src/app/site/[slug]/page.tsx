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

export const revalidate = 604800;
export const dynamicParams = true;

export async function generateStaticParams() {
  const sites = getAllSites();
  // Pre-render top 200 sites at build time; rest via ISR
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
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* ── Main content ──────────────────────────────── */}
          <div className="lg:col-span-2 space-y-12">
            {/* Metrics dashboard */}
            <section>
              <h2 className="mb-6 font-serif text-2xl font-bold text-text">
                Performance Scores
              </h2>
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

            {/* Editorial review */}
            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-text">
                Our Expert Review
              </h2>
              <div className="rounded-xl border border-card-border bg-card-bg p-6">
                <p className="leading-relaxed text-text/70">{site.editorial}</p>
              </div>
            </section>

            {/* Pros & Cons */}
            <section>
              <h2 className="mb-6 font-serif text-2xl font-bold text-text">
                Pros &amp; Cons
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Pros */}
                <div className="rounded-xl border border-emerald-900/30 bg-emerald-950/20 p-6">
                  <h3 className="mb-4 font-serif text-lg font-bold text-emerald-400">
                    Pros
                  </h3>
                  <ul className="space-y-3">
                    {site.prosAndCons.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-3">
                        <svg
                          className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm text-text/70">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="rounded-xl border border-red-900/30 bg-red-950/20 p-6">
                  <h3 className="mb-4 font-serif text-lg font-bold text-red-400">
                    Cons
                  </h3>
                  <ul className="space-y-3">
                    {site.prosAndCons.cons.map((con) => (
                      <li key={con} className="flex items-start gap-3">
                        <svg
                          className="mt-0.5 h-5 w-5 shrink-0 text-red-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
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
              rel="noopener noreferrer nofollow"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-gold-light px-6 py-4 font-serif text-lg font-bold text-[#080808] transition-opacity hover:opacity-90"
            >
              Visit {site.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
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
                  ['Global Rank', `#${site.globalRank} of 50`],
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
