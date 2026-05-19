import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AttractScreen() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      onClick={() => navigate('/home')}
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('/assets/a_high_resolution_cinematic_wide_shot_of_an_indian_ashram_madhurapuri_ashram.png') center/cover no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
    >
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        style={{ textAlign: 'center' }}
      >
        <h1 style={{ 
          fontSize: '6rem', 
          color: 'var(--color-accent-gold)',
          textShadow: '0 4px 20px rgba(0,0,0,0.5)',
          marginBottom: '2rem'
        }}>
          The Path of Love
        </h1>
        <p style={{ 
          fontSize: '2rem', 
          fontWeight: 300,
          letterSpacing: '4px',
          textTransform: 'uppercase'
        }}>
          Institutions & Activities
        </p>
      </motion.div>

      <motion.div 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: 'absolute',
          bottom: '15%',
          padding: '24px 48px',
          borderRadius: '9999px',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
      >
        <h2 style={{ fontSize: '2.5rem', margin: 0 }}>Touch to Explore</h2>
      </motion.div>

      {/* Infinite Scrolling Mahamantra */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        overflow: 'hidden',
        background: 'rgba(0,0,0,0.6)',
        padding: '16px 0',
      }}>
        <motion.div
          animate={{ x: ['100%', '-100%'] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          style={{ whiteSpace: 'nowrap', fontSize: '1.5rem', color: 'var(--color-accent-gold)' }}
        >
          Hare Rama Hare Rama Rama Rama Hare Hare | Hare Krishna Hare Krishna Krishna Krishna Hare Hare
        </motion.div>
      </div>

    </motion.div>
  );
}
