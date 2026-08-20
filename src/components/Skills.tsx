import { skillGroups } from '@/content/profile';
import SectionHeading from './SectionHeading';

export default function Skills() {
  return (
    <section id="skills" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          index="04"
          title="Skills & tooling"
          subtitle="What I reach for day to day, grouped by where it sits in the stack."
        />

        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="mb-3 font-mono text-[11px] font-medium uppercase tracking-wider text-accent">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line bg-surface px-2.5 py-1 text-[13px] text-muted transition-colors hover:border-accent hover:text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
