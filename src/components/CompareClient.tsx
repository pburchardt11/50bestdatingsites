'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getAllSites, type DatingSite } from '@/lib/dating-db';

const allSites = getAllSites().sort((a, b) => a.name.localeCompare(b.name));

function ScoreBarInline({ score, max = 10 }: { score: number; max?: number }) {
  const pct = Math.min((score / max) * 100, 100);
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 text-right font-serif text-sm font-bold text-amber-600">
        {score.toFixed(1)}
      </span>
    </div>
  );
}

function Check() {
  return (
    <svg className="h-5 w-5 text-emerald-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Cross() {
  return (
    <svg className="h-5 w-5 text-red-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function CompareClient() {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<(DatingSite | null)[]>([null, null, null]);

  useEffect(() => {
    const siteParam = searchParams.get('site');
    if (siteParam) {
      const site = allSites.find((s) => s.slug === siteParam) || null;
      if (site) {
        setSelected((prev) => {
          const next = [...prev];
          next[0] = site;
          return next;
        });
      }
    }
  }, [searchParams]);

  function selectSite(index: number, slug: string) {
    const site = allSites.find((s) => s.slug === slug) || null;
    setSelected((prev) => {
      const next = [...prev];
      next[index] = site;
      return next;
    });
  }

  const activeSites = selected.filter((s): s is DatingSite => s !== null);

  const allFeatures = Array.from(
    new Set(activeSites.flatMap((s) => s.features))
  ).sort();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Selectors */}
      <div className="mb-12 grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <label className="mb-2 block text-sm font-medium text-slate-500">
              {i === 0 ? 'Site 1' : i === 1 ? 'Site 2' : 'Site 3 (optional)'}
            </label>
            <select
              value={selected[i]?.slug || ''}
              onChange={(e) => selectSite(i, e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            >
              <option value="">Select a dating site...</option>
              {allSites.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name} ({s.metrics.overallScore.toFixed(1)})
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {activeSites.length < 2 && (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <p className="text-lg text-slate-400">
            Select at least 2 dating sites above to see a comparison.
          </p>
        </div>
      )}

      {activeSites.length >= 2 && (
        <div className="space-y-10">
          {/* Overview */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 pr-4 text-left text-sm font-medium text-slate-400 w-40" />
                  {activeSites.map((site) => (
                    <th key={site.slug} className="px-4 py-4 text-center">
                      <Link href={`/site/${site.slug}`} className="group inline-block">
                        <span className="block text-3xl mb-2">{site.logo}</span>
                        <span className="font-serif text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                          {site.name}
                        </span>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-3 pr-4 text-sm text-slate-500">Overall Score</td>
                  {activeSites.map((s) => (
                    <td key={s.slug} className="px-4 py-3 text-center">
                      <span className="font-serif text-2xl font-bold text-amber-600">
                        {s.metrics.overallScore.toFixed(1)}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm text-slate-500">Category</td>
                  {activeSites.map((s) => (
                    <td key={s.slug} className="px-4 py-3 text-center">
                      <span className="rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700">
                        {s.category}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm text-slate-500">Best For</td>
                  {activeSites.map((s) => (
                    <td key={s.slug} className="px-4 py-3 text-center text-sm text-slate-600">
                      {s.bestFor}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm text-slate-500">Founded</td>
                  {activeSites.map((s) => (
                    <td key={s.slug} className="px-4 py-3 text-center text-sm text-slate-600">
                      {s.founded}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm text-slate-500">User Base</td>
                  {activeSites.map((s) => (
                    <td key={s.slug} className="px-4 py-3 text-center text-sm text-slate-600">
                      {s.metrics.userBase}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm text-slate-500">Age Range</td>
                  {activeSites.map((s) => (
                    <td key={s.slug} className="px-4 py-3 text-center text-sm text-slate-600">
                      {s.demographics.primaryAge}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm text-slate-500">Gender Ratio</td>
                  {activeSites.map((s) => (
                    <td key={s.slug} className="px-4 py-3 text-center text-sm text-slate-600">
                      {s.demographics.genderRatio}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Score comparison */}
          <section>
            <h2 className="mb-6 font-serif text-2xl font-bold text-slate-900">
              Score Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 pr-4 text-left text-sm font-medium text-slate-400 w-40">Metric</th>
                    {activeSites.map((s) => (
                      <th key={s.slug} className="px-4 py-3 text-center text-sm font-medium text-slate-600">
                        {s.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {[
                    { key: 'safetyScore' as const, label: 'Safety & Privacy' },
                    { key: 'easeOfUse' as const, label: 'Ease of Use' },
                    { key: 'valueForMoney' as const, label: 'Value for Money' },
                    { key: 'matchQuality' as const, label: 'Match Quality' },
                  ].map(({ key, label }) => (
                    <tr key={key}>
                      <td className="py-3 pr-4 text-sm text-slate-500">{label}</td>
                      {activeSites.map((s) => (
                        <td key={s.slug} className="px-4 py-3">
                          <ScoreBarInline score={s.metrics[key]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Pricing comparison */}
          <section>
            <h2 className="mb-6 font-serif text-2xl font-bold text-slate-900">
              Pricing Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 pr-4 text-left text-sm font-medium text-slate-400 w-40" />
                    {activeSites.map((s) => (
                      <th key={s.slug} className="px-4 py-3 text-center text-sm font-medium text-slate-600">
                        {s.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="py-3 pr-4 text-sm text-slate-500">Free Tier</td>
                    {activeSites.map((s) => (
                      <td key={s.slug} className="px-4 py-3 text-center">
                        {s.pricing.free ? (
                          <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">Yes</span>
                        ) : (
                          <span className="rounded bg-red-50 px-2 py-0.5 text-xs font-medium text-red-500">No</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-sm text-slate-500">Premium Monthly</td>
                    {activeSites.map((s) => (
                      <td key={s.slug} className="px-4 py-3 text-center font-serif text-lg font-bold text-slate-900">
                        {s.pricing.currency} {s.pricing.premiumMonthly}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Feature comparison */}
          {allFeatures.length > 0 && (
            <section>
              <h2 className="mb-6 font-serif text-2xl font-bold text-slate-900">
                Feature Comparison
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-3 pr-4 text-left text-sm font-medium text-slate-400 w-40">Feature</th>
                      {activeSites.map((s) => (
                        <th key={s.slug} className="px-4 py-3 text-center text-sm font-medium text-slate-600">
                          {s.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {allFeatures.map((feature) => (
                      <tr key={feature}>
                        <td className="py-2.5 pr-4 text-sm text-slate-500">{feature}</td>
                        {activeSites.map((s) => (
                          <td key={s.slug} className="px-4 py-2.5 text-center">
                            {s.features.includes(feature) ? <Check /> : <Cross />}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* View individual reviews */}
          <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-8">
            {activeSites.map((s) => (
              <Link
                key={s.slug}
                href={`/site/${s.slug}`}
                className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-amber-300 hover:text-amber-600"
              >
                Read Full {s.name} Review &rarr;
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
