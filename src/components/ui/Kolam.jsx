/**
 * Kolam ornament primitives.
 *
 * A kolam is the looping line South Indian households draw around a lattice of
 * dots (pulli) at a threshold each morning. It is the cheapest possible way to
 * give this kiosk a regional identity: everything here is vector or CSS, so no
 * ornament image ever ships.
 *
 * Discipline: ornament never carries information, never competes with text for
 * contrast, and is always aria-hidden. In high-contrast mode the pulli texture
 * switches off entirely — decoration is noise for the people who need that mode.
 */

/**
 * Four interlaced corner brackets on a container. Wrap anything; it positions
 * absolutely and never intercepts touches.
 *
 * The glyph is drawn large (56 unit viewBox) so the loop and its pulli dot stay
 * legible rather than collapsing into a stray slash at kiosk distance.
 */
export function KolamFrame({ inset = 16, size = 44, className = '' }) {
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
          viewBox="0 0 56 56"
          width={size}
          height={size}
          className="absolute"
          style={{ ...position, transform: `rotate(${rotate}deg)` }}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* outer sweep, running the full length of both edges */}
          <path d="M2 54V22C2 10.9 10.9 2 22 2h32" strokeWidth="1.6" />
          {/* inner loop that curls back on itself — the kolam gesture */}
          <path
            d="M12 54V26c0-7.7 6.3-14 14-14h28"
            strokeWidth="1.2"
            opacity="0.75"
          />
          <path
            d="M22 22a6 6 0 1 1 8.5 5.4"
            strokeWidth="1.2"
            opacity="0.75"
          />
          {/* the pulli the loop is drawn around */}
          <circle cx="25" cy="25" r="2" fill="currentColor" stroke="none" />
        </svg>
      ))}
    </div>
  );
}

/**
 * Horizontal divider: tapering rules running out to a centred lotus.
 *
 * Deliberately not preserveAspectRatio="none" — squashing the lotus to fill an
 * arbitrary width turned it into something that read as an eye.
 */
export function KolamRule({ className = '', width = 280 }) {
  const height = Math.round(width * 0.05);
  return (
    <svg
      viewBox="0 0 280 14"
      width={width}
      height={Math.max(height, 14)}
      className={`text-gold ${className}`}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      data-ornament
    >
      <path d="M0 7h96" strokeWidth="1" opacity="0.55" />
      <path d="M280 7h-96" strokeWidth="1" opacity="0.55" />
      <circle cx="104" cy="7" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="176" cy="7" r="1.6" fill="currentColor" stroke="none" />
      {/* lotus: four petals around a centre dot */}
      <g strokeWidth="1.1" strokeLinejoin="round">
        <path d="M140 1c3.6 2.4 5.4 4.2 5.4 6s-2.4 4-5.4 4-5.4-2.2-5.4-4 1.8-3.6 5.4-6Z" />
        <path d="M140 13c-3.6-2.4-5.4-4.2-5.4-6" />
        <path d="M128 7c2.6-2 4.4-2.6 6.6-2.6" />
        <path d="M152 7c-2.6-2-4.4-2.6-6.6-2.6" />
      </g>
      <circle cx="140" cy="7" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** A small lotus used as a section marker before headings and in the wordmark. */
export function KolamMark({ className = '', size = 24 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`shrink-0 text-saffron-deep ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden="true"
      data-ornament
    >
      {/* centre petal */}
      <path d="M12 2.5c3 3.2 4.5 5.6 4.5 7.6S14.5 14 12 14s-4.5-1.9-4.5-3.9S9 6.5 12 2.5Z" />
      {/* side petals */}
      <path d="M7.6 9.4C5 8.2 3 8.6 1.8 10.4c1.6 2.6 4 3.6 6.4 3" />
      <path d="M16.4 9.4c2.6-1.2 4.6-.8 5.8 1-1.6 2.6-4 3.6-6.4 3" />
      {/* base */}
      <path d="M5.5 16.5c1.8 2.4 3.9 3.6 6.5 3.6s4.7-1.2 6.5-3.6" />
    </svg>
  );
}
