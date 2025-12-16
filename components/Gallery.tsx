import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ARTWORKS } from '../constants';

export const Gallery: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedId]);

  return (
    <section id="gallery" className="py-32 bg-[#050505] relative z-10">
      <div className="px-6 md:px-12 mb-20">
        <h2 className="text-6xl md:text-9xl font-thin tracking-tightest uppercase text-pure">
          AI <span className="text-electric">Gallery</span>
        </h2>
        <p className="mt-6 text-ghost text-xl max-w-2xl font-light">
          A visual exploration of noise, latent spaces, and digital dreams.
        </p>
      </div>

      <div className="px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {ARTWORKS.map((art) => (
          <motion.div
            key={art.id}
            layoutId={art.id}
            onClick={() => setSelectedId(art.id)}
            data-interactive="true"
            className={`relative group cursor-pointer overflow-hidden rounded-sm ${
              art.aspect === 'landscape' ? 'md:col-span-2 aspect-video' : 
              art.aspect === 'square' ? 'aspect-square' : 'aspect-[3/4]'
            }`}
            whileHover={{ scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <motion.img 
              src={art.src} 
              alt={art.title} 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
               <div>
                  <h3 className="text-2xl font-light text-pure">{art.title}</h3>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            {ARTWORKS.filter(a => a.id === selectedId).map(item => (
              <div key={item.id} className="relative w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-end pointer-events-none">
                 <motion.img 
                   layoutId={item.id}
                   src={item.src} 
                   className="w-full h-auto max-h-[80vh] object-contain shadow-2xl shadow-electric/10"
                 />
                 <motion.div 
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.2 }}
                   className="pb-8 pointer-events-auto"
                 >
                    <h2 className="text-5xl md:text-7xl font-thin tracking-tightest mb-6">{item.title}</h2>
                    <p className="text-xl text-ghost font-light leading-relaxed mb-8">{item.caption}</p>
                    <div className="flex gap-2">
                      <span className="text-xs border border-electric/30 text-electric px-3 py-1 rounded-full uppercase">AI Generated</span>
                      <span className="text-xs border border-smoke text-ghost px-3 py-1 rounded-full uppercase">Visual Study</span>
                    </div>
                 </motion.div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};