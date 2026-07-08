'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  getAllSites,
  getAllCountries,
  getAllBlogPosts,
  getAllCategories,
  toSlug,
  type DatingSite,
  type Country,
  type BlogPost,
} from '@/lib/dating-db';

interface SearchResult {
  type: 'site' | 'country' | 'blog' | 'category';
  site?: DatingSite;
  country?: Country;
  blog?: BlogPost;
  category?: string;
}

export default function SearchBar({ className = '' }: { className?: string }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback((q: string) => {
    if (!q.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const lower = q.toLowerCase();
    const sites = getAllSites();
    const countries = getAllCountries();
    const blogPosts = getAllBlogPosts();
    const categories = getAllCategories();

    const matchedSites: SearchResult[] = sites
      .filter(
        (s) =>
          s.name.toLowerCase().includes(lower) ||
          s.category.toLowerCase().includes(lower) ||
          s.bestFor.toLowerCase().includes(lower)
      )
      .slice(0, 5)
      .map((s) => ({ type: 'site' as const, site: s }));

    const matchedCountries: SearchResult[] = countries
      .filter((c) => c.name.toLowerCase().includes(lower))
      .slice(0, 5)
      .map((c) => ({ type: 'country' as const, country: c }));

    const matchedBlogs: SearchResult[] = blogPosts
      .filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower) ||
          p.tags.some((t) => t.toLowerCase().includes(lower))
      )
      .slice(0, 3)
      .map((p) => ({ type: 'blog' as const, blog: p }));

    const matchedCategories: SearchResult[] = categories
      .filter((c) => c.toLowerCase().includes(lower))
      .map((c) => ({ type: 'category' as const, category: c }));

    setResults([...matchedSites, ...matchedCountries, ...matchedBlogs, ...matchedCategories]);
    setIsOpen(true);
    setActiveIndex(-1);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(val), 200);
  };

  const getResultHref = (r: SearchResult): string => {
    if (r.type === 'site') return `/site/${r.site!.slug}`;
    if (r.type === 'country') return `/country/${r.country!.slug}`;
    if (r.type === 'blog') return `/blog/${r.blog!.slug}`;
    if (r.type === 'category') return `/category/${toSlug(r.category!)}`;
    return '/';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      window.location.href = getResultHref(results[activeIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const siteResults = results.filter((r) => r.type === 'site');
  const countryResults = results.filter((r) => r.type === 'country');
  const blogResults = results.filter((r) => r.type === 'blog');
  const categoryResults = results.filter((r) => r.type === 'category');

  let flatIndex = -1;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="flex items-center overflow-hidden rounded-full border border-card-border bg-card-bg transition-colors focus-within:border-gold/40">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-4 h-4 w-4 shrink-0 text-text/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          placeholder="Search sites, countries, categories, or articles..."
          className="flex-1 bg-transparent px-3 py-3 text-sm text-text placeholder-text/40 outline-none"
        />
      </div>

      {/* Results dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-xl border border-card-border bg-[#111] shadow-2xl">
          {siteResults.length > 0 && (
            <div>
              <div className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-widest text-text/30">
                Dating Sites
              </div>
              {siteResults.map((r) => {
                flatIndex++;
                const idx = flatIndex;
                const site = r.site!;
                return (
                  <Link
                    key={site.slug}
                    href={`/site/${site.slug}`}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-gold/10 ${
                      idx === activeIndex ? 'bg-gold/10' : ''
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/5 text-xl">
                      {site.logo}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium text-text">
                          {site.name}
                        </span>
                        <span className="shrink-0 rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gold/70">
                          {site.category}
                        </span>
                      </div>
                      <span className="text-xs text-text/40">{site.bestFor}</span>
                    </div>
                    <span className="shrink-0 font-serif text-sm font-bold text-gold">
                      {site.metrics.overallScore.toFixed(1)}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}

          {countryResults.length > 0 && (
            <div>
              <div className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-widest text-text/30">
                Countries
              </div>
              {countryResults.map((r) => {
                flatIndex++;
                const idx = flatIndex;
                const country = r.country!;
                return (
                  <Link
                    key={country.slug}
                    href={`/country/${country.slug}`}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-gold/10 ${
                      idx === activeIndex ? 'bg-gold/10' : ''
                    }`}
                  >
                    <span className="text-2xl">{country.emoji}</span>
                    <span className="text-sm font-medium text-text">
                      {country.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}

          {categoryResults.length > 0 && (
            <div>
              <div className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-widest text-text/30">
                Categories
              </div>
              {categoryResults.map((r) => {
                flatIndex++;
                const idx = flatIndex;
                return (
                  <Link
                    key={r.category}
                    href={`/category/${toSlug(r.category!)}`}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-gold/10 ${
                      idx === activeIndex ? 'bg-gold/10' : ''
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/5 text-lg">
                      📂
                    </span>
                    <span className="text-sm font-medium text-text">
                      {r.category}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}

          {blogResults.length > 0 && (
            <div>
              <div className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-widest text-text/30">
                Articles
              </div>
              {blogResults.map((r) => {
                flatIndex++;
                const idx = flatIndex;
                const post = r.blog!;
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-gold/10 ${
                      idx === activeIndex ? 'bg-gold/10' : ''
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/5 text-lg">
                      📝
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-text">
                        {post.title}
                      </span>
                      <span className="text-xs text-text/40">{post.category}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          <div className="h-1" />
        </div>
      )}
    </div>
  );
}
