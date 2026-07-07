import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import AdUnit from '@/components/AdUnit';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/dating-db';

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
    .replace(/`(.+?)`/g, '<code class="rounded bg-card-bg px-1.5 py-0.5 text-gold/80 text-sm">$1</code>');
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

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: '50 Best Dating Sites',
    },
    publisher: {
      '@type': 'Organization',
      name: '50 Best Dating Sites',
    },
  };

  const shareUrl = `https://50bestdatingsites.com/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative border-b border-card-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,168,124,0.06)_0%,transparent_60%)]" />
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
