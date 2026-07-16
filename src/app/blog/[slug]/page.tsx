import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import AdUnit from '@/components/AdUnit';
import FAQSection from '@/components/FAQSection';
import { getBlogPostBySlug, getAllBlogPosts, type BlogPost } from '@/lib/dating-db';

/** Generate contextual FAQ Q&A pairs based on blog post metadata */
function generateFAQs(post: BlogPost): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const titleLower = post.title.toLowerCase();
  const tagsLower = post.tags.map((t) => t.toLowerCase());
  const catLower = post.category.toLowerCase();

  // Cost / pricing related
  if (titleLower.includes('cost') || titleLower.includes('price') || titleLower.includes('afford') || tagsLower.some((t) => t.includes('cost') || t.includes('price') || t.includes('budget'))) {
    faqs.push(
      { question: 'How much do dating sites cost?', answer: 'Most dating sites offer a free tier with basic features. Premium subscriptions typically range from $10 to $65 per month, with popular apps like Tinder, Bumble, and Hinge charging $20-$35/month. Relationship-focused sites like eHarmony and Match.com tend to cost $25-$65/month. Many platforms offer discounts for 3-month or 6-month commitments.' },
      { question: 'Are free dating sites worth using?', answer: 'Absolutely. Platforms like Tinder, Bumble, Hinge, and OkCupid offer excellent free experiences. While premium features add convenience, millions of users find matches using free tiers alone. The key is choosing a platform with a generous free tier that matches your dating goals.' },
      { question: 'Do dating sites offer refunds?', answer: 'Refund policies vary by platform. Most dating sites do not offer refunds for unused subscription time, but some will make exceptions within the first few days. Always check the terms of service before subscribing, and consider starting with a one-month plan to test the platform.' },
      { question: 'Which dating site offers the best value?', answer: 'Hinge and Bumble consistently offer the best value, with generous free tiers and reasonably priced premium subscriptions. For serious relationship seekers, eHarmony offers strong value despite higher pricing due to its compatibility-focused matching algorithm.' },
    );
  }

  // Safety / privacy related
  if (titleLower.includes('safe') || titleLower.includes('privacy') || titleLower.includes('scam') || tagsLower.some((t) => t.includes('safe') || t.includes('privacy') || t.includes('security'))) {
    faqs.push(
      { question: 'How do dating sites verify user identities?', answer: 'Most reputable dating sites use photo verification (comparing a selfie to profile photos using AI), phone number verification, and social media linking. Some platforms like Tinder and Bumble offer blue verification badges. A few premium services also conduct background checks.' },
      { question: 'Are dating sites safe to use?', answer: 'Reputable dating platforms invest heavily in safety features including AI-powered scam detection, photo verification, blocking and reporting tools, and moderation teams. Always use platforms with transparent privacy policies and never share financial information with matches.' },
      { question: 'How can I spot fake profiles on dating sites?', answer: 'Watch for profiles with only 1-2 professional photos, vague bios, immediate requests to move off-platform, refusal to video chat, and stories involving financial hardship. Use platforms with photo verification and trust your instincts -- if something feels off, report the profile.' },
      { question: 'Do dating sites sell my personal data?', answer: 'Reputable dating platforms do not sell personal data directly, but many share anonymized data with advertising partners. Check each platform privacy policy carefully. We evaluate data practices as part of our Safety & Privacy score in every review.' },
    );
  }

  // Tips / how-to / guide related
  if (titleLower.includes('tip') || titleLower.includes('how to') || titleLower.includes('guide') || titleLower.includes('advice') || catLower.includes('guide') || catLower.includes('tip')) {
    faqs.push(
      { question: 'What should I look for when choosing a dating site?', answer: 'Consider your relationship goals (casual vs. serious), budget, age group, and preferred features. Look for platforms with strong safety features, active user bases in your area, and matching algorithms that align with what you value. Read expert reviews to compare options.' },
      { question: 'How long does it take to find a match on dating sites?', answer: 'Most users report getting their first quality matches within 1-2 weeks of creating a complete profile. Finding a relationship typically takes 3-6 months of active use. Success depends on profile quality, how responsive you are, and choosing the right platform for your goals.' },
      { question: 'What makes a good dating profile?', answer: 'A great dating profile includes 4-6 varied, recent photos showing your face clearly, a bio that showcases your personality and what you are looking for, and honest information about your interests and lifestyle. Avoid generic statements and be specific about what makes you unique.' },
      { question: 'Should I use multiple dating sites at once?', answer: 'Using 2-3 dating sites simultaneously is one of the most effective strategies. Different platforms attract different demographics, so spreading across a few increases your chances. Just ensure you have time to maintain active, engaging profiles on each.' },
    );
  }

  // Comparison / review related
  if (titleLower.includes('best') || titleLower.includes('top') || titleLower.includes('review') || titleLower.includes('compare') || titleLower.includes('vs')) {
    faqs.push(
      { question: 'How are dating sites ranked and reviewed?', answer: 'We evaluate dating sites across four dimensions: Safety & Privacy, Ease of Use, Value for Money, and Match Quality. Each category is scored from 1-10 based on independent research, hands-on testing, and user feedback. Rankings are updated quarterly.' },
      { question: 'What is the best dating site overall?', answer: 'The best dating site depends on your goals. For serious relationships, Hinge and eHarmony lead our rankings. For casual dating, Tinder and Bumble are top choices. For niche communities, specialized platforms often provide better experiences than mainstream apps.' },
      { question: 'Are paid dating sites better than free ones?', answer: 'Paid sites tend to attract more serious users, which can mean higher-quality matches. However, many free platforms like Hinge and Bumble offer excellent experiences. The best approach is to start with a free tier and upgrade only if the premium features justify the cost.' },
      { question: 'How often are dating site rankings updated?', answer: 'Our rankings are updated quarterly to reflect platform changes, pricing updates, new features, and evolving user feedback. We also publish immediate updates when significant changes occur, such as major app redesigns or security incidents.' },
    );
  }

  // Generic fallback
  if (faqs.length === 0) {
    faqs.push(
      { question: 'What is online dating?', answer: 'Online dating uses websites and mobile apps to connect singles looking for romantic relationships. Modern platforms use algorithms, questionnaires, and AI to suggest compatible matches. With over 350 million users worldwide, dating sites have become one of the most common ways couples meet.' },
      { question: 'How do I get started with online dating?', answer: 'Start by choosing 1-2 dating platforms that align with your goals. Create a complete profile with quality photos and an honest bio. Be proactive about messaging matches and stay safe by meeting in public places. Check our reviews to find the best platform for your needs.' },
      { question: 'What makes a good dating site?', answer: 'A good dating site has a large active user base, strong safety features (photo verification, reporting tools), an effective matching algorithm, transparent pricing, and a user-friendly interface. We evaluate all of these factors in our detailed reviews.' },
      { question: 'Are dating sites effective for finding relationships?', answer: 'Yes. Studies show that approximately 30% of relationships now begin online, and couples who meet through dating sites report similar or higher satisfaction levels compared to those who meet through traditional means. Success depends on choosing the right platform and actively engaging with matches.' },
      { question: 'How do dating algorithms work?', answer: 'Dating algorithms combine your stated preferences (age, location, interests), behavioral data (who you swipe on, how long you view profiles), and machine learning to predict compatibility. Some platforms like eHarmony use personality questionnaires, while others like Tinder rely more on location and mutual attraction signals.' },
    );
  }

  return faqs.slice(0, 5);
}

export const revalidate = 604800;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | 50 Best Dating Sites Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

/** Convert markdown-ish content to HTML. Handles headings, paragraphs, bold, lists. */
function markdownToHtml(md: string): string {
  const lines = md.split('\n');
  const html: string[] = [];
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      continue;
    }

    // Headings
    if (trimmed.startsWith('# ')) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<h1 class="font-serif text-3xl font-bold text-text mt-10 mb-4">${formatInline(trimmed.slice(2))}</h1>`);
    } else if (trimmed.startsWith('## ')) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<h2 class="font-serif text-2xl font-bold text-text mt-8 mb-3">${formatInline(trimmed.slice(3))}</h2>`);
    } else if (trimmed.startsWith('### ')) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<h3 class="font-serif text-xl font-bold text-text mt-6 mb-2">${formatInline(trimmed.slice(4))}</h3>`);
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList) {
        html.push('<ul class="space-y-2 my-4 ml-4">');
        inList = true;
      }
      html.push(`<li class="flex items-start gap-2 text-text/70 leading-relaxed"><span class="text-gold mt-1.5 shrink-0">&#8226;</span><span>${formatInline(trimmed.slice(2))}</span></li>`);
    } else {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<p class="text-text/70 leading-relaxed my-4">${formatInline(trimmed)}</p>`);
    }
  }

  if (inList) html.push('</ul>');
  return html.join('\n');
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-text font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="rounded bg-slate-100 px-1.5 py-0.5 text-amber-700 text-sm">$1</code>');
}

export default async function BlogPostPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllBlogPosts();
  const related = allPosts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3);

  const contentHtml = markdownToHtml(post.content);
  const faqs = generateFAQs(post);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: '50 Best Dating Sites',
    },
    publisher: {
      '@type': 'Organization',
      name: '50 Best Dating Sites',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://50bestdatingsites.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://50bestdatingsites.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://50bestdatingsites.com/blog/${post.slug}` },
    ],
  };

  const shareUrl = `https://50bestdatingsites.com/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative border-b border-card-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,119,6,0.04)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-text/40">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-gold transition-colors">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text/60 line-clamp-1">{post.title}</span>
          </nav>

          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-gold/80">
              {post.category}
            </span>
            <span className="text-xs text-text/30">{post.readTime}</span>
          </div>

          <h1 className="font-serif text-3xl font-bold leading-tight text-text sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 font-serif text-sm font-bold text-gold">
              ET
            </div>
            <div>
              <p className="text-sm font-medium text-text/80">{post.author}</p>
              <p className="text-xs text-text/40">{post.date}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <article
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <AdUnit format="horizontal" className="my-12" />

        {/* ── Share buttons ──────────────────────────────── */}
        <div className="flex items-center gap-4 border-t border-card-border pt-8">
          <span className="text-sm font-medium text-text/40">Share:</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-card-border bg-card-bg px-4 py-2 text-sm text-text/60 transition-colors hover:border-gold/30 hover:text-gold"
          >
            X / Twitter
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-card-border bg-card-bg px-4 py-2 text-sm text-text/60 transition-colors hover:border-gold/30 hover:text-gold"
          >
            Facebook
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-card-border bg-card-bg px-4 py-2 text-sm text-text/60 transition-colors hover:border-gold/30 hover:text-gold"
          >
            LinkedIn
          </a>
        </div>

        {/* ── Author bio ──────────────────────────────────── */}
        <div className="mt-8 rounded-xl border border-card-border bg-card-bg p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold/10 font-serif text-lg font-bold text-gold">
              ET
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-text">
                {post.author}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-text/50">
                Our editorial team independently researches, tests, and reviews
                dating platforms worldwide. With combined decades of experience
                in technology and relationship science, we provide unbiased
                rankings and actionable advice.
              </p>
            </div>
          </div>
        </div>

        {/* ── Tags ─────────────────────────────────────────── */}
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gold/5 px-3 py-1.5 text-xs text-text/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── FAQ ──────────────────────────────────────────── */}
        {faqs.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 font-serif text-2xl font-bold text-text">
              Frequently Asked Questions
            </h2>
            <FAQSection items={faqs} />
          </section>
        )}

        {/* ── Related posts ────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 font-serif text-2xl font-bold text-text">
              Related Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group block"
                >
                  <article className="h-full overflow-hidden rounded-xl border border-card-border bg-card-bg transition-all duration-300 hover:border-gold/30">
                    <div className="p-5">
                      <span className="mb-2 inline-block rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gold/80">
                        {rp.category}
                      </span>
                      <h3 className="font-serif text-base font-bold leading-snug text-text group-hover:text-gold transition-colors">
                        {rp.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-text/50">
                        {rp.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
