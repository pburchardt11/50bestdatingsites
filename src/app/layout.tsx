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
  metadataBase: new URL('https://50bestdatingsites.com'),
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
  twitter: {
    card: 'summary_large_image',
    title: '50 Best Dating Sites | Expert Rankings & Reviews 2026',
    description:
      'Discover the 50 best dating sites worldwide with expert rankings, in-depth reviews, safety scores, and pricing comparisons.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <meta name="google-adsense-account" content="ca-pub-2057309335537732" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2057309335537732"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Nav />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <LanguageToggle />

        {/* Happiness Blueprint - Sticky Side Ad */}
        <div style={{ position: 'fixed', right: '16px', top: '50%', transform: 'translateY(-50%)', zIndex: 40, display: 'none' }}>
          <style dangerouslySetInnerHTML={{ __html: '@media(min-width:1400px){.hb-side-ad{display:flex!important}}' }} />
          <a
            className="hb-side-ad"
            href="https://www.amazon.com/s?k=The+Happiness+Blueprint+Peter+Burchardt"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'none', flexDirection: 'column', alignItems: 'center', gap: '10px', textDecoration: 'none', background: 'linear-gradient(180deg, #1a1408, #0f0c06)', border: '1px solid rgba(196,168,124,0.25)', borderRadius: '12px', padding: '16px 12px', width: '120px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
          >
            <div style={{ fontSize: '7px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#c4a87c', textAlign: 'center' }}>New Book</div>
            <img
              src="https://peterburchardt.com/covers/happiness-blueprint.jpg"
              alt="The Happiness Blueprint by Peter Burchardt"
              style={{ width: '90px', height: '135px', objectFit: 'cover', borderRadius: '4px', boxShadow: '0 4px 16px rgba(0,0,0,0.5)' }}
            />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#f5f0e8', fontFamily: 'Georgia, serif', lineHeight: 1.3, marginBottom: '4px' }}>The Happiness Blueprint</div>
              <div style={{ fontSize: '0.55rem', color: '#7a6e62', lineHeight: 1.4 }}>What Evolution Built Your Joy For</div>
            </div>
            <span style={{ display: 'inline-block', background: 'linear-gradient(135deg, #d4af37, #c4a87c)', color: '#0a0a0a', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '5px 10px', borderRadius: '5px', whiteSpace: 'nowrap' }}>Amazon &rarr;</span>
          </a>
        </div>

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
