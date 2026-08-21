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

/** Print/PDF is a condensed one-pager — only the lead highlights per role. */
const PRINT_HIGHLIGHT_LIMIT = 4;

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24 print:max-w-none print:p-0">
      <header className="flex flex-col gap-6 border-b border-line pb-10 print:gap-1.5 print:pb-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl print:text-xl">
            {profile.name}
          </h1>
          <p className="mt-2 text-lg font-medium text-accent print:mt-0 print:text-[12px]">
            {profile.title}
          </p>
          <p className="mt-1 font-mono text-[13px] text-faint print:text-[8.5px]">
            {profile.headline}
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[13px] text-muted print:mt-1.5 print:gap-x-3 print:gap-y-0.5 print:text-[8.5px]">
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
          download="Dipen_Bambhaniya_CV.pdf"
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

      <section className="mt-10 space-y-4 print:mt-2.5 print:space-y-0">
        {profile.summary.map((paragraph, index) => (
          <p
            key={paragraph.slice(0, 32)}
            className={`text-[15px] leading-relaxed text-muted print:text-[9px] print:leading-snug ${
              index > 0 ? 'print:hidden' : ''
            }`}
          >
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mt-12 print:mt-3">
        <h2 className="mb-5 font-mono text-xs font-medium uppercase tracking-wider text-accent print:mb-1.5 print:text-[8.5px]">
          Skills &amp; tooling
        </h2>
        <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2 print:gap-x-4 print:gap-y-1">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="mb-2 text-[13px] font-semibold text-fg print:mb-0.5 print:text-[8.5px]">
                {group.label}
              </h3>
              <p className="text-[13px] leading-relaxed text-muted print:text-[8px] print:leading-snug">
                {group.items.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 print:mt-3">
        <h2 className="mb-6 font-mono text-xs font-medium uppercase tracking-wider text-accent print:mb-1.5 print:text-[8.5px]">
          Experience
        </h2>
        <div className="space-y-10 print:space-y-2.5">
          {experience.map((company) => (
            <div key={company.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold tracking-tight print:text-[11px]">
                  {company.company}
                </h3>
                <p className="font-mono text-xs text-faint print:text-[7.5px]">
                  {company.period} · {company.location}
                </p>
              </div>

              {company.roleTitle && (
                <p className="mt-1 text-sm text-muted print:mt-0 print:text-[8px]">
                  {company.roleTitle}
                </p>
              )}

              <div className="mt-4 space-y-6 border-l border-line pl-5 print:mt-1.5 print:space-y-1.5 print:pl-2.5">
                {company.roles.map((role) => (
                  <div
                    key={`${company.company}-${role.project}`}
                    className="print:break-inside-avoid"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <h4 className="text-[15px] font-semibold print:text-[9px]">
                        {role.project}
                      </h4>
                      {role.site && role.siteUrl && (
                        <a
                          href={role.siteUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="font-mono text-xs text-accent hover:underline print:text-[7.5px] print:text-faint print:no-underline"
                        >
                          {role.site} ↗
                        </a>
                      )}
                    </div>
                    <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-faint print:mt-0 print:text-[7.5px]">
                      {role.period} · {role.mode}
                    </p>
                    <ul className="mt-2.5 space-y-1.5 print:mt-1 print:space-y-0.5">
                      {role.highlights.map((highlight, index) => (
                        <li
                          key={highlight.slice(0, 40)}
                          className={`flex gap-2 text-[13.5px] leading-relaxed text-muted print:gap-1 print:text-[8.5px] print:leading-snug ${
                            index >= PRINT_HIGHLIGHT_LIMIT ? 'print:hidden' : ''
                          }`}
                        >
                          <span
                            className="mt-[8px] size-1 shrink-0 rounded-full bg-accent print:mt-[5px] print:size-[3px]"
                            aria-hidden="true"
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 font-mono text-[11px] text-faint print:hidden">
                      {role.stack.join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 print:mt-3">
        <h2 className="mb-5 font-mono text-xs font-medium uppercase tracking-wider text-accent print:mb-1.5 print:text-[8.5px]">
          Education
        </h2>
        <div className="space-y-4 print:space-y-1">
          {education.map((entry) => (
            <div key={entry.degree}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[15px] font-semibold print:text-[9px]">
                  {entry.degree}
                </h3>
                <p className="font-mono text-xs text-faint print:text-[7.5px]">
                  {entry.period}
                </p>
              </div>
              <p className="mt-1 text-sm text-muted print:mt-0 print:text-[8px]">
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
