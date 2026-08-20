import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Your Perfect Dating Site — Quiz | 50 Best Dating Sites',
  description:
    'Answer a few quick questions and get a personalized dating site recommendation based on your preferences, budget, and goals.',
  alternates: {
    canonical: 'https://50bestdatingsites.com/quiz',
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
