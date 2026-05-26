import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Eye, EyeOff, AlertCircle } from 'lucide-react';

const STATIC_PASSWORD_HASH = 'e1c5aaa306476379434340834ea721c6d72345a2442c5a472f00ca239a996ebd';

// Helper function to hash a string to SHA-256 hex format using Web Crypto API
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function PasswordGateway({ onAuthenticated }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    try {
      const hashedPassword = await sha256(password);
      if (hashedPassword === STATIC_PASSWORD_HASH) {
        setIsSuccess(true);
        setError('');
        // Delay the callback slightly to allow the unlock animation to play
        setTimeout(() => {
          onAuthenticated();
        }, 1000);
      } else {
        setShake(true);
        setError('Incorrect password. Please try again.');
        setPassword('');
        // Reset shake state after animation runs
        setTimeout(() => {
          setShake(false);
        }, 500);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during verification.');
    }
  };

  const handleKeyPress = (num) => {
    if (isSuccess) return;
    setError('');
    setPassword((prev) => prev + num);
  };

  const handleBackspace = () => {
    if (isSuccess) return;
    setPassword((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (isSuccess) return;
    setPassword('');
    setError('');
  };

  // Virtual Keypad Button
  const KeypadButton = ({ val, onClick, label }) => (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'var(--color-text-primary)',
        fontSize: '1.5rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontFamily: 'var(--font-heading)',
        transition: 'border-color 0.2s',
      }}
    >
      {label || val}
    </motion.button>
  );

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'var(--color-bg-base)',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
      fontFamily: 'var(--font-body)',
      overflow: 'hidden',
    }}>

      {/* Background Glowing Ambient Orbs */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
        top: '-10%',
        left: '20%',
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, rgba(0, 0, 0, 0) 70%)',
        bottom: '-10%',
        right: '15%',
        filter: 'blur(90px)',
        pointerEvents: 'none',
      }} />

      {/* Main Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          x: shake ? [-8, 8, -6, 6, -4, 4, 0] : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
          x: { duration: 0.4 }
        }}
        className="glass-panel"
        style={{
          padding: '40px 32px',
          width: '90%',
          maxWidth: '440px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          zIndex: 10,
        }}
      >
        {/* Animated Lock Icon */}
        <motion.div
          animate={isSuccess ? { scale: [1, 1.2, 1], rotate: [0, -10, 0] } : {}}
          transition={{ duration: 0.5 }}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: isSuccess ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.1)',
            border: `2px solid ${isSuccess ? '#10b981' : 'var(--color-accent-gold)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isSuccess
              ? '0 0 20px rgba(16, 185, 129, 0.4)'
              : '0 0 20px rgba(245, 158, 11, 0.2)',
            color: isSuccess ? '#10b981' : 'var(--color-accent-gold)',
          }}
        >
          {isSuccess ? <Unlock size={38} /> : <Lock size={38} />}
        </motion.div>

        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: '1.8rem',
            color: 'var(--color-text-primary)',
            marginBottom: '8px',
            fontFamily: 'var(--font-heading)'
          }}>
            Kiosk Security Portal
          </h2>
          <p style={{
            fontSize: '0.95rem',
            color: 'var(--color-text-secondary)',
          }}>
            Please enter password to access this system
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setError('');
                setPassword(e.target.value);
              }}
              disabled={isSuccess}
              style={{
                width: '100%',
                padding: '16px 50px 16px 16px',
                fontSize: '1.2rem',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: error ? '1px solid var(--color-accent-red)' : '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                color: 'var(--color-text-primary)',
                outline: 'none',
                textAlign: 'center',
                letterSpacing: showPassword ? 'normal' : '0.4em',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                if (!error) e.target.style.borderColor = 'var(--color-accent-gold)';
              }}
              onBlur={(e) => {
                if (!error) e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
            />
            {/* Show/Hide password toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSuccess}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                opacity: 0.7,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
              onMouseLeave={(e) => e.currentTarget.style.opacity = 0.7}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  color: 'var(--color-accent-red)',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                }}
              >
                <AlertCircle size={16} />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Touchscreen Virtual Keypad */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
            marginTop: '8px',
          }}>
            {/* Keypad Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
            }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <KeypadButton
                  key={num}
                  val={num}
                  onClick={() => handleKeyPress(num.toString())}
                />
              ))}

              <KeypadButton
                val="C"
                onClick={handleClear}
                label="C"
              />
              <KeypadButton
                val={0}
                onClick={() => handleKeyPress('0')}
              />
              <KeypadButton
                val="del"
                onClick={handleBackspace}
                label="⌫"
              />
            </div>
          </div>

          {/* Submit / Unlock Button */}
          <motion.button
            whileHover={{ scale: isSuccess ? 1 : 1.02 }}
            whileTap={{ scale: isSuccess ? 1 : 0.98 }}
            type="submit"
            disabled={isSuccess}
            style={{
              width: '100%',
              backgroundColor: isSuccess ? '#10b981' : 'var(--color-accent-gold)',
              color: '#1e1e1e',
              padding: '16px',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '700',
              fontFamily: 'var(--font-heading)',
              boxShadow: isSuccess
                ? '0 4px 14px rgba(16, 185, 129, 0.4)'
                : '0 4px 14px rgba(245, 158, 11, 0.3)',
              cursor: isSuccess ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'background-color 0.3s, box-shadow 0.3s',
              marginTop: '12px',
            }}
          >
            {isSuccess ? (
              <span>Unlocked! Welcome</span>
            ) : (
              <>
                <span>Unlock Kiosk</span>
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
