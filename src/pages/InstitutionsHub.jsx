import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const institutions = [
  { id: 'madhurapuri', name: 'Madhurapuri Ashram', location: 'Maharanyam, Chennai' },
  { id: 'kalyanasrinivasa', name: 'Sri Kalyanasrinivasa Perumal Temple', location: 'Maharanyam, Chennai' },
  { id: 'govindapuram', name: 'Chaitanya Kuteeram', location: 'Govindapuram' },
  { id: 'sundara', name: 'Sri Sundara Anjaneya Swami Temple', location: 'Bengaluru' },
  { id: 'premika', name: 'Premika Vidya Kendra', location: 'Gurugram' },
  { id: 'keerthanavali', name: 'Keerthanavali Mandapam', location: 'Kanchipuram' },
  { id: 'janmasthan', name: 'Sri Premika Janmasthan', location: 'Senganoor' },
  { id: 'niketan', name: 'Sri Niketan', location: 'Vrindavan' },
  { id: 'vanararajasimhan', name: 'Sri Vanararajasimhan Namadwaar', location: 'Kangeyam' }
];

export default function InstitutionsHub() {
  const navigate = useNavigate();
  const listRef = useRef(null);

  useEffect(() => {
    const savedScroll = sessionStorage.getItem('scroll-institutions');
    if (savedScroll && listRef.current) {
      const timer = setTimeout(() => {
        listRef.current.scrollTop = parseInt(savedScroll, 10);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleScroll = (e) => {
    sessionStorage.setItem('scroll-institutions', e.target.scrollTop);
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
        paddingBottom: 'var(--nav-height)'
      }}
    >
      {/* Left side: Scrolling List */}
      <div style={{
        width: '500px',
        background: 'var(--color-bg-base)',
        borderRight: 'var(--border-glass)',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 0'
      }}>
        <h2 style={{ padding: '0 40px', fontSize: '2rem', marginBottom: '20px', color: 'var(--color-accent-gold)' }}>Directory</h2>
        
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
          {institutions.map((inst) => (
            <motion.button
              key={inst.id}
              onClick={() => navigate(`/institutions/${inst.id}`)}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '24px',
                borderRadius: 'var(--border-radius-md)',
                background: 'var(--color-bg-card)',
                border: '1px solid rgba(255,255,255,0.05)',
                color: 'var(--color-text-primary)',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-accent-gold)', marginBottom: '4px' }}>
                {inst.name}
              </span>
              <span style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)' }}>
                {inst.location}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Right side: Stylized Map/Image View */}
      <div style={{
        flex: 1,
        backgroundImage: `url('/assets/images/unnamed (1).jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(90deg, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.2) 100%)',
          padding: '60px'
        }}>
          <h1 style={{ fontSize: '4rem', color: 'var(--color-accent-gold)' }}>Institutions</h1>
          <p style={{ fontSize: '1.5rem', maxWidth: '600px', lineHeight: 1.6 }}>
            Explore the spiritual centers, ashrams, and temples established to nurture devotion and preserve traditional heritage.
          </p>
        </div>
        
        {/* Mock Glowing Pins */}
        <div style={{ position: 'absolute', top: '40%', left: '40%', width: '20px', height: '20px', background: 'var(--color-accent-gold)', borderRadius: '50%', boxShadow: '0 0 20px var(--color-accent-gold)' }} />
        <div style={{ position: 'absolute', top: '60%', left: '50%', width: '20px', height: '20px', background: 'var(--color-accent-gold)', borderRadius: '50%', boxShadow: '0 0 20px var(--color-accent-gold)' }} />
      </div>
    </motion.div>
  );
}
