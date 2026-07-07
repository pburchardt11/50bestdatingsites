import Link from 'next/link';

const footerLinks = {
  Rankings: [
    { href: '/category/general-dating', label: 'General Dating' },
    { href: '/category/serious-relationships', label: 'Serious Relationships' },
    { href: '/category/over-50', label: 'Over 50' },
    { href: '/category/lgbtq-', label: 'LGBTQ+' },
    { href: '/category/international---cultural', label: 'International' },
  ],
  'Top Countries': [
    { href: '/country/usa', label: 'United States' },
    { href: '/country/uk', label: 'United Kingdom' },
    { href: '/country/canada', label: 'Canada' },
    { href: '/country/australia', label: 'Australia' },
    { href: '/country/germany', label: 'Germany' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Use' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-[#050505]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Branding */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-gold" style={{ letterSpacing: -1, lineHeight: 1 }}>
                50
              </span>
              <span className="h-5 w-px bg-gold/40" />
              <span className="flex flex-col">
                <span className="text-[8px] font-semibold uppercase tracking-[3px] text-gold/80">
                  Best
                </span>
                <span className="font-serif text-base font-normal italic text-text" style={{ letterSpacing: 1, lineHeight: 1.1 }}>
                  Dating Sites
                </span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-text/50">
              Expert rankings and in-depth reviews of the world&apos;s top dating
              platforms. Independently researched and regularly updated.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="mb-4 font-serif text-sm font-semibold uppercase tracking-widest text-gold/80">
                {heading}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text/50 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 50 Best Network */}
        <div className="mt-12 border-t border-card-border pt-8 text-center">
          <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[1.5px] text-gold">
            50 Best Network
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {[
              { name: '50 Best Spa', url: 'https://www.50bestspa.com' },
              { name: '50 Best Hotels', url: 'https://www.50besthotels.com' },
              { name: '50 Best Museums', url: 'https://www.50bestmuseums.com' },
              { name: '50 Best Neighborhoods', url: 'https://www.50bestneighborhoods.com' },
              { name: '50 Best Bar', url: 'https://www.50bestbar.com' },
              { name: '50 Best Bakeries', url: 'https://www.50bestbakeries.com' },
              { name: '50 Best Charms', url: 'https://www.50bestcharms.com' },
            ].map((site) => (
              <a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text/40 transition-colors hover:text-gold"
              >
                {site.name}
              </a>
            ))}
            <span className="text-xs font-semibold text-gold/70">
              50 Best Dating Sites
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-card-border pt-6 sm:flex-row">
          <p className="text-xs text-text/30">
            &copy; 2026 50 Best Limited. All rights reserved.
          </p>
          <p className="text-xs text-text/30">
            Rankings are based on independent research. We may earn a commission
            from partner links.
          </p>
        </div>
      </div>
    </footer>
  );
}
