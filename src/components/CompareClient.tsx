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
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-card-border">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold/70 to-gold"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 text-right font-serif text-sm font-bold text-gold">
        {score.toFixed(1)}
      </span>
    </div>
  );
}

function Check() {
  return (
    <svg className="h-5 w-5 text-emerald-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Cross() {
  return (
    <svg className="h-5 w-5 text-red-400/50 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
            <label className="mb-2 block text-sm font-medium text-text/50">
              {i === 0 ? 'Site 1' : i === 1 ? 'Site 2' : 'Site 3 (optional)'}
            </label>
            <select
              value={selected[i]?.slug || ''}
              onChange={(e) => selectSite(i, e.target.value)}
              className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-sm text-text outline-none transition-colors focus:border-gold/40"
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
        <div className="rounded-xl border border-card-border bg-card-bg p-12 text-center">
          <p className="text-lg text-text/40">
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
                <tr className="border-b border-card-border">
                  <th className="py-4 pr-4 text-left text-sm font-medium text-text/40 w-40" />
                  {activeSites.map((site) => (
                    <th key={site.slug} className="px-4 py-4 text-center">
                      <Link href={`/site/${site.slug}`} className="group inline-block">
                        <span className="block text-3xl mb-2">{site.logo}</span>
                        <span className="font-serif text-lg font-bold text-text group-hover:text-gold transition-colors">
                          {site.name}
                        </span>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border">
                <tr>
                  <td className="py-3 pr-4 text-sm text-text/50">Overall Score</td>
                  {activeSites.map((s) => (
                    <td key={s.slug} className="px-4 py-3 text-center">
                      <span className="font-serif text-2xl font-bold text-gold">
                        {s.metrics.overallScore.toFixed(1)}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm text-text/50">Category</td>
                  {activeSites.map((s) => (
                    <td key={s.slug} className="px-4 py-3 text-center">
                      <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-gold/80">
                        {s.category}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm text-text/50">Best For</td>
                  {activeSites.map((s) => (
                    <td key={s.slug} className="px-4 py-3 text-center text-sm text-text/60">
                      {s.bestFor}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm text-text/50">Founded</td>
                  {activeSites.map((s) => (
                    <td key={s.slug} className="px-4 py-3 text-center text-sm text-text/60">
                      {s.founded}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm text-text/50">User Base</td>
                  {activeSites.map((s) => (
                    <td key={s.slug} className="px-4 py-3 text-center text-sm text-text/60">
                      {s.metrics.userBase}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm text-text/50">Age Range</td>
                  {activeSites.map((s) => (
                    <td key={s.slug} className="px-4 py-3 text-center text-sm text-text/60">
                      {s.demographics.primaryAge}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm text-text/50">Gender Ratio</td>
                  {activeSites.map((s) => (
                    <td key={s.slug} className="px-4 py-3 text-center text-sm text-text/60">
                      {s.demographics.genderRatio}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Score comparison */}
          <section>
            <h2 className="mb-6 font-serif text-2xl font-bold text-text">
              Score Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="py-3 pr-4 text-left text-sm font-medium text-text/40 w-40">Metric</th>
                    {activeSites.map((s) => (
                      <th key={s.slug} className="px-4 py-3 text-center text-sm font-medium text-text/60">
                        {s.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-border">
                  {[
                    { key: 'safetyScore' as const, label: 'Safety & Privacy' },
                    { key: 'easeOfUse' as const, label: 'Ease of Use' },
                    { key: 'valueForMoney' as const, label: 'Value for Money' },
                    { key: 'matchQuality' as const, label: 'Match Quality' },
                  ].map(({ key, label }) => (
                    <tr key={key}>
                      <td className="py-3 pr-4 text-sm text-text/50">{label}</td>
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
            <h2 className="mb-6 font-serif text-2xl font-bold text-text">
              Pricing Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="py-3 pr-4 text-left text-sm font-medium text-text/40 w-40" />
                    {activeSites.map((s) => (
                      <th key={s.slug} className="px-4 py-3 text-center text-sm font-medium text-text/60">
                        {s.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-border">
                  <tr>
                    <td className="py-3 pr-4 text-sm text-text/50">Free Tier</td>
                    {activeSites.map((s) => (
                      <td key={s.slug} className="px-4 py-3 text-center">
                        {s.pricing.free ? (
                          <span className="rounded bg-emerald-900/30 px-2 py-0.5 text-xs font-medium text-emerald-400">Yes</span>
                        ) : (
                          <span className="rounded bg-red-900/30 px-2 py-0.5 text-xs font-medium text-red-400">No</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-sm text-text/50">Premium Monthly</td>
                    {activeSites.map((s) => (
                      <td key={s.slug} className="px-4 py-3 text-center font-serif text-lg font-bold text-text">
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
              <h2 className="mb-6 font-serif text-2xl font-bold text-text">
                Feature Comparison
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-card-border">
                      <th className="py-3 pr-4 text-left text-sm font-medium text-text/40 w-40">Feature</th>
                      {activeSites.map((s) => (
                        <th key={s.slug} className="px-4 py-3 text-center text-sm font-medium text-text/60">
                          {s.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-card-border">
                    {allFeatures.map((feature) => (
                      <tr key={feature}>
                        <td className="py-2.5 pr-4 text-sm text-text/50">{feature}</td>
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
          <div className="flex flex-wrap gap-3 border-t border-card-border pt-8">
            {activeSites.map((s) => (
              <Link
                key={s.slug}
                href={`/site/${s.slug}`}
                className="rounded-lg border border-card-border bg-card-bg px-5 py-2.5 text-sm font-medium text-text/60 transition-colors hover:border-gold/30 hover:text-gold"
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
