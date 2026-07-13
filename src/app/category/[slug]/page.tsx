import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import SiteCard from '@/components/SiteCard';
import AdUnit from '@/components/AdUnit';
import { getAllCategories, getSitesByCategory, toSlug } from '@/lib/dating-db';

export const revalidate = 604800;
export const dynamicParams = true;

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({ slug: toSlug(c) }));
}

function findCategoryName(slug: string): string | undefined {
  const categories = getAllCategories();
  return categories.find((c) => toSlug(c) === slug);
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const catName = findCategoryName(slug);
  if (!catName) return { title: 'Category Not Found' };

  return {
    title: `Best ${catName} Dating Sites 2026 | Expert Rankings | 50 Best Dating Sites`,
    description: `Top-ranked ${catName.toLowerCase()} dating sites and apps. Expert reviews, safety scores, pricing, and detailed comparisons to help you find the perfect match.`,
    openGraph: {
      title: `Best ${catName} Dating Sites 2026`,
      description: `Expert rankings of the best ${catName.toLowerCase()} dating platforms.`,
    },
  };
}

const categoryDescriptions: Record<string, string> = {
  'General Dating':
    'General dating platforms cast the widest net, connecting millions of users across all demographics and relationship goals. These mainstream apps offer the largest user bases and most diverse matching pools, making them ideal for anyone entering the online dating world or looking for the broadest range of potential partners.',
  'Serious Relationships':
    'Platforms focused on serious relationships use detailed compatibility questionnaires and advanced matching algorithms to connect users looking for long-term partners. These sites typically attract a more mature, commitment-minded user base and emphasize personality matching over superficial swiping.',
  'Over 50':
    'Dating sites designed for the over-50 demographic understand the unique needs of mature daters. These platforms emphasize compatibility, shared life experience, and meaningful connections, with interfaces designed for ease of use and communities that value quality conversations over quantity.',
  'LGBTQ+':
    'LGBTQ+ dating platforms provide safe, inclusive spaces for queer, gay, lesbian, bisexual, transgender, and non-binary individuals to connect. These apps prioritize community safety, identity expression, and understanding the unique dynamics of LGBTQ+ dating.',
  'International / Cultural':
    'International and cultural dating platforms connect people across borders and cultural backgrounds. Whether you are looking for a partner from a specific cultural background or interested in cross-cultural dating, these platforms facilitate connections that transcend geography.',
  'Hook-up / Casual':
    'Casual dating and hook-up platforms cater to users looking for no-strings-attached encounters and short-term connections. These apps are designed for directness and efficiency, with features that facilitate quick matches and straightforward communication.',
  'Niche':
    'Niche dating sites cater to specific interests, lifestyles, and communities. From religious dating to farmers, professionals, and beyond, these platforms connect people who share particular values, hobbies, or life circumstances.',
  'Asian Market':
    'Dating platforms focused on the Asian market cater to both users within Asian countries and those interested in connecting with Asian singles globally. These platforms often incorporate cultural nuances and communication styles specific to Asian dating customs.',
  'Video Dating':
    'Video dating platforms put live interaction at the center of the matchmaking experience. By emphasizing video calls and live streaming, these apps help users build genuine connections and verify identities before committing to in-person meetings.',
};

export default async function CategoryPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const catName = findCategoryName(slug);
  if (!catName) notFound();

  const sites = getSitesByCategory(catName).sort(
    (a, b) => b.metrics.overallScore - a.metrics.overallScore
  );

  const description =
    categoryDescriptions[catName] ||
    `Explore the best ${catName.toLowerCase()} dating sites ranked by our expert team.`;

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best ${catName} Dating Sites 2026`,
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
      { '@type': 'ListItem', position: 2, name: 'Categories', item: 'https://50bestdatingsites.com/#rankings' },
      { '@type': 'ListItem', position: 3, name: catName, item: `https://50bestdatingsites.com/category/${slug}` },
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
            <Link href="/#rankings" className="hover:text-gold transition-colors">Categories</Link>
            <span className="mx-2">/</span>
            <span className="text-text/60">{catName}</span>
          </nav>

          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">
            Best {catName} Dating Sites
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-text/50">
            {description}
          </p>
        </div>
      </section>

      {/* ── Site list ───────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-text">
            All {catName} Sites ({sites.length})
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {sites.map((site, i) => (
            <SiteCard key={site.slug} site={site} rank={i + 1} />
          ))}
        </div>

        <AdUnit format="horizontal" className="mt-12" />

        {/* Category info */}
        <section className="mt-12">
          <h2 className="mb-4 font-serif text-2xl font-bold text-text">
            About {catName} Dating
          </h2>
          <div className="rounded-xl border border-card-border bg-card-bg p-6">
            <p className="leading-relaxed text-text/70">{description}</p>
          </div>
        </section>

        {/* Browse other categories */}
        <section className="mt-12">
          <h2 className="mb-4 font-serif text-2xl font-bold text-text">
            Other Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {getAllCategories()
              .filter((c) => c !== catName)
              .map((c) => (
                <Link
                  key={c}
                  href={`/category/${toSlug(c)}`}
                  className="rounded-full border border-card-border bg-card-bg px-4 py-2 text-sm text-text/60 transition-colors hover:border-gold/30 hover:text-gold"
                >
                  {c}
                </Link>
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
