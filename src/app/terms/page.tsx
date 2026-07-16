import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | 50 Best Dating Sites',
  description:
    'Terms of service for 50 Best Dating Sites. Read our terms and conditions for using the site.',
};

export default function TermsPage() {
  return (
    <>
      <section className="relative border-b border-card-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,119,6,0.04)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-text/40">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-text/60">Terms of Service</span>
          </nav>
          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-text/40">Last updated: July 1, 2026</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8 text-text/70 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-bold text-text mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using 50 Best Dating Sites (&quot;the Site&quot;), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Site.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-text mb-3">2. Description of Service</h2>
            <p>
              50 Best Dating Sites provides editorial reviews, rankings, and comparisons of online dating platforms. Our content is intended for informational purposes only and should not be considered as professional advice. We independently research and evaluate dating sites based on publicly available information and our own testing methodology.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-text mb-3">3. Editorial Content and Accuracy</h2>
            <p>
              We strive to ensure all information on the Site is accurate and up to date. However, dating platforms frequently change their features, pricing, and policies. We update our reviews quarterly, but there may be periods where certain information is outdated. We are not responsible for any discrepancies between our content and the current state of any dating platform.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-text mb-3">4. Affiliate Relationships</h2>
            <p>
              Some links on the Site are affiliate links. When you click on these links and sign up for or purchase a service, we may receive a commission from the dating platform. This commission does not affect the price you pay. Our editorial rankings and reviews are independent of any affiliate relationships.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-text mb-3">5. Intellectual Property</h2>
            <p>
              All content on the Site, including text, graphics, logos, and data compilations, is the property of 50 Best Dating Sites and is protected by copyright and intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from our content without prior written consent.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-text mb-3">6. User Conduct</h2>
            <p className="mb-3">When using the Site, you agree not to:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2"><span className="text-gold mt-1">&#8226;</span>Use the Site for any unlawful purpose</li>
              <li className="flex items-start gap-2"><span className="text-gold mt-1">&#8226;</span>Attempt to gain unauthorized access to our systems</li>
              <li className="flex items-start gap-2"><span className="text-gold mt-1">&#8226;</span>Scrape or harvest content without permission</li>
              <li className="flex items-start gap-2"><span className="text-gold mt-1">&#8226;</span>Interfere with the proper functioning of the Site</li>
              <li className="flex items-start gap-2"><span className="text-gold mt-1">&#8226;</span>Submit false or misleading information through our contact forms</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-text mb-3">7. Third-Party Links</h2>
            <p>
              The Site contains links to third-party websites, including dating platforms. We are not responsible for the content, privacy practices, or terms of these third-party sites. Your interactions with these sites are governed by their respective terms and policies.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-text mb-3">8. Disclaimer of Warranties</h2>
            <p>
              The Site and its content are provided &quot;as is&quot; without warranties of any kind, either express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free of viruses. We do not guarantee any specific outcomes from using dating platforms reviewed on the Site.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-text mb-3">9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, 50 Best Dating Sites shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Site or any dating platform reviewed on the Site.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-text mb-3">10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site after any modifications constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-text mb-3">11. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with applicable law, without regard to conflicts of law principles.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-text mb-3">12. Contact</h2>
            <p>
              If you have questions about these Terms of Service, please{' '}
              <Link href="/contact" className="text-gold hover:underline">contact us</Link>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
