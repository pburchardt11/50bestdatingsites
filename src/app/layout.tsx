import type { Metadata } from 'next';
import Script from 'next/script';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LanguageToggle from '@/components/LanguageToggle';
import './globals.css';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: '50 Best Dating Sites | Expert Rankings & Reviews 2026',
  description:
    'Discover the 50 best dating sites worldwide with expert rankings, in-depth reviews, safety scores, and pricing comparisons. Find your perfect match on the right platform.',
  keywords: [
    'best dating sites',
    'dating app reviews',
    'online dating rankings',
    'dating site comparison',
    'best dating apps 2026',
  ],
  openGraph: {
    title: '50 Best Dating Sites | Expert Rankings & Reviews 2026',
    description:
      'Discover the 50 best dating sites worldwide with expert rankings, in-depth reviews, safety scores, and pricing comparisons.',
    type: 'website',
    locale: 'en_US',
    siteName: '50 Best Dating Sites',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '50 Best Dating Sites',
  url: 'https://50bestdatingsites.com',
  description:
    'Expert rankings and in-depth reviews of the world\'s top dating platforms.',
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} h-full antialiased notranslate`}
      translate="no"
    >
      <head>
        <meta name="google" content="notranslate" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Nav />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <LanguageToggle />

        {/* Google Translate */}
        <div id="google_translate_element" className="hidden" />
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateInit"
          strategy="afterInteractive"
        />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                autoDisplay: false,
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
              }, 'google_translate_element');
            }
          `}
        </Script>
      </body>
    </html>
  );
}
