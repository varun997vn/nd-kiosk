import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';
import { namadwaarData } from '../namadwaarData';

// A simple topojson for the world map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function GlobalPresenceHub() {
  const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 1 });
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [expandedCountry, setExpandedCountry] = useState('India');
  
  const listRef = useRef(null);

  // Group locations by country
  const countries = {
    India: {
      name: 'India',
      center: [78.5, 11.5],
      zoom: 5.5,
      locations: namadwaarData.india
    },
    USA: {
      name: 'USA',
      center: [-98.0, 38.0],
      zoom: 3.0,
      locations: namadwaarData.international.filter(l => l.name.includes('(USA)'))
    },
    Australia: {
      name: 'Australia',
      center: [135.0, -28.0],
      zoom: 3.5,
      locations: namadwaarData.international.filter(l => l.name.includes('(Australia)'))
    },
    Canada: {
      name: 'Canada',
      center: [-113.4, 53.5],
      zoom: 3.5,
      locations: namadwaarData.international.filter(l => l.name.includes('(Canada)'))
    },
    Malaysia: {
      name: 'Malaysia',
      center: [101.5, 3.0],
      zoom: 5.5,
      locations: namadwaarData.international.filter(l => l.id === 'malaysia')
    },
    Singapore: {
      name: 'Singapore',
      center: [103.8, 1.3],
      zoom: 5.5,
      locations: namadwaarData.international.filter(l => l.id === 'singapore')
    },
    'New Zealand': {
      name: 'New Zealand',
      center: [174.7, -41.0],
      zoom: 5.0,
      locations: namadwaarData.international.filter(l => l.id === 'nz')
    },
    Fiji: {
      name: 'Fiji',
      center: [178.4, -18.1],
      zoom: 5.0,
      locations: namadwaarData.international.filter(l => l.id === 'fiji')
    }
  };

  const allLocations = [...namadwaarData.india, ...namadwaarData.international];

  // Retrieve country from location
  const getLocationCountry = (loc) => {
    if (namadwaarData.india.some(l => l.id === loc.id)) return 'India';
    if (loc.name.includes('(USA)')) return 'USA';
    if (loc.name.includes('(Australia)')) return 'Australia';
    if (loc.name.includes('(Canada)')) return 'Canada';
    if (loc.id === 'malaysia') return 'Malaysia';
    if (loc.id === 'singapore') return 'Singapore';
    if (loc.id === 'nz') return 'New Zealand';
    if (loc.id === 'fiji') return 'Fiji';
    return null;
  };

  // Setup country cluster markers for zoom level 1
  const clusterMarkers = Object.values(countries).map(c => {
    let displayCoords = c.center;
    if (c.name === 'Singapore') displayCoords = [107.0, -1.0]; // Offset visually
    return {
      name: c.name,
      coords: displayCoords,
      actualCenter: c.center,
      count: c.locations.length,
      zoomTo: c.zoom
    };
  });

  useEffect(() => {
    const savedScroll = sessionStorage.getItem('scroll-global-presence');
    if (savedScroll && listRef.current) {
      const timer = setTimeout(() => {
        listRef.current.scrollTop = parseInt(savedScroll, 10);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleScroll = (e) => {
    sessionStorage.setItem('scroll-global-presence', e.target.scrollTop);
  };

  const handleCountryClick = (countryName) => {
    setExpandedCountry(countryName);
    setSelectedCountry(countryName);
    setActiveMarker(null);
    setPosition({
      coordinates: countries[countryName].center,
      zoom: countries[countryName].zoom
    });
  };

  const handleLocationClick = (loc) => {
    const country = getLocationCountry(loc);
    setSelectedCountry(country);
    setExpandedCountry(country);
    setActiveMarker(loc.id);
    setPosition({
      coordinates: loc.coords,
      zoom: Math.max(5.5, (countries[country]?.zoom || 1) + 1.5)
    });
  };

  const handleResetZoom = () => {
    setPosition({ coordinates: [0, 20], zoom: 1 });
    setSelectedCountry(null);
    setActiveMarker(null);
  };

  const handleZoomIn = () => {
    setPosition(pos => ({ ...pos, zoom: Math.min(pos.zoom * 1.5, 12) }));
  };

  const handleZoomOut = () => {
    setPosition(pos => ({ ...pos, zoom: Math.max(pos.zoom / 1.5, 1) }));
  };

  const isZoomed = position.zoom >= 2;

  // Filter locations to display on map when zoomed in
  const visibleLocations = selectedCountry 
    ? countries[selectedCountry].locations 
    : allLocations;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        paddingBottom: 'var(--nav-height)'
      }}
    >
      <style>{`
        @keyframes markerPulse {
          0% { opacity: 1; stroke-width: 2px; }
          100% { opacity: 0; stroke-width: 15px; }
        }
        .marker-glow {
          animation: markerPulse 1.5s infinite;
        }
      `}</style>
      {/* Left side: Directory List */}
      <div style={{
        width: '400px',
        background: 'var(--color-bg-base)',
        borderRight: 'var(--border-glass)',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 0',
        flexShrink: 0
      }}>
        <h2 style={{ padding: '0 40px', fontSize: '2rem', marginBottom: '20px', color: 'var(--color-accent-gold)' }}>
          Directory
        </h2>
        
        <div 
          ref={listRef}
          onScroll={handleScroll}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {Object.values(countries).map((country) => {
            const isExpanded = expandedCountry === country.name;
            return (
              <div key={country.name} style={{ display: 'flex', flexDirection: 'column' }}>
                <button
                  onClick={() => handleCountryClick(country.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderRadius: '8px',
                    background: selectedCountry === country.name ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.03)',
                    border: selectedCountry === country.name ? '1px solid var(--color-accent-gold)' : '1px solid rgba(255,255,255,0.05)',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span>{country.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--color-accent-gold)', fontSize: '0.9rem' }}>
                      ({country.locations.length} {country.locations.length === 1 ? 'center' : 'centers'})
                    </span>
                    {isExpanded ? <ChevronUp size={20} color="var(--color-accent-gold)" /> : <ChevronDown size={20} color="var(--color-accent-gold)" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px', paddingLeft: '8px' }}
                    >
                      {country.locations.sort((a,b) => a.name.localeCompare(b.name)).map(location => (
                        <button
                          key={location.id}
                          onClick={() => handleLocationClick(location)}
                          style={{
                            padding: '12px 16px',
                            borderRadius: '6px',
                            background: activeMarker === location.id ? 'var(--color-bg-card)' : 'transparent',
                            border: activeMarker === location.id ? '1px solid var(--color-accent-gold)' : '1px solid transparent',
                            color: activeMarker === location.id ? 'var(--color-accent-gold)' : 'var(--color-text-secondary)',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div style={{ fontWeight: 600, marginBottom: '2px', color: activeMarker === location.id ? 'var(--color-accent-gold)' : 'white' }}>
                            {location.name.split(' (')[0]}
                          </div>
                          <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{location.address}</div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right side: Map */}
      <div style={{
        flex: 1,
        background: '#0a0f1c', // slightly darker for map
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '40px', left: '40px',
          zIndex: 5,
          pointerEvents: 'none'
        }}>
          <h1 style={{ fontSize: '3rem', color: 'var(--color-text-primary)', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Global Presence</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', margin: '4px 0 0 0' }}>
            {selectedCountry ? `Viewing centers in ${selectedCountry}` : 'Click a country cluster to explore Namadwaars'}
          </p>
        </div>

        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 120 }} style={{ width: '100%', height: '100%' }}>
          <ZoomableGroup 
            center={position.coordinates} 
            zoom={position.zoom} 
            maxZoom={12}
            onMoveEnd={setPosition}
            transitionDuration={800}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="rgba(30, 41, 59, 0.8)"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "rgba(30, 41, 59, 1)", outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Render Country Clusters when zoomed out */}
            {!isZoomed && clusterMarkers.map((c) => {
              const scale = 1 / position.zoom;
              return (
              <Marker key={c.name} coordinates={c.coords} onClick={() => handleCountryClick(c.name)}>
                <g style={{ cursor: 'pointer' }}>
                  <circle 
                    r={18 * scale}
                    fill="rgba(245, 158, 11, 0.95)"
                    stroke="white"
                    strokeWidth={2 * scale}
                  />
                  <text
                    textAnchor="middle"
                    y={4 * scale}
                    style={{ fontFamily: 'var(--font-heading)', fill: "#0f172a", fontSize: `${11 * scale}px`, fontWeight: "bold" }}
                  >
                    {c.count}
                  </text>
                  <text
                    textAnchor="middle"
                    y={28 * scale}
                    style={{ fontFamily: 'var(--font-body)', fill: "#fff", fontSize: `${12 * scale}px`, fontWeight: "600" }}
                  >
                    {c.name}
                  </text>
                </g>
              </Marker>
            )})}

            {/* Render Individual Markers when zoomed in */}
            {isZoomed && visibleLocations.map((location) => {
              const countryName = getLocationCountry(location);
              const isActive = activeMarker === location.id;
              const scale = 1 / position.zoom;
              return (
                <Marker key={location.id} coordinates={location.coords} onClick={() => handleLocationClick(location)}>
                  {isActive && (
                    <circle
                      r={10 * scale}
                      fill="none"
                      stroke="var(--color-accent-gold)"
                      className="marker-glow"
                    />
                  )}
                  <circle 
                    r={(isActive ? 8 : 4.5) * scale} 
                    fill="var(--color-accent-gold)"
                    stroke="#fff"
                    strokeWidth={(isActive ? 2 : 1) * scale}
                    style={{ cursor: 'pointer' }}
                  />
                  {isActive && (
                    <g style={{ pointerEvents: 'none' }}>
                      <rect 
                        x={-75 * scale} 
                        y={-38 * scale} 
                        width={150 * scale} 
                        height={24 * scale} 
                        rx={6 * scale} 
                        fill="rgba(15, 23, 42, 0.95)" 
                        stroke="var(--color-accent-gold)" 
                        strokeWidth={1.5 * scale} 
                      />
                      <text
                        textAnchor="middle"
                        y={-22 * scale}
                        style={{ fontFamily: 'var(--font-body)', fill: "#fff", fontSize: `${10 * scale}px`, fontWeight: "bold" }}
                      >
                        {location.name.split(' (')[0]}
                      </text>
                    </g>
                  )}
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>

        {/* Floating Zoom Control and Info */}
        <div style={{ position: 'absolute', bottom: '40px', right: '40px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-end', zIndex: 10 }}>
          
          {/* Map Controls */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleZoomOut}
              style={{
                background: 'rgba(15, 23, 42, 0.9)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '12px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Minus size={24} />
            </button>
            <button
              onClick={handleZoomIn}
              style={{
                background: 'rgba(15, 23, 42, 0.9)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '12px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Plus size={24} />
            </button>
          </div>

          {(position.zoom > 1 || selectedCountry !== null) && (
            <button 
              onClick={handleResetZoom}
              style={{
                background: 'var(--color-accent-gold)',
                color: '#0f172a',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '9999px',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)',
                transition: 'transform 0.2s ease'
              }}
            >
              Reset Map View
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
