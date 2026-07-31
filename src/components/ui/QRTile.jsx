import { QRCodeSVG } from 'qrcode.react';
import { KolamFrame } from './Kolam';

/**
 * A genuinely scannable QR code, on brand.
 *
 * What was here before was decorative SVG shaped like a QR code that encoded
 * nothing at all — a visitor pointing a phone at it got no result and no
 * explanation. qrcode.react encodes in-process, so this works offline.
 *
 * The brand lives strictly *outside* the symbol. The code itself stays pure
 * white with warm-black modules and a full quiet zone: tinting the background
 * ivory or dropping ornament into the margin is exactly what makes codes fail
 * to read under hall lighting.
 */
export default function QRTile({ url, name, caption, size = 190 }) {
  return (
    <div className="relative flex flex-col items-center gap-4 rounded-[var(--radius-lg)] border border-line bg-surface-raised px-6 py-7 shadow-[var(--shadow-1)]">
      <KolamFrame inset={8} size={22} />

      <div className="rounded-[var(--radius-md)] bg-white p-3 shadow-[var(--shadow-1)]">
        <QRCodeSVG
          value={url}
          size={size}
          level="M"
          marginSize={2}
          bgColor="#FFFFFF"
          fgColor="#2B1A0E"
          title={`QR code linking to ${name}`}
        />
      </div>

      <div className="text-center">
        <p className="font-serif text-title leading-tight text-ink">{name}</p>
        {caption && (
          <p className="mt-0.5 font-sans text-label text-ink-muted">{caption}</p>
        )}
      </div>
    </div>
  );
}
