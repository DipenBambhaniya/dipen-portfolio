import { profile, skillGroups } from '@/content/profile';
import SectionHeading from './SectionHeading';

const languageCount =
  skillGroups.find((group) => group.label === 'Languages')?.items.length ?? 0;
const dataStoreCount =
  skillGroups.find((group) => group.label === 'Data Stores')?.items.length ?? 0;

const stats = [
  { value: profile.yearsOfExperience, label: 'Years shipping backends' },
  { value: '5', label: 'Products led or built on' },
  { value: String(languageCount), label: 'Languages worked in' },
  { value: String(dataStoreCount), label: 'Data stores in production' },
];

export default function About() {
  return (
    <section id="about" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading index="01" title="About" />

        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            {profile.summary.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-[15px] leading-relaxed text-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="grid grid-cols-2 gap-3 self-start">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-line bg-surface p-4"
              >
                <dt className="font-mono text-2xl font-bold text-accent">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-faint">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
