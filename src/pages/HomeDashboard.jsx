import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const pillars = [
  {
    id: 'institutions',
    title: 'Institutions',
    subtitle: 'Ashrams, Temples & Mandapams',
    image: './assets/images/unnamed (1).jpg',
    path: '/institutions'
  },
  {
    id: 'activities',
    title: 'Activities',
    subtitle: 'Humanitarian & Cultural Outreach',
    image: './assets/images/unnamed (29).jpg',
    path: '/activities'
  },
  {
    id: 'global',
    title: 'Global Presence',
    subtitle: 'Namadwaars Worldwide',
    image: './assets/a_glowing_stylized_world_map_with_golden_points_of_light_representing_spiritual.png',
    path: '/global'
  },
  {
    id: 'connect',
    title: 'Connect & Support',
    subtitle: 'Publications & Contributions',
    image: './assets/images/unnamed (67).jpg',
    path: '/connect'
  }
];

export default function HomeDashboard() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        width: '100%',
        height: '100vh',
        padding: '5vh 4vw',
        paddingBottom: 'calc(var(--nav-height) + 2vh)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <header style={{ marginBottom: '3vh', flexShrink: 0 }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vh, 4rem)', margin: 0 }}>The Path of Love</h1>
        <p style={{ fontSize: 'clamp(1rem, 2vh, 1.5rem)', color: 'var(--color-text-secondary)' }}>Select a pillar to explore our journey.</p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '2vw',
        flex: 1,
        minHeight: 0
      }}>
        {pillars.map((pillar, index) => (
          <motion.div
            key={pillar.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(pillar.path)}
            style={{
              position: 'relative',
              borderRadius: 'var(--border-radius-lg)',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-glass)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: `url(${pillar.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.5s ease',
            }} className="card-bg" />
            
            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)'
            }} />

            <div style={{
              position: 'absolute',
              bottom: '3vh',
              left: '3vw',
              right: '3vw'
            }}>
              <h2 style={{ 
                fontSize: 'clamp(1.8rem, 4vh, 3rem)', 
                color: 'var(--color-accent-gold)',
                marginBottom: '1vh',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}>{pillar.title}</h2>
              <p style={{ 
                fontSize: 'clamp(1rem, 2vh, 1.5rem)', 
                color: 'var(--color-text-primary)',
                opacity: 0.9 
              }}>{pillar.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
