import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import AdUnit from '@/components/AdUnit';
import FAQSection from '@/components/FAQSection';
import { getAllSites, type DatingSite } from '@/lib/dating-db';

export const revalidate = 604800;

interface BestForTopic {
  slug: string;
  title: string;
  h1: string;
  intro: string;
  filterFn: (site: DatingSite) => boolean;
  faq: { question: string; answer: string }[];
}

const topics: BestForTopic[] = [
  {
    slug: 'serious-relationships',
    title: 'Best Dating Sites for Serious Relationships (2026)',
    h1: 'Best Dating Sites for Serious Relationships',
    intro: 'If you are looking for a long-term partner or marriage, these dating platforms are designed to foster genuine, lasting connections. Each has been evaluated on match quality, algorithm sophistication, and the percentage of users seeking commitment.',
    filterFn: (s) =>
      s.category === 'Serious Relationships' ||
      s.bestFor.toLowerCase().includes('serious') ||
      s.bestFor.toLowerCase().includes('relationship') ||
      s.bestFor.toLowerCase().includes('long-term'),
    faq: [
      { question: 'Which dating site has the highest success rate for serious relationships?', answer: 'eHarmony and Hinge consistently report the highest rates of relationships that last beyond six months, thanks to their compatibility-focused algorithms and profile depth requirements.' },
      { question: 'Are paid dating sites better for finding serious relationships?', answer: 'Generally yes. The paywall filters out casual users and signals commitment. Platforms like Match.com and eHarmony attract a higher percentage of relationship-minded singles than free alternatives.' },
    ],
  },
  {
    slug: 'over-50',
    title: 'Best Dating Sites for Over 50 (2026)',
    h1: 'Best Dating Sites for Over 50',
    intro: 'Dating later in life comes with unique needs -- from larger text and simpler interfaces to communities that understand your stage of life. These platforms cater specifically to mature singles looking for companionship, romance, or a second chance at love.',
    filterFn: (s) =>
      s.category === 'Over 50' ||
      s.bestFor.toLowerCase().includes('over 50') ||
      s.bestFor.toLowerCase().includes('senior') ||
      s.bestFor.toLowerCase().includes('mature'),
    faq: [
      { question: 'What is the safest dating site for over 50?', answer: 'SilverSingles and OurTime are widely regarded as the safest options for over-50 daters, with robust profile verification, dedicated customer support, and communities designed for mature singles.' },
      { question: 'Are there free dating sites for seniors?', answer: 'Yes, several platforms offer free tiers for over-50 users, including OkCupid and Plenty of Fish. However, premium subscriptions on senior-focused sites typically provide a better experience with fewer ads and more compatible matches.' },
    ],
  },
  {
    slug: 'free',
    title: 'Best Free Dating Sites (2026)',
    h1: 'Best Free Dating Sites',
    intro: 'You do not need to spend a fortune to find love. These dating platforms offer robust free tiers that let you create profiles, browse matches, and send messages without a subscription. We have ranked them by how much you can actually do without paying.',
    filterFn: (s) => s.pricing.free,
    faq: [
      { question: 'Are free dating sites worth using?', answer: 'Absolutely. Platforms like Tinder, Bumble, Hinge, and OkCupid offer excellent free experiences. While premium features add convenience, millions of users find matches using free tiers alone.' },
      { question: 'What is the catch with free dating sites?', answer: 'Free sites monetize through ads and optional premium upgrades. The core dating functionality is genuinely free, but you may encounter more ads, limited daily swipes, or restricted access to features like seeing who liked your profile.' },
    ],
  },
  {
    slug: 'lgbtq',
    title: 'Best LGBTQ+ Dating Sites (2026)',
    h1: 'Best Dating Sites for LGBTQ+',
    intro: 'Finding an inclusive, safe dating platform is essential for LGBTQ+ singles. These sites and apps are designed with the community in mind, offering features like gender-inclusive profiles, orientation-specific matching, and strong anti-discrimination policies.',
    filterFn: (s) =>
      s.category === 'LGBTQ+' ||
      s.bestFor.toLowerCase().includes('lgbtq') ||
      s.bestFor.toLowerCase().includes('gay') ||
      s.bestFor.toLowerCase().includes('lesbian') ||
      s.bestFor.toLowerCase().includes('queer'),
    faq: [
      { question: 'What is the most popular LGBTQ+ dating app?', answer: 'Grindr remains the most-used app for gay and bisexual men, while HER is the leading platform for lesbian, bisexual, and queer women. Tinder and Bumble also offer strong LGBTQ+ experiences with gender-inclusive settings.' },
      { question: 'Are mainstream dating apps safe for LGBTQ+ users?', answer: 'Most major platforms have added LGBTQ+ safety features, including the ability to hide profiles in countries where being out is unsafe. However, community-specific apps like Grindr and HER tend to offer more tailored safety tools and moderation.' },
    ],
  },
  {
    slug: 'hookups',
    title: 'Best Dating Sites for Hookups & Casual Dating (2026)',
    h1: 'Best Dating Sites for Hookups',
    intro: 'Not everyone is looking for a committed relationship. These platforms are optimized for casual encounters, with features designed to help you connect quickly and without pressure. We have evaluated them on user intent clarity, matching speed, and safety.',
    filterFn: (s) =>
      s.category === 'Hook-up / Casual' ||
      s.bestFor.toLowerCase().includes('casual') ||
      s.bestFor.toLowerCase().includes('hookup') ||
      s.bestFor.toLowerCase().includes('hook-up'),
    faq: [
      { question: 'Which hookup app has the most users?', answer: 'Tinder has the largest user base of any dating app, with a significant portion of users open to casual encounters. For more explicitly casual intent, platforms like Pure and Feeld are popular alternatives.' },
      { question: 'Are hookup sites safe to use?', answer: 'Reputable casual dating platforms invest in safety features like photo verification, blocking, and reporting. Always meet in public places, tell a friend where you are going, and trust your instincts.' },
    ],
  },
  {
    slug: 'professionals',
    title: 'Best Dating Sites for Professionals (2026)',
    h1: 'Best Dating Sites for Professionals',
    intro: 'Busy professionals need dating platforms that respect their time and match them with equally driven partners. These sites attract career-oriented singles and offer features like LinkedIn verification and education-based filtering.',
    filterFn: (s) =>
      s.bestFor.toLowerCase().includes('professional') ||
      s.bestFor.toLowerCase().includes('career') ||
      s.bestFor.toLowerCase().includes('educated') ||
      s.bestFor.toLowerCase().includes('ambitious') ||
      s.name.toLowerCase().includes('elite') ||
      s.name.toLowerCase().includes('league'),
    faq: [
      { question: 'Which dating app is best for educated professionals?', answer: 'The League, EliteSingles, and Hinge are popular among educated professionals. Hinge is particularly favored in major cities for its emphasis on conversation-starting prompts and detailed profiles.' },
      { question: 'Is there a dating app that verifies employment or education?', answer: 'The League requires LinkedIn verification, and EliteSingles uses an extensive personality questionnaire plus education verification. Bumble also allows users to verify their profiles and display their profession prominently.' },
    ],
  },
  {
    slug: 'single-parents',
    title: 'Best Dating Sites for Single Parents (2026)',
    h1: 'Best Dating Sites for Single Parents',
    intro: 'Single parents face unique challenges in dating -- from limited free time to needing partners who are open to children. These platforms cater to parents specifically or have features that make it easy to connect with family-minded singles.',
    filterFn: (s) =>
      s.bestFor.toLowerCase().includes('parent') ||
      s.bestFor.toLowerCase().includes('single mom') ||
      s.bestFor.toLowerCase().includes('single dad') ||
      s.bestFor.toLowerCase().includes('family'),
    faq: [
      { question: 'Are there dating apps specifically for single parents?', answer: 'Yes, platforms like Stir (from the Match Group) are designed specifically for single parents. Additionally, mainstream apps like eHarmony and Match.com have strong communities of parent users and allow you to indicate children on your profile.' },
      { question: 'When should I mention my kids on a dating profile?', answer: 'Most dating experts recommend mentioning that you have children in your profile. You do not need to share details, but transparency about being a parent helps attract partners who are genuinely open to that dynamic.' },
    ],
  },
  {
    slug: 'christians',
    title: 'Best Christian Dating Sites (2026)',
    h1: 'Best Dating Sites for Christians',
    intro: 'For faith-oriented singles, finding a partner who shares your values is essential. These dating platforms are designed for Christians seeking relationships grounded in shared beliefs, church involvement, and spiritual compatibility.',
    filterFn: (s) =>
      s.bestFor.toLowerCase().includes('christian') ||
      s.bestFor.toLowerCase().includes('faith') ||
      s.bestFor.toLowerCase().includes('religious') ||
      s.name.toLowerCase().includes('christian'),
    faq: [
      { question: 'What is the best Christian dating site?', answer: 'Christian Mingle remains the most popular faith-based dating platform, with the largest community of Christian singles. eHarmony is also popular among Christians due to its compatibility-focused matching and relationship-oriented user base.' },
      { question: 'Can I find Christians on mainstream dating apps?', answer: 'Yes. Most mainstream apps like Hinge and Bumble allow you to filter by religion. However, dedicated platforms like Christian Mingle provide a more focused community where shared faith is a given.' },
    ],
  },
  {
    slug: 'muslims',
    title: 'Best Muslim Dating Sites (2026)',
    h1: 'Best Dating Sites for Muslims',
    intro: 'Muslim singles looking for halal relationships need platforms that respect cultural and religious values. These dating sites cater to the Muslim community with features like chaperone modes, family involvement options, and sect-specific matching.',
    filterFn: (s) =>
      s.bestFor.toLowerCase().includes('muslim') ||
      s.bestFor.toLowerCase().includes('islam') ||
      s.bestFor.toLowerCase().includes('halal') ||
      s.name.toLowerCase().includes('muslim') ||
      s.name.toLowerCase().includes('muzmatch') ||
      s.name.toLowerCase().includes('muzz'),
    faq: [
      { question: 'What is the best halal dating app?', answer: 'Muzz (formerly Muzmatch) is the most popular Muslim dating app globally, with features designed for Islamic values including a chaperone mode, sect filters, and prayer frequency preferences.' },
      { question: 'Is online dating halal?', answer: 'Many scholars agree that using dating apps with the intention of marriage is permissible, especially when the platform includes features that support modesty and family involvement. Platforms like Muzz are designed with these values in mind.' },
    ],
  },
  {
    slug: 'asian',
    title: 'Best Asian Dating Sites (2026)',
    h1: 'Best Dating Sites for Asian Singles',
    intro: 'Whether you are Asian and looking for someone who shares your cultural background, or you are interested in dating within Asian communities, these platforms offer the best experiences with large, active user bases across Asian countries.',
    filterFn: (s) =>
      s.category === 'Asian Market' ||
      s.bestFor.toLowerCase().includes('asian') ||
      s.bestFor.toLowerCase().includes('chinese') ||
      s.bestFor.toLowerCase().includes('korean') ||
      s.bestFor.toLowerCase().includes('japanese'),
    faq: [
      { question: 'What is the best dating app in Asia?', answer: 'It varies by country. Pairs and Tapple dominate in Japan, Noondate leads in South Korea, TanTan is popular in China, and Bumble and Tinder are widely used across Southeast Asia.' },
      { question: 'Are there dating apps for Asian Americans?', answer: 'EastMeetEast and Coffee Meets Bagel have strong Asian-American user bases. Hinge and Bumble are also popular among Asian Americans in major US cities.' },
    ],
  },
  {
    slug: 'black',
    title: 'Best Dating Sites for Black Singles (2026)',
    h1: 'Best Dating Sites for Black Singles',
    intro: 'Finding a dating platform where you feel represented and respected matters. These sites have strong Black communities, culturally aware matching, and environments where Black singles can connect authentically.',
    filterFn: (s) =>
      s.bestFor.toLowerCase().includes('black') ||
      s.bestFor.toLowerCase().includes('african') ||
      s.name.toLowerCase().includes('black') ||
      s.name.toLowerCase().includes('bae'),
    faq: [
      { question: 'What is the best dating app for Black singles?', answer: 'BLK (by Match Group) is the most popular dating app designed specifically for Black singles. Hinge and Bumble also have strong, diverse user bases with ethnicity preference filters.' },
      { question: 'Are mainstream dating apps inclusive for Black users?', answer: 'Major platforms have made strides in inclusivity, but experiences vary. Community-specific apps like BLK offer spaces where Black culture is centered rather than optional.' },
    ],
  },
  {
    slug: 'latino',
    title: 'Best Dating Sites for Latino Singles (2026)',
    h1: 'Best Dating Sites for Latino Singles',
    intro: 'Latino singles looking for culturally aware dating platforms will find these options ideal. From bilingual interfaces to community-focused matching, these sites understand and celebrate Latino culture.',
    filterFn: (s) =>
      s.bestFor.toLowerCase().includes('latin') ||
      s.bestFor.toLowerCase().includes('hispanic') ||
      s.name.toLowerCase().includes('latin') ||
      s.name.toLowerCase().includes('chispa'),
    faq: [
      { question: 'What is the best dating app for Latinos?', answer: 'Chispa is the most popular dating app designed for Latino singles. Additionally, mainstream platforms like Tinder and Bumble have large Latino user bases, especially in the US, Mexico, and Latin America.' },
      { question: 'Are there bilingual dating apps?', answer: 'Yes, Chispa and Badoo offer fully bilingual English/Spanish interfaces. Most major apps also support Spanish and Portuguese language settings.' },
    ],
  },
  {
    slug: 'seniors',
    title: 'Best Dating Sites for Seniors (2026)',
    h1: 'Best Dating Sites for Seniors',
    intro: 'Dating over 60 or 70 requires platforms with accessible interfaces, patient communities, and an understanding of what mature singles want. These dating sites are built for an older demographic with features that prioritize ease of use and genuine connection.',
    filterFn: (s) =>
      s.category === 'Over 50' ||
      s.bestFor.toLowerCase().includes('senior') ||
      s.bestFor.toLowerCase().includes('over 50') ||
      s.bestFor.toLowerCase().includes('over 60') ||
      s.bestFor.toLowerCase().includes('mature') ||
      s.bestFor.toLowerCase().includes('older'),
    faq: [
      { question: 'What is the easiest dating site to use for seniors?', answer: 'SilverSingles and OurTime are designed with simplicity in mind, featuring large text, intuitive navigation, and step-by-step profile creation. Their mobile apps are also optimized for accessibility.' },
      { question: 'Is online dating safe for seniors?', answer: 'Yes, when using reputable platforms. Stick to well-known sites with photo verification, never send money to someone you have not met, and always meet first dates in public places. Most senior-focused platforms have dedicated customer support for safety concerns.' },
    ],
  },
  {
    slug: 'women',
    title: 'Best Dating Sites for Women (2026)',
    h1: 'Best Dating Sites for Women',
    intro: 'Safety, respect, and quality matches are top priorities for women in online dating. These platforms put women first with features like women-initiated messaging, strong moderation, and verified profiles.',
    filterFn: (s) =>
      s.bestFor.toLowerCase().includes('women') ||
      s.bestFor.toLowerCase().includes('female') ||
      s.name.toLowerCase().includes('bumble') ||
      s.name.toLowerCase().includes('her'),
    faq: [
      { question: 'What is the safest dating app for women?', answer: 'Bumble is widely considered the safest mainstream dating app for women thanks to its women-message-first model, photo verification, and strict anti-harassment policies. HER is the safest option for queer women.' },
      { question: 'Which dating app gives women the most control?', answer: 'Bumble gives women exclusive control over initiating conversations in heterosexual matches. Hinge also empowers women by showing them curated, high-quality matches rather than overwhelming them with options.' },
    ],
  },
  {
    slug: 'introverts',
    title: 'Best Dating Sites for Introverts (2026)',
    h1: 'Best Dating Sites for Introverts',
    intro: 'Introverts thrive on dating platforms that emphasize depth over volume. These sites feature detailed profile questions, thoughtful matching algorithms, and conversation starters that go beyond small talk.',
    filterFn: (s) =>
      s.bestFor.toLowerCase().includes('introvert') ||
      s.bestFor.toLowerCase().includes('meaningful') ||
      s.bestFor.toLowerCase().includes('deeper connection') ||
      s.bestFor.toLowerCase().includes('thoughtful') ||
      s.metrics.matchQuality >= 8,
    faq: [
      { question: 'Which dating app is best for people who hate small talk?', answer: 'Hinge excels here with its prompt-based profiles that give you specific things to comment on. eHarmony is also great for introverts because its comprehensive questionnaire does the matching work so you can focus on fewer, higher-quality connections.' },
      { question: 'Are there dating apps that limit daily matches?', answer: 'Yes. Coffee Meets Bagel sends a limited number of curated matches daily, and Hinge limits free users to a set number of likes. This slower pace suits introverts who prefer quality over quantity.' },
    ],
  },
];

export async function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const topic = topics.find((t) => t.slug === slug);
  if (!topic) return { title: 'Not Found' };

  return {
    title: `${topic.title} | 50 Best Dating Sites`,
    description: topic.intro.slice(0, 160),
    openGraph: {
      title: topic.title,
      description: topic.intro.slice(0, 160),
      type: 'article',
    },
  };
}

export default async function BestForPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const topic = topics.find((t) => t.slug === slug);
  if (!topic) notFound();

  const allSites = getAllSites();
  const matchingSites = allSites
    .filter(topic.filterFn)
    .sort((a, b) => b.metrics.overallScore - a.metrics.overallScore)
    .slice(0, 20);

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: topic.title,
    numberOfItems: matchingSites.length,
    itemListElement: matchingSites.map((site, i) => ({
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
      { '@type': 'ListItem', position: 2, name: 'Best For', item: 'https://50bestdatingsites.com/best-for' },
      { '@type': 'ListItem', position: 3, name: topic.h1, item: `https://50bestdatingsites.com/best-for/${slug}` },
    ],
  };

  const faqJsonLd = topic.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: topic.faq.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Hero */}
      <section className="border-b border-card-border">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-text/40">
            <a href="/" className="hover:text-gold transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span className="text-text/60">Best For</span>
          </nav>
          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">
            {topic.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text/50">
            {topic.intro}
          </p>
          <p className="mt-2 text-xs text-text/30">Updated July 2026 | {matchingSites.length} sites reviewed</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Ranked list */}
        <div className="space-y-4">
          {matchingSites.map((site, i) => (
            <div
              key={site.slug}
              className="flex flex-col gap-4 rounded-xl border border-card-border bg-card-bg p-5 transition-all hover:border-gold/30 sm:flex-row sm:items-center sm:p-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-light font-serif text-lg font-bold text-white">
                {i + 1}
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/5 text-2xl">
                {site.logo}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg font-bold text-text">{site.name}</h3>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold/10 text-xs font-bold text-gold">
                    {site.metrics.overallScore.toFixed(1)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-text/50">{site.bestFor}</p>
                <p className="mt-1 line-clamp-2 text-sm text-text/40">{site.editorial}</p>
              </div>

              <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                {site.pricing.free ? (
                  <span className="rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-semibold text-emerald-600">Free</span>
                ) : (
                  <span className="text-xs text-text/40">${site.pricing.premiumMonthly}/mo</span>
                )}
                <a
                  href={site.url}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-gold to-gold-light px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
                >
                  Visit Site
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </a>
                <Link href={`/site/${site.slug}`} className="text-xs text-text/40 hover:text-gold transition-colors">
                  Read Review &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        {matchingSites.length === 0 && (
          <div className="rounded-xl border border-card-border bg-card-bg p-12 text-center">
            <p className="text-text/50">No sites matching this category yet. Check back soon.</p>
          </div>
        )}

        <AdUnit format="horizontal" className="mt-12" />

        {/* FAQ */}
        {topic.faq.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 font-serif text-2xl font-bold text-text">
              Frequently Asked Questions
            </h2>
            <FAQSection items={topic.faq} />
          </section>
        )}
      </div>
    </>
  );
}
