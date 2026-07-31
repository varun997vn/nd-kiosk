import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageShell from '../components/ui/PageShell';
import PageHeader from '../components/ui/PageHeader';
import ImageCard from '../components/ui/ImageCard';

const PILLARS = [
  {
    id: 'institutions',
    title: 'Institutions',
    subtitle: 'Ashrams, temples & mandapams',
    eyebrow: 'Nine centres',
    image: './assets/images/unnamed (1).jpg',
    path: '/institutions',
  },
  {
    id: 'activities',
    title: 'Activities',
    subtitle: 'Humanitarian & cultural outreach',
    eyebrow: 'Six pillars',
    image: './assets/images/unnamed (29).jpg',
    path: '/activities',
  },
  {
    id: 'global',
    title: 'Global Presence',
    subtitle: 'Namadwaars worldwide',
    eyebrow: 'Fifty-six centres',
    image:
      './assets/a_glowing_stylized_world_map_with_golden_points_of_light_representing_spiritual.png',
    path: '/global',
  },
  {
    id: 'connect',
    title: 'Connect & Support',
    subtitle: 'Publications, trusts & contact',
    eyebrow: 'Stay in touch',
    image: './assets/images/unnamed (67).jpg',
    path: '/connect',
  },
];

export default function HomeDashboard() {
  const navigate = useNavigate();

  return (
    <PageShell>
      <PageHeader
        title="Welcome"
        subtitle="Choose a path to begin. Touch any card to explore."
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
        }}
        className="mt-8 grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-8"
      >
        {PILLARS.map((pillar) => (
          <motion.div
            key={pillar.id}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
            className="min-h-0"
          >
            <ImageCard
              image={pillar.image}
              eyebrow={pillar.eyebrow}
              title={pillar.title}
              subtitle={pillar.subtitle}
              onClick={() => navigate(pillar.path)}
              className="h-full w-full"
            />
          </motion.div>
        ))}
      </motion.div>
    </PageShell>
  );
}
