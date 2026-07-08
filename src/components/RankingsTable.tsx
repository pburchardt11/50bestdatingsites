'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { DatingSite } from '@/lib/dating-db';

const BATCH_SIZE = 50;

export default function RankingsTable({ sites }: { sites: DatingSite[] }) {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const visible = sites.slice(0, visibleCount);
  const hasMore = visibleCount < sites.length;

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-[rgba(196,168,124,0.1)]">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b border-[rgba(196,168,124,0.1)] bg-[#111111]/80">
              <th className="px-4 py-3 font-semibold text-[#f5f0e8]/60 w-12">#</th>
              <th className="px-4 py-3 font-semibold text-[#f5f0e8]/60">Site</th>
              <th className="px-4 py-3 font-semibold text-[#f5f0e8]/60">Best For</th>
              <th className="px-4 py-3 font-semibold text-[#f5f0e8]/60 text-center">Score</th>
              <th className="px-4 py-3 font-semibold text-[#f5f0e8]/60 text-center">Free?</th>
              <th className="px-4 py-3 font-semibold text-[#f5f0e8]/60 text-right">Price</th>
              <th className="px-4 py-3 font-semibold text-[#f5f0e8]/60 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((site, i) => (
              <tr key={site.slug} className="border-b border-[rgba(196,168,124,0.05)] transition-colors hover:bg-[#111111]/60">
                <td className="px-4 py-3 font-serif font-bold text-[#c4a87c]">{i + 1}</td>
                <td className="px-4 py-3">
                  <Link href={`/site/${site.slug}`} className="flex items-center gap-2 font-medium text-[#f5f0e8] hover:text-[#c4a87c] transition-colors">
                    <span className="text-lg">{site.logo}</span>
                    <span>{site.name}</span>
                    <span className="hidden sm:inline rounded-full bg-[#c4a87c]/10 px-2 py-0.5 text-[10px] font-medium text-[#c4a87c]/70">{site.category}</span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-[#f5f0e8]/50 max-w-[180px] truncate text-sm">{site.bestFor}</td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#c4a87c]/10 font-serif text-sm font-bold text-[#c4a87c]">
                    {site.metrics.overallScore.toFixed(1)}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  {site.pricing.free ? (
                    <span className="text-emerald-400 text-xs font-medium">Yes</span>
                  ) : (
                    <span className="text-[#f5f0e8]/30 text-xs">No</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-[#f5f0e8]/60 text-sm">
                  ${site.pricing.premiumMonthly}/mo
                </td>
                <td className="px-4 py-3 text-center">
                  <a
                    href={site.url}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#c4a87c] to-[#d4bc8e] px-3 py-1 text-xs font-bold text-[#080808] transition-opacity hover:opacity-80"
                  >
                    Visit
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
            className="inline-flex items-center gap-2 rounded-xl border border-[#c4a87c]/30 px-8 py-3 text-sm font-medium tracking-wide text-[#c4a87c] transition-all hover:border-[#c4a87c]/60 hover:bg-[#c4a87c]/5"
          >
            Show Next 50
            <span className="text-[#f5f0e8]/30">({sites.length - visibleCount} remaining)</span>
          </button>
        </div>
      )}

      {!hasMore && sites.length > BATCH_SIZE && (
        <div className="mt-4 text-center">
          <Link
            href="/rankings"
            className="text-sm text-[#c4a87c]/60 hover:text-[#c4a87c] transition-colors"
          >
            View complete rankings with filters →
          </Link>
        </div>
      )}
    </>
  );
}
