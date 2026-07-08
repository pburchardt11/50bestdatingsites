'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import { getAllCategories, toSlug } from '@/lib/dating-db';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

  const categories = getAllCategories();

  // Close category dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const mainLinks = [
    { href: '/', label: 'Home' },
    { href: '/rankings', label: 'Rankings' },
    { href: '/reviews', label: 'Reviews' },
  ];

  const secondaryLinks = [
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/submit', label: 'Submit a Site' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-card-border bg-[#080808]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-gold sm:text-3xl" style={{ letterSpacing: -1, lineHeight: 1 }}>
              50
            </span>
            <span className="h-5 w-px bg-gold/40" />
            <span className="flex flex-col">
              <span className="text-[8px] font-semibold uppercase tracking-[3px] text-gold/80" style={{ fontFamily: 'var(--font-sans)' }}>
                Best
              </span>
              <span className="font-serif text-base font-normal italic text-text sm:text-lg" style={{ letterSpacing: 1, lineHeight: 1.1 }}>
                Dating Sites
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 md:flex">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-text/70 transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}

            {/* Categories dropdown */}
            <div ref={catRef} className="relative">
              <button
                onClick={() => setCatOpen(!catOpen)}
                className="flex items-center gap-1 text-sm tracking-wide text-text/70 transition-colors hover:text-gold"
              >
                Categories
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 transition-transform ${catOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {catOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-card-border bg-[#111] shadow-2xl">
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/category/${toSlug(cat)}`}
                      onClick={() => setCatOpen(false)}
                      className="block px-4 py-2.5 text-sm text-text/70 transition-colors hover:bg-gold/10 hover:text-gold"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-text/70 transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}

            {/* Search icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-text/70 transition-colors hover:text-gold"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-text/70 transition-colors hover:text-gold md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Expandable search bar */}
        {searchOpen && (
          <div className="border-t border-card-border py-3">
            <SearchBar />
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-card-border bg-[#080808] md:hidden">
          <div className="space-y-1 px-4 py-4">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-text/70 transition-colors hover:bg-card-bg hover:text-gold"
              >
                {link.label}
              </Link>
            ))}

            {/* Categories (expanded in mobile) */}
            <div className="px-3 py-2">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text/30">Categories</p>
              <div className="space-y-1 pl-2">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/category/${toSlug(cat)}`}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-1.5 text-sm text-text/50 transition-colors hover:bg-card-bg hover:text-gold"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-text/70 transition-colors hover:bg-card-bg hover:text-gold"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 px-3">
              <SearchBar />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
