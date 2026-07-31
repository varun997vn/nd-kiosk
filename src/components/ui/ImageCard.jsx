import { motion } from 'framer-motion';

/**
 * A framed photograph with its label on an ivory plate beneath it.
 *
 * This is the crux of making a light theme work with photography. On a dark
 * canvas a photo blends in and white text on a bottom scrim is fine; on cream
 * paper the same photo becomes a bright rectangle floating on bright paper and
 * the overlay text collapses. So: frame the image (hairline + inner vignette so
 * its edge is defined), and put the label *below* it in ink. At two metres that
 * reads far more strongly than white-on-photo ever did.
 */
export default function ImageCard({
  image,
  title,
  subtitle,
  eyebrow,
  selected = false,
  className = '',
  imageClassName = '',
  ...props
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={[
        'group relative flex min-h-0 flex-col overflow-hidden text-left',
        'rounded-[var(--radius-lg)] border bg-surface-raised',
        selected
          ? 'border-saffron shadow-[var(--shadow-3)] ring-3 ring-saffron'
          : 'border-line-strong shadow-[var(--shadow-2)]',
        className,
      ].join(' ')}
      {...props}
    >
      <div className={`photo-frame min-h-0 flex-1 ${imageClassName}`}>
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-temple)] group-active:scale-[1.04]"
        />
      </div>

      <div className="shrink-0 border-t border-line bg-surface-raised px-7 py-5">
        {eyebrow && (
          <p className="mb-1 font-sans text-label font-bold uppercase tracking-[0.08em] text-saffron-ink">
            {eyebrow}
          </p>
        )}
        <h3 className="font-serif text-title leading-tight text-ink">{title}</h3>
        {subtitle && (
          <p className="mt-1 font-sans text-body text-ink-muted">{subtitle}</p>
        )}
      </div>
    </motion.button>
  );
}
