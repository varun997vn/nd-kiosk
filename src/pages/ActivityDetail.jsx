import { useParams } from 'react-router-dom';
import PageShell from '../components/ui/PageShell';
import HeroHeader from '../components/ui/HeroHeader';
import Panel from '../components/ui/Panel';
import EdgeFadeScroll from '../components/ui/EdgeFadeScroll';
import RichText from '../lib/richText';
import { KolamMark } from '../components/ui/Kolam';
import { activitiesData } from '../activitiesData';

export default function ActivityDetail() {
  const { id } = useParams();
  const data = activitiesData[id];

  if (!data) {
    return (
      <PageShell>
        <p className="font-serif text-headline text-ink-muted">
          That activity could not be found.
        </p>
      </PageShell>
    );
  }

  const hasImages = data.images?.length > 0;

  return (
    <PageShell>
      <HeroHeader image={data.heroImage} title={data.title} eyebrow="Activity" />

      <div
        className={`mt-8 grid min-h-0 flex-1 gap-10 ${
          hasImages ? 'grid-cols-[1fr_420px]' : 'grid-cols-1'
        }`}
      >
        <EdgeFadeScroll className="min-h-0">
          <div className="flex flex-col gap-8 pr-2">
            <Panel tone="flat" className="p-8">
              <p className="font-sans text-body-lg text-ink-muted">
                {data.description}
              </p>
            </Panel>

            {data.sections.map((section) => (
              <Panel key={section.heading} tone="raised" className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <KolamMark size={22} />
                  <h2 className="font-serif text-title text-saffron-ink">
                    {section.heading}
                  </h2>
                </div>
                {/* RichText renders the **bold**, "- " and "n)" markers that
                    used to appear on screen as literal characters. */}
                <RichText>{section.content}</RichText>
              </Panel>
            ))}
          </div>
        </EdgeFadeScroll>

        {hasImages && (
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
        )}
      </div>
    </PageShell>
  );
}
