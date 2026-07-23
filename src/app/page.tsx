import Link from 'next/link';
import AdUnit from '@/components/AdUnit';
import SearchBar from '@/components/SearchBar';
import FAQSection from '@/components/FAQSection';
import RankingsTable from '@/components/RankingsTable';
import {
  getTopSitesGlobal,
  getAllCategories,
  getAllBlogPosts,
  getAllSites,
  getSitesByCategory,
  toSlug,
} from '@/lib/dating-db';
import { getSearchIndex } from '@/lib/search-index';

export const revalidate = 604800;

export default function HomePage() {
  const top5 = getTopSitesGlobal(5);
  const top10 = getTopSitesGlobal(10);
  const top50 = getTopSitesGlobal(50);
  const allSites = getAllSites().sort((a, b) => b.metrics.overallScore - a.metrics.overallScore);
  const categories = getAllCategories();
  const blogPosts = getAllBlogPosts().slice(0, 6);
  const totalSites = getAllSites().length;

  const categoryMeta: Record<string, { icon: string; description: string }> = {
    'General Dating': { icon: '💑', description: 'Mainstream apps for all types of dating and relationships' },
    'Serious Relationships': { icon: '💍', description: 'Platforms focused on long-term commitment and marriage' },
    'Over 50': { icon: '🌹', description: 'Dating sites designed for mature singles over 50' },
    'LGBTQ+': { icon: '🏳️‍🌈', description: 'Inclusive platforms for the LGBTQ+ community' },
    'International / Cultural': { icon: '🌍', description: 'Cross-border dating and culturally-specific matchmaking' },
    'Hook-up / Casual': { icon: '🔥', description: 'Apps optimized for casual encounters and no-strings dating' },
    'Niche': { icon: '🎯', description: 'Specialized sites for unique interests and communities' },
    'Asian Market': { icon: '🏮', description: 'Leading dating platforms across Asian markets' },
    'Video Dating': { icon: '📹', description: 'Video-first platforms for face-to-face connections' },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '50 Best Dating Sites',
    url: 'https://50bestdatingsites.com',
    dateModified: '2026-07-01',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://50bestdatingsites.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const faqItems = [
    {
      question: 'How do we rank dating sites?',
      answer: 'Our editorial team evaluates every dating platform across four weighted dimensions: Safety & Privacy (25%), Ease of Use (25%), Value for Money (25%), and Match Quality (25%). Each site receives a score from 1 to 10 in every category, producing an overall score out of 10. We create genuine profiles, test the matching algorithm, assess onboarding, evaluate safety features, and compare free versus premium tiers. Rankings are updated quarterly.',
    },
    {
      question: 'Are free dating sites safe?',
      answer: 'Many free dating sites are safe to use, but the level of safety varies significantly. Reputable free platforms like Tinder, Bumble, and Hinge invest heavily in photo verification, AI-powered scam detection, and robust reporting tools. However, some lesser-known free sites may lack these protections. We recommend choosing platforms with verified profiles, transparent privacy policies, and active moderation teams. Always avoid sharing financial information and meet in public places.',
    },
    {
      question: 'What is the best dating site for serious relationships?',
      answer: 'For serious relationships, Hinge, eHarmony, and Match.com consistently rank highest in our evaluations. Hinge\'s prompt-based profiles encourage meaningful conversation, while eHarmony\'s compatibility-focused algorithm is designed specifically for long-term matching. Match.com offers the largest pool of relationship-minded singles. The best choice depends on your age, location, and preferences -- check our detailed reviews for personalized recommendations.',
    },
    {
      question: 'How much do dating sites cost?',
      answer: 'Most dating sites offer a free tier with limited features, plus premium subscriptions ranging from $10 to $65 per month. Popular apps like Tinder, Bumble, and Hinge charge $20-$35/month for premium. Relationship-focused sites like eHarmony and Match.com tend to cost $25-$65/month. Many platforms offer significant discounts for 3-month or 6-month commitments. Our reviews include detailed pricing breakdowns to help you find the best value.',
    },
    {
      question: 'Can I use multiple dating sites?',
      answer: 'Absolutely. Using 2-3 dating sites simultaneously is one of the most effective strategies for finding a match. Different platforms attract different demographics and prioritize different types of connections. For example, you might use Hinge for serious dating and Bumble for a broader social experience. Just be mindful of subscription costs and ensure you have enough time to maintain active, engaging profiles on each platform.',
    },
    {
      question: 'How do dating algorithms work?',
      answer: 'Dating algorithms use a combination of stated preferences (age, location, interests), behavioral data (who you swipe right on, how long you view profiles), and machine learning to predict compatibility. Some platforms like eHarmony use extensive personality questionnaires, while others like Tinder rely more on location and mutual attraction signals. More advanced apps like Hinge learn from your "likes" and "passes" to refine suggestions over time. No algorithm is perfect, but they significantly improve match quality compared to random browsing.',
    },
    {
      question: 'What information do dating sites collect?',
      answer: 'Dating sites typically collect your name, age, location, photos, stated preferences, and behavioral data (swipes, messages, time spent on profiles). Many also request access to your phone contacts, social media accounts, and precise GPS location. Premium features may require payment information. Reputable platforms have clear privacy policies and comply with GDPR and similar regulations. We evaluate data practices as part of our Safety & Privacy score -- check individual reviews for detailed assessments.',
    },
    {
      question: 'How do I spot fake profiles?',
      answer: 'Watch for these red flags: profiles with only 1-2 professional-looking photos, vague or generic bios, immediate requests to move conversations off-platform, refusal to video chat, stories that involve financial hardship, and profiles that seem "too good to be true." Use platforms with photo verification features (marked with a blue checkmark on most apps). Reverse image search suspicious photos. Trust your instincts -- if something feels off, it probably is. Report suspicious profiles to help keep the community safe.',
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top 50 Best Dating Sites 2026',
    numberOfItems: top50.length,
    itemListElement: top50.map((site, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: site.name,
      url: `https://50bestdatingsites.com/site/${site.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-card-border bg-gradient-to-b from-[#0d0b08] via-[#080808] to-[#080808]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,168,124,0.12)_0%,transparent_70%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <h1 className="font-serif text-5xl font-bold leading-tight tracking-tighter text-text sm:text-6xl lg:text-7xl">
            Find Your Perfect Dating Site
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text/60">
            Expert reviews of {totalSites.toLocaleString()}+ dating sites across 200 countries.
            Independently researched, rigorously scored, regularly updated.
          </p>
          <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-medium text-gold/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Last updated: July 2026
          </p>

          <SearchBar className="mx-auto mt-10 max-w-xl" searchData={getSearchIndex()} />

          {/* Trust stats */}
          <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-base text-text/60">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-gold">{totalSites.toLocaleString()}+</span>
              <span>Sites Reviewed</span>
            </div>
            <span className="hidden text-card-border sm:inline">|</span>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-gold">200</span>
              <span>Countries</span>
            </div>
            <span className="hidden text-card-border sm:inline">|</span>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-gold">July 2026</span>
              <span>Updated</span>
            </div>
            <span className="hidden text-card-border sm:inline">|</span>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-gold">Expert</span>
              <span>Ratings</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Editor's Top Picks ────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold/70">Editor&apos;s Choice</p>
          <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">
            Top 5 Dating Sites of 2026
          </h2>
          <p className="mt-3 text-text/50">
            Hand-picked by our editorial team based on rigorous, independent testing.
          </p>
        </div>

        <div className="space-y-4">
          {top5.map((site, i) => (
            <div
              key={site.slug}
              className="relative overflow-hidden rounded-2xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_40px_rgba(196,168,124,0.08)] sm:p-8"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                {/* Rank badge */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-light font-serif text-2xl font-bold text-[#080808]">
                  {i + 1}
                </div>

                {/* Score circle */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-gold/30 bg-gold/5">
                  <span className="font-serif text-2xl font-bold text-gold">
                    {site.metrics.overallScore.toFixed(1)}
                  </span>
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-2xl">{site.logo}</span>
                    <h3 className="font-serif text-xl font-bold text-text sm:text-2xl">
                      {site.name}
                    </h3>
                    <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-gold/80">
                      {site.category}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text/50">
                    {site.editorial}
                  </p>
                </div>

                {/* Pricing + CTAs */}
                <div className="flex shrink-0 flex-col items-end gap-3">
                  {site.pricing.free ? (
                    <span className="rounded-full bg-emerald-900/30 px-3 py-1 text-xs font-semibold text-emerald-400">
                      Free
                    </span>
                  ) : (
                    <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold/80">
                      From {site.pricing.currency} {site.pricing.premiumMonthly}/mo
                    </span>
                  )}
                  <a
                    href={site.url}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gold to-gold-light px-5 py-2.5 text-sm font-bold text-[#080808] transition-opacity hover:opacity-90"
                  >
                    Visit Site
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </a>
                  <Link
                    href={`/site/${site.slug}`}
                    className="text-sm font-medium text-text/50 transition-colors hover:text-gold"
                  >
                    Read Review &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/rankings"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-8 py-4 text-lg font-semibold text-black shadow-lg transition-all hover:bg-amber-600 hover:shadow-xl"
          >
            View All Rankings
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      <AdUnit format="horizontal" className="mx-auto max-w-4xl px-4" />

      {/* ── Top 50 Rankings ─────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">
            Top 50 Dating Sites
          </h2>
          <p className="mt-3 text-text/50">
            Expert-ranked with scores, pricing, and what each does best. Show more to explore all {totalSites.toLocaleString()} sites.
          </p>
        </div>

        <RankingsTable sites={allSites.slice(0, 50)} />
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
          {categories.map((cat) => {
            const meta = categoryMeta[cat] || { icon: '📱', description: 'Explore top-rated platforms' };
            const count = getSitesByCategory(cat).length;
            return (
              <Link
                key={cat}
                href={`/category/${toSlug(cat)}`}
                className="group flex items-start gap-4 rounded-xl border border-card-border bg-card-bg p-5 transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_30px_rgba(196,168,124,0.06)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gold/5 text-2xl">
                  {meta.icon}
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-text group-hover:text-gold transition-colors">
                    {cat}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-gold/60">{count} sites</p>
                  <p className="mt-1 text-sm text-text/40">{meta.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── How We Rate ─────────────────────────────────────────── */}
      <section className="border-t border-card-border bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">
              How We Rate Dating Sites
            </h2>
            <p className="mt-3 text-text/50">
              Our rigorous methodology ensures every recommendation is backed by data.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: '🛡️',
                title: 'Safety & Privacy',
                description: 'We evaluate photo verification, reporting tools, data encryption, privacy policies, and moderation quality. Sites must demonstrate a genuine commitment to user security to score highly.',
              },
              {
                icon: '✨',
                title: 'Ease of Use',
                description: 'We assess onboarding flow, profile creation, navigation design, search and filter functionality, and overall UX quality across both mobile and desktop platforms.',
              },
              {
                icon: '💰',
                title: 'Value for Money',
                description: 'We compare free tier generosity, premium pricing, feature-to-price ratio, subscription flexibility, and whether paid features meaningfully improve the experience.',
              },
              {
                icon: '💘',
                title: 'Match Quality',
                description: 'We test algorithm sophistication, profile depth requirements, compatibility scoring accuracy, user base diversity, and actual conversation-to-date conversion rates.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:border-gold/20"
              >
                <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold/5 text-2xl">
                  {card.icon}
                </span>
                <h3 className="mb-2 font-serif text-lg font-bold text-text">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-text/50">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest from the Blog ────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">
            Latest from the Blog
          </h2>
          <p className="mt-3 text-text/50">
            Expert advice, industry analysis, and dating tips from our editorial team.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="overflow-hidden rounded-xl border border-card-border bg-card-bg transition-all duration-200 hover:border-gold/30 hover:-translate-y-1">
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-amber-400">
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
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 transition-colors group-hover:bg-amber-500 group-hover:text-black">
                      Read article &rarr;
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-6 py-3 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
          >
            View All Articles
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      <AdUnit format="horizontal" className="mx-auto max-w-4xl px-4" />

      {/* ── 50 Best Trust Bar ──────────────────────────────────── */}
      <section className="border-t border-card-border bg-[#0a0a0a]">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/60 mb-4">
            Part of the 50 Best family
          </p>
          <p className="text-lg text-text/60 max-w-2xl mx-auto mb-6">
            Trusted curators of the world&apos;s finest experiences
          </p>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-5 py-2">
            <span className="font-serif text-2xl font-bold text-gold">1,018</span>
            <span className="text-sm text-text/50">dating sites rated across</span>
            <span className="font-serif text-2xl font-bold text-gold">200</span>
            <span className="text-sm text-text/50">countries</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="https://www.50besthotels.com" target="_blank" rel="noopener noreferrer" className="text-sm text-text/50 transition-colors hover:text-gold">50 Best Hotels</a>
            <span className="text-card-border">|</span>
            <a href="https://www.50bestspa.com" target="_blank" rel="noopener noreferrer" className="text-sm text-text/50 transition-colors hover:text-gold">50 Best Spas</a>
            <span className="text-card-border">|</span>
            <a href="https://www.50bestmuseums.com" target="_blank" rel="noopener noreferrer" className="text-sm text-text/50 transition-colors hover:text-gold">50 Best Museums</a>
            <span className="text-card-border">|</span>
            <a href="https://www.50bestmatchmaker.com" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-gold transition-colors hover:text-gold-light">50 Best Matchmakers</a>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="border-t border-card-border bg-[#0a0a0a]">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-text/50">
              Everything you need to know about choosing the right dating platform.
            </p>
          </div>

          <FAQSection items={faqItems} />
        </div>
      </section>

      {/* ── SEO Content ────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-6 font-serif text-2xl font-bold text-text">
          Online Dating in 2026: A Comprehensive Guide
        </h2>
        <div className="space-y-4 text-sm leading-relaxed text-text/50">
          <p>
            The online dating landscape in 2026 has evolved far beyond the simple swipe. Today&apos;s platforms leverage advanced AI matching, video-first profiles, and sophisticated compatibility scoring to help singles find meaningful connections. With over 350 million people worldwide using dating apps, the industry has matured into a nuanced ecosystem where niche platforms coexist alongside mainstream giants, each serving distinct demographics and relationship goals.
          </p>
          <p>
            Safety and authenticity have become the defining priorities for modern daters. Leading platforms now require photo verification, employ AI-powered scam detection, and offer integrated video calling so users can verify matches before meeting in person. Privacy controls have also strengthened, with most reputable sites offering granular data-sharing settings and transparent policies about how personal information is used. Our reviews evaluate these protections rigorously because trust is the foundation of every successful dating experience.
          </p>
          <p>
            Whether you are looking for a lifelong partner, exploring casual dating, or seeking connections within a specific community, the right platform makes all the difference. Our editorial team tests each site from the user&apos;s perspective -- creating real profiles, evaluating match suggestions, assessing the free-to-premium value gap, and comparing experiences across countries. We update our rankings quarterly to reflect platform changes, pricing updates, and evolving user feedback, ensuring our recommendations remain current and reliable.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="mx-auto max-w-4xl px-4 py-8" />
    </>
  );
}
