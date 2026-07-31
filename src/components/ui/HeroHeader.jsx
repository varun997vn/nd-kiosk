import { MapPin } from 'lucide-react';
import { KolamFrame } from './Kolam';

/**
 * The image header on the two detail pages.
 *
 * One of the two places in the system where text sits directly on a photograph.
 * That means a deliberate dark island inside a light layout — a warm scrim in
 * `--color-scrim` with ivory text, framed so it reads as an inset plate rather
 * than as the page having changed theme.
 */
export default function HeroHeader({ image, title, location, eyebrow }) {
  return (
    <div className="photo-frame relative h-[300px] shrink-0 rounded-[var(--radius-lg)]">
      <img src={image} alt="" className="h-full w-full object-cover" />

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, var(--color-scrim) 0%, rgb(43 26 14 / 0.35) 45%, transparent 75%)',
        }}
      />

      <KolamFrame inset={16} size={30} className="text-on-saffron/50" />

      <div className="absolute inset-x-0 bottom-0 p-10">
        {eyebrow && (
          <p className="mb-2 font-sans text-label font-bold uppercase tracking-[0.08em] text-saffron">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-display-lg leading-tight text-on-saffron">
          {title}
        </h1>
        {location && (
          <p className="mt-2 flex items-center gap-3 font-sans text-body-lg text-on-saffron/85">
            <MapPin size={26} aria-hidden="true" />
            {location}
          </p>
        )}
      </div>
    </div>
  );
}
