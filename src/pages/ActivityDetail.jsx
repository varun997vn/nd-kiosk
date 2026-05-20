import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { activitiesData } from '../activitiesData';

export default function ActivityDetail() {
  const { id } = useParams();
  const data = activitiesData[id];
  const navigate = useNavigate();

  if (!data) {
    return (
      <div style={{ padding: '60px', color: 'var(--color-text-primary)' }}>
        <h1>Activity not found</h1>
        <button className="button-primary" onClick={() => navigate('/activities')}>Back to Activities</button>
      </div>
    );
  }

  const hasImages = data.images && data.images.length > 0;

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
      {/* Hero Header */}
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
          background: 'linear-gradient(to top, var(--color-bg-base) 0%, rgba(0,0,0,0.2) 80%)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '4vw',
          right: '4vw'
        }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vh, 4.5rem)', color: 'var(--color-accent-gold)', margin: 0, textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>
            {data.title}
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2vh, 1.6rem)', color: 'white', opacity: 0.9, maxWidth: '900px', lineHeight: 1.5, marginTop: '1.5vh' }}>
            {data.description}
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '3vh 4vw', flex: 1, display: 'flex', gap: '3vw', minHeight: 0, overflow: 'hidden' }}>
        {/* Left Col: Sections Grid */}
        <div style={{ 
          flex: 1,
          display: 'grid', 
          gridTemplateColumns: data.sections.length > 2 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)', 
          gap: '2vw',
          minHeight: 0,
          overflowY: 'auto',
          paddingRight: '8px'
        }}>
          {data.sections.map((section, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '3vh 2vw', display: 'flex', flexDirection: 'column', height: 'fit-content' }}>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vh, 2rem)', color: 'var(--color-accent-gold)', marginBottom: '1.5vh' }}>
                {section.heading}
              </h2>
              <div style={{ fontSize: 'clamp(0.95rem, 1.7vh, 1.25rem)', color: 'var(--color-text-primary)', lineHeight: 1.6 }}>
                {section.content.split('\n').map((paragraph, i) => (
                  <p key={i} style={{ marginBottom: paragraph.trim() ? '12px' : '0' }}>
                    {paragraph.startsWith('-') || paragraph.startsWith('1)') || paragraph.startsWith('2)') || paragraph.startsWith('3)') 
                      ? <span style={{display: 'block', marginLeft: '16px'}}>{paragraph}</span>
                      : paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Col: Image Gallery */}
        {hasImages && (
          <div style={{ width: '30vw', display: 'flex', flexDirection: 'column', gap: '2vh', flexShrink: 0 }}>
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
        )}
      </div>
    </motion.div>
  );
}
