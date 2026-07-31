import { createContext, useContext } from 'react';

/**
 * Split from the provider component so the module exports only non-components —
 * mixing a hook and a component in one file breaks React Fast Refresh.
 */
export const KioskSettingsContext = createContext(null);

export function useKioskSettings() {
  const ctx = useContext(KioskSettingsContext);
  if (!ctx) {
    throw new Error('useKioskSettings must be used inside KioskSettingsProvider');
  }
  return ctx;
}
