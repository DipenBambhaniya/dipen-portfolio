import type { Metadata } from 'next';
import {
  education,
  experience,
  profile,
  skillGroups,
} from '@/content/profile';
import { withBasePath } from '@/lib/basePath';
import { maskPhone } from '@/lib/maskPhone';

export const metadata: Metadata = {
  title: 'Resume',
  description: `${profile.name} — ${profile.title}. View the resume online or download the PDF.`,
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
      <header className="flex flex-col gap-6 border-b border-line pb-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-2 text-lg font-medium text-accent">{profile.title}</p>
          <p className="mt-1 font-mono text-[13px] text-faint">
            {profile.headline}
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[13px] text-muted">
            <li>{profile.location}</li>
            <li>
              <a href={`mailto:${profile.email}`} className="hover:text-accent">
                {profile.email}
              </a>
            </li>
            <li>{maskPhone(profile.phone)}</li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-accent"
              >
                in/dipen-bambhaniya
              </a>
            </li>
          </ul>
        </div>

        <a
          href={withBasePath(profile.resumePath)}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-bg transition-opacity hover:opacity-90 print:hidden"
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
          Download PDF
        </a>
      </header>

      <section className="mt-10 space-y-4">
        {profile.summary.map((paragraph) => (
          <p
            key={paragraph.slice(0, 32)}
            className="text-[15px] leading-relaxed text-muted"
          >
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="mb-5 font-mono text-xs font-medium uppercase tracking-wider text-accent">
          Skills &amp; tooling
        </h2>
        <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="mb-2 text-[13px] font-semibold text-fg">
                {group.label}
              </h3>
              <p className="text-[13px] leading-relaxed text-muted">
                {group.items.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-6 font-mono text-xs font-medium uppercase tracking-wider text-accent">
          Experience
        </h2>
        <div className="space-y-10">
          {experience.map((company) => (
            <div key={company.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold tracking-tight">
                  {company.company}
                </h3>
                <p className="font-mono text-xs text-faint">
                  {company.period} · {company.location}
                </p>
              </div>

              {company.roleTitle && (
                <p className="mt-1 text-sm text-muted">{company.roleTitle}</p>
              )}

              <div className="mt-4 space-y-6 border-l border-line pl-5">
                {company.roles.map((role) => (
                  <div
                    key={`${company.company}-${role.project}`}
                    className="print:break-inside-avoid"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <h4 className="text-[15px] font-semibold">
                        {role.project}
                      </h4>
                      {role.site && role.siteUrl && (
                        <a
                          href={role.siteUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="font-mono text-xs text-accent hover:underline print:text-faint print:no-underline"
                        >
                          {role.site} ↗
                        </a>
                      )}
                    </div>
                    <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-faint">
                      {role.period} · {role.mode}
                    </p>
                    <ul className="mt-2.5 space-y-1.5">
                      {role.highlights.map((highlight) => (
                        <li
                          key={highlight.slice(0, 40)}
                          className="flex gap-2 text-[13.5px] leading-relaxed text-muted"
                        >
                          <span
                            className="mt-[8px] size-1 shrink-0 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 font-mono text-[11px] text-faint">
                      {role.stack.join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-5 font-mono text-xs font-medium uppercase tracking-wider text-accent">
          Education
        </h2>
        <div className="space-y-4">
          {education.map((entry) => (
            <div key={entry.degree}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[15px] font-semibold">{entry.degree}</h3>
                <p className="font-mono text-xs text-faint">{entry.period}</p>
              </div>
              <p className="mt-1 text-sm text-muted">
                {entry.institution} · {entry.location}
                {entry.grade ? ` · ${entry.grade}` : ''}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
