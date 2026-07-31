import { useCallback, useEffect, useMemo, useState } from 'react';
import { KioskSettingsContext } from './kioskSettings';

/**
 * Kiosk-wide display settings.
 *
 * Deliberately in memory only — never localStorage. A kiosk serves a new
 * visitor every few minutes, and a high-contrast mode left stuck on by the
 * previous person is a support call. InactivityManager resets it along with
 * everything else when the screen returns to the attract loop.
 */
export function KioskSettingsProvider({ children }) {
  const [highContrast, setHighContrast] = useState(false);

  // The whole theme is token-driven, so flipping one attribute on <html>
  // re-themes every component without any of them knowing about it.
  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.dataset.contrast = 'high';
    } else {
      delete root.dataset.contrast;
    }
  }, [highContrast]);

  const toggleHighContrast = useCallback(() => setHighContrast((v) => !v), []);
  const resetSettings = useCallback(() => setHighContrast(false), []);

  const value = useMemo(
    () => ({ highContrast, toggleHighContrast, resetSettings }),
    [highContrast, toggleHighContrast, resetSettings]
  );

  return (
    <KioskSettingsContext.Provider value={value}>
      {children}
    </KioskSettingsContext.Provider>
  );
}
