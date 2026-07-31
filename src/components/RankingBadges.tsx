import { siteRankings, type ExternalRanking } from '@/lib/rankings-data';

const TYPE_ICON: Record<ExternalRanking['type'], string> = {
  award: '🏆',
  rating: '⭐',
  ranking: '📊',
  milestone: '🎯',
  recognition: '📰',
};

// Priority order for compact badge selection
const TYPE_ORDER: ExternalRanking['type'][] = [
  'ranking',
  'award',
  'rating',
  'milestone',
  'recognition',
];

interface RankingBadgesProps {
  slug: string;
  variant: 'compact' | 'full';
  className?: string;
}

export default function RankingBadges({ slug, variant, className = '' }: RankingBadgesProps) {
  const rankings = siteRankings[slug];
  if (!rankings || rankings.length === 0) return null;

  if (variant === 'compact') {
    // Prioritise: rankings first, then awards, then ratings, then the rest
    const sorted = [...rankings].sort(
      (a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type),
    );
    const visible = sorted.slice(0, 3);

    return (
      <div className={`flex flex-wrap gap-1.5 ${className}`}>
        {visible.map((r, i) => (
          <span
            key={i}
            title={`${r.label} — ${r.source}`}
            className="inline-flex items-center gap-1 rounded-full border border-gold/20 bg-gold/5 px-2 py-0.5 text-[10px] font-medium text-gold/70 leading-none"
          >
            <span aria-hidden="true">{TYPE_ICON[r.type]}</span>
            <span className="truncate max-w-[140px]">{r.label}</span>
          </span>
        ))}
      </div>
    );
  }

  // full variant — flat grid of all badges
  return (
    <div className={className}>
      <div className="flex flex-wrap gap-3">
        {rankings.map((r, i) => (
          <div
            key={i}
            className="flex items-start gap-2.5 rounded-xl border border-card-border bg-card-bg px-4 py-3"
          >
            <span className="mt-0.5 text-base shrink-0" aria-hidden="true">
              {TYPE_ICON[r.type]}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-text/80 leading-snug">{r.label}</p>
              <p className="mt-0.5 text-[11px] text-text/35">{r.source}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
