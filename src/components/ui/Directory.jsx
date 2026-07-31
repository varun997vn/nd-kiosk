import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import EdgeFadeScroll from './EdgeFadeScroll';

/**
 * The scrolling list rail used by both the Institutions and Global Presence
 * hubs. Those two pages each carried their own copy of this list, its selected
 * state, and its sessionStorage scroll persistence.
 *
 * Rows are 96px — DESIGN.md's "Feature Strip": high-density lists are the wrong
 * shape for a screen operated standing up with a finger.
 */
export function Directory({ title, count, storageKey, className = '', children }) {
  return (
    <div
      className={`flex min-h-0 flex-col rounded-[var(--radius-lg)] border border-line bg-surface-sunk pulli ${className}`}
    >
      {title && (
        <div className="flex shrink-0 items-baseline justify-between border-b border-line px-7 py-5">
          <h2 className="font-sans text-label font-bold uppercase tracking-[0.08em] text-ink-muted">
            {title}
          </h2>
          {count != null && (
            <span className="font-sans text-label text-ink-muted">{count}</span>
          )}
        </div>
      )}
      <EdgeFadeScroll storageKey={storageKey} className="min-h-0 flex-1 p-4">
        <ul className="flex flex-col gap-3">{children}</ul>
      </EdgeFadeScroll>
    </div>
  );
}

export function DirectoryRow({
  label,
  meta,
  selected = false,
  onSelect,
  onPointerEnter,
  trailing,
}) {
  return (
    <li>
      <motion.button
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.12 }}
        onClick={onSelect}
        onPointerEnter={onPointerEnter}
        aria-current={selected ? 'true' : undefined}
        className={[
          'flex w-full min-h-[96px] items-center gap-5 rounded-[var(--radius-md)]',
          'border px-6 py-4 text-left transition-colors duration-200',
          selected
            ? 'border-saffron bg-surface-tint shadow-[var(--shadow-1)]'
            : 'border-line bg-surface-raised hover:bg-surface-tint',
        ].join(' ')}
      >
        {/* A saffron spine on the selected row: legible at distance without
            relying on the background tint alone. */}
        <span
          aria-hidden="true"
          className={`h-12 w-1.5 shrink-0 rounded-full transition-colors ${
            selected ? 'bg-saffron' : 'bg-line-strong'
          }`}
        />
        <span className="min-w-0 flex-1">
          <span className="block font-serif text-title leading-snug text-ink">
            {label}
          </span>
          {meta && (
            <span className="mt-0.5 block font-sans text-body text-ink-muted">
              {meta}
            </span>
          )}
        </span>
        {trailing ?? (
          <ChevronRight
            size={30}
            aria-hidden="true"
            className={selected ? 'text-saffron-deep' : 'text-ink-faint'}
          />
        )}
      </motion.button>
    </li>
  );
}
