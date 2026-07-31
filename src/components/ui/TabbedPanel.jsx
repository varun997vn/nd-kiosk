import { motion } from 'framer-motion';
import Panel from './Panel';

/**
 * Tabs with a shared-layout underline.
 *
 * The animated indicator was the one genuinely nice detail in the old
 * InstitutionDetail — kept verbatim (framer's layoutId). What changed is the
 * tab strip itself: it now clears the 64px touch minimum, which it did not.
 */
export default function TabbedPanel({ tabs, active, onChange, children }) {
  return (
    <Panel tone="raised" className="flex min-h-0 flex-col overflow-hidden">
      <div
        role="tablist"
        className="flex shrink-0 border-b border-line bg-surface-sunk"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={[
                'relative min-h-[72px] flex-1 px-6 font-sans text-body font-semibold',
                'transition-colors duration-200',
                isActive ? 'text-saffron-ink' : 'text-ink-muted hover:text-ink',
              ].join(' ')}
            >
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute inset-x-5 bottom-0 h-1 rounded-t-full bg-saffron"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>
      <div className="min-h-0 flex-1 overflow-hidden p-8">{children}</div>
    </Panel>
  );
}
