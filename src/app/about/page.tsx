import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | 50 Best Dating Sites',
  description:
    'Learn about our mission, methodology, and the expert team behind the 50 Best Dating Sites rankings.',
};

export default function AboutPage() {
  return (
    <>
      <section className="relative border-b border-card-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,168,124,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-text/40">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-text/60">About</span>
          </nav>
          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">
            About 50 Best Dating Sites
          </h1>
          <p className="mt-4 text-lg text-text/50">
            Independent research. Expert analysis. Honest rankings.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        <section>
          <h2 className="font-serif text-2xl font-bold text-text mb-4">Our Mission</h2>
          <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-4 text-text/70 leading-relaxed">
            <p>
              With thousands of dating platforms competing for your attention, choosing the right one can feel overwhelming. Our mission is simple: cut through the marketing noise and provide honest, data-driven rankings that help you find the dating platform that genuinely fits your needs.
            </p>
            <p>
              We believe everyone deserves access to clear, unbiased information about the platforms they trust with their personal lives and data. That is why we independently research, test, and review every dating site in our rankings.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-text mb-4">Our Methodology</h2>
          <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-4 text-text/70 leading-relaxed">
            <p>
              Every dating site in our rankings is evaluated across four key dimensions, each scored from 1 to 10:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Safety & Privacy', desc: 'Photo verification, data protection, reporting tools, and moderation quality.' },
                { label: 'Ease of Use', desc: 'Onboarding flow, app design, search and filter quality, and mobile experience.' },
                { label: 'Value for Money', desc: 'Free tier quality, premium pricing, feature-to-cost ratio, and cancellation policies.' },
                { label: 'Match Quality', desc: 'Algorithm sophistication, user base relevance, success rates, and conversation quality.' },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-gold/5 p-4">
                  <h3 className="font-serif text-base font-bold text-gold mb-1">{item.label}</h3>
                  <p className="text-sm text-text/50">{item.desc}</p>
                </div>
              ))}
            </div>
            <p>
              These four scores are weighted to produce an overall score out of 10. We test each platform by creating genuine profiles, evaluating the matching algorithm, assessing the onboarding experience, and comparing free and premium tiers. Rankings are updated quarterly.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-text mb-4">Editorial Independence</h2>
          <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-4 text-text/70 leading-relaxed">
            <p>
              Our rankings are editorially independent. While we may earn commissions from partner links, these never influence our scores or rankings. A platform cannot pay for a higher position. Our editorial team has full control over all ratings and reviews.
            </p>
            <p>
              We cover 50 dating platforms across 60 countries, spanning general dating, serious relationships, over-50 dating, LGBTQ+ platforms, international dating, casual dating, niche sites, Asian market platforms, and video dating services.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-text mb-4">Contact Us</h2>
          <div className="rounded-xl border border-card-border bg-card-bg p-6 text-text/70 leading-relaxed">
            <p>
              Have questions about our methodology, want to suggest a platform for review, or need to report an issue? Visit our{' '}
              <Link href="/contact" className="text-gold hover:underline">contact page</Link> to get in touch.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
