import { useMemo } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import india from '../assets/india.geo.json';

/**
 * A real map of India with a pin per institution.
 *
 * What was here before was a photograph with two gold dots absolutely
 * positioned at 40%/40% and 60%/50% — not a map, and not connected to the data.
 *
 * Geometry comes from src/assets/india.geo.json, extracted at author time from
 * the bundled world atlas by scripts/extract-india.mjs. Nothing is fetched, so
 * this cannot fail on a kiosk with no network. d3-geo directly rather than
 * react-simple-maps: there is no pan or zoom here, so a projection and a path
 * generator are the whole requirement.
 */
export default function IndiaMap({
  places,
  selectedId,
  onSelect,
  width = 720,
  height = 860,
}) {
  const { path, project } = useMemo(() => {
    const pad = 48;
    const projection = geoMercator().fitExtent(
      [
        [pad, pad],
        [width - pad, height - pad],
      ],
      india
    );
    return { path: geoPath(projection), project: projection };
  }, [width, height]);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-full w-full"
      role="img"
      aria-label="Map of India showing the locations of our institutions"
    >
      {/* An offset copy behind the landmass, as a soft cast edge rather than a
          drop shadow — the system uses tonal layers, not elevation blur. */}
      <path
        d={path(india)}
        transform="translate(4, 6)"
        fill="var(--color-line-strong)"
        opacity="0.35"
      />
      <path
        d={path(india)}
        fill="var(--color-surface-raised)"
        stroke="var(--color-line-strong)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {places.map((place) => {
        if (!place.coords) return null;
        const [x, y] = project(place.coords);
        const isSelected = place.id === selectedId;

        return (
          <g
            key={place.id}
            transform={`translate(${x}, ${y})`}
            onClick={() => onSelect?.(place.id)}
            className="cursor-pointer"
          >
            {/* A generous invisible hit area: the visible pin is 11px, which is
                nowhere near a fingertip. */}
            <circle r="34" fill="transparent" />

            {isSelected && (
              <circle
                r="11"
                fill="none"
                stroke="var(--color-saffron)"
                strokeWidth="2.5"
                className="animate-[pin-pulse_2s_ease-out_infinite]"
                // transform-box: fill-box is required here — without it an SVG
                // element's transform-origin resolves against the whole SVG
                // viewport, so the halo scales from the map's centre instead of
                // from its own pin.
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              />
            )}
            <circle
              r={isSelected ? 11 : 8}
              fill={isSelected ? 'var(--color-kumkum)' : 'var(--color-saffron)'}
              stroke="var(--color-surface-raised)"
              strokeWidth="2.5"
            />
            {isSelected && (
              <text
                y="-24"
                textAnchor="middle"
                className="font-sans font-semibold"
                style={{ fontSize: 20, fill: 'var(--color-ink)' }}
              >
                {place.shortName ?? place.name}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
