import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllTeamMembers } from '@/lib/dating-db';

export const metadata: Metadata = {
  title: 'Our Editorial Team | 50 Best Dating Sites',
  description:
    'Meet the expert editors, analysts, and correspondents behind the 50 Best Dating Sites rankings and reviews.',
};

export default function TeamPage() {
  const team = getAllTeamMembers();

  const teamJsonLd = team.map((member) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    url: `https://50bestdatingsites.com/team/${member.slug}`,
    worksFor: {
      '@type': 'Organization',
      name: '50 Best Dating Sites',
      url: 'https://50bestdatingsites.com',
    },
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }}
      />

      <section className="relative border-b border-card-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,168,124,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-text/40">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-text/60">Editorial Team</span>
          </nav>
          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">
            Our Editorial Team
          </h1>
          <p className="mt-4 text-lg text-text/50">
            Independent experts dedicated to honest, data-driven dating site reviews.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {team.map((member) => (
            <Link
              key={member.slug}
              href={`/team/${member.slug}`}
              className="group rounded-xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_30px_rgba(196,168,124,0.06)]"
            >
              <div className="mb-4 flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/5 text-3xl">
                  {member.emoji}
                </span>
                <div>
                  <h2 className="font-serif text-xl font-bold text-text group-hover:text-gold transition-colors">
                    {member.name}
                  </h2>
                  <p className="text-sm font-medium text-gold/60">{member.role}</p>
                </div>
              </div>
              <p className="line-clamp-3 text-sm leading-relaxed text-text/50">
                {member.bio}
              </p>
              <p className="mt-3 text-sm font-medium text-gold/70 group-hover:text-gold transition-colors">
                View profile &rarr;
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
