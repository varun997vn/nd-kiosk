import { useEffect, useState } from 'react';

const CANVAS_W = 1920;
const CANVAS_H = 1080;

/**
 * Pins the app to a fixed 1920x1080 canvas and scales that canvas to fit
 * whatever it is actually displayed on.
 *
 * The target hardware is a single known landscape panel, so laying out against
 * a fixed canvas is both simpler and more faithful than reflowing: it lets
 * every page be authored in absolute px instead of the ~120 ad-hoc
 * clamp()/vh/vw expressions the old build used to approximate the same thing —
 * expressions that silently clipped content at aspect ratios nobody tested.
 *
 * On the kiosk the scale is exactly 1, so nothing is resampled. On a laptop or
 * a differently-sized panel the whole UI scales down proportionally inside an
 * ink letterbox rather than breaking.
 */
export default function KioskViewport({ children }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fit = () => {
      setScale(
        Math.min(window.innerWidth / CANVAS_W, window.innerHeight / CANVAS_H)
      );
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <div className="fixed inset-0 grid place-items-center overflow-hidden bg-ink">
      <div
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          transform: `scale(${scale})`,
          transformOrigin: 'center',
        }}
        className="pulli relative shrink-0 overflow-hidden bg-surface"
      >
        {children}
      </div>
    </div>
  );
}
