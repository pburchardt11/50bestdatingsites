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
            <Link href="/" className="font-serif text-xl font-bold tracking-wide text-gold">
              50 BEST DATING SITES
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

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-card-border pt-8 sm:flex-row">
          <p className="text-xs text-text/30">
            &copy; 2026 50 Best Dating Sites. All rights reserved.
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
