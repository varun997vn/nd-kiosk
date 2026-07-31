import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageShell from '../components/ui/PageShell';
import HeroHeader from '../components/ui/HeroHeader';
import Panel from '../components/ui/Panel';
import TabbedPanel from '../components/ui/TabbedPanel';
import EdgeFadeScroll from '../components/ui/EdgeFadeScroll';
import RichText from '../lib/richText';
import { KolamMark } from '../components/ui/Kolam';
import { institutionsData } from '../data';

const TABS = [
  { id: 'routine', label: 'Daily Routine' },
  { id: 'darshan', label: 'Darshan Timings' },
  { id: 'festivals', label: 'Festivals' },
];

export default function InstitutionDetail() {
  const { id } = useParams();
  const data = institutionsData[id];
  const [activeTab, setActiveTab] = useState('routine');

  if (!data) {
    return (
      <PageShell>
        <p className="font-serif text-headline text-ink-muted">
          That institution could not be found.
        </p>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <HeroHeader
        image={data.heroImage}
        title={data.name}
        location={data.location}
        eyebrow="Institution"
      />

      <div className="mt-8 grid min-h-0 flex-1 grid-cols-[1fr_460px] gap-10">
        <div className="flex min-h-0 flex-col gap-8">
          <Panel tone="flat" className="shrink-0 p-8">
            <div className="mb-3 flex items-center gap-3">
              <KolamMark size={22} />
              <h2 className="font-sans text-label font-bold uppercase tracking-[0.08em] text-saffron-ink">
                About
              </h2>
            </div>
            {/* No line clamp. The old build cut this to three lines to force a
                fit; at this type size the whole paragraph belongs on screen. */}
            <p className="font-sans text-body-lg text-ink-muted">
              {data.description}
            </p>
          </Panel>

          <TabbedPanel tabs={TABS} active={activeTab} onChange={setActiveTab}>
            <EdgeFadeScroll className="h-full">
              <RichText>{data.tabs[activeTab]}</RichText>
            </EdgeFadeScroll>
          </TabbedPanel>
        </div>

        {/* Every photo, not the first two the old layout had room for. */}
        <EdgeFadeScroll className="min-h-0">
          <div className="flex flex-col gap-6 pr-1">
            {data.images.map((src) => (
              <div
                key={src}
                className="photo-frame h-[240px] shrink-0 rounded-[var(--radius-lg)]"
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </EdgeFadeScroll>
      </div>
    </PageShell>
  );
}
