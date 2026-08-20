import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatDate, getPost, getPostSlugs } from '@/lib/posts';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return { title: 'Post not found' };

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.summary,
      publishedTime: post.date || undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors hover:text-accent"
      >
        <span aria-hidden="true">←</span> All posts
      </Link>

      <header className="mt-8 border-b border-line pb-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-faint">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min read</span>
          {post.draft && (
            <span className="rounded border border-accent px-1.5 text-accent">
              Draft
            </span>
          )}
        </div>

        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        {post.summary && (
          <p className="mt-3.5 text-[15px] leading-relaxed text-muted">
            {post.summary}
          </p>
        )}

        {post.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      <div
        className="prose-post mt-9"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
