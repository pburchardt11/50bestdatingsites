import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dating Site Rankings 2026 — All Sites Ranked | 50 Best Dating Sites',
  description:
    'Browse our complete ranking of 1,000+ dating sites sorted by overall score. Filter by category, price, and country.',
  alternates: {
    canonical: 'https://50bestdatingsites.com/rankings',
  },
};

export default function RankingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
