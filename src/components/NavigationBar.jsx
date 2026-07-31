import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Contrast, Home } from 'lucide-react';
import TouchButton from './ui/TouchButton';
import { useKioskSettings } from '../context/kioskSettings';

/**
 * The persistent bottom bar.
 *
 * Three changes from the old one worth naming:
 *  - The contrast button previously had no onClick at all. It now toggles high
 *    contrast, reports state via aria-pressed, and shows it visually.
 *  - Every control is labelled. Icon-only buttons assume prior knowledge, which
 *    is exactly what a walk-up kiosk cannot assume.
 *  - Home is centred by a 3-column grid rather than by a 130px spacer div
 *    hand-tuned to match the Back button's width.
 */
export default function NavigationBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { highContrast, toggleHighContrast } = useKioskSettings();

  if (pathname === '/') return null;

  const atHome = pathname === '/home';

  return (
    <nav
      className="absolute inset-x-0 bottom-0 z-50 grid grid-cols-3 items-center border-t border-line-strong bg-surface px-[var(--space-edge)]"
      style={{ height: 'var(--nav-height)' }}
    >
      {/* A gold kolam hairline where the bar meets the page. */}
      <span
        aria-hidden="true"
        data-ornament
        className="absolute inset-x-0 top-0 h-px bg-gold/40"
      />

      <div className="justify-self-start">
        {!atHome && (
          <TouchButton variant="secondary" onClick={() => navigate(-1)}>
            <ArrowLeft size={30} aria-hidden="true" />
            Back
          </TouchButton>
        )}
      </div>

      <div className="justify-self-center">
        <TouchButton
          variant="primary"
          size="lg"
          onClick={() => navigate('/home')}
          aria-current={atHome ? 'page' : undefined}
        >
          <Home size={30} aria-hidden="true" />
          Home
        </TouchButton>
      </div>

      <div className="justify-self-end">
        <TouchButton
          variant={highContrast ? 'primary' : 'secondary'}
          onClick={toggleHighContrast}
          aria-pressed={highContrast}
          aria-label="High contrast mode"
        >
          <Contrast size={30} aria-hidden="true" />
          Contrast
        </TouchButton>
      </div>
    </nav>
  );
}
