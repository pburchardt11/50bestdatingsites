import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import SiteCard from '@/components/SiteCard';
import AdUnit from '@/components/AdUnit';
import {
  getCountryBySlug,
  getSitesForCountry,
  getAllCountries,
} from '@/lib/dating-db';

export const revalidate = 604800;
export const dynamicParams = true;

export async function generateStaticParams() {
  const countries = getAllCountries();
  return countries.slice(0, 30).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const country = getCountryBySlug(slug);
  if (!country) return { title: 'Country Not Found' };

  return {
    title: `Best Dating Sites in ${country.name} ${country.emoji} 2026 | 50 Best Dating Sites`,
    description: `Top-ranked dating sites available in ${country.name}. Expert reviews, safety scores, and pricing for the best dating platforms in ${country.name}.`,
    openGraph: {
      title: `Best Dating Sites in ${country.name} ${country.emoji}`,
      description: `Top-ranked dating platforms available in ${country.name} with expert reviews and scores.`,
    },
  };
}

const popularityColors: Record<string, { bg: string; text: string; label: string }> = {
  high: { bg: 'bg-emerald-900/30', text: 'text-emerald-400', label: 'High' },
  medium: { bg: 'bg-yellow-900/30', text: 'text-yellow-400', label: 'Medium' },
  low: { bg: 'bg-red-900/30', text: 'text-red-400', label: 'Low' },
};

const datingCultureTexts: Record<string, string> = {
  usa: 'The United States has one of the most mature online dating markets in the world. Dating apps are widely accepted across all age groups, with a strong culture of meeting people digitally before in-person dates. Safety features and background checks have become increasingly important to American users.',
  uk: 'The UK dating scene blends traditional British reserve with enthusiastic digital adoption. London is one of the most active dating app markets globally. British users tend to value wit and conversation in profiles, and pub dates remain the classic first-date choice.',
  canada: 'Canada mirrors many US dating trends but with a notably more polite and progressive culture. Canadian users tend to be straightforward about their intentions, and there is strong adoption of dating apps in both urban and rural areas.',
  australia: 'Australia has embraced dating apps with characteristic enthusiasm. The outdoor lifestyle influences dating culture, with many first dates involving cafes, beaches, or walks. Australians value authenticity and humor in dating profiles.',
  germany: 'Germany has a significant online dating market with a preference for serious relationship platforms. German users tend to be direct and honest in their profiles. Privacy is highly valued, and data protection features are important to German daters.',
  france: 'French dating culture has its own distinct character, with an emphasis on romance and intellectual connection. While dating apps are popular in major cities like Paris, many French people still value meeting through social circles and cultural events.',
  japan: 'Japan has a unique dating culture where traditional matchmaking services coexist with modern dating apps. Many Japanese users prefer platforms that emphasize compatibility and serious relationships over casual encounters.',
  brazil: 'Brazil has one of the most vibrant dating cultures in the world. Brazilian users are known for being warm and expressive on dating platforms. Video dating has become particularly popular, and WhatsApp is commonly used as a secondary communication channel.',
  india: 'India is one of the fastest-growing online dating markets globally. While arranged marriages remain common, younger generations are increasingly using dating apps to find partners independently. Cultural and religious compatibility features are particularly valued.',
  uae: 'The UAE has a growing but culturally nuanced dating scene. Dating apps are widely used among the expatriate population, while local users tend to prefer platforms that respect cultural and religious values. Many platforms offer features tailored to the region.',
};

export default async function CountryPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const country = getCountryBySlug(slug);
  if (!country) notFound();

  const sites = getSitesForCountry(slug).sort(
    (a, b) => b.metrics.overallScore - a.metrics.overallScore
  );

  const popularity = popularityColors[country.onlineDatingPopularity];
  const cultureText =
    datingCultureTexts[slug] ||
    `${country.name} has a growing online dating market with increasing adoption of mobile dating platforms. Local preferences and cultural factors shape which sites and apps are most popular in the region.`;

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best Dating Sites in ${country.name} 2026`,
    numberOfItems: sites.length,
    itemListElement: sites.map((site, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: site.name,
      url: `https://50bestdatingsites.com/site/${site.slug}`,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://50bestdatingsites.com' },
      { '@type': 'ListItem', position: 2, name: 'Countries', item: 'https://50bestdatingsites.com/#countries' },
      { '@type': 'ListItem', position: 3, name: country.name, item: `https://50bestdatingsites.com/country/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative border-b border-card-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,168,124,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-text/40">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/#countries" className="hover:text-gold transition-colors">Countries</Link>
            <span className="mx-2">/</span>
            <span className="text-text/60">{country.name}</span>
          </nav>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-6xl">{country.emoji}</span>
              <h1 className="mt-4 font-serif text-4xl font-bold text-text sm:text-5xl">
                Best Dating Sites in {country.name}
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-text/50">
                Expert rankings of the top dating platforms available in{' '}
                {country.name}, scored on safety, ease of use, value, and match
                quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* ── Main: ranked list ──────────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="mb-2 font-serif text-2xl font-bold text-text">
              Top Dating Sites ({sites.length})
            </h2>
            {sites.length > 0 ? (
              sites.map((site, i) => (
                <SiteCard key={site.slug} site={site} rank={i + 1} />
              ))
            ) : (
              <p className="text-text/50">
                No sites currently ranked for {country.name}. Check back soon.
              </p>
            )}

            <AdUnit format="horizontal" className="mt-8" />

            {/* Dating culture */}
            <section className="mt-12">
              <h2 className="mb-4 font-serif text-2xl font-bold text-text">
                Dating Culture in {country.name}
              </h2>
              <div className="rounded-xl border border-card-border bg-card-bg p-6">
                <p className="leading-relaxed text-text/70">{cultureText}</p>
              </div>
            </section>
          </div>

          {/* ── Sidebar ───────────────────────────────── */}
          <aside className="space-y-6">
            <div className="rounded-xl border border-card-border bg-card-bg p-6">
              <h3 className="mb-4 font-serif text-lg font-bold text-text">
                Country Stats
              </h3>
              <dl className="space-y-3">
                <div className="flex items-start justify-between gap-4 border-b border-card-border pb-3">
                  <dt className="text-sm text-text/40">Population</dt>
                  <dd className="text-right text-sm font-medium text-text/80">
                    {country.population}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-card-border pb-3">
                  <dt className="text-sm text-text/40">Internet Penetration</dt>
                  <dd className="text-right text-sm font-medium text-text/80">
                    {country.internetPenetration}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-card-border pb-3">
                  <dt className="text-sm text-text/40">Dating App Popularity</dt>
                  <dd>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${popularity.bg} ${popularity.text}`}
                    >
                      {popularity.label}
                    </span>
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

            {/* Legal notes */}
            {country.legalNotes && (
              <div className="rounded-xl border border-yellow-900/30 bg-yellow-950/20 p-6">
                <h3 className="mb-3 font-serif text-lg font-bold text-yellow-400">
                  Legal &amp; Cultural Notes
                </h3>
                <p className="text-sm leading-relaxed text-text/60">
                  {country.legalNotes}
                </p>
              </div>
            )}

            <AdUnit format="rectangle" />
          </aside>
        </div>
      </div>
    </>
  );
}
