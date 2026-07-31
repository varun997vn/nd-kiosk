import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Delete, Eye, EyeOff, Lock, Unlock } from 'lucide-react';
import TouchButton from './ui/TouchButton';
import { KolamFrame, KolamRule } from './ui/Kolam';

const STATIC_PASSWORD_HASH =
  '25eb105257015240cae3c92cd57f303dc5dd9f51d244973e19eb2cf8fddf5cae';

// SHA-256 hex via Web Crypto.
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Attendant-facing unlock screen, shown before the kiosk enters public mode.
 *
 * The auth logic is unchanged. What changed is the surface: the old glass card
 * on a dark field is now sandal paper on a kolam-dotted ground, and the keypad
 * buttons went from 70px to 88px so they clear the kiosk touch minimum with
 * room for a gloved or imprecise finger.
 */
export default function PasswordGateway({ onAuthenticated }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    try {
      if ((await sha256(password)) === STATIC_PASSWORD_HASH) {
        setIsSuccess(true);
        setError('');
        // Let the unlock animation land before handing over.
        setTimeout(onAuthenticated, 1000);
      } else {
        setShake(true);
        setError('Incorrect password. Please try again.');
        setPassword('');
        setTimeout(() => setShake(false), 500);
      }
    } catch (err) {
      console.error(err);
      setError(`Verification error: ${err.message || err}`);
    }
  };

  const press = (digit) => {
    if (isSuccess) return;
    setError('');
    setPassword((prev) => prev + digit);
  };

  const keys = [
    ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({
      key: n,
      label: n,
      onClick: () => press(String(n)),
    })),
    {
      key: 'clear',
      label: 'C',
      onClick: () => !isSuccess && (setPassword(''), setError('')),
    },
    { key: 0, label: 0, onClick: () => press('0') },
    {
      key: 'del',
      label: <Delete size={26} aria-hidden="true" />,
      ariaLabel: 'Backspace',
      onClick: () => !isSuccess && setPassword((p) => p.slice(0, -1)),
    },
  ];

  return (
    <div className="absolute inset-0 grid place-items-center overflow-hidden bg-surface-sunk pulli">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          x: shake ? [-8, 8, -6, 6, -4, 4, 0] : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 26,
          x: { duration: 0.4 },
        }}
        className="relative flex w-[520px] flex-col items-center gap-7 rounded-[var(--radius-xl)] border border-line-strong bg-surface-raised px-12 py-12 shadow-[var(--shadow-3)]"
      >
        <KolamFrame inset={14} size={30} />

        <motion.div
          animate={isSuccess ? { scale: [1, 1.15, 1], rotate: [0, -8, 0] } : {}}
          transition={{ duration: 0.5 }}
          className={`grid h-24 w-24 place-items-center rounded-full border-2 ${
            isSuccess
              ? 'border-tulsi bg-tulsi/10 text-tulsi'
              : 'border-saffron bg-saffron/10 text-saffron-ink'
          }`}
        >
          {isSuccess ? <Unlock size={40} /> : <Lock size={40} />}
        </motion.div>

        <div className="text-center">
          <h1 className="font-serif text-headline text-ink">In the Path of Love</h1>
          <p className="mt-2 font-sans text-body text-ink-muted">
            Enter the attendant passcode to open this kiosk
          </p>
          <KolamRule className="mx-auto mt-4 opacity-70" width={220} />
        </div>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Passcode"
              value={password}
              onChange={(e) => {
                setError('');
                setPassword(e.target.value);
              }}
              disabled={isSuccess}
              className={[
                'w-full rounded-[var(--radius-md)] border-2 bg-surface-sunk',
                'py-5 pl-6 pr-16 text-center font-sans text-body-lg text-ink',
                'outline-none transition-colors placeholder:text-ink-faint',
                'focus:border-saffron',
                error ? 'border-kumkum' : 'border-line-strong',
              ].join(' ')}
              style={{ letterSpacing: showPassword ? 'normal' : '0.4em' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              disabled={isSuccess}
              aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
              className="absolute right-2 top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full text-ink-muted transition-colors hover:bg-surface-tint"
            >
              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                role="alert"
                className="flex items-center justify-center gap-2 font-sans text-body text-kumkum"
              >
                <AlertCircle size={20} aria-hidden="true" />
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-3 justify-items-center gap-4">
            {keys.map(({ key, label, onClick, ariaLabel }) => (
              <motion.button
                key={key}
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={onClick}
                aria-label={ariaLabel}
                className="grid h-[88px] w-[88px] place-items-center rounded-full border border-line-strong bg-surface-sunk font-serif text-title font-semibold text-ink transition-colors hover:bg-surface-tint"
              >
                {label}
              </motion.button>
            ))}
          </div>

          <TouchButton
            type="submit"
            size="lg"
            variant={isSuccess ? 'secondary' : 'primary'}
            disabled={isSuccess}
            className="w-full"
          >
            {isSuccess ? 'Unlocked — welcome' : 'Unlock kiosk'}
          </TouchButton>
        </form>
      </motion.div>
    </div>
  );
}
