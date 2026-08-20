import { experience } from '@/content/profile';
import SectionHeading from './SectionHeading';

export default function Experience() {
  return (
    <section id="experience" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          index="02"
          title="Experience"
          subtitle="A decade at Appscrip, embedded with client engineering teams across retail, fintech, and edtech — plus where it started, building a logistics system end to end."
        />

        <div className="space-y-14">
          {experience.map((company) => (
            <div key={company.company}>
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-xl font-semibold tracking-tight">
                  {company.company}
                </h3>
                <p className="font-mono text-xs text-faint">
                  {company.period} · {company.location}
                </p>
              </div>

              {company.roleTitle && (
                <p className="mb-6 -mt-4 text-sm text-muted">
                  {company.roleTitle}
                </p>
              )}

              {/* Timeline of engagements within this company. */}
              <ol className="relative space-y-8 border-l border-line pl-6 sm:pl-8">
                {company.roles.map((role) => (
                  <li key={`${company.company}-${role.project}`} className="relative">
                    <span
                      className="absolute -left-[calc(1.5rem+4.5px)] top-1.5 size-[9px] rounded-full border-2 border-bg bg-accent sm:-left-[calc(2rem+4.5px)]"
                      aria-hidden="true"
                    />

                    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <h4 className="text-base font-semibold">{role.project}</h4>
                      {role.site && role.siteUrl && (
                        <a
                          href={role.siteUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="font-mono text-xs text-accent hover:underline"
                        >
                          {role.site} ↗
                        </a>
                      )}
                    </div>

                    <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-faint">
                      {role.period} · {role.mode}
                    </p>

                    <ul className="mt-3.5 space-y-2.5">
                      {role.highlights.map((highlight) => (
                        <li
                          key={highlight.slice(0, 40)}
                          className="flex gap-2.5 text-[14px] leading-relaxed text-muted"
                        >
                          <span
                            className="mt-[9px] size-1 shrink-0 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {role.stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
