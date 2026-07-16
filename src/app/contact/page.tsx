import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | 50 Best Dating Sites',
  description:
    'Get in touch with the 50 Best Dating Sites team. Questions, suggestions, or partnership inquiries welcome.',
};

export default function ContactPage() {
  return (
    <>
      <section className="relative border-b border-card-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,119,6,0.04)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-text/40">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-text/60">Contact</span>
          </nav>
          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-text/50">
            Questions, feedback, or partnership inquiries? We would love to hear from you.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form
              action="https://formspree.io/f/xvzvdjwa"
              method="POST"
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-text/70">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-sm text-text placeholder-text/30 outline-none transition-colors focus:border-gold/40"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-text/70">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-sm text-text placeholder-text/30 outline-none transition-colors focus:border-gold/40"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-text/70">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-sm text-text outline-none transition-colors focus:border-gold/40"
                >
                  <option value="general">General Inquiry</option>
                  <option value="methodology">Methodology Question</option>
                  <option value="suggestion">Site Suggestion</option>
                  <option value="correction">Report a Correction</option>
                  <option value="partnership">Partnership / Advertising</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-text/70">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full resize-none rounded-lg border border-card-border bg-card-bg px-4 py-3 text-sm text-text placeholder-text/30 outline-none transition-colors focus:border-gold/40"
                  placeholder="How can we help?"
                />
              </div>

              <button
                type="submit"
                className="rounded-lg bg-gradient-to-r from-gold to-gold-light px-8 py-3 font-serif text-base font-bold text-white transition-opacity hover:opacity-90"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-card-border bg-card-bg p-6">
              <h3 className="font-serif text-lg font-bold text-text mb-3">
                50 Best Limited
              </h3>
              <p className="text-sm text-text/60 leading-relaxed mb-4">
                50 Best Limited is the publisher of the 50 Best network of review sites.
              </p>
              <h4 className="font-serif text-base font-bold text-text mb-2">
                What We Can Help With
              </h4>
              <ul className="space-y-3 text-sm text-text/60">
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">&#8226;</span>
                  Questions about our ranking methodology
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">&#8226;</span>
                  Suggesting a dating site for review
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">&#8226;</span>
                  Reporting inaccurate information
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">&#8226;</span>
                  Partnership and advertising inquiries
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">&#8226;</span>
                  Press and media requests
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-card-border bg-card-bg p-6">
              <h3 className="font-serif text-lg font-bold text-text mb-3">
                Response Time
              </h3>
              <p className="text-sm text-text/60 leading-relaxed">
                We typically respond within 1-2 business days. For urgent matters related to safety or incorrect information, please mention that in your subject line.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
