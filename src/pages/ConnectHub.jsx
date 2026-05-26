import React from 'react';
import { motion } from 'framer-motion';

const qrCodes = [
  { id: 'fb', name: 'Facebook', url: 'facebook.com' },
  { id: 'ig', name: 'Instagram', url: 'instagram.com' },
  { id: 'yt', name: 'YouTube', url: 'youtube.com' },
  { id: 'store', name: 'Madhuram Stores', url: 'madhuramstores.com' }
];

function StylizedQRCode({ color = '#1e293b' }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
      {/* Outer corner squares */}
      <rect x="10" y="10" width="25" height="25" fill="none" stroke={color} strokeWidth="6" rx="2" />
      <rect x="16" y="16" width="13" height="13" fill={color} rx="1" />
      
      <rect x="65" y="10" width="25" height="25" fill="none" stroke={color} strokeWidth="6" rx="2" />
      <rect x="71" y="16" width="13" height="13" fill={color} rx="1" />
      
      <rect x="10" y="65" width="25" height="25" fill="none" stroke={color} strokeWidth="6" rx="2" />
      <rect x="16" y="71" width="13" height="13" fill={color} rx="1" />
      
      {/* Small alignment pattern */}
      <rect x="65" y="65" width="8" height="8" fill={color} rx="1" />
      <rect x="77" y="77" width="8" height="8" fill={color} rx="1" />
      <rect x="65" y="77" width="8" height="8" fill={color} rx="1" />
      <rect x="77" y="65" width="8" height="8" fill={color} rx="1" />
      
      {/* Some random data pixels */}
      <rect x="40" y="10" width="6" height="6" fill={color} rx="1" />
      <rect x="48" y="16" width="6" height="12" fill={color} rx="1" />
      <rect x="40" y="28" width="12" height="6" fill={color} rx="1" />
      <rect x="52" y="10" width="6" height="6" fill={color} rx="1" />
      
      <rect x="10" y="40" width="6" height="6" fill={color} rx="1" />
      <rect x="16" y="48" width="12" height="6" fill={color} rx="1" />
      <rect x="28" y="40" width="6" height="12" fill={color} rx="1" />
      
      <rect x="40" y="40" width="12" height="12" fill={color} rx="1.5" />
      <rect x="52" y="52" width="12" height="12" fill={color} rx="1.5" />
      
      <rect x="40" y="65" width="6" height="12" fill={color} rx="1" />
      <rect x="48" y="77" width="12" height="6" fill={color} rx="1" />
      
      <rect x="65" y="40" width="12" height="6" fill={color} rx="1" />
      <rect x="77" y="48" width="6" height="12" fill={color} rx="1" />
    </svg>
  );
}

export default function ConnectHub() {
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
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vh, 4rem)', color: 'var(--color-accent-gold)', margin: 0 }}>Connect & Support</h1>
        <p style={{ fontSize: 'clamp(1rem, 2vh, 1.5rem)', color: 'var(--color-text-secondary)' }}>
          Publications, Contributions, and Social Outreach
        </p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2vw',
        flex: 1,
        minHeight: 0
      }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
          {/* Publications */}
          <div className="glass-panel" style={{ padding: '3vh 2vw' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vh, 2.5rem)', marginBottom: '1.5vh' }}>Publications</h2>
            <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
              <div style={{ 
                width: '12vh', 
                height: '16vh', 
                backgroundImage: `url('./assets/images/unnamed (67).jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.1)',
                flexShrink: 0 
              }} />
              <div>
                <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vh, 1.5rem)', color: 'var(--color-accent-gold)' }}>Madhuramurali Magazine</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.4, marginTop: '1vh', fontSize: 'clamp(0.9rem, 1.8vh, 1.1rem)' }}>
                  Our monthly journal in English and Tamil, spreading the glory of the Divine Name.
                </p>
              </div>
            </div>
          </div>

          {/* Contributions */}
          <div className="glass-panel" style={{ padding: '3vh 2vw', flex: 1, overflow: 'hidden' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vh, 2.5rem)', marginBottom: '1.5vh' }}>Contribution</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1vh', fontSize: 'clamp(0.9rem, 1.6vh, 1.1rem)' }}>Your magnanimous contributions may please be sent to our registered trusts:</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 'clamp(0.85rem, 1.6vh, 1rem)', lineHeight: 1.6, color: 'var(--color-text-primary)' }}>
              <li>• Sri Sandeepani Gurukula Trust <span style={{color: 'var(--color-accent-gold)', fontSize: '0.9em'}}>(80G / FCRA)</span></li>
              <li>• Chaitanya Mahaprabhu Nama Bhiksha Kendra <span style={{color: 'var(--color-accent-gold)', fontSize: '0.9em'}}>(80G)</span></li>
              <li>• Global Organisation for Divinity India Trust <span style={{color: 'var(--color-accent-gold)', fontSize: '0.9em'}}>(80G / FCRA)</span></li>
              <li>• Mukhya Prana Seva Trust <span style={{color: 'var(--color-accent-gold)', fontSize: '0.9em'}}>(80G)</span></li>
              <li>• Sri Sandeepani Gurukula Seva Trust, AP <span style={{color: 'var(--color-accent-gold)', fontSize: '0.9em'}}>(80G)</span></li>
              <li>• Senganoor Kshetra Upasana Samiti <span style={{color: 'var(--color-accent-gold)', fontSize: '0.9em'}}>(80G)</span></li>
              <li>• Jaya Hanuman Seva Trust <span style={{color: 'var(--color-accent-gold)', fontSize: '0.9em'}}>(FCRA)</span></li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
          {/* Contact Info */}
          <div className="glass-panel" style={{ padding: '3vh 2vw', background: 'var(--color-bg-card)' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vh, 2.5rem)', marginBottom: '1.5vh' }}>Contact Us</h2>
            <p style={{ fontSize: 'clamp(0.9rem, 1.8vh, 1.2rem)', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
              <strong>Central Office:</strong><br/>
              Plot No 11, Door No 4/11, Netaji Nagar Main Road<br/>
              Jafferkhanpet, Chennai - 600083, India<br/><br/>
              <strong>Phone:</strong> +91-44-24895875 / +91-7305985875<br/>
              <strong>Email:</strong> contact@namadwaar.org
            </p>
          </div>

          {/* QR Codes */}
          <div className="glass-panel" style={{ padding: '3vh 2vw', flex: 1, overflow: 'hidden' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vh, 2.5rem)', marginBottom: '0.5vh' }}>Scan to Connect</h2>
            <p style={{ color: 'var(--color-accent-gold)', marginBottom: '1.5vh', fontSize: 'clamp(0.9rem, 1.6vh, 1.1rem)' }}>Point your smartphone camera at a code below:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5vw' }}>
              {qrCodes.map((qr, index) => (
                <div key={qr.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1vh' }}>
                  <motion.div style={{ 
                    width: '11vh', 
                    height: '11vh', 
                    background: 'white', 
                    padding: '0.8vh', 
                    borderRadius: '12px',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 4px 15px rgba(0,0,0,0.3)', 
                      '0 4px 25px rgba(245, 158, 11, 0.5)', 
                      '0 4px 15px rgba(0,0,0,0.3)'
                    ]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3, 
                    ease: "easeInOut",
                    delay: index * 0.5 
                  }}
                  >
                    <StylizedQRCode color="#0f172a" />
                  </motion.div>
                  <span style={{ fontSize: 'clamp(0.85rem, 1.7vh, 1.1rem)', fontWeight: 550 }}>{qr.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
