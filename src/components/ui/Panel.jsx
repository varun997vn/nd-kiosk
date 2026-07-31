import { KolamFrame } from './Kolam';

/**
 * The light-theme replacement for the old `.glass-panel`.
 *
 * Depth here is paper, not glass: a warm hairline plus a warm low-contrast
 * shadow. There is no backdrop-filter anywhere in this system — on a cream
 * canvas it produces muddy surfaces and costs GPU on kiosk hardware.
 */
const TONES = {
  raised: 'bg-surface-raised border-line-strong shadow-[var(--shadow-2)]',
  sunk: 'bg-surface-sunk border-line pulli',
  flat: 'bg-surface-raised border-line shadow-[var(--shadow-1)]',
};

export default function Panel({
  tone = 'raised',
  ornament = false,
  className = '',
  children,
  ...props
}) {
  return (
    <div
      className={[
        'relative rounded-[var(--radius-lg)] border',
        TONES[tone],
        className,
      ].join(' ')}
      {...props}
    >
      {ornament && <KolamFrame inset={10} size={24} />}
      {children}
    </div>
  );
}
