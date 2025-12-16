import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'intro', label: 'Intro' },
  { id: 'services', label: 'Expertise' },
  { id: 'work', label: 'Selected Works' },
  { id: 'stats', label: 'Impact' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'contact', label: 'Contact' }
];

export const Navigation: React.FC = () => {
  const [activeId, setActiveId] = useState('intro');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -55% 0px' } // Slightly offset to trigger earlier when scrolling down
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4 items-end pointer-events-none mix-blend-difference">
      {sections.map(({ id, label }, index) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={(e) => {
             e.preventDefault();
             document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group flex items-center gap-4 cursor-pointer pointer-events-auto"
        >
           <div className="relative flex items-center">
             <motion.span 
               className="absolute right-full mr-4 text-xs font-mono tracking-widest uppercase whitespace-nowrap"
               initial={{ opacity: 0, x: 10 }}
               animate={{ 
                 opacity: activeId === id ? 1 : 0, 
                 x: activeId === id ? 0 : 10,
                 color: activeId === id ? '#cfff05' : 'rgba(255,255,255,0.4)'
               }}
               transition={{ duration: 0.3 }}
             >
               {label}
             </motion.span>
             
             <span 
               className={`font-mono text-[10px] transition-colors duration-300 ${activeId === id ? 'text-electric' : 'text-ghost group-hover:text-white'}`}
             >
               0{index + 1}
             </span>
           </div>
           
           <div className="relative w-[2px] h-full flex items-center justify-center">
              <motion.div 
                className={`w-[2px] rounded-full transition-all duration-500 ease-out ${activeId === id ? 'bg-electric' : 'bg-smoke group-hover:bg-ghost'}`}
                animate={{ height: activeId === id ? 32 : 12 }}
              />
           </div>
        </a>
      ))}
    </div>
  );
};
