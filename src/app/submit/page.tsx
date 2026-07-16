import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit a Dating Site | 50 Best Dating Sites',
  description:
    'Own or represent a dating site? Submit it for review and inclusion in our comprehensive database of 1,000+ dating platforms.',
};

export default function SubmitPage() {
  return (
    <>
      <section className="relative border-b border-card-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,119,6,0.04)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-text/40">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-text/60">Submit a Site</span>
          </nav>
          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">
            Submit a Dating Site
          </h1>
          <p className="mt-4 text-lg text-text/50">
            Own or represent a dating platform? Get listed in our database of 1,000+ reviewed sites.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <form
              action="https://formspree.io/f/xvzvdjwa"
              method="POST"
              className="space-y-6"
            >
              <input type="hidden" name="_subject" value="New Site Submission — 50 Best Dating Sites" />

              <h2 className="font-serif text-2xl font-bold text-text mb-2">Site Information</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="site-name" className="block text-sm font-medium text-text/60 mb-1.5">
                    Site / App Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="site-name"
                    name="site_name"
                    required
                    className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-text placeholder:text-text/25 focus:outline-none focus:border-gold/40 transition-colors"
                    placeholder="e.g. LoveConnect"
                  />
                </div>
                <div>
                  <label htmlFor="site-url" className="block text-sm font-medium text-text/60 mb-1.5">
                    Website URL <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="url"
                    id="site-url"
                    name="site_url"
                    required
                    className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-text placeholder:text-text/25 focus:outline-none focus:border-gold/40 transition-colors"
                    placeholder="https://www.example.com"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-text/60 mb-1.5">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-text focus:outline-none focus:border-gold/40 transition-colors"
                  >
                    <option value="">Select category...</option>
                    <option value="General Dating">General Dating</option>
                    <option value="Serious Relationships">Serious Relationships</option>
                    <option value="Over 50">Over 50</option>
                    <option value="LGBTQ+">LGBTQ+</option>
                    <option value="International/Cultural">International / Cultural</option>
                    <option value="Hook-up/Casual">Casual / Hook-up</option>
                    <option value="Niche/Lifestyle">Niche / Lifestyle</option>
                    <option value="Asian Market">Asian Market</option>
                    <option value="Religious">Religious</option>
                    <option value="Professional/Elite">Professional / Elite</option>
                    <option value="Ethnic/Regional">Ethnic / Regional</option>
                    <option value="Single Parents">Single Parents</option>
                    <option value="Expat Dating">Expat Dating</option>
                    <option value="Video Dating">Video Dating</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="founded" className="block text-sm font-medium text-text/60 mb-1.5">
                    Year Founded
                  </label>
                  <input
                    type="number"
                    id="founded"
                    name="founded"
                    min="1995"
                    max="2026"
                    className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-text placeholder:text-text/25 focus:outline-none focus:border-gold/40 transition-colors"
                    placeholder="e.g. 2020"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="headquarters" className="block text-sm font-medium text-text/60 mb-1.5">
                    Headquarters
                  </label>
                  <input
                    type="text"
                    id="headquarters"
                    name="headquarters"
                    className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-text placeholder:text-text/25 focus:outline-none focus:border-gold/40 transition-colors"
                    placeholder="e.g. Berlin, Germany"
                  />
                </div>
                <div>
                  <label htmlFor="countries" className="block text-sm font-medium text-text/60 mb-1.5">
                    Available In (countries)
                  </label>
                  <input
                    type="text"
                    id="countries"
                    name="countries"
                    className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-text placeholder:text-text/25 focus:outline-none focus:border-gold/40 transition-colors"
                    placeholder="e.g. US, UK, Germany, France"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-text/60 mb-1.5">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-text placeholder:text-text/25 focus:outline-none focus:border-gold/40 transition-colors resize-none"
                  placeholder="Describe your dating site — target audience, unique features, pricing model, what makes it different..."
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="pricing" className="block text-sm font-medium text-text/60 mb-1.5">
                    Pricing Model
                  </label>
                  <select
                    id="pricing"
                    name="pricing"
                    className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-text focus:outline-none focus:border-gold/40 transition-colors"
                  >
                    <option value="">Select...</option>
                    <option value="Free">Completely Free</option>
                    <option value="Freemium">Freemium (free + premium)</option>
                    <option value="Paid">Paid Only</option>
                    <option value="Subscription">Subscription</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="user-base" className="block text-sm font-medium text-text/60 mb-1.5">
                    Approximate User Base
                  </label>
                  <select
                    id="user-base"
                    name="user_base"
                    className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-text focus:outline-none focus:border-gold/40 transition-colors"
                  >
                    <option value="">Select...</option>
                    <option value="Under 10K">Under 10,000</option>
                    <option value="10K-50K">10,000 — 50,000</option>
                    <option value="50K-100K">50,000 — 100,000</option>
                    <option value="100K-500K">100,000 — 500,000</option>
                    <option value="500K-1M">500,000 — 1 million</option>
                    <option value="1M-10M">1 — 10 million</option>
                    <option value="10M+">10 million+</option>
                  </select>
                </div>
              </div>

              <h2 className="font-serif text-2xl font-bold text-text mt-8 mb-2">Your Details</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-text/60 mb-1.5">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="contact_name"
                    required
                    className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-text placeholder:text-text/25 focus:outline-none focus:border-gold/40 transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-text/60 mb-1.5">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="contact_email"
                    required
                    className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-text placeholder:text-text/25 focus:outline-none focus:border-gold/40 transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-text/60 mb-1.5">
                  Your Role
                </label>
                <select
                  id="role"
                  name="role"
                  className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-text focus:outline-none focus:border-gold/40 transition-colors"
                >
                  <option value="">Select...</option>
                  <option value="Founder/CEO">Founder / CEO</option>
                  <option value="Marketing">Marketing / PR</option>
                  <option value="Product">Product Manager</option>
                  <option value="Affiliate">Affiliate Manager</option>
                  <option value="User">User / Fan</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="additional" className="block text-sm font-medium text-text/60 mb-1.5">
                  Additional Notes
                </label>
                <textarea
                  id="additional"
                  name="additional_notes"
                  rows={3}
                  className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-text placeholder:text-text/25 focus:outline-none focus:border-gold/40 transition-colors resize-none"
                  placeholder="Anything else we should know? Affiliate program details, press kit links, etc."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold to-gold-light px-8 py-3.5 text-sm font-bold tracking-wide uppercase text-white transition-opacity hover:opacity-90"
                >
                  Submit for Review
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-xl border border-card-border bg-card-bg p-6">
              <h3 className="font-serif text-lg font-bold text-text mb-4">What Happens Next?</h3>
              <ol className="space-y-4 text-sm text-text/60">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 font-serif text-xs font-bold text-gold">1</span>
                  <span><strong className="text-text/80">Review</strong> — Our editorial team reviews your submission within 5 business days.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 font-serif text-xs font-bold text-gold">2</span>
                  <span><strong className="text-text/80">Verification</strong> — We verify the site is active, legitimate, and meets our listing criteria.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 font-serif text-xs font-bold text-gold">3</span>
                  <span><strong className="text-text/80">Listing</strong> — Your site is added to our database with a basic listing and editorial score.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 font-serif text-xs font-bold text-gold">4</span>
                  <span><strong className="text-text/80">Full Review</strong> — Top-performing sites may be selected for a detailed expert review.</span>
                </li>
              </ol>
            </div>

            <div className="rounded-xl border border-card-border bg-card-bg p-6">
              <h3 className="font-serif text-lg font-bold text-text mb-3">Listing Criteria</h3>
              <ul className="space-y-2 text-sm text-text/60">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-600">✓</span>
                  Active, functioning website or app
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-600">✓</span>
                  Legitimate dating or matchmaking service
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-600">✓</span>
                  Clear privacy policy and terms of service
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-600">✓</span>
                  No history of fraud or scam reports
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-600">✓</span>
                  Available to users in at least one country
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-gold/20 bg-gold/5 p-6">
              <h3 className="font-serif text-lg font-bold text-gold mb-3">Promote Your Listing</h3>
              <p className="text-sm text-text/60 mb-3">
                Want a featured placement or sponsored review? Contact us at our{' '}
                <Link href="/contact" className="text-gold hover:text-gold-light transition-colors underline">
                  contact page
                </Link>{' '}
                to discuss partnership opportunities.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
