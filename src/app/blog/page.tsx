import Link from 'next/link';
import type { Metadata } from 'next';
import AdUnit from '@/components/AdUnit';
import { getAllBlogPosts } from '@/lib/dating-db';

export const revalidate = 604800;

export const metadata: Metadata = {
  title: 'Dating Advice & Guides | 50 Best Dating Sites Blog',
  description:
    'Expert dating advice, safety guides, platform comparisons, and tips for finding love online. Updated weekly by our editorial team.',
  openGraph: {
    title: 'Dating Advice & Guides | 50 Best Dating Sites Blog',
    description:
      'Expert dating advice, safety guides, platform comparisons, and tips for finding love online.',
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative border-b border-card-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,168,124,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-text/40">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text/60">Blog</span>
          </nav>

          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">
            Dating Advice &amp; Guides
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-text/50">
            Expert insights, safety tips, and in-depth guides to help you
            navigate the world of online dating.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* ── Featured post ─────────────────────────────── */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group mb-12 block">
            <article className="overflow-hidden rounded-xl border border-card-border bg-card-bg p-8 transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_40px_rgba(196,168,124,0.06)]">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-gold/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-gold/80">
                  Featured
                </span>
                <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-gold/80">
                  {featured.category}
                </span>
                <span className="text-xs text-text/30">
                  {featured.readTime}
                </span>
              </div>
              <h2 className="font-serif text-3xl font-bold leading-tight text-text group-hover:text-gold transition-colors sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-text/50">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-text/40">
                    {featured.author}
                  </span>
                  <span className="text-text/20">|</span>
                  <span className="text-sm text-text/40">{featured.date}</span>
                </div>
                <span className="text-sm font-medium text-gold/70 group-hover:text-gold transition-colors">
                  Read article &rarr;
                </span>
              </div>
            </article>
          </Link>
        )}

        <AdUnit format="horizontal" className="mb-12" />

        {/* ── Post grid ─────────────────────────────────── */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <article className="h-full overflow-hidden rounded-xl border border-card-border bg-card-bg transition-all duration-300 hover:border-gold/30">
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-gold/80">
                      {post.category}
                    </span>
                    <span className="text-xs text-text/30">
                      {post.readTime}
                    </span>
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

        <AdUnit format="horizontal" className="mt-12" />
      </div>
    </>
  );
}
