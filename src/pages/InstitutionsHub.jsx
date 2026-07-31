import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PageShell from '../components/ui/PageShell';
import PageHeader from '../components/ui/PageHeader';
import { Directory, DirectoryRow } from '../components/ui/Directory';
import { KolamRule } from '../components/ui/Kolam';
import IndiaMap from '../components/IndiaMap';
import { institutionsData } from '../data';

// Derived from the data rather than restated. This page used to carry its own
// hardcoded copy of the list, which could drift from data.js silently.
const INSTITUTIONS = Object.values(institutionsData);

export default function InstitutionsHub() {
  const navigate = useNavigate();
  const [focused, setFocused] = useState(INSTITUTIONS[0].id);
  const preview = institutionsData[focused];

  return (
    <PageShell>
      <PageHeader
        title="Institutions"
        subtitle="Ashrams, temples and mandapams across India. Touch a name to explore, or touch a pin on the map."
      />

      <div className="mt-8 grid min-h-0 flex-1 grid-cols-[640px_1fr] gap-10">
        <Directory
          title="Directory"
          count={`${INSTITUTIONS.length} centres`}
          storageKey="scroll-institutions"
        >
          {INSTITUTIONS.map((institution) => (
            <DirectoryRow
              key={institution.id}
              label={institution.name}
              meta={institution.location}
              selected={institution.id === focused}
              onPointerEnter={() => setFocused(institution.id)}
              onSelect={() => navigate(`/institutions/${institution.id}`)}
            />
          ))}
        </Directory>

        <div className="relative grid min-h-0 grid-cols-[1fr_auto] overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface-sunk pulli">
          {/* The map is tall and narrow, so its panel always has horizontal
              slack. Rather than leave it empty, it previews whatever the
              directory is pointing at. */}
          <div className="flex min-h-0 flex-col justify-center gap-6 p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={preview.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <div className="photo-frame h-[260px] rounded-[var(--radius-lg)]">
                  <img
                    src={preview.heroImage}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-6 font-sans text-label font-bold uppercase tracking-[0.08em] text-saffron-ink">
                  {preview.location}
                </p>
                <h3 className="mt-1 font-serif text-headline leading-tight text-ink">
                  {preview.name}
                </h3>
                <KolamRule className="mt-4 opacity-70" width={220} />
                <p className="mt-4 line-clamp-3 font-sans text-body text-ink-muted">
                  {preview.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative w-[560px] min-h-0">
            <IndiaMap
              places={INSTITUTIONS}
              selectedId={focused}
              onSelect={(id) => navigate(`/institutions/${id}`)}
            />
            <p
              aria-hidden="true"
              className="absolute bottom-6 right-8 font-serif text-title text-ink-faint/60"
            >
              Bh&#257;rat
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
