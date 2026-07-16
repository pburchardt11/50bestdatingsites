import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  getTeamMemberBySlug,
  getAllTeamMembers,
  getAllBlogPosts,
} from '@/lib/dating-db';

export const revalidate = 604800;
export const dynamicParams = true;

export async function generateStaticParams() {
  const members = getAllTeamMembers();
  return members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const member = getTeamMemberBySlug(slug);
  if (!member) return { title: 'Team Member Not Found' };

  return {
    title: `${member.name} \u2013 ${member.role} | 50 Best Dating Sites`,
    description: member.bio,
    openGraph: {
      title: `${member.name} \u2013 ${member.role}`,
      description: member.bio,
      type: 'profile',
    },
  };
}

export default async function TeamMemberPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const member = getTeamMemberBySlug(slug);
  if (!member) notFound();

  // Find articles by this team member (match by first name + last name)
  const allPosts = getAllBlogPosts();
  const articles = allPosts.filter(
    (post) =>
      post.author.toLowerCase().includes(member.name.split(' ')[0].toLowerCase())
  );

  const personJsonLd = {
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <section className="relative border-b border-card-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,119,6,0.04)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-text/40">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/team" className="hover:text-gold transition-colors">Team</Link>
            <span className="mx-2">/</span>
            <span className="text-text/60">{member.name}</span>
          </nav>

          <div className="flex items-center gap-5">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/5 text-5xl">
              {member.emoji}
            </span>
            <div>
              <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">
                {member.name}
              </h1>
              <p className="mt-1 text-lg font-medium text-gold/70">{member.role}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        {/* Bio */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-text mb-4">About</h2>
          <div className="rounded-xl border border-card-border bg-card-bg p-6 text-text/70 leading-relaxed">
            <p>{member.bio}</p>
          </div>
        </section>

        {/* Credentials */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-text mb-4">Credentials</h2>
          <div className="rounded-xl border border-card-border bg-card-bg p-6">
            <p className="text-text/70 leading-relaxed">{member.credentials}</p>
          </div>
        </section>

        {/* Articles */}
        {articles.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl font-bold text-text mb-4">
              Articles by {member.name.split(' ')[0]}
            </h2>
            <div className="space-y-3">
              {articles.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-xl border border-card-border bg-card-bg p-5 transition-all duration-300 hover:border-gold/30"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-gold/80">
                      {post.category}
                    </span>
                    <span className="text-xs text-text/30">{post.readTime}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-text group-hover:text-gold transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-text/50">{post.excerpt}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-text/30">{post.date}</span>
                    <span className="text-sm font-medium text-gold/70 group-hover:text-gold transition-colors">
                      Read more &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="pt-4">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-sm font-medium text-text/40 transition-colors hover:text-gold"
          >
            &larr; Back to Editorial Team
          </Link>
        </div>
      </div>
    </>
  );
}
