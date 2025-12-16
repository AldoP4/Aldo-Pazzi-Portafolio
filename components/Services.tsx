import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SERVICES } from '../constants';

const ServiceItem: React.FC<{ service: typeof SERVICES[0], index: number }> = ({ service, index }) => {
  return (
    <div className="min-h-screen flex items-center justify-center sticky top-0 bg-void/95 border-b border-smoke backdrop-blur-sm">
      <div className="w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
        
        {/* Number */}
        <div className="md:col-span-4">
          <h2 className="text-[12rem] md:text-[16rem] leading-none font-thin text-transparent stroke-text opacity-20 select-none font-mono">
            {service.number}
          </h2>
        </div>

        {/* Content */}
        <div className="md:col-span-8 pb-12 md:pb-24">
           <motion.h3 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="text-5xl md:text-8xl font-thin uppercase tracking-tightest mb-8"
            >
             {service.title}
           </motion.h3>
           
           <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ delay: 0.2, duration: 0.8 }}
             className="text-xl md:text-2xl text-ghost max-w-2xl font-light leading-relaxed mb-8"
           >
             {service.description}
           </motion.p>

           <div className="flex flex-wrap gap-3">
             {service.tech.map((tech, i) => (
               <span key={i} className="px-4 py-2 border border-smoke rounded-full text-sm text-ghost font-mono uppercase tracking-wide">
                 {tech}
               </span>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export const Services: React.FC = () => {
  return (
    <section id="services" className="relative z-20 bg-void">
       {SERVICES.map((s, i) => (
         <ServiceItem key={s.id} service={s} index={i} />
       ))}
    </section>
  );
};
