'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getTopSitesGlobal, getAllCategories } from '@/lib/dating-db';
import AdUnit from '@/components/AdUnit';

export default function ReviewsPage() {
  const top100 = useMemo(() => getTopSitesGlobal(100), []);
  const categories = useMemo(() => getAllCategories(), []);
  const [catFilter, setCatFilter] = useState('all');

  const filtered = catFilter === 'all'
    ? top100
    : top100.filter((s) => s.category === catFilter);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-card-border">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold/70">Editorial</p>
          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">
            Expert Reviews
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-text/50">
            In-depth, independently researched reviews of the world&apos;s top dating platforms. Each review includes safety scores, pricing analysis, pros and cons, and our editorial verdict.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Filter */}
        <div className="mb-8 flex items-center gap-3">
          <label htmlFor="review-cat" className="text-sm text-text/50">Filter by category:</label>
          <select
            id="review-cat"
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="rounded-lg border border-card-border bg-[#080808] px-3 py-2 text-sm text-text outline-none focus:border-gold/40"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <span className="ml-auto text-sm text-text/30">{filtered.length} reviews</span>
        </div>

        {/* Review cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((site) => (
            <Link
              key={site.slug}
              href={`/site/${site.slug}`}
              className="group flex flex-col rounded-xl border border-card-border bg-card-bg p-5 transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_30px_rgba(196,168,124,0.06)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold/5 text-2xl">
                  {site.logo}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-serif text-base font-bold text-text group-hover:text-gold transition-colors">
                    {site.name}
                  </h3>
                  <span className="text-[11px] text-text/40">{site.category}</span>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <span className="font-serif text-sm font-bold text-gold">
                    {site.metrics.overallScore.toFixed(1)}
                  </span>
                </div>
              </div>

              <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-text/50">
                {site.editorial}
              </p>

              <span className="mt-3 text-sm font-medium text-gold/70 group-hover:text-gold transition-colors">
                Read Full Review &rarr;
              </span>
            </Link>
          ))}
        </div>

        <AdUnit format="horizontal" className="mt-12" />
      </div>
    </>
  );
}
