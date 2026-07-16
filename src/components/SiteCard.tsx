import Link from 'next/link';
import { type DatingSite, isVerified } from '@/lib/dating-db';

function Stars({ score }: { score: number }) {
  const full = Math.floor(score / 2);
  const half = score % 2 >= 1;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="flex items-center gap-0.5 text-amber-500" aria-label={`${score} out of 10`}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} className="h-4 w-4 fill-amber-500" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
      {half && (
        <svg className="h-4 w-4" viewBox="0 0 20 20">
          <defs>
            <linearGradient id={`half-star`}>
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>
          <path fill="url(#half-star)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} className="h-4 w-4 fill-slate-200" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </span>
  );
}

interface SiteCardProps {
  site: DatingSite;
  rank?: number;
}

export default function SiteCard({ site, rank }: SiteCardProps) {
  return (
    <Link href={`/site/${site.slug}`} className="group block">
      <div className="relative cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-amber-300 hover:shadow-md">
        {/* Rank badge */}
        {rank && (
          <div className="absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-br-xl bg-amber-100 font-serif text-sm font-bold text-amber-700">
            {rank}
          </div>
        )}

        <div className="flex items-start gap-4">
          {/* Logo emoji */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-3xl">
            {site.logo}
          </div>

          <div className="min-w-0 flex-1">
            {/* Name and category */}
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="truncate font-serif text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                {site.name}
              </h3>
              {isVerified(site) ? (
                <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">&#10003;</span>
              ) : (
                <span className="shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-500">Unverified</span>
              )}
              <span className="shrink-0 rounded-full bg-violet-50 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-violet-700">
                {site.category}
              </span>
            </div>

            {/* Best for */}
            <p className="mt-1 truncate text-sm text-slate-500">{site.bestFor}</p>

            {/* Score and stars */}
            <div className="mt-3 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-300 bg-amber-50 font-serif text-lg font-bold text-amber-700">
                {site.metrics.overallScore.toFixed(1)}
              </span>
              <Stars score={site.metrics.overallScore} />
            </div>

            {/* Pricing */}
            <div className="mt-2 flex items-center gap-2">
              {site.pricing.free && (
                <span className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-600">
                  Free
                </span>
              )}
              <span className="text-xs text-amber-600 font-medium">
                {site.pricing.currency} {site.pricing.premiumMonthly}/mo premium
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
