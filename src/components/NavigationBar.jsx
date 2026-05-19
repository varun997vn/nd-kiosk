import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ArrowLeft, Accessibility } from 'lucide-react';

export default function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Do not show navigation bar on the Attract Screen
  if (location.pathname === '/') return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: 'var(--nav-height)',
      background: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'var(--backdrop-blur)',
      borderTop: 'var(--border-glass)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      zIndex: 1000
    }}>
      
      <button 
        onClick={() => navigate(-1)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: 'var(--color-text-primary)',
          fontSize: '1.5rem',
          padding: '16px 24px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(255,255,255,0.1)'
        }}
      >
        <ArrowLeft size={32} />
        Back
      </button>

      <button 
        onClick={() => navigate('/home')}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          color: '#1e1e1e',
          fontSize: '1.5rem',
          padding: '16px 40px',
          borderRadius: '9999px',
          backgroundColor: 'var(--color-accent-gold)',
          boxShadow: '0 4px 14px 0 rgba(245, 158, 11, 0.39)',
          fontWeight: 'bold'
        }}
      >
        <Home size={32} />
        Home
      </button>

      <button 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: 'var(--color-text-primary)',
          fontSize: '1.5rem',
          padding: '16px 24px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(255,255,255,0.1)'
        }}
      >
        <Accessibility size={32} />
      </button>

    </div>
  );
}
