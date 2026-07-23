'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DatingSite, getAllSites } from '@/lib/dating-db';

interface Question {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

const questions: Question[] = [
  {
    id: 'budget',
    label: "What's your dating budget?",
    options: [
      { value: 'free', label: 'Free only' },
      { value: 'under20', label: 'Under $20/mo' },
      { value: '20-50', label: '$20\u2013$50/mo' },
      { value: '50-100', label: '$50\u2013$100/mo' },
      { value: '100+', label: '$100+/mo' },
    ],
  },
  {
    id: 'country',
    label: 'Which country are you searching in?',
    options: [
      { value: 'any', label: 'Anywhere / No preference' },
      { value: 'USA', label: '🇺🇸 United States' },
      { value: 'UK', label: '🇬🇧 United Kingdom' },
      { value: 'Canada', label: '🇨🇦 Canada' },
      { value: 'Australia', label: '🇦🇺 Australia' },
      { value: 'Germany', label: '🇩🇪 Germany' },
      { value: 'France', label: '🇫🇷 France' },
      { value: 'India', label: '🇮🇳 India' },
      { value: 'Brazil', label: '🇧🇷 Brazil' },
      { value: 'UAE', label: '🇦🇪 UAE / Dubai' },
      { value: 'Singapore', label: '🇸🇬 Singapore' },
      { value: 'Japan', label: '🇯🇵 Japan' },
      { value: 'other', label: '🌍 Other country' },
    ],
  },
  {
    id: 'goal',
    label: 'What are you looking for?',
    options: [
      { value: 'serious', label: 'Serious relationship' },
      { value: 'casual', label: 'Casual dating' },
      { value: 'marriage', label: 'Marriage' },
      { value: 'open', label: 'Open to anything' },
      { value: 'hookups', label: 'Hookups' },
    ],
  },
  {
    id: 'age',
    label: "What's your age group?",
    options: [
      { value: '18-25', label: '18\u201325' },
      { value: '25-35', label: '25\u201335' },
      { value: '35-45', label: '35\u201345' },
      { value: '45-55', label: '45\u201355' },
      { value: '55+', label: '55+' },
    ],
  },
  {
    id: 'priority',
    label: 'What matters most?',
    options: [
      { value: 'userbase', label: 'Large user base' },
      { value: 'quality', label: 'Match quality' },
      { value: 'safety', label: 'Safety features' },
      { value: 'value', label: 'Value for money' },
      { value: 'unique', label: 'Unique features' },
    ],
  },
  {
    id: 'identity',
    label: 'Any specific community?',
    options: [
      { value: 'general', label: 'General (all welcome)' },
      { value: 'lgbtq', label: 'LGBTQ+' },
      { value: 'religious', label: 'Religious / faith-based' },
      { value: 'cultural', label: 'Cultural / ethnic' },
      { value: 'over50', label: 'Over 50' },
    ],
  },
  {
    id: 'techPref',
    label: 'How do you prefer to meet?',
    options: [
      { value: 'swipe', label: 'Swipe-based apps' },
      { value: 'questionnaire', label: 'Detailed profiles & questionnaires' },
      { value: 'video', label: 'Video-first' },
      { value: 'events', label: 'In-person events' },
      { value: 'ai', label: 'AI-powered matching' },
    ],
  },
];

function scoreSite(site: DatingSite, answers: Record<string, string>): number {
  let score = site.metrics.overallScore * 10; // base score 0-100

  // Country
  const country = answers.country;
  if (country && country !== 'any' && country !== 'other') {
    if (site.countries.some(c => c.toLowerCase() === country.toLowerCase())) score += 25;
    else score -= 15;
  }

  // Budget
  const budget = answers.budget;
  if (budget === 'free' && site.pricing.free) score += 20;
  else if (budget === 'free' && !site.pricing.free) score -= 30;
  else if (budget === 'under20' && site.pricing.premiumMonthly <= 20) score += 15;
  else if (budget === '20-50' && site.pricing.premiumMonthly > 20 && site.pricing.premiumMonthly <= 50) score += 15;
  else if (budget === '50-100' && site.pricing.premiumMonthly > 50 && site.pricing.premiumMonthly <= 100) score += 10;
  else if (budget === '100+' && site.pricing.premiumMonthly > 100) score += 10;

  // Goal
  const goal = answers.goal;
  const cat = site.category.toLowerCase();
  const bestFor = site.bestFor.toLowerCase();
  if (goal === 'serious' && (cat.includes('serious') || bestFor.includes('serious') || bestFor.includes('long-term'))) score += 20;
  if (goal === 'casual' && (cat.includes('casual') || bestFor.includes('casual'))) score += 20;
  if (goal === 'marriage' && (cat.includes('serious') || bestFor.includes('marriage') || bestFor.includes('matrimon'))) score += 20;
  if (goal === 'hookups' && (cat.includes('hook') || cat.includes('casual') || bestFor.includes('hookup') || bestFor.includes('casual'))) score += 20;
  if (goal === 'open') score += 5; // neutral boost

  // Age
  const age = answers.age;
  if (age === '55+' && (cat.includes('over 50') || bestFor.includes('50') || bestFor.includes('senior') || bestFor.includes('mature'))) score += 20;
  if (age === '18-25' && (bestFor.includes('young') || bestFor.includes('college') || bestFor.includes('gen z'))) score += 10;

  // Priority
  const priority = answers.priority;
  if (priority === 'userbase') score += site.metrics.matchQuality * 1.5;
  if (priority === 'quality') score += site.metrics.matchQuality * 3;
  if (priority === 'safety') score += site.metrics.safetyScore * 3;
  if (priority === 'value') score += site.metrics.valueForMoney * 3;
  if (priority === 'unique') score += (site.features.length > 5 ? 15 : site.features.length * 2);

  // Identity / community
  const identity = answers.identity;
  if (identity === 'lgbtq' && (cat.includes('lgbtq') || bestFor.includes('lgbtq') || bestFor.includes('gay') || bestFor.includes('queer'))) score += 25;
  if (identity === 'religious' && (bestFor.includes('christian') || bestFor.includes('jewish') || bestFor.includes('muslim') || bestFor.includes('faith') || cat.includes('niche'))) score += 20;
  if (identity === 'cultural' && (cat.includes('international') || cat.includes('cultural') || bestFor.includes('cultural'))) score += 20;
  if (identity === 'over50' && (cat.includes('over 50') || bestFor.includes('50') || bestFor.includes('senior'))) score += 25;

  // Tech preference
  const tech = answers.techPref;
  const features = site.features.map((f) => f.toLowerCase()).join(' ');
  if (tech === 'swipe' && (features.includes('swipe') || bestFor.includes('swipe'))) score += 10;
  if (tech === 'questionnaire' && (features.includes('questionnaire') || features.includes('compatibility') || features.includes('personality'))) score += 15;
  if (tech === 'video' && (features.includes('video') || cat.includes('video'))) score += 15;
  if (tech === 'ai' && (features.includes('ai') || features.includes('artificial') || features.includes('machine learning'))) score += 15;

  return score;
}

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<DatingSite[] | null>(null);

  const currentQuestion = questions[step];
  const totalSteps = questions.length;

  function handleSelect(value: string) {
    const updated = { ...answers, [currentQuestion.id]: value };
    setAnswers(updated);

    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      // Calculate results
      const allSites = getAllSites();
      const scored = allSites
        .map((site) => ({ site, score: scoreSite(site, updated) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
      setResults(scored.map((s) => s.site));
    }
  }

  function handleRestart() {
    setStep(0);
    setAnswers({});
    setResults(null);
  }

  // Results view
  if (results) {
    return (
      <>
        <section className="relative border-b border-card-border">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,168,124,0.06)_0%,transparent_60%)]" />
          <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold/70">Quiz Results</p>
            <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">
              Your Top 3 Recommended Dating Sites
            </h1>
            <p className="mt-4 text-lg text-text/50">
              Based on your preferences, these platforms are the best fit for you.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {results.map((site, i) => (
              <div
                key={site.slug}
                className="relative overflow-hidden rounded-2xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_40px_rgba(196,168,124,0.08)] sm:p-8"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-light font-serif text-2xl font-bold text-[#080808]">
                    {i + 1}
                  </div>

                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-gold/30 bg-gold/5">
                    <span className="font-serif text-2xl font-bold text-gold">
                      {site.metrics.overallScore.toFixed(1)}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-2xl">{site.logo}</span>
                      <h3 className="font-serif text-xl font-bold text-text sm:text-2xl">
                        {site.name}
                      </h3>
                      <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-gold/80">
                        {site.category}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text/50">
                      {site.editorial}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-3">
                    {site.pricing.free ? (
                      <span className="rounded-full bg-emerald-900/30 px-3 py-1 text-xs font-semibold text-emerald-400">
                        Free
                      </span>
                    ) : (
                      <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold/80">
                        From {site.pricing.currency} {site.pricing.premiumMonthly}/mo
                      </span>
                    )}
                    <a
                      href={site.url}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gold to-gold-light px-5 py-2.5 text-sm font-bold text-[#080808] transition-opacity hover:opacity-90"
                    >
                      Visit Site
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </a>
                    <Link
                      href={`/site/${site.slug}`}
                      className="text-sm font-medium text-text/50 transition-colors hover:text-gold"
                    >
                      Read Review &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-6 py-3 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
            >
              Retake Quiz
            </button>
            <Link
              href="/rankings"
              className="inline-flex items-center gap-2 rounded-full border border-card-border px-6 py-3 text-sm font-medium text-text/50 transition-colors hover:border-gold/20 hover:text-gold"
            >
              View All Rankings
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Quiz view
  return (
    <>
      <section className="relative border-b border-card-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,168,124,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-text/40">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-text/60">Quiz</span>
          </nav>
          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">
            Which Dating Site Is Right For Me?
          </h1>
          <p className="mt-4 text-lg text-text/50">
            Answer 6 quick questions and we&apos;ll match you with your ideal platform.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Progress bar */}
        <div className="mb-10">
          <div className="mb-2 flex items-center justify-between text-sm text-text/40">
            <span>Question {step + 1} of {totalSteps}</span>
            <span>{Math.round(((step + 1) / totalSteps) * 100)}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-card-border">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light transition-all duration-500"
              style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="mb-8 text-center font-serif text-2xl font-bold text-text sm:text-3xl">
          {currentQuestion.label}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`group flex w-full items-center gap-4 rounded-xl border p-5 text-left transition-all duration-200 ${
                answers[currentQuestion.id] === option.value
                  ? 'border-amber-500 bg-amber-500/20'
                  : 'border-card-border bg-card-bg hover:border-amber-500 hover:bg-amber-500/10'
              }`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-card-border bg-gold/5 text-sm font-medium text-text/40 transition-colors group-hover:border-gold/40 group-hover:text-gold">
                {String.fromCharCode(65 + currentQuestion.options.indexOf(option))}
              </span>
              <span className="font-medium text-text/80 transition-colors group-hover:text-text">
                {option.label}
              </span>
            </button>
          ))}
        </div>

        {/* Back button */}
        {step > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setStep(step - 1)}
              className="text-sm font-medium text-text/40 transition-colors hover:text-gold"
            >
              &larr; Previous question
            </button>
          </div>
        )}
      </div>
    </>
  );
}
