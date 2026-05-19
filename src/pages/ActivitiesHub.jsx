import React from 'react';
import { motion } from 'framer-motion';

const activities = [
  { id: 'heritage', title: 'Heritage & Culture', img: '/assets/activity_detail_heritage_culture.png', span: 'col-span-2 row-span-2' },
  { id: 'veda', title: 'Veda Patasalas', img: '/assets/a_traditional_vedic_school_gurukulam_setting_within_an_ashram_with_students_and.png', span: 'col-span-1 row-span-1' },
  { id: 'animal', title: 'Animal & Nature', img: '/assets/a_lush_cinematic_high_resolution_background_for_a_spiritual_kiosk_application.png', span: 'col-span-1 row-span-2' },
  { id: 'health', title: 'Healthcare & Education', img: '/assets/happy_children_smiling_during_a_cultural_festival_in_india_or_a_clean_medical.png', span: 'col-span-1 row-span-1' },
  { id: 'annadaanam', title: 'Annadaanam', img: '/assets/activities_hub.png', span: 'col-span-2 row-span-1' },
  { id: 'model', title: 'Model Villages', img: '/assets/activities_hub_outreach_pillars.png', span: 'col-span-1 row-span-1' },
];

export default function ActivitiesHub() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        width: '100%',
        height: '100%',
        padding: '60px',
        paddingBottom: 'calc(var(--nav-height) + 40px)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }}
    >
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '4rem', color: 'var(--color-accent-gold)', margin: 0 }}>Activities Hub</h1>
        <p style={{ fontSize: '1.5rem', color: 'var(--color-text-secondary)' }}>
          Discover our humanitarian and cultural outreach programs.
        </p>
      </header>

      {/* Pseudo-masonry using CSS Grid */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridAutoRows: 'minmax(250px, 1fr)',
        gap: '24px'
      }}>
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
                bottom: '24px',
                left: '24px',
                right: '24px'
              }}>
                <h2 style={{ 
                  fontSize: '2rem', 
                  color: 'white',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)' 
                }}>{activity.title}</h2>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
