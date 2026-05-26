import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const activities = [
  { id: 'heritage', title: 'Heritage & Culture', img: './assets/images/unnamed (34).jpg', span: 'col-span-2 row-span-2' },
  { id: 'veda', title: 'Veda Patasalas', img: './assets/images/unnamed (37).jpg', span: 'col-span-1 row-span-1' },
  { id: 'animal', title: 'Animal & Nature', img: './assets/images/unnamed (46).jpg', span: 'col-span-1 row-span-2' },
  { id: 'health', title: 'Healthcare & Education', img: './assets/images/unnamed (49).jpg', span: 'col-span-1 row-span-1' },
  { id: 'annadaanam', title: 'Annadaanam', img: './assets/images/unnamed (60).jpg', span: 'col-span-2 row-span-1' },
  { id: 'model', title: 'Model Villages', img: './assets/images/unnamed (65).jpg', span: 'col-span-1 row-span-1' },
];

export default function ActivitiesHub() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
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
        padding: '5vh 4vw',
        paddingBottom: 'calc(var(--nav-height) + 2vh)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <header style={{ marginBottom: '3vh', flexShrink: 0 }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vh, 4rem)', color: 'var(--color-accent-gold)', margin: 0 }}>Activities Hub</h1>
        <p style={{ fontSize: 'clamp(1rem, 2vh, 1.5rem)', color: 'var(--color-text-secondary)' }}>
          Discover our humanitarian and cultural outreach programs.
        </p>
      </header>

      {/* Pseudo-masonry using CSS Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          gap: '2vw',
          minHeight: 0
        }}
      >
        {activities.map((activity) => {
          // Manual CSS grid span mapping
          const getGridArea = () => {
            switch(activity.span) {
              case 'col-span-2 row-span-2': return 'span 2 / span 2';
              case 'col-span-2 row-span-1': return 'span 1 / span 2';
              case 'col-span-1 row-span-2': return 'span 2 / span 1';
              default: return 'span 1 / span 1';
            }
          };

          return (
            <motion.div
              key={activity.id}
              variants={itemVariants}
              onClick={() => navigate(`/activities/${activity.id}`)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                gridArea: getGridArea(),
                position: 'relative',
                borderRadius: 'var(--border-radius-md)',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-glass)'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: `url('${activity.img}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.3s ease'
              }} className="activity-img" />
              
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%)'
              }} />

              <div style={{
                position: 'absolute',
                bottom: '3vh',
                left: '2vw',
                right: '2vw'
              }}>
                <h2 style={{ 
                  fontSize: 'clamp(1.5rem, 3.5vh, 2.5rem)', 
                  color: 'white',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)' 
                }}>{activity.title}</h2>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
