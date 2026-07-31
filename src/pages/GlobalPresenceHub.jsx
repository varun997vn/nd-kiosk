import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { ChevronDown, Minus, Plus, RotateCcw } from 'lucide-react';
import PageShell from '../components/ui/PageShell';
import PageHeader from '../components/ui/PageHeader';
import EdgeFadeScroll from '../components/ui/EdgeFadeScroll';
import TouchButton from '../components/ui/TouchButton';
import { namadwaarData } from '../namadwaarData';

// Bundled, not fetched. This used to point at a jsDelivr URL, which left the
// map blank on a kiosk with no network — the one failure mode this screen
// cannot tolerate, since the map *is* the screen.
import geoUrl from '../assets/countries-110m.json?url';

const HOME_VIEW = { coordinates: [10, 20], zoom: 1 };
const CLUSTER_ZOOM = 2;

/** Camera preset per country, and the locations that belong to it. */
const COUNTRY_VIEWS = {
  India: { center: [78.5, 11.5], zoom: 5.5 },
  USA: { center: [-98, 38], zoom: 3 },
  Canada: { center: [-113.4, 53.5], zoom: 3.5 },
  Australia: { center: [135, -28], zoom: 3.5 },
  Malaysia: { center: [101.5, 3], zoom: 5.5 },
  Singapore: { center: [103.8, 1.3], zoom: 5.5 },
  'New Zealand': { center: [174.7, -41], zoom: 5 },
  Fiji: { center: [178.4, -18.1], zoom: 5 },
};

// Singapore and Malaysia sit almost on top of each other at world zoom, so the
// Singapore cluster bubble is nudged clear of Malaysia's.
const CLUSTER_OFFSETS = { Singapore: [107, -1] };

const ALL_LOCATIONS = [
  ...namadwaarData.india.map((l) => ({ ...l, country: 'India' })),
  ...namadwaarData.international,
];

const BY_COUNTRY = ALL_LOCATIONS.reduce((acc, location) => {
  (acc[location.country] ??= []).push(location);
  return acc;
}, {});

const COUNTRY_NAMES = Object.keys(COUNTRY_VIEWS);

export default function GlobalPresenceHub() {
  const [view, setView] = useState(HOME_VIEW);
  const [expanded, setExpanded] = useState('India');
  const [activeId, setActiveId] = useState(null);
  const [focusedCountry, setFocusedCountry] = useState(null);

  const zoomedIn = view.zoom >= CLUSTER_ZOOM;

  const clusters = useMemo(
    () =>
      COUNTRY_NAMES.map((name) => ({
        name,
        count: BY_COUNTRY[name]?.length ?? 0,
        coords: CLUSTER_OFFSETS[name] ?? COUNTRY_VIEWS[name].center,
      })),
    []
  );

  const pins = focusedCountry ? BY_COUNTRY[focusedCountry] : ALL_LOCATIONS;

  const flyToCountry = (name) => {
    setExpanded(name);
    setFocusedCountry(name);
    setActiveId(null);
    setView(COUNTRY_VIEWS[name]);
  };

  const flyToLocation = (location) => {
    setFocusedCountry(location.country);
    setExpanded(location.country);
    setActiveId(location.id);
    setView({
      coordinates: location.coords,
      zoom: Math.max(5.5, (COUNTRY_VIEWS[location.country]?.zoom ?? 1) + 1.5),
    });
  };

  const reset = () => {
    setView(HOME_VIEW);
    setFocusedCountry(null);
    setActiveId(null);
  };

  return (
    <PageShell>
      <PageHeader
        title="Global Presence"
        subtitle={
          focusedCountry
            ? `Namadwaars in ${focusedCountry}`
            : `${ALL_LOCATIONS.length} doorways to the Divine Name, across ${COUNTRY_NAMES.length} countries.`
        }
        actions={
          <div className="flex items-center gap-3">
            <TouchButton
              variant="secondary"
              aria-label="Zoom out"
              onClick={() =>
                setView((v) => ({ ...v, zoom: Math.max(v.zoom / 1.5, 1) }))
              }
            >
              <Minus size={28} aria-hidden="true" />
            </TouchButton>
            <TouchButton
              variant="secondary"
              aria-label="Zoom in"
              onClick={() =>
                setView((v) => ({ ...v, zoom: Math.min(v.zoom * 1.5, 12) }))
              }
            >
              <Plus size={28} aria-hidden="true" />
            </TouchButton>
            <TouchButton variant="outline" onClick={reset}>
              <RotateCcw size={26} aria-hidden="true" />
              Reset
            </TouchButton>
          </div>
        }
      />

      <div className="mt-8 grid min-h-0 flex-1 grid-cols-[520px_1fr] gap-10">
        {/* Directory, grouped into per-country accordions. */}
        <div className="flex min-h-0 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface-sunk pulli">
          <div className="flex shrink-0 items-baseline justify-between border-b border-line px-7 py-5">
            <h2 className="font-sans text-label font-bold uppercase tracking-[0.08em] text-ink-muted">
              Directory
            </h2>
            <span className="font-sans text-label text-ink-muted">
              {ALL_LOCATIONS.length} centres
            </span>
          </div>

          <EdgeFadeScroll
            storageKey="scroll-global-presence"
            className="min-h-0 flex-1 p-4"
          >
            <div className="flex flex-col gap-3">
              {COUNTRY_NAMES.map((name) => {
                const isOpen = expanded === name;
                const locations = BY_COUNTRY[name] ?? [];

                return (
                  <div
                    key={name}
                    className={`overflow-hidden rounded-[var(--radius-md)] border ${
                      focusedCountry === name
                        ? 'border-saffron'
                        : 'border-line'
                    }`}
                  >
                    <button
                      onClick={() => (isOpen ? flyToCountry(name) : setExpanded(name))}
                      aria-expanded={isOpen}
                      className="flex min-h-[80px] w-full items-center gap-4 bg-surface-raised px-6 py-4 text-left transition-colors hover:bg-surface-tint"
                    >
                      <span className="flex-1 font-serif text-title text-ink">
                        {name}
                      </span>
                      <span className="rounded-full bg-surface-tint px-4 py-1 font-sans text-label font-bold text-saffron-ink">
                        {locations.length}
                      </span>
                      <ChevronDown
                        size={28}
                        aria-hidden="true"
                        className={`text-ink-faint transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
                          className="overflow-hidden border-t border-line bg-surface"
                        >
                          {locations.map((location) => (
                            <li key={location.id}>
                              <button
                                onClick={() => flyToLocation(location)}
                                className={`flex min-h-[72px] w-full flex-col justify-center border-b border-line px-6 py-3 text-left transition-colors last:border-b-0 ${
                                  activeId === location.id
                                    ? 'bg-surface-tint'
                                    : 'hover:bg-surface-tint'
                                }`}
                              >
                                <span className="font-sans text-body font-semibold text-ink">
                                  {location.name}
                                </span>
                                <span className="font-sans text-label text-ink-muted">
                                  {location.address ?? 'Address to be confirmed'}
                                </span>
                              </button>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </EdgeFadeScroll>
        </div>

        <div className="relative min-h-0 overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface-sunk">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 120 }}
            style={{ width: '100%', height: '100%' }}
          >
            <ZoomableGroup
              center={view.coordinates}
              zoom={view.zoom}
              maxZoom={12}
              onMoveEnd={setView}
              transitionDuration={800}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="var(--color-surface-raised)"
                      stroke="var(--color-line-strong)"
                      strokeWidth={0.4}
                      style={{
                        default: { outline: 'none' },
                        hover: { fill: 'var(--color-surface-tint)', outline: 'none' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Zoomed out: one bubble per country carrying its centre count.
                  Zoomed in: the individual centres. Marker geometry is divided
                  by the zoom so it stays a constant size on screen. */}
              {!zoomedIn &&
                clusters.map((cluster) => {
                  const s = 1 / view.zoom;
                  return (
                    <Marker
                      key={cluster.name}
                      coordinates={cluster.coords}
                      onClick={() => flyToCountry(cluster.name)}
                    >
                      <g className="cursor-pointer">
                        <circle
                          r={24 * s}
                          fill="var(--color-saffron)"
                          stroke="var(--color-surface-raised)"
                          strokeWidth={2.5 * s}
                        />
                        <text
                          textAnchor="middle"
                          y={7 * s}
                          style={{
                            fill: 'var(--color-on-saffron)',
                            fontSize: `${19 * s}px`,
                            fontWeight: 700,
                          }}
                        >
                          {cluster.count}
                        </text>
                        <text
                          textAnchor="middle"
                          y={40 * s}
                          style={{
                            fill: 'var(--color-ink)',
                            fontSize: `${20 * s}px`,
                            fontWeight: 600,
                          }}
                        >
                          {cluster.name}
                        </text>
                      </g>
                    </Marker>
                  );
                })}

              {zoomedIn &&
                pins.map((location) => {
                  const s = 1 / view.zoom;
                  const isActive = activeId === location.id;
                  return (
                    <Marker
                      key={location.id}
                      coordinates={location.coords}
                      onClick={() => flyToLocation(location)}
                    >
                      {isActive && (
                        <circle
                          r={9 * s}
                          fill="none"
                          stroke="var(--color-saffron)"
                          strokeWidth={2 * s}
                          className="animate-[pin-pulse_2s_ease-out_infinite]"
                          style={{
                            transformBox: 'fill-box',
                            transformOrigin: 'center',
                          }}
                        />
                      )}
                      <circle
                        r={(isActive ? 8 : 5) * s}
                        fill={
                          isActive
                            ? 'var(--color-kumkum)'
                            : 'var(--color-saffron)'
                        }
                        stroke="var(--color-surface-raised)"
                        strokeWidth={1.6 * s}
                        className="cursor-pointer"
                      />
                      {isActive && (
                        <text
                          textAnchor="middle"
                          y={-22 * s}
                          className="pointer-events-none"
                          style={{
                            fill: 'var(--color-ink)',
                            fontSize: `${20 * s}px`,
                            fontWeight: 700,
                          }}
                        >
                          {location.name.split(' (')[0]}
                        </text>
                      )}
                    </Marker>
                  );
                })}
            </ZoomableGroup>
          </ComposableMap>

          {!zoomedIn && (
            <p className="pointer-events-none absolute inset-x-0 bottom-6 text-center font-sans text-body text-ink-muted">
              Touch a country to explore its Namadwaars
            </p>
          )}
        </div>
      </div>
    </PageShell>
  );
}
