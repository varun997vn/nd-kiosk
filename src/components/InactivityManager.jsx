import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useKioskSettings } from '../context/KioskSettingsContext';

const NUDGE_AFTER = 60_000;
const RESET_AFTER = 90_000;

/**
 * Two-stage idle handling: a gentle nudge at 60s, a full return to the attract
 * screen at 90s.
 *
 * The reset also clears display settings. A visitor who turned on high contrast
 * should not hand that state to the next person who walks up.
 */
export default function InactivityManager({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetSettings } = useKioskSettings();
  const [nudging, setNudging] = useState(false);

  const nudgeTimer = useRef(null);
  const resetTimer = useRef(null);

  const restart = useCallback(() => {
    setNudging(false);
    clearTimeout(nudgeTimer.current);
    clearTimeout(resetTimer.current);

    // The attract screen is the idle state; it does not time out of itself.
    if (location.pathname === '/') return;

    nudgeTimer.current = setTimeout(() => setNudging(true), NUDGE_AFTER);
    resetTimer.current = setTimeout(() => {
      resetSettings();
      navigate('/', { replace: true });
    }, RESET_AFTER);
  }, [location.pathname, navigate, resetSettings]);

  useEffect(() => {
    const events = ['touchstart', 'mousemove', 'mousedown', 'keydown', 'scroll'];
    events.forEach((e) => window.addEventListener(e, restart, { passive: true }));
    restart();

    return () => {
      events.forEach((e) => window.removeEventListener(e, restart));
      clearTimeout(nudgeTimer.current);
      clearTimeout(resetTimer.current);
    };
  }, [restart]);

  return (
    <>
      {children}
      <AnimatePresence>
        {nudging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 z-[9998] grid place-items-center"
            style={{ backgroundColor: 'rgb(250 244 232 / 0.72)' }}
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              className="grid h-56 w-56 place-items-center rounded-full border-4 border-saffron bg-surface-raised shadow-[var(--shadow-3)]"
            >
              <span className="px-8 text-center font-serif text-title text-saffron-ink">
                Touch to continue
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
