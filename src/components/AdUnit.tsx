'use client';

import { useEffect, useRef, useState } from 'react';

const ADSENSE_CLIENT = 'ca-pub-2057309335537732';

const bookAds = [
  {
    title: 'Designed to Feel',
    subtitle: 'Why Evolution Built Your Emotions, and How to Make Them Work for You',
    label: 'Bestseller by Peter Burchardt',
    quote: '\u201cThe most eye-opening book on emotions I\u2019ve ever read.\u201d',
    cover: 'https://peterburchardt.com/covers/designed-to-feel.jpg',
    url: 'https://www.amazon.com/s?k=Designed+to+Feel+Peter+Burchardt',
    accent: '#d4af37',
    accentEnd: '#c4a87c',
  },
  {
    title: 'The Tribe Manager',
    subtitle: 'Leading People the Way Evolution Intended',
    label: 'The Leadership Companion',
    quote: 'Manage with human nature, you get loyalty. Manage against it, you get quiet quitting.',
    cover: 'https://peterburchardt.com/covers/tribe-manager.jpg',
    url: 'https://www.amazon.com/s?k=The+Tribe+Manager+Peter+Burchardt',
    accent: '#22c55e',
    accentEnd: '#16a34a',
  },
  {
    title: 'The Happiness Blueprint',
    subtitle: 'Your Evolutionary Guide to Joy, Purpose, and Lasting Well-Being',
    label: 'New Release by Peter Burchardt',
    quote: 'Happiness isn\u2019t a destination \u2014 it\u2019s a blueprint written in your DNA.',
    cover: 'https://peterburchardt.com/covers/happiness-blueprint.jpg',
    url: 'https://www.amazon.com/s?k=The+Happiness+Blueprint+Peter+Burchardt',
    accent: '#d4af37',
    accentEnd: '#c4a87c',
  },
  {
    title: 'Happy Employees',
    subtitle: 'What Evolution Tells You About Leading People',
    label: 'The Management Companion',
    quote: 'Lead with human nature, and your team won\u2019t just perform \u2014 they\u2019ll thrive.',
    cover: 'https://peterburchardt.com/covers/happy-employees.jpg',
    url: 'https://www.amazon.com/s?k=Happy+Employees+Peter+Burchardt',
    accent: '#3b82f6',
    accentEnd: '#2563eb',
  },
  {
    title: 'Happy Children',
    subtitle: 'What Evolution Actually Built Your Child\u2019s Emotions For',
    label: 'The Parenting Companion',
    quote: 'Your child\u2019s emotions are not the problem. They are the operating system.',
    cover: 'https://peterburchardt.com/covers/happy-children.jpg',
    url: 'https://www.amazon.com/s?k=Happy+Children+Peter+Burchardt',
    accent: '#e6c619',
    accentEnd: '#d4af37',
  },
];

function BookAdFallback() {
  const [book] = useState(() => bookAds[Math.floor(Math.random() * bookAds.length)]);

  return (
    <a
      href={book.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'flex', alignItems: 'center', gap: '20px', textDecoration: 'none', background: 'linear-gradient(135deg, rgba(30,24,16,0.95), rgba(20,16,10,0.98))', border: `1px solid ${book.accent}33`, borderRadius: '12px', padding: '18px 24px', flexWrap: 'wrap' }}
    >
      <img src={book.cover} alt={book.title} style={{ width: '64px', height: '96px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.6)' }} />
      <div style={{ flex: 1, minWidth: '200px' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: book.accent, marginBottom: '6px' }}>{book.label}</div>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '4px', lineHeight: 1.3 }}>{book.title}</div>
        <div style={{ fontSize: '0.8rem', color: '#a09888', marginBottom: '6px', lineHeight: 1.5 }}>{book.subtitle}</div>
        <div style={{ fontSize: '0.72rem', color: '#7a6e62', fontStyle: 'italic' }}>{book.quote}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
        <span style={{ display: 'inline-block', background: `linear-gradient(135deg, ${book.accent}, ${book.accentEnd})`, color: '#0a0a0a', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '10px 18px', borderRadius: '8px', whiteSpace: 'nowrap' }}>Get It on Amazon &rarr;</span>
        <span style={{ fontSize: '0.6rem', color: '#5a5550' }}>Paperback &amp; Kindle</span>
      </div>
    </a>
  );
}

interface AdUnitProps {
  slot?: string;
  format?: 'horizontal' | 'rectangle' | 'vertical';
  className?: string;
}

export default function AdUnit({ slot = '', format = 'horizontal', className = '' }: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const [adFilled, setAdFilled] = useState(false);

  useEffect(() => {
    if (pushed.current) return;

    let attempts = 0;
    const maxAttempts = 12;

    const interval = setInterval(() => {
      attempts++;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((window as any).adsbygoogle && adRef.current && !pushed.current) {
          pushed.current = true;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        }
      } catch {
        // AdSense not loaded yet
      }

      if (pushed.current && adRef.current) {
        const status = adRef.current.getAttribute('data-ad-status');
        if (status === 'filled' || adRef.current.offsetHeight > 10) {
          setAdFilled(true);
          clearInterval(interval);
        } else if (status === 'unfilled' || attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }

      if (attempts >= maxAttempts) clearInterval(interval);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const formatStyles: Record<string, { style: React.CSSProperties; adFormat: string }> = {
    horizontal: { style: { display: 'block' }, adFormat: 'horizontal' },
    rectangle: { style: { display: 'inline-block', width: '300px', height: '250px' }, adFormat: 'rectangle' },
    vertical: { style: { display: 'inline-block', width: '160px', height: '600px' }, adFormat: 'vertical' },
  };

  const config = formatStyles[format] || formatStyles.horizontal;

  return (
    <div className={className} style={{ margin: '32px auto', maxWidth: 728 }}>
      {/* Hidden AdSense slot — only shown if it fills */}
      <div style={{ display: adFilled ? 'block' : 'none' }}>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={config.style}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot || undefined}
          data-ad-format={slot ? undefined : 'auto'}
          data-full-width-responsive={slot ? undefined : 'true'}
        />
      </div>
      {/* Book ad shown by default, hidden if AdSense fills */}
      {!adFilled && <BookAdFallback />}
    </div>
  );
}
