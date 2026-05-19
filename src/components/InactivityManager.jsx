import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function InactivityManager({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showRipple, setShowRipple] = useState(false);
  
  // Timers
  const RIPPLE_TIMEOUT = 60000; // 60 seconds
  const RESET_TIMEOUT = 90000;  // 90 seconds
  
  const rippleTimer = useRef(null);
  const resetTimer = useRef(null);

  const resetTimers = () => {
    setShowRipple(false);
    if (rippleTimer.current) clearTimeout(rippleTimer.current);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    
    // Don't set timers if we're on the attract screen
    if (location.pathname === '/') return;

    rippleTimer.current = setTimeout(() => {
      setShowRipple(true);
    }, RIPPLE_TIMEOUT);

    resetTimer.current = setTimeout(() => {
      navigate('/', { replace: true });
    }, RESET_TIMEOUT);
  };

  useEffect(() => {
    // Listen to touch and mouse events
    const events = ['touchstart', 'mousemove', 'mousedown', 'keydown', 'scroll'];
    events.forEach(e => window.addEventListener(e, resetTimers));
    
    // Initial setup
    resetTimers();

    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimers));
      if (rippleTimer.current) clearTimeout(rippleTimer.current);
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, [location.pathname]); // Re-run when path changes to handle attract screen logic

  return (
    <>
      {children}
      <AnimatePresence>
        {showRipple && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.4)',
              zIndex: 9999,
              pointerEvents: 'none'
            }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                border: '4px solid var(--color-accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{ 
                color: 'var(--color-accent-gold)', 
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                textAlign: 'center'
              }}>
                Touch to continue
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
