export default function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10">
      <div className="mb-2.5 flex items-center gap-3">
        <span className="font-mono text-xs font-medium text-accent">{index}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
