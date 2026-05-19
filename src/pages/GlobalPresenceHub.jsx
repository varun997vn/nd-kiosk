import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { namadwaarData } from '../namadwaarData';

// A simple topojson for the world map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function GlobalPresenceHub() {
  const [activeMarker, setActiveMarker] = useState(null);
  
  const allLocations = [...namadwaarData.india, ...namadwaarData.international];

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
      {/* Left side: Directory List */}
      <div style={{
        width: '400px',
        background: 'var(--color-bg-base)',
        borderRight: 'var(--border-glass)',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 0'
      }}>
        <h2 style={{ padding: '0 40px', fontSize: '2rem', marginBottom: '20px', color: 'var(--color-accent-gold)' }}>
          Directory
        </h2>
        
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <div>
            <h3 style={{ color: 'var(--color-text-secondary)', marginBottom: '12px' }}>In India</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {namadwaarData.india.sort((a,b) => a.name.localeCompare(b.name)).map(location => (
                <button
                  key={location.id}
                  onClick={() => setActiveMarker(location.id)}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    background: activeMarker === location.id ? 'var(--color-bg-card)' : 'transparent',
                    border: activeMarker === location.id ? '1px solid var(--color-accent-gold)' : '1px solid rgba(255,255,255,0.1)',
                    color: activeMarker === location.id ? 'var(--color-accent-gold)' : 'var(--color-text-primary)',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '4px' }}>{location.name}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>{location.address}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ color: 'var(--color-text-secondary)', marginBottom: '12px' }}>International</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {namadwaarData.international.sort((a,b) => a.name.localeCompare(b.name)).map(location => (
                <button
                  key={location.id}
                  onClick={() => setActiveMarker(location.id)}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    background: activeMarker === location.id ? 'var(--color-bg-card)' : 'transparent',
                    border: activeMarker === location.id ? '1px solid var(--color-accent-gold)' : '1px solid rgba(255,255,255,0.1)',
                    color: activeMarker === location.id ? 'var(--color-accent-gold)' : 'var(--color-text-primary)',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '4px' }}>{location.name}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>{location.address}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Map */}
      <div style={{
        flex: 1,
        background: '#0a0f1c', // slightly darker for map
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '40px', left: '40px'
        }}>
          <h1 style={{ fontSize: '3rem', color: 'var(--color-text-primary)', margin: 0 }}>Global Presence</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)' }}>Namadwaars across the globe</p>
        </div>

        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 120 }} style={{ width: '100%', height: '100%' }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="rgba(30, 41, 59, 0.8)"
                  stroke="rgba(255,255,255,0.1)"
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

          {allLocations.map(({ id, name, coords }) => (
            <Marker key={id} coordinates={coords} onClick={() => setActiveMarker(id)}>
              <motion.circle 
                r={activeMarker === id ? 8 : 4} 
                fill="var(--color-accent-gold)"
                animate={{
                  scale: activeMarker === id ? [1, 1.5, 1] : 1,
                  opacity: activeMarker === id ? [1, 0.5, 1] : 1
                }}
                transition={{ repeat: activeMarker === id ? Infinity : 0, duration: 1.5 }}
                style={{ cursor: 'pointer' }}
              />
              {activeMarker === id && (
                <text
                  textAnchor="middle"
                  y={-15}
                  style={{ fontFamily: 'var(--font-body)', fill: "#fff", fontSize: "14px", fontWeight: "bold" }}
                >
                  {name}
                </text>
              )}
            </Marker>
          ))}
        </ComposableMap>
      </div>
    </motion.div>
  );
}
