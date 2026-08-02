import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllCities } from '@/lib/dating-db';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Best Dating Sites by City | 50 Best Dating Sites',
  description:
    'Find the best dating sites in your city. Compare top-rated dating platforms with local recommendations for 30+ major cities worldwide.',
  alternates: {
    canonical: 'https://50bestdatingsites.com/cities',
  },
};

export default function CitiesPage() {
  const cities = getAllCities();

  // Group cities by country
  const grouped: Record<string, typeof cities> = {};
  for (const city of cities) {
    if (!grouped[city.country]) grouped[city.country] = [];
    grouped[city.country].push(city);
  }
  const sortedCountries = Object.keys(grouped).sort();

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Best Dating Sites by City
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-text/50">
            Find the top-rated dating platforms in {cities.length} cities worldwide.
            Each city guide includes local recommendations, pricing, and expert scores.
          </p>
        </div>

        {sortedCountries.map((country) => (
          <div key={country} className="mb-10">
            <h2 className="mb-4 font-serif text-xl font-semibold text-gold border-b border-card-border pb-2">
              {country}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {grouped[country]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((city) => (
                  <Link
                    key={city.slug}
                    href={`/city/${city.slug}`}
                    className="rounded-lg border border-card-border bg-card-bg px-4 py-3 text-sm font-medium text-text/70 transition-all hover:border-gold/40 hover:text-gold hover:bg-card-bg/80"
                  >
                    {city.name}
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
