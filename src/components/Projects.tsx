import { projects } from '@/content/profile';
import SectionHeading from './SectionHeading';

export default function Projects() {
  return (
    <section id="projects" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          index="03"
          title="Selected work"
          subtitle="Systems I designed or led. Client work is described at the architecture level — no proprietary detail, no public repositories."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.name}
              className="group flex flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent/50"
            >
              <p className="font-mono text-[11px] uppercase tracking-wide text-faint">
                {project.context}
              </p>

              <h3 className="mt-2 text-base font-semibold tracking-tight transition-colors group-hover:text-accent">
                {project.name}
              </h3>

              <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-muted">
                {project.blurb}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              {(project.repoUrl || project.liveUrl) && (
                <div className="mt-4 flex items-center gap-4 border-t border-line pt-3.5">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[13px] font-medium text-accent hover:underline"
                    >
                      Source ↗
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[13px] font-medium text-accent hover:underline"
                    >
                      Live ↗
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
