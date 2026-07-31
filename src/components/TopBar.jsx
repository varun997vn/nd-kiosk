import { useLocation } from 'react-router-dom';
import { KolamMark } from './ui/Kolam';

/**
 * A persistent wordmark strip. Visitors arrive mid-journey — someone else may
 * have left the kiosk three screens deep — so the app should always say what it
 * is without them having to navigate home to find out.
 */
export default function TopBar() {
  const { pathname } = useLocation();
  if (pathname === '/') return null;

  return (
    <header
      className="absolute inset-x-0 top-0 z-40 flex items-center gap-4 border-b border-line bg-surface/90 px-[var(--space-edge)]"
      style={{ height: 'var(--topbar-height)' }}
    >
      <KolamMark size={26} />
      <span className="font-serif text-title font-semibold text-saffron-ink">
        In the Path of Love
      </span>
      <span className="ml-auto font-sans text-label uppercase tracking-[0.08em] text-ink-faint">
        Namadwaar
      </span>
    </header>
  );
}
