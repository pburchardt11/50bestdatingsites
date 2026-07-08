'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getAllSites, getAllCategories, type DatingSite } from '@/lib/dating-db';
import AdUnit from '@/components/AdUnit';

type SortKey = 'overallScore' | 'safetyScore' | 'valueForMoney' | 'name';

const SITES_PER_PAGE = 50;

export default function RankingsPage() {
  const allSites = useMemo(() => getAllSites(), []);
  const categories = useMemo(() => getAllCategories(), []);

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState<SortKey>('overallScore');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...allSites];

    if (categoryFilter !== 'all') {
      result = result.filter((s) => s.category === categoryFilter);
    }

    if (priceFilter === 'free') {
      result = result.filter((s) => s.pricing.free);
    } else if (priceFilter === 'under20') {
      result = result.filter((s) => s.pricing.premiumMonthly < 20);
    } else if (priceFilter === 'under40') {
      result = result.filter((s) => s.pricing.premiumMonthly < 40);
    }

    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'safetyScore') return b.metrics.safetyScore - a.metrics.safetyScore;
      if (sortBy === 'valueForMoney') return b.metrics.valueForMoney - a.metrics.valueForMoney;
      return b.metrics.overallScore - a.metrics.overallScore;
    });

    return result;
  }, [allSites, categoryFilter, priceFilter, sortBy]);

  const totalPages = Math.ceil(filtered.length / SITES_PER_PAGE);
  const paginated = filtered.slice((page - 1) * SITES_PER_PAGE, page * SITES_PER_PAGE);

  // Reset to page 1 when filters change
  const handleFilterChange = (setter: (v: string) => void) => (val: string) => {
    setter(val);
    setPage(1);
  };

  return (
    <>
      {/* Hero */}
      <section className="border-b border-card-border">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">
            Complete Dating Site Rankings
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-text/50">
            All {allSites.length.toLocaleString()} dating sites ranked by our editorial team. Filter, sort, and find the perfect platform for you.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-4 rounded-xl border border-card-border bg-card-bg p-4">
          <div className="flex items-center gap-2">
            <label htmlFor="cat-filter" className="text-sm text-text/50">Category:</label>
            <select
              id="cat-filter"
              value={categoryFilter}
              onChange={(e) => handleFilterChange(setCategoryFilter)(e.target.value)}
              className="rounded-lg border border-card-border bg-[#080808] px-3 py-2 text-sm text-text outline-none focus:border-gold/40"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="price-filter" className="text-sm text-text/50">Price:</label>
            <select
              id="price-filter"
              value={priceFilter}
              onChange={(e) => handleFilterChange(setPriceFilter)(e.target.value)}
              className="rounded-lg border border-card-border bg-[#080808] px-3 py-2 text-sm text-text outline-none focus:border-gold/40"
            >
              <option value="all">All Prices</option>
              <option value="free">Free Only</option>
              <option value="under20">Under $20/mo</option>
              <option value="under40">Under $40/mo</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-by" className="text-sm text-text/50">Sort:</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="rounded-lg border border-card-border bg-[#080808] px-3 py-2 text-sm text-text outline-none focus:border-gold/40"
            >
              <option value="overallScore">Overall Score</option>
              <option value="safetyScore">Safety Score</option>
              <option value="valueForMoney">Value for Money</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>

          <span className="ml-auto text-sm text-text/30">{filtered.length} sites</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-card-border">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead>
              <tr className="border-b border-card-border bg-card-bg/80">
                <th className="px-4 py-3 font-semibold text-text/60 w-12">#</th>
                <th className="px-4 py-3 font-semibold text-text/60">Name</th>
                <th className="px-4 py-3 font-semibold text-text/60">Category</th>
                <th className="px-4 py-3 font-semibold text-text/60 text-center">Score</th>
                <th className="px-4 py-3 font-semibold text-text/60">Best For</th>
                <th className="px-4 py-3 font-semibold text-text/60 text-right">Price</th>
                <th className="px-4 py-3 font-semibold text-text/60 text-center">Review</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((site, i) => (
                <tr key={site.slug} className="border-b border-card-border/50 transition-colors hover:bg-card-bg/60">
                  <td className="px-4 py-3 font-serif font-bold text-gold">
                    {(page - 1) * SITES_PER_PAGE + i + 1}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/site/${site.slug}`} className="flex items-center gap-2 font-medium text-text hover:text-gold transition-colors">
                      <span className="text-lg">{site.logo}</span>
                      {site.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[11px] font-medium text-gold/70">
                      {site.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 font-serif text-sm font-bold text-gold">
                      {site.metrics.overallScore.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text/50 max-w-[200px] truncate">{site.bestFor}</td>
                  <td className="px-4 py-3 text-right text-text/60">
                    {site.pricing.free && <span className="mr-1 text-emerald-400 text-xs">Free /</span>}
                    ${site.pricing.premiumMonthly}/mo
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/site/${site.slug}`}
                      className="inline-flex items-center gap-1 rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold transition-colors hover:bg-gold/20"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-card-border px-3 py-2 text-sm text-text/60 transition-colors hover:border-gold/30 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 7) {
                pageNum = i + 1;
              } else if (page <= 4) {
                pageNum = i + 1;
              } else if (page >= totalPages - 3) {
                pageNum = totalPages - 6 + i;
              } else {
                pageNum = page - 3 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    page === pageNum
                      ? 'bg-gold text-[#080808]'
                      : 'border border-card-border text-text/60 hover:border-gold/30'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-card-border px-3 py-2 text-sm text-text/60 transition-colors hover:border-gold/30 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        <AdUnit format="horizontal" className="mt-12" />
      </div>
    </>
  );
}
