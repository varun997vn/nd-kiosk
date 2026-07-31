import { motion } from 'framer-motion';

/**
 * The only button in the app.
 *
 * Exists mainly to make the 64px kiosk touch minimum structural rather than
 * something each screen has to remember — the old build had a 70px keypad next
 * to 32px map controls.
 */
const VARIANTS = {
  primary:
    'bg-saffron-deep text-on-saffron shadow-[var(--shadow-2)] hc:border-2 hc:border-ink',
  secondary:
    'bg-surface-raised text-ink border border-line-strong shadow-[var(--shadow-1)]',
  ghost: 'bg-transparent text-ink-muted hover:bg-surface-tint',
  outline: 'bg-transparent text-saffron-ink border-2 border-saffron-deep',
  danger: 'bg-kumkum text-on-saffron shadow-[var(--shadow-2)]',
};

const SIZES = {
  md: 'px-7 py-4 text-body gap-3',
  lg: 'px-10 py-5 text-body-lg gap-4',
};

export default function TouchButton({
  variant = 'secondary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.12 }}
      className={[
        'touch-target inline-flex items-center justify-center rounded-full',
        'font-sans font-semibold tracking-wide',
        'transition-colors duration-200',
        SIZES[size],
        VARIANTS[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </motion.button>
  );
}
