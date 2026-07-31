/**
 * Browser-level kiosk behaviour: things that have to happen to the document,
 * not to a component.
 *
 * Everything here is feature-detected and failure-tolerant. A kiosk browser in
 * an ashram hall and a developer's laptop run the same bundle, and none of this
 * may throw on the laptop.
 */

let wakeLock = null;

async function acquireWakeLock() {
  if (!('wakeLock' in navigator)) return;
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release', () => {
      wakeLock = null;
    });
  } catch {
    // Denied, or the document is hidden. The screensaver may kick in; that is
    // strictly better than crashing the attract loop.
  }
}

/**
 * Fullscreen and wake lock both require a user gesture, so this is called from
 * the first tap on the attract screen rather than on mount.
 */
export async function enterKioskMode() {
  const el = document.documentElement;
  if (!document.fullscreenElement && el.requestFullscreen) {
    try {
      await el.requestFullscreen({ navigationUI: 'hide' });
    } catch {
      // Fullscreen is often blocked outside a real kiosk browser. Not fatal.
    }
  }
  await acquireWakeLock();
}

/**
 * Suppresses the browser affordances that have no meaning on an unattended
 * public touchscreen: the long-press context menu, drag-to-save on images, and
 * pinch-to-zoom (which the viewport meta alone does not stop in every engine).
 *
 * Returns a cleanup function.
 */
export function installKioskGuards() {
  const swallow = (e) => e.preventDefault();

  const blockPinch = (e) => {
    if (e.touches && e.touches.length > 1) e.preventDefault();
  };

  const reacquireWakeLock = () => {
    if (document.visibilityState === 'visible' && wakeLock === null) {
      acquireWakeLock();
    }
  };

  document.addEventListener('contextmenu', swallow);
  document.addEventListener('dragstart', swallow);
  document.addEventListener('selectstart', swallow);
  document.addEventListener('gesturestart', swallow);
  document.addEventListener('touchmove', blockPinch, { passive: false });
  document.addEventListener('visibilitychange', reacquireWakeLock);

  return () => {
    document.removeEventListener('contextmenu', swallow);
    document.removeEventListener('dragstart', swallow);
    document.removeEventListener('selectstart', swallow);
    document.removeEventListener('gesturestart', swallow);
    document.removeEventListener('touchmove', blockPinch);
    document.removeEventListener('visibilitychange', reacquireWakeLock);
  };
}
