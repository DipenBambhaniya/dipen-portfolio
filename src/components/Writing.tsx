import Link from 'next/link';
import { formatDate, type PostMeta } from '@/lib/posts';
import SectionHeading from './SectionHeading';

export default function Writing({ posts }: { posts: PostMeta[] }) {
  return (
    <section id="writing" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          index="06"
          title="Writing"
          subtitle="Notes on backend architecture, distributed systems, and the trade-offs behind them."
        />

        {posts.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line bg-surface px-5 py-8 text-center text-sm text-faint">
            No posts published yet — drafts are in{' '}
            <code className="font-mono text-[13px] text-muted">content/posts/</code>.
          </p>
        ) : (
          <>
            <ul className="divide-y divide-line border-y border-line">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <time
                      dateTime={post.date}
                      className="shrink-0 font-mono text-[11px] uppercase tracking-wide text-faint sm:w-28"
                    >
                      {formatDate(post.date)}
                    </time>
                    <div className="min-w-0">
                      <h3 className="text-[15px] font-semibold transition-colors group-hover:text-accent">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-[14px] leading-relaxed text-muted">
                        {post.summary}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/blog"
              className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:underline"
            >
              All posts
              <span aria-hidden="true">→</span>
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
