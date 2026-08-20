import type { Metadata } from 'next';
import Link from 'next/link';
import { formatDate, getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Notes on backend architecture, distributed systems, payments, and the trade-offs behind them.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Writing</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Notes on backend architecture, distributed systems, payments, and the
          trade-offs behind them.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line bg-surface px-5 py-10 text-center text-sm text-faint">
          Nothing published yet. Add a markdown file to{' '}
          <code className="font-mono text-[13px] text-muted">content/posts/</code>{' '}
          to get started.
        </p>
      ) : (
        <ul className="divide-y divide-line border-t border-line">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block py-7">
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

                <h2 className="mt-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {post.title}
                </h2>

                <p className="mt-2 text-[14px] leading-relaxed text-muted">
                  {post.summary}
                </p>

                {post.tags.length > 0 && (
                  <ul className="mt-3.5 flex flex-wrap gap-1.5">
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
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
