import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * A saffron bloom at every touch point — the kiosk's only confirmation that a
 * tap registered, since there is no cursor and no hover.
 *
 * Coordinates are converted through this element's own bounding box rather than
 * used raw: KioskViewport scales the whole canvas, so a `fixed` child is
 * positioned against the transformed ancestor and viewport-space clientX/Y
 * would land in the wrong place at any scale other than 1.
 */
export default function RippleEffect() {
  const hostRef = useRef(null);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const host = hostRef.current;
      if (!host) return;

      const rect = host.getBoundingClientRect();
      const scale = rect.width / host.offsetWidth || 1;

      const ripple = {
        id: `${e.timeStamp}-${e.clientX}-${e.clientY}`,
        x: (e.clientX - rect.left) / scale,
        y: (e.clientY - rect.top) / scale,
      };

      setRipples((prev) => [...prev, ripple]);
      setTimeout(
        () => setRipples((prev) => prev.filter((r) => r.id !== ripple.id)),
        800
      );
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.45 }}
            animate={{ scale: 5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute block h-10 w-10 rounded-full bg-saffron"
            style={{ top: ripple.y - 20, left: ripple.x - 20 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
