import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import CompareClient from '@/components/CompareClient';

export const metadata: Metadata = {
  title: 'Compare Dating Sites Side by Side | 50 Best Dating Sites',
  description:
    'Compare 2-3 dating sites side by side. See scores, pricing, features, and demographics in a detailed comparison table.',
};

export default function ComparePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-card-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,168,124,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-text/40">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text/60">Compare</span>
          </nav>
          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">
            Compare Dating Sites
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-text/50">
            Select 2-3 dating sites to see a detailed side-by-side comparison of
            scores, pricing, and features.
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-card-border bg-card-bg p-12 text-center">
              <p className="text-lg text-text/40">Loading comparison tool...</p>
            </div>
          </div>
        }
      >
        <CompareClient />
      </Suspense>
    </>
  );
}
