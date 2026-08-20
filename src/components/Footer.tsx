import Link from 'next/link';
import { profile } from '@/content/profile';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-9 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-[13px] text-faint">
          Built by {profile.name} with Next.js and Tailwind CSS.
        </p>
        <div className="flex items-center gap-5 text-[13px]">
          <a
            href={`mailto:${profile.email}`}
            className="text-muted transition-colors hover:text-accent"
          >
            Email
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="text-muted transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <Link
            href="/blog"
            className="text-muted transition-colors hover:text-accent"
          >
            Writing
          </Link>
        </div>
      </div>
    </footer>
  );
}
