import Link from 'next/link';
import { profile } from '@/content/profile';
import { withBasePath } from '@/lib/basePath';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        className="pointer-events-none absolute inset-0 grid-backdrop opacity-60"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-5xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] tracking-wide text-muted">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
          </span>
          {profile.location} · {profile.yearsOfExperience} years experience
        </p>

        <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] sm:text-6xl">
          {profile.name}
        </h1>

        <p className="mt-4 text-lg font-medium text-accent sm:text-xl">
          {profile.title}
        </p>

        <p className="mt-2 max-w-2xl font-mono text-[13px] leading-relaxed text-faint sm:text-sm">
          {profile.headline}
        </p>

        <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
          {profile.summary[0]}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href={withBasePath(profile.resumePath)}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
              aria-hidden="true"
            >
              <path d="M12 3v12M7 11l5 5 5-5M4 20h16" />
            </svg>
            Résumé
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 21.5h5.16V9.06H2.4V21.5Zm7.5 0h5.16v-6.9c0-1.82.65-2.9 2.09-2.9 1.32 0 1.86.98 1.86 2.9v6.9h5.16v-7.4c0-4.1-2.19-6.02-5.12-6.02-2.36 0-3.45 1.3-4.06 2.22h-.05V9.06H9.9c.07 1.34 0 12.44 0 12.44Z" />
            </svg>
            LinkedIn
          </a>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted transition-colors hover:text-accent"
          >
            Get in touch
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
