import { KolamRule } from './Kolam';

/**
 * Title, subtitle, and the gold kolam rule beneath — the chapter-opening of a
 * printed book, which is the reference this whole system is built on.
 */
export default function PageHeader({
  title,
  subtitle,
  actions,
  className = '',
}) {
  return (
    <header className={`flex shrink-0 items-end justify-between gap-8 ${className}`}>
      <div>
        <h1 className="font-serif text-display-lg text-ink">{title}</h1>
        {subtitle && (
          <p className="mt-2 max-w-4xl font-sans text-body-lg text-ink-muted">
            {subtitle}
          </p>
        )}
        <KolamRule className="mt-4 opacity-70" width={280} />
      </div>
      {actions && <div className="flex shrink-0 items-center gap-4">{actions}</div>}
    </header>
  );
}
