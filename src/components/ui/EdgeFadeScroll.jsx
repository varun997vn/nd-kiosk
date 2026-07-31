import { useEffect, useRef, useState } from 'react';

/**
 * A scroll container that fades at whichever edge has more content beyond it.
 *
 * Scrollbars are hidden app-wide, which left the old build with no affordance
 * at all — nothing told a visitor that a list continued below the fold. The
 * DESIGN.md rule is "edge fading instead of scrollbars"; this implements it,
 * and only shows a fade where there is actually something to scroll to.
 *
 * Optionally persists scroll position under `storageKey`, replacing the
 * sessionStorage save/restore that was duplicated in two hub pages.
 */
export default function EdgeFadeScroll({
  storageKey,
  className = '',
  fade = 56,
  children,
  ...props
}) {
  const ref = useRef(null);
  const [edges, setEdges] = useState({ top: false, bottom: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const overflow = el.scrollHeight - el.clientHeight;
      setEdges({
        top: el.scrollTop > 8,
        bottom: overflow > 8 && el.scrollTop < overflow - 8,
      });
      if (storageKey) sessionStorage.setItem(storageKey, String(el.scrollTop));
    };

    if (storageKey) {
      const saved = Number(sessionStorage.getItem(storageKey));
      if (saved) el.scrollTop = saved;
    }

    update();
    el.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, [storageKey]);

  // A mask rather than an overlay gradient, so the fade works over any
  // background without having to know what colour it is.
  const mask = (() => {
    const stops = [];
    stops.push(edges.top ? `transparent 0, black ${fade}px` : 'black 0');
    stops.push(
      edges.bottom
        ? `black calc(100% - ${fade}px), transparent 100%`
        : 'black 100%'
    );
    return `linear-gradient(to bottom, ${stops.join(', ')})`;
  })();

  return (
    <div
      ref={ref}
      className={`overflow-y-auto ${className}`}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
      {...props}
    >
      {children}
    </div>
  );
}
