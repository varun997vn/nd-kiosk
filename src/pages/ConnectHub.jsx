import React from 'react';
import { motion } from 'framer-motion';

const qrCodes = [
  { id: 'fb', name: 'Facebook', url: 'facebook.com' },
  { id: 'ig', name: 'Instagram', url: 'instagram.com' },
  { id: 'yt', name: 'YouTube', url: 'youtube.com' },
  { id: 'store', name: 'Madhuram Stores', url: 'madhuramstores.com' }
];

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
              <div style={{ width: '12vh', height: '16vh', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                📖
              </div>
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
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vh, 2.5rem)', marginBottom: '1.5vh' }}>Scan to Connect</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1vw' }}>
              {qrCodes.map(qr => (
                <div key={qr.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1vh' }}>
                  <div style={{ width: '10vh', height: '10vh', background: 'white', padding: '1vh', borderRadius: '8px' }}>
                    {/* Placeholder for actual QR code */}
                    <div style={{ width: '100%', height: '100%', border: '2px dashed #000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '1.5vh' }}>
                      QR
                    </div>
                  </div>
                  <span style={{ fontSize: 'clamp(0.8rem, 1.6vh, 1.1rem)' }}>{qr.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
