import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Hand } from 'lucide-react';
import { KolamFrame, KolamRule } from '../components/ui/Kolam';
import { enterKioskMode } from '../lib/kioskRuntime';

const BACKDROPS = [
  './assets/images/unnamed.jpg',
  './assets/images/unnamed (1).jpg',
  './assets/images/unnamed (29).jpg',
  './assets/images/unnamed (65).jpg',
];

const MAHAMANTRA =
  'Hare Rama Hare Rama Rama Rama Hare Hare  ·  Hare Krishna Hare Krishna Krishna Krishna Hare Hare';

/**
 * The idle state — what the kiosk shows when nobody is standing at it, and the
 * only thing that has to work from across a hall.
 *
 * This is the one screen that stays dark. It is photography-led rather than
 * page-led, and a lit image against a dark hall is what draws someone over in
 * the first place; the ivory system begins at the first touch. That touch is
 * also where fullscreen and the wake lock are requested, since both require a
 * user gesture.
 */
export default function AttractScreen() {
  const navigate = useNavigate();
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setFrame((prev) => (prev + 1) % BACKDROPS.length),
      6000
    );
    return () => clearInterval(timer);
  }, []);

  const begin = () => {
    enterKioskMode();
    navigate('/home');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={begin}
      role="button"
      tabIndex={0}
      aria-label="Touch to explore"
      className="absolute inset-0 cursor-pointer overflow-hidden bg-ink"
    >
      {/* Slow Ken Burns drift across the photographs. */}
      <AnimatePresence>
        <motion.div
          key={frame}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.4, ease: 'easeInOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${BACKDROPS[frame]}')` }}
        />
      </AnimatePresence>

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgb(43 26 14 / 0.28) 0%, rgb(23 13 6 / 0.82) 100%)',
        }}
      />

      <KolamFrame inset={40} size={56} className="text-saffron/50" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-24 text-center">
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        >
          <p className="font-sans text-label font-bold uppercase tracking-[0.3em] text-saffron">
            Namadwaar
          </p>
          <h1 className="mt-6 font-serif text-display-xl leading-[1.05] text-on-saffron">
            In the Path of Love
          </h1>
          <KolamRule className="mx-auto mt-6 opacity-80" width={340} />
          <p className="mt-6 font-sans text-body-lg tracking-[0.18em] text-on-saffron/80 uppercase">
            Institutions &amp; Activities
          </p>
        </motion.div>

        <motion.div
          animate={{ opacity: [0.65, 1, 0.65], scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
          className="mt-20 flex items-center gap-5 rounded-full border-2 border-saffron bg-saffron px-14 py-6 shadow-[0_12px_48px_rgb(232_135_30/0.35)]"
        >
          <Hand size={36} aria-hidden="true" className="text-on-saffron" />
          <span className="font-serif text-headline text-on-saffron">
            Touch to Explore
          </span>
        </motion.div>
      </div>

      {/* The mahamantra, running continuously along the foot of the screen. */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-saffron/30 bg-[rgb(23_13_6/0.78)] py-5">
        <motion.div
          animate={{ x: ['100%', '-100%'] }}
          transition={{ repeat: Infinity, duration: 34, ease: 'linear' }}
          className="whitespace-nowrap font-serif text-title text-saffron"
        >
          {MAHAMANTRA}
        </motion.div>
      </div>
    </motion.div>
  );
}
