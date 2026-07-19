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
  Cities: [
    { href: '/city/new-york', label: 'New York' },
    { href: '/city/los-angeles', label: 'Los Angeles' },
    { href: '/city/london', label: 'London' },
    { href: '/city/chicago', label: 'Chicago' },
    { href: '/city/miami', label: 'Miami' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/team', label: 'Our Team' },
    { href: '/contact', label: 'Contact' },
    { href: '/quiz', label: 'Find a Dating Site Quiz' },
    { href: '/submit', label: 'Submit a Site' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Use' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-slate-200 [&>div]:lg:pl-8 [&>div:first-child]:lg:pl-0">
          {/* Branding */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-amber-600" style={{ letterSpacing: -1, lineHeight: 1 }}>
                50
              </span>
              <span className="h-5 w-px bg-amber-600/40" />
              <span className="flex flex-col">
                <span className="text-[8px] font-semibold uppercase tracking-[3px] text-amber-600/80">
                  Best
                </span>
                <span className="font-serif text-base font-normal italic text-slate-900" style={{ letterSpacing: 1, lineHeight: 1.1 }}>
                  Dating Sites
                </span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Expert rankings and in-depth reviews of the world&apos;s top dating
              platforms. Independently researched and regularly updated.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="mb-4 font-serif text-sm font-semibold uppercase tracking-widest text-amber-700">
                {heading}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-amber-600"
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
        <div className="mt-12 border-t border-slate-200 pt-8 text-center">
          <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[1.5px] text-amber-700">
            50 Best Network
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {[
              { name: '50 Best Bakeries', url: 'https://www.50bestbakeries.com' },
              { name: '50 Best Bar', url: 'https://www.50bestbar.com' },
              { name: '50 Best Charms', url: 'https://www.50bestcharms.com' },
              { name: '50 Best Games', url: 'https://www.50bestgames.com' },
              { name: '50 Best Health Insurance', url: 'https://www.50besthealthinsurance.com' },
              { name: '50 Best Hotels', url: 'https://www.50besthotels.com' },
              { name: '50 Best Limited', url: 'https://www.50bestlimited.com' },
              { name: '50 Best Matchmakers', url: 'https://www.50bestmatchmaker.com' },
              { name: '50 Best Museums', url: 'https://www.50bestmuseums.com' },
              { name: '50 Best Neighborhoods', url: 'https://www.50bestneighborhoods.com' },
              { name: '50 Best Peptides', url: 'https://www.50bestpeptides.com' },
              { name: '50 Best Spa', url: 'https://www.50bestspa.com' },
              { name: '50 Holy Sites', url: 'https://www.50holysites.com' },
            ].map((site) => (
              <a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-500 transition-colors hover:text-amber-600"
              >
                {site.name}
              </a>
            ))}
            <span className="text-sm font-bold text-amber-600">
              50 Best Dating Sites
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row">
          <p className="text-xs text-slate-400">
            &copy; 2026 50 Best Limited. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Updated: July 2026
          </p>
          <p className="text-xs text-slate-400">
            Rankings are based on independent research. We may earn a commission
            from partner links.
          </p>
        </div>
      </div>
    </footer>
  );
}
