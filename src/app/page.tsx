import Link from 'next/link';
import SiteCard from '@/components/SiteCard';
import AdUnit from '@/components/AdUnit';
import SearchBar from '@/components/SearchBar';
import {
  getTopSitesGlobal,
  getAllCategories,
  getAllCountries,
  getAllBlogPosts,
  toSlug,
} from '@/lib/dating-db';

export const revalidate = 604800;

export default function HomePage() {
  const top10 = getTopSitesGlobal(10);
  const categories = getAllCategories();
  const countries = getAllCountries();
  const blogPosts = getAllBlogPosts().slice(0, 3);

  const categoryIcons: Record<string, string> = {
    'General Dating': '💑',
    'Serious Relationships': '💍',
    'Over 50': '🌹',
    'LGBTQ+': '🏳️‍🌈',
    'International / Cultural': '🌍',
    'Hook-up / Casual': '🔥',
    'Niche': '🎯',
    'Asian Market': '🏮',
    'Video Dating': '📹',
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '50 Best Dating Sites',
    url: 'https://50bestdatingsites.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://50bestdatingsites.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-card-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,168,124,0.08)_0%,transparent_70%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gold/70">
            Trusted by Millions | 2,000+ Sites Reviewed | 200 Countries
          </p>
          <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-text sm:text-6xl lg:text-7xl">
            Discover the Top 50 Dating Sites
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text/60">
            Expertly curated rankings of the world's leading dating platforms. Evaluated on safety, usability, value, and match quality.
          </p>

          <SearchBar className="mx-auto mt-10 max-w-xl" />
        </div>
      </section>

      {/* ── Top 10 Global Rankings ──────────────────────────────── */}
      <section id="rankings" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">
            Top 10 Global Rankings
          </h2>
          <p className="mt-3 text-text/50">
            The highest-rated dating platforms based on our comprehensive scoring methodology.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {top10.map((site, i) => (
            <SiteCard key={site.slug} site={site} rank={i + 1} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/#rankings"
            className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-6 py-3 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
          >
            View All 50 Rankings
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </section>

      <AdUnit format="horizontal" className="mx-auto max-w-4xl px-4" />

      {/* ── Browse by Category ─────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">
            Browse by Category
          </h2>
          <p className="mt-3 text-text/50">
            Find the best dating sites tailored to your specific needs.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/category/${toSlug(cat)}`}
              className="group flex items-center gap-4 rounded-xl border border-card-border bg-card-bg p-5 transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_30px_rgba(196,168,124,0.06)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gold/5 text-2xl">
                {categoryIcons[cat] || '📱'}
              </span>
              <div>
                <h3 className="font-serif text-lg font-bold text-text group-hover:text-gold transition-colors">
                  {cat}
                </h3>
                <p className="text-sm text-text/40">View top-rated sites</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Browse by Country ──────────────────────────────────── */}
      <section
        id="countries"
        className="border-t border-card-border bg-[#0a0a0a]"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">
              Browse by Country
            </h2>
            <p className="mt-3 text-text/50">
              Explore dating site availability and rankings across 60 countries.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {countries.map((c) => (
              <Link
                key={c.slug}
                href={`/country/${c.slug}`}
                className="flex items-center gap-2.5 rounded-lg border border-card-border bg-card-bg/50 px-3 py-2.5 text-sm transition-all hover:border-gold/30 hover:bg-card-bg"
              >
                <span className="text-lg">{c.emoji}</span>
                <span className="truncate text-text/70 group-hover:text-text">
                  {c.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AdUnit format="horizontal" className="mx-auto max-w-4xl px-4 py-8" />

      {/* ── Featured Blog Posts ─────────────────────────────────── */}
      <section id="blog" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">
            Latest Articles
          </h2>
          <p className="mt-3 text-text/50">
            Expert advice and insights on online dating.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="overflow-hidden rounded-xl border border-card-border bg-card-bg transition-all duration-300 hover:border-gold/30">
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-gold/80">
                      {post.category}
                    </span>
                    <span className="text-xs text-text/30">{post.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold leading-snug text-text group-hover:text-gold transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text/50">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-text/30">{post.date}</span>
                    <span className="text-sm font-medium text-gold/70 group-hover:text-gold transition-colors">
                      Read more &rarr;
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* ── How We Rate ─────────────────────────────────────────── */}
      <section className="border-t border-card-border bg-[#0a0a0a]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-text">
            How We Rate the Best Dating Sites
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-text/50">
            <p>
              Our expert team evaluates every major dating platform across four key dimensions: Safety & Privacy, Ease of Use, Value for Money, and Match Quality. Each site receives a score from 1 to 10 in every category, which are then weighted to produce an overall ranking out of 10.
            </p>
            <p>
              We test each platform by creating genuine profiles, analyzing the matching algorithm's effectiveness, evaluating the onboarding experience, assessing safety features like photo verification and reporting tools, and comparing free versus premium tier value. Our rankings are updated quarterly to reflect platform changes and user feedback.
            </p>
            <p>
              Whether you're looking for serious relationships, casual dating, niche communities, or connections in a specific country, our rankings help you find the right platform. We cover general dating apps, sites for over 50s, LGBTQ+ platforms, international dating services, and specialized niche sites across 60 countries worldwide.
            </p>
          </div>
        </div>
      </section>

      <AdUnit format="horizontal" className="mx-auto max-w-4xl px-4 py-8" />
    </>
  );
}