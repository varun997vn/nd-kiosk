import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageShell from '../components/ui/PageShell';
import PageHeader from '../components/ui/PageHeader';
import ImageCard from '../components/ui/ImageCard';
import { activitiesData } from '../activitiesData';

/**
 * Tile spans for the mosaic. These used to be Tailwind class-name *strings*
 * fed through a switch that translated them into gridArea values by hand — a
 * fossil of the Tailwind prototype this app was ported from. Now that Tailwind
 * is actually installed they are just classes.
 */
const LAYOUT = {
  heritage: { span: 'col-span-2 row-span-2', eyebrow: 'Temples & festivals' },
  veda: { span: 'col-span-1 row-span-1', eyebrow: 'Eight patasalas' },
  animal: { span: 'col-span-1 row-span-2', eyebrow: 'Goshalas & forestry' },
  health: { span: 'col-span-1 row-span-1', eyebrow: 'Clinics & classrooms' },
  annadaanam: { span: 'col-span-2 row-span-1', eyebrow: 'Free meals' },
  // Spans total exactly 12 so the 4x3 grid has no empty cell.
  model: { span: 'col-span-2 row-span-1', eyebrow: 'Village renewal' },
};

const ORDER = ['heritage', 'veda', 'animal', 'health', 'annadaanam', 'model'];

export default function ActivitiesHub() {
  const navigate = useNavigate();

  return (
    <PageShell>
      <PageHeader
        title="Activities"
        subtitle="Humanitarian, cultural and spiritual outreach carried out across India."
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
        }}
        className="mt-8 grid min-h-0 flex-1 grid-cols-4 grid-rows-3 gap-6"
      >
        {ORDER.map((id) => {
          const activity = activitiesData[id];
          const { span, eyebrow } = LAYOUT[id];

          return (
            <motion.div
              key={id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
              className={`min-h-0 ${span}`}
            >
              <ImageCard
                image={activity.heroImage}
                eyebrow={eyebrow}
                title={activity.title}
                onClick={() => navigate(`/activities/${id}`)}
                className="h-full w-full"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </PageShell>
  );
}
