import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { institutionsData } from '../data';

export default function InstitutionDetail() {
  const { id } = useParams();
  const data = institutionsData[id];
  const [activeTab, setActiveTab] = useState('routine');

  if (!data) {
    return (
      <div style={{ padding: '60px', color: 'var(--color-text-primary)' }}>
        <h1>Content not found</h1>
      </div>
    );
  }

  const tabLabels = {
    routine: 'Daily Routine',
    darshan: 'Darshan Timings',
    festivals: 'Festivals'
  };

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
        flexDirection: 'column',
        paddingBottom: 'var(--nav-height)',
        overflowY: 'auto'
      }}
    >
      {/* Lush Hero Header */}
      <div style={{
        width: '100%',
        height: '45vh',
        backgroundImage: `url('${data.heroImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        flexShrink: 0
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to top, var(--color-bg-base) 0%, rgba(0,0,0,0.1) 80%)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '60px',
          right: '60px'
        }}>
          <h1 style={{ fontSize: '4.5rem', color: 'var(--color-accent-gold)', margin: 0, textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>
            {data.name}
          </h1>
          <p style={{ fontSize: '1.8rem', color: 'white', opacity: 0.9 }}>{data.location}</p>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '40px 60px', display: 'flex', gap: '40px', flex: 1 }}>
        {/* Left Col: Info & Tabs */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <p style={{ fontSize: '1.4rem', lineHeight: 1.8, color: 'var(--color-text-primary)' }}>
            {data.description}
          </p>

          <div className="glass-panel" style={{ flex: 1, padding: '30px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
              {Object.keys(tabLabels).map(key => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  style={{
                    fontSize: '1.4rem',
                    color: activeTab === key ? 'var(--color-accent-gold)' : 'var(--color-text-secondary)',
                    fontWeight: activeTab === key ? 600 : 400,
                    position: 'relative'
                  }}
                >
                  {tabLabels[key]}
                  {activeTab === key && (
                    <motion.div
                      layoutId="tab-indicator"
                      style={{
                        position: 'absolute',
                        bottom: '-22px',
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: 'var(--color-accent-gold)'
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
            
            <div style={{ paddingTop: '30px', fontSize: '1.3rem', lineHeight: 1.8, color: 'var(--color-text-primary)', flex: 1 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {data.tabs[activeTab]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Col: Image Gallery */}
        <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {data.images.map((img, idx) => (
            <div 
              key={idx}
              className="glass-panel"
              style={{
                width: '100%',
                height: '250px',
                backgroundImage: `url('${img}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 'var(--border-radius-md)'
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
