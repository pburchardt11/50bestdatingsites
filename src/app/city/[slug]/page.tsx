import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import SiteCard from '@/components/SiteCard';
import AdUnit from '@/components/AdUnit';
import {
  getCityBySlug,
  getSitesForCity,
  getAllCities,
} from '@/lib/dating-db';

export const revalidate = 604800;
export const dynamicParams = true;

export async function generateStaticParams() {
  const cities = getAllCities();
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const city = getCityBySlug(slug);
  if (!city) return { title: 'City Not Found' };

  return {
    title: `Best Dating Sites in ${city.name} 2026 | 50 Best Dating Sites`,
    description: `Top-ranked dating sites in ${city.name}, ${city.country}. Compare pricing, reviews, and scores for the best dating platforms in ${city.name}.`,
    openGraph: {
      title: `Best Dating Sites in ${city.name} 2026`,
      description: `Compare the top dating sites in ${city.name} with expert reviews, pricing, and scores.`,
    },
  };
}

export default async function CityPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const sites = getSitesForCity(slug).sort(
    (a, b) => b.metrics.overallScore - a.metrics.overallScore
  );

  // JSON-LD: BreadcrumbList
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://50bestdatingsites.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Cities',
        item: 'https://50bestdatingsites.com/city',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: city.name,
        item: `https://50bestdatingsites.com/city/${city.slug}`,
      },
    ],
  };

  // JSON-LD: ItemList
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best Dating Sites in ${city.name}`,
    numberOfItems: sites.length,
    itemListElement: sites.map((site, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: site.name,
      url: `https://50bestdatingsites.com/site/${site.slug}`,
    })),
  };

  // JSON-LD: FAQPage
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: city.faqs.map((faq: { question: string; answer: string }) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* Hero */}
      <section className="relative border-b border-card-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,119,6,0.04)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-text/40">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/#countries" className="hover:text-gold transition-colors">Cities</Link>
            <span className="mx-2">/</span>
            <span className="text-text/60">{city.name}</span>
          </nav>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="mt-4 font-serif text-4xl font-bold text-text sm:text-5xl">
                Best Dating Sites in {city.name}
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-text/50">
                Expert rankings of the top dating platforms in{' '}
                {city.name}, scored on safety, ease of use, value, and match
                quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main: ranked list */}
          <div className="lg:col-span-2 space-y-4">
            {/* City description */}
            <div className="rounded-xl border border-card-border bg-card-bg p-6 mb-6">
              <p className="leading-relaxed text-text/70">{city.description}</p>
            </div>

            <h2 className="mb-2 font-serif text-2xl font-bold text-text">
              Top Dating Sites ({sites.length})
            </h2>
            {sites.length > 0 ? (
              sites.map((site, i) => (
                <SiteCard key={site.slug} site={site} rank={i + 1} />
              ))
            ) : (
              <p className="text-text/50">
                No dating sites currently ranked for {city.name}. Check back soon.
              </p>
            )}

            <AdUnit format="horizontal" className="mt-8" />

            {/* Pricing section */}
            <section className="mt-12">
              <h2 className="mb-4 font-serif text-2xl font-bold text-text">
                Dating Site Costs in {city.name}
              </h2>
              <div className="rounded-xl border border-card-border bg-card-bg p-6">
                <p className="leading-relaxed text-text/70 mb-4">
                  Dating site subscriptions in {city.name} typically range from{' '}
                  <span className="font-semibold text-gold">{city.avgCost}</span>{' '}
                  depending on the platform and subscription tier.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-card-border">
                        <th className="py-3 pr-4 text-left font-medium text-text/60">Site</th>
                        <th className="py-3 pr-4 text-left font-medium text-text/60">Category</th>
                        <th className="py-3 text-right font-medium text-text/60">Monthly Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sites.slice(0, 10).map((site) => (
                        <tr key={site.slug} className="border-b border-card-border/50">
                          <td className="py-3 pr-4">
                            <Link
                              href={`/site/${site.slug}`}
                              className="text-text hover:text-gold transition-colors"
                            >
                              {site.name}
                            </Link>
                          </td>
                          <td className="py-3 pr-4 text-text/50">{site.category}</td>
                          <td className="py-3 text-right text-text/70">
                            {site.pricing.free && (
                              <span className="mr-2 rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600">
                                Free tier
                              </span>
                            )}
                            {site.pricing.currency}{' '}
                            {site.pricing.premiumMonthly.toLocaleString()}/mo
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="mt-12">
              <h2 className="mb-4 font-serif text-2xl font-bold text-text">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {city.faqs.map((faq: { question: string; answer: string }, i: number) => (
                  <details
                    key={i}
                    className="group rounded-xl border border-card-border bg-card-bg"
                  >
                    <summary className="cursor-pointer list-none px-6 py-4 font-medium text-text transition-colors hover:text-gold">
                      <span className="flex items-center justify-between">
                        <span>{faq.question}</span>
                        <svg
                          className="h-5 w-5 shrink-0 text-text/30 transition-transform group-open:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-4 text-sm leading-relaxed text-text/60">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-xl border border-card-border bg-card-bg p-6">
              <h3 className="mb-4 font-serif text-lg font-bold text-text">
                {city.name} Stats
              </h3>
              <dl className="space-y-3">
                <div className="flex items-start justify-between gap-4 border-b border-card-border pb-3">
                  <dt className="text-sm text-text/40">Country</dt>
                  <dd className="text-right text-sm font-medium text-text/80">
                    {city.country}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-card-border pb-3">
                  <dt className="text-sm text-text/40">Avg. Cost Range</dt>
                  <dd className="text-right text-sm font-medium text-text/80">
                    {city.avgCost}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-sm text-text/40">Sites Ranked</dt>
                  <dd className="text-right text-sm font-medium text-text/80">
                    {sites.length}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Quick links to other cities */}
            <div className="rounded-xl border border-card-border bg-card-bg p-6">
              <h3 className="mb-4 font-serif text-lg font-bold text-text">
                Other Cities
              </h3>
              <div className="flex flex-wrap gap-2">
                {getAllCities()
                  .filter((c) => c.slug !== city.slug)
                  .slice(0, 12)
                  .map((c) => (
                    <Link
                      key={c.slug}
                      href={`/city/${c.slug}`}
                      className="rounded-full border border-card-border px-3 py-1 text-xs text-text/50 transition-colors hover:border-gold/30 hover:text-gold"
                    >
                      {c.name}
                    </Link>
                  ))}
              </div>
            </div>

            <AdUnit format="rectangle" />
          </aside>
        </div>
      </div>
    </>
  );
}
