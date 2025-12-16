import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROJECTS } from '../constants';

export const CaseStudies: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // We have 1 Intro Slide + 5 Projects = 6 items.
  // To show the last item fully, we need to move (5/6) * 100% = 83.33%
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-83.33%"]);
  const progressWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section ref={targetRef} id="work" className="relative h-[600vh] bg-void">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-0">
          
          {/* Intro Slide */}
          <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-12 border-r border-smoke">
            <div className="max-w-4xl">
              <h2 className="text-8xl md:text-[10vw] font-thin tracking-tightest uppercase mb-8 leading-[0.8]">
                Selected <br/> <span className="text-electric">Works</span>
              </h2>
              <p className="text-ghost text-xl md:text-2xl max-w-md">
                A collection of shipped projects, automated systems, and digital experiments.
              </p>
            </div>
          </div>

          {/* Projects */}
          {PROJECTS.map((project, index) => (
            <div key={project.id} className="w-screen h-screen flex-shrink-0 relative group border-r border-smoke overflow-hidden">
               {/* Background Gradient */}
               <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out`} />
               
               <div className="relative z-10 w-full h-full p-8 md:p-16 flex flex-col justify-between">
                 <div className="flex justify-between items-start">
                   <span className="font-mono text-electric text-lg md:text-xl">
                      {project.year} — No. 0{index + 1}
                   </span>
                   <div className="flex gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs border border-smoke px-2 py-1 rounded-full text-ghost uppercase tracking-wider backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                   </div>
                 </div>

                 <div className="mb-12 md:mb-0">
                   <h3 
                     className="text-[12vw] leading-[0.8] font-thin tracking-tightest uppercase mb-8 mix-blend-overlay group-hover:mix-blend-normal transition-all duration-500"
                     data-interactive="true"
                   >
                     {project.title}
                   </h3>
                   <div className="max-w-xl overflow-hidden">
                     <p className="text-xl md:text-2xl text-ghost translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out delay-75">
                       {project.description}
                     </p>
                     
                     <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out delay-150 pt-8">
                       <button 
                         data-interactive="true"
                         className="flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-electric hover:text-white transition-colors group/btn"
                       >
                         <span className="w-8 h-[1px] bg-electric group-hover/btn:w-12 transition-all duration-300" />
                         View Architecture
                       </button>
                     </div>
                   </div>
                 </div>
               </div>
            </div>
          ))}

        </motion.div>
        
        {/* Progress Bar */}
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-electric z-50"
          style={{ width: progressWidth }}
        />
      </div>
    </section>
  );
};
