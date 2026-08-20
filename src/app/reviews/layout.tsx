import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Expert Dating Site Reviews 2026 | 50 Best Dating Sites',
  description:
    'In-depth, independently researched reviews of the world\'s top dating platforms. Safety scores, pricing analysis, pros and cons.',
  alternates: {
    canonical: 'https://50bestdatingsites.com/reviews',
  },
};

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
