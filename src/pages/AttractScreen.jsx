import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const bgImages = [
  '/assets/images/unnamed.jpg',
  '/assets/images/unnamed (1).jpg',
  '/assets/images/unnamed (29).jpg',
  '/assets/images/unnamed (65).jpg'
];

export default function AttractScreen() {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bgImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      onClick={() => navigate('/home')}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        overflow: 'hidden',
        backgroundColor: '#000'
      }}
    >
      <AnimatePresence>
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('${bgImages[currentImage]}') center/cover no-repeat`,
            zIndex: 0
          }}
        />
      </AnimatePresence>

      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        style={{ textAlign: 'center', zIndex: 1 }}
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
          textTransform: 'uppercase',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)'
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
          border: '1px solid rgba(255,255,255,0.2)',
          zIndex: 1
        }}
      >
        <h2 style={{ fontSize: '2.5rem', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Touch to Explore</h2>
      </motion.div>

      {/* Infinite Scrolling Mahamantra */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        overflow: 'hidden',
        background: 'rgba(0,0,0,0.6)',
        padding: '16px 0',
        zIndex: 1
      }}>
        <motion.div
          animate={{ x: ['100%', '-100%'] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          style={{ whiteSpace: 'nowrap', fontSize: '1.5rem', color: 'var(--color-accent-gold)' }}
        >
          Hare Rama Hare Rama Rama Rama Hare Hare | Hare Krishna Hare Krishna Krishna Krishna Hare Hare
        </motion.div>
      </div>

    </div>
  );
}
