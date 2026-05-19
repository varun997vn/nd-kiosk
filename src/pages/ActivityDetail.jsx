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
      {/* Hero Header */}
      <div style={{
        width: '100%',
        height: '40vh',
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
          bottom: '40px',
          left: '60px',
          right: '60px'
        }}>
          <h1 style={{ fontSize: '4.5rem', color: 'var(--color-accent-gold)', margin: 0, textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>
            {data.title}
          </h1>
          <p style={{ fontSize: '1.6rem', color: 'white', opacity: 0.9, maxWidth: '800px', lineHeight: 1.5, marginTop: '16px' }}>
            {data.description}
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '40px 60px', flex: 1 }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '40px' 
        }}>
          {data.sections.map((section, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--color-accent-gold)', marginBottom: '20px' }}>
                {section.heading}
              </h2>
              <div style={{ fontSize: '1.3rem', color: 'var(--color-text-primary)', lineHeight: 1.8 }}>
                {section.content.split('\n').map((paragraph, i) => (
                  <p key={i} style={{ marginBottom: paragraph.trim() ? '16px' : '0' }}>
                    {paragraph.startsWith('-') || paragraph.startsWith('1)') || paragraph.startsWith('2)') || paragraph.startsWith('3)') 
                      ? <span style={{display: 'block', marginLeft: '20px'}}>{paragraph}</span>
                      : paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
