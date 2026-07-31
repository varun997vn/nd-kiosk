/**
 * Kolam ornament primitives.
 *
 * A kolam is the looping line South Indian households draw around a lattice of
 * dots (pulli) at a threshold each morning. It is the cheapest possible way to
 * give this kiosk a regional identity: everything here is vector or CSS, so no
 * ornament image ever ships.
 *
 * Discipline: ornament never carries information, never competes with text for
 * contrast, and is always aria-hidden. In high-contrast mode it recedes further
 * still — decoration is noise for the people who need that mode.
 */

/**
 * Four interlaced corner brackets on a container. Wrap anything; it positions
 * absolutely and never intercepts touches.
 */
export function KolamFrame({ inset = 12, size = 28, className = '' }) {
  const corners = [
    { key: 'tl', rotate: 0, position: { top: inset, left: inset } },
    { key: 'tr', rotate: 90, position: { top: inset, right: inset } },
    { key: 'br', rotate: 180, position: { bottom: inset, right: inset } },
    { key: 'bl', rotate: 270, position: { bottom: inset, left: inset } },
  ];

  return (
    <div
      className={`pointer-events-none absolute inset-0 text-gold ${className}`}
      data-ornament
      aria-hidden="true"
    >
      {corners.map(({ key, rotate, position }) => (
        <svg
          key={key}
          viewBox="0 0 28 28"
          width={size}
          height={size}
          className="absolute"
          style={{ ...position, transform: `rotate(${rotate}deg)` }}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        >
          <path d="M2 12c0-5.5 4.5-10 10-10" />
          <path d="M2 20c0-9.9 8.1-18 18-18" />
          <circle cx="6.5" cy="6.5" r="1.6" fill="currentColor" stroke="none" />
        </svg>
      ))}
    </div>
  );
}

/**
 * Horizontal divider: a tapering rule out to a centred lotus glyph. Sits under
 * every page title and between panel sections.
 */
export function KolamRule({ className = '', width = 240 }) {
  return (
    <svg
      viewBox="0 0 240 16"
      width={width}
      height={16}
      className={`text-gold ${className}`}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      data-ornament
      preserveAspectRatio="none"
    >
      <path d="M0 8h88" strokeWidth="1.2" />
      <path d="M240 8h-88" strokeWidth="1.2" />
      <circle cx="96" cy="8" r="2" fill="currentColor" stroke="none" />
      <circle cx="144" cy="8" r="2" fill="currentColor" stroke="none" />
      {/* lotus: two mirrored petals around a dot */}
      <path
        d="M120 2c5 3 7.5 4.5 7.5 6S125 14 120 14s-7.5-4.5-7.5-6S115 5 120 2Z"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="120" cy="8" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** A small lotus dot used as a section marker before headings. */
export function KolamMark({ className = '', size = 18 }) {
  return (
    <svg
      viewBox="0 0 18 18"
      width={size}
      height={size}
      className={`shrink-0 text-saffron ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      data-ornament
    >
      <path d="M9 1.5c3.2 2 5 3.6 5 5.2S12 11 9 11 4 8.3 4 6.7s1.8-3.2 5-5.2Z" />
      <circle cx="9" cy="14.5" r="1.7" fill="currentColor" stroke="none" />
    </svg>
  );
}
