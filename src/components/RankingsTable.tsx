'use client';

import { useState } from 'react';
import Link from 'next/link';
import { type DatingSite, isVerified } from '@/lib/dating-db';

const BATCH_SIZE = 50;

export default function RankingsTable({ sites }: { sites: DatingSite[] }) {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const visible = sites.slice(0, visibleCount);
  const hasMore = visibleCount < sites.length;

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full min-w-[700px] text-left text-[15px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 font-semibold text-slate-500 w-12">#</th>
              <th className="px-4 py-3 font-semibold text-slate-500">Site</th>
              <th className="px-4 py-3 font-semibold text-slate-500">Best For</th>
              <th className="px-4 py-3 font-semibold text-slate-500 text-center">Score</th>
              <th className="px-4 py-3 font-semibold text-slate-500 text-center">Free?</th>
              <th className="px-4 py-3 font-semibold text-slate-500 text-right">Price</th>
              <th className="px-4 py-3 font-semibold text-slate-500 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((site, i) => (
              <tr key={site.slug} className={`border-b border-slate-100 transition-colors hover:bg-amber-50/50 ${i % 2 === 1 ? 'bg-slate-50/50' : ''}`}>
                <td className="px-4 py-3 font-serif font-bold text-amber-600">{i + 1}</td>
                <td className="px-4 py-3">
                  <Link href={`/site/${site.slug}`} className="flex items-center gap-2 font-medium text-slate-800 hover:text-amber-600 transition-colors">
                    <span className="text-lg">{site.logo}</span>
                    <span>{site.name}</span>
                    {isVerified(site) ? (
                      <span className="hidden sm:inline rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-600">&#10003;</span>
                    ) : (
                      <span className="hidden sm:inline rounded-full bg-amber-50 px-1.5 py-0.5 text-[9px] font-medium text-amber-500">?</span>
                    )}
                    <span className="hidden sm:inline rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-600">{site.category}</span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-500 max-w-[180px] truncate">{site.bestFor}</td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 font-serif text-sm font-bold text-amber-700">
                    {site.metrics.overallScore.toFixed(1)}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  {site.pricing.free ? (
                    <span className="text-emerald-600 text-xs font-medium">Yes</span>
                  ) : (
                    <span className="text-slate-400 text-xs">No</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-slate-600">
                  ${site.pricing.premiumMonthly}/mo
                </td>
                <td className="px-4 py-3 text-center">
                  <a
                    href={site.url}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="inline-flex items-center gap-1 rounded-md bg-amber-500 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-amber-600"
                  >
                    Review
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setVisibleCount((c) => c + BATCH_SIZE)}
            className="inline-flex items-center gap-2 rounded-xl border border-amber-300 px-8 py-3 text-sm font-medium tracking-wide text-amber-700 transition-all hover:border-amber-500 hover:bg-amber-50"
          >
            Show Next 50
            <span className="text-slate-400">({sites.length - visibleCount} remaining)</span>
          </button>
        </div>
      )}

      {!hasMore && sites.length > BATCH_SIZE && (
        <div className="mt-4 text-center">
          <Link
            href="/rankings"
            className="text-sm text-amber-600/70 hover:text-amber-600 transition-colors"
          >
            View complete rankings with filters →
          </Link>
        </div>
      )}
    </>
  );
}
