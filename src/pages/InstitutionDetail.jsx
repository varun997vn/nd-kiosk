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
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 'var(--nav-height)',
        overflow: 'hidden'
      }}
    >
      {/* Lush Hero Header */}
      <div style={{
        width: '100%',
        height: '35vh',
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
          bottom: '3vh',
          left: '4vw',
          right: '4vw'
        }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vh, 4.5rem)', color: 'var(--color-accent-gold)', margin: 0, textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>
            {data.name}
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2vh, 1.8rem)', color: 'white', opacity: 0.9 }}>{data.location}</p>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '3vh 4vw', display: 'flex', gap: '3vw', flex: 1, minHeight: 0 }}>
        {/* Left Col: Info & Tabs */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2vh', overflow: 'hidden' }}>
          <p style={{ 
            fontSize: 'clamp(1rem, 1.8vh, 1.4rem)', 
            lineHeight: 1.6, 
            color: 'var(--color-text-primary)',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {data.description}
          </p>

          <div className="glass-panel" style={{ flex: 1, padding: '2vh 2vw', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: '2vw', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5vh' }}>
              {Object.keys(tabLabels).map(key => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  style={{
                    fontSize: 'clamp(1.1rem, 2vh, 1.4rem)',
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
                        bottom: '-1.5vh',
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
            
            <div style={{ paddingTop: '2vh', fontSize: 'clamp(1rem, 1.8vh, 1.3rem)', lineHeight: 1.6, color: 'var(--color-text-primary)', flex: 1, overflow: 'hidden' }}>
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
        <div style={{ width: '30vw', display: 'flex', flexDirection: 'column', gap: '2vh' }}>
          {data.images.slice(0, 2).map((img, idx) => (
            <div 
              key={idx}
              className="glass-panel"
              style={{
                width: '100%',
                flex: 1,
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
