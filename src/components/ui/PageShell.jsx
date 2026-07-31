import { motion } from 'framer-motion';

/**
 * The frame every route sits in.
 *
 * The eight pages each carried a byte-identical 12-line motion.div with its own
 * padding arithmetic; this is that block, once. It also owns the page
 * transition, which is now a crossfade with a slight scale rather than the old
 * 100px horizontal slide — on a large fixed screen the slide reads as jitter,
 * where a crossfade reads as a cut between shots.
 */
export default function PageShell({
  className = '',
  padded = true,
  children,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.008 }}
      transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
      className={`absolute inset-0 flex flex-col overflow-hidden ${className}`}
      style={
        padded
          ? {
              padding: 'var(--space-edge)',
              paddingTop: 'calc(var(--topbar-height) + 16px)',
              paddingBottom: 'calc(var(--nav-height) + 16px)',
            }
          : undefined
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
