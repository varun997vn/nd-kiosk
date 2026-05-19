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
        height: '100%',
        padding: '60px',
        paddingBottom: 'calc(var(--nav-height) + 40px)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }}
    >
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '4rem', color: 'var(--color-accent-gold)', margin: 0 }}>Connect & Support</h1>
        <p style={{ fontSize: '1.5rem', color: 'var(--color-text-secondary)' }}>
          Publications, Contributions, and Social Outreach
        </p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        flex: 1
      }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {/* Publications */}
          <div className="glass-panel" style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Publications</h2>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '150px', height: '200px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                📖 Madhuramurali
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--color-accent-gold)' }}>Madhuramurali Magazine</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginTop: '8px' }}>
                  Our monthly journal in English and Tamil, spreading the glory of the Divine Name.
                </p>
              </div>
            </div>
          </div>

          {/* Contributions */}
          <div className="glass-panel" style={{ padding: '40px', flex: 1 }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Contribution</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>Your magnanimous contributions may please be sent to our registered trusts:</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '1.1rem', lineHeight: 2, color: 'var(--color-text-primary)' }}>
              <li>• Sri Sandeepani Gurukula Trust <span style={{color: 'var(--color-accent-gold)', fontSize: '0.9rem'}}>(80G / FCRA)</span></li>
              <li>• Chaitanya Mahaprabhu Nama Bhiksha Kendra <span style={{color: 'var(--color-accent-gold)', fontSize: '0.9rem'}}>(80G)</span></li>
              <li>• Global Organisation for Divinity India Trust <span style={{color: 'var(--color-accent-gold)', fontSize: '0.9rem'}}>(80G / FCRA)</span></li>
              <li>• Mukhya Prana Seva Trust <span style={{color: 'var(--color-accent-gold)', fontSize: '0.9rem'}}>(80G)</span></li>
              <li>• Sri Sandeepani Gurukula Seva Trust, AP <span style={{color: 'var(--color-accent-gold)', fontSize: '0.9rem'}}>(80G)</span></li>
              <li>• Senganoor Kshetra Upasana Samiti <span style={{color: 'var(--color-accent-gold)', fontSize: '0.9rem'}}>(80G)</span></li>
              <li>• Jaya Hanuman Seva Trust <span style={{color: 'var(--color-accent-gold)', fontSize: '0.9rem'}}>(FCRA)</span></li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {/* Contact Info */}
          <div className="glass-panel" style={{ padding: '40px', background: 'var(--color-bg-card)' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Contact Us</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
              <strong>Central Office:</strong><br/>
              Plot No 11, Door No 4/11, Netaji Nagar Main Road<br/>
              Jafferkhanpet, Chennai - 600083, India<br/><br/>
              <strong>Phone:</strong> +91-44-24895875 / +91-7305985875<br/>
              <strong>Email:</strong> contact@namadwaar.org
            </p>
          </div>

          {/* QR Codes */}
          <div className="glass-panel" style={{ padding: '40px', flex: 1 }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Scan to Connect</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {qrCodes.map(qr => (
                <div key={qr.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '120px', height: '120px', background: 'white', padding: '10px', borderRadius: '8px' }}>
                    {/* Placeholder for actual QR code */}
                    <div style={{ width: '100%', height: '100%', border: '2px dashed #000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                      QR
                    </div>
                  </div>
                  <span style={{ fontSize: '1.1rem' }}>{qr.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
