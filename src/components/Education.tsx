import { education } from '@/content/profile';
import SectionHeading from './SectionHeading';

export default function Education() {
  return (
    <section id="education" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading index="05" title="Education" />

        <div className="space-y-4">
          {education.map((entry) => (
            <article
              key={entry.degree}
              className="rounded-xl border border-line bg-surface p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold tracking-tight">
                  {entry.degree}
                </h3>
                <p className="font-mono text-xs text-faint">{entry.period}</p>
              </div>

              <p className="mt-1.5 text-sm text-muted">
                {entry.institution} · {entry.location}
              </p>

              {entry.grade && (
                <p className="mt-2 inline-block rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-accent">
                  {entry.grade}
                </p>
              )}

              {entry.skills && entry.skills.length > 0 && (
                <p className="mt-3.5 text-[13px] text-faint">
                  <span className="text-muted">Focus:</span>{' '}
                  {entry.skills.join(' · ')}
                </p>
              )}

              {entry.coursework && entry.coursework.length > 0 && (
                <details className="group mt-3.5">
                  <summary className="cursor-pointer list-none text-[13px] font-medium text-accent hover:underline">
                    <span className="group-open:hidden">Show coursework</span>
                    <span className="hidden group-open:inline">Hide coursework</span>
                  </summary>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {entry.coursework.map((course) => (
                      <li
                        key={course}
                        className="rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted"
                      >
                        {course}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
