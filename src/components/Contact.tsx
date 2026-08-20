import { profile } from '@/content/profile';
import { withBasePath } from '@/lib/basePath';
import SectionHeading from './SectionHeading';

const channels = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
  },
  {
    label: 'LinkedIn',
    value: 'in/dipen-bambhaniya',
    href: profile.linkedin,
  },
  {
    label: 'Résumé',
    value: 'Download PDF',
    href: withBasePath(profile.resumePath),
  },
];

export default function Contact() {
  return (
    <section id="contact">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          index="07"
          title="Get in touch"
          subtitle="Open to conversations about backend architecture, payments, and distributed systems roles. The fastest way to reach me is email."
        />

        <div className="grid gap-3 sm:grid-cols-2">
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.href.startsWith('http') ? '_blank' : undefined}
              rel={channel.href.startsWith('http') ? 'noreferrer noopener' : undefined}
              className="group flex items-center justify-between rounded-xl border border-line bg-surface px-5 py-4 transition-colors hover:border-accent"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-faint">
                  {channel.label}
                </p>
                <p className="mt-1 text-sm font-medium transition-colors group-hover:text-accent">
                  {channel.value}
                </p>
              </div>
              <span
                className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
