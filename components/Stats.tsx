import React from 'react';
import { motion, useInView } from 'framer-motion';

const StatItem: React.FC<{ value: string; label: string; delay: number }> = ({ value, label, delay }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="flex flex-col border-t border-smoke pt-8">
      <motion.span
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className="text-[10vw] md:text-[12vw] leading-none font-mono text-electric tracking-tighter"
      >
        {value}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
        className="text-sm md:text-base text-ghost uppercase tracking-widest mt-4"
      >
        {label}
      </motion.span>
    </div>
  );
};

export const Stats: React.FC = () => {
  return (
    <section id="stats" className="bg-void py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-x-12 gap-y-24">
        <StatItem value="20+" label="Projects Shipped" delay={0} />
        <StatItem value="5+" label="AI Apps & Tools" delay={0.1} />
        <StatItem value="10+" label="Tech Stacks" delay={0.2} />
        <StatItem value="∞" label="Experiments" delay={0.3} />
      </div>
    </section>
  );
};
