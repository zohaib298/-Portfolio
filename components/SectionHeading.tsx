export default function SectionHeading({
  eyebrow,
  title,
  number,
}: {
  eyebrow: string;
  title: string;
  /** Optional sequence number (e.g. "01") shown before the eyebrow for section hierarchy. */
  number?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        {number && <span className="font-mono text-sm text-accent">{number}</span>}
        <span className="h-px w-8 bg-accent/40" aria-hidden="true" />
        <p className="text-xs uppercase tracking-[0.35em] text-muted">{eyebrow}</p>
      </div>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
    </div>
  );
}
