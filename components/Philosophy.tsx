import React from 'react';
import { motion } from 'framer-motion';

export const Philosophy: React.FC = () => {
  const text = "I don’t just learn tools — I ship things. Every automation, app or experiment starts from a simple question: what real problem are we solving?";
  const words = text.split(" ");

  return (
    <section id="philosophy" className="min-h-[80vh] flex items-center justify-center bg-void px-6">
      <div className="max-w-4xl text-center">
        <p className="text-3xl md:text-5xl font-light leading-relaxed flex flex-wrap justify-center gap-x-3 md:gap-x-4">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.02 }}
              viewport={{ margin: "-100px" }}
              className={word.includes("ship") || word.includes("problem") ? "text-electric" : "text-ghost"}
            >
              {word}
            </motion.span>
          ))}
        </p>
      </div>
    </section>
  );
};
