import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  const [displayText, setDisplayText] = useState('aldopazzi4@gmail.com');
  const originalText = 'aldopazzi4@gmail.com';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  
  // Use a ref to track the interval so we can clear it reliably
  const intervalRef = useRef<number | null>(null);

  const scramble = () => {
    let iteration = 0;
    
    // Clear any existing interval before starting a new one
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= originalText.length) {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
      }
      iteration += 1 / 2; // Speed
    }, 30);
  };

  const handleMouseLeave = () => {
    // Stop scrambling immediately and reset text
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    setDisplayText(originalText);
  };

  return (
    <section id="contact" className="bg-void min-h-screen flex flex-col justify-between pt-32 pb-8 px-6 md:px-12 border-t border-smoke">
      <div className="max-w-5xl">
        <h2 className="text-6xl md:text-8xl font-thin tracking-tightest uppercase mb-12">
          Let’s build your <br/> next system.
        </h2>
        
        <p className="text-ghost text-xl md:text-2xl max-w-2xl font-light mb-20">
          Tell me about your idea, your business bottleneck, or the problem you are stuck on.
          I build with AI to solve it.
        </p>

        <a 
          href="mailto:aldopazzi4@gmail.com"
          onMouseEnter={scramble}
          onMouseLeave={handleMouseLeave}
          data-interactive="true"
          className="group relative inline-block text-3xl md:text-5xl font-mono text-pure overflow-hidden py-2"
        >
          {displayText}
          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-electric transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
        </a>
      </div>

      <footer className="w-full flex flex-col md:flex-row justify-between md:items-end gap-6 text-sm text-ghost/40 font-mono border-t border-smoke/10 pt-8 mt-20">
        <div className="flex flex-col md:flex-row gap-8 md:gap-20">
            <div className="flex flex-col gap-1">
              <p>© 2025 ALDO PAZZI</p>
              <p>Puebla, Mexico</p>
            </div>

            <div className="flex items-center gap-6 flex-wrap">
                <a 
                  href="https://www.linkedin.com/in/aldopazzi/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-electric transition-colors duration-300 uppercase tracking-wider"
                  data-interactive="true"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/AldoP4" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-electric transition-colors duration-300 uppercase tracking-wider"
                  data-interactive="true"
                >
                  GitHub
                </a>
                <a 
                  href="https://www.instagram.com/aldopazzi?igsh=bTEwZWpzNWFwMGdt&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-electric transition-colors duration-300 uppercase tracking-wider"
                  data-interactive="true"
                >
                  Instagram
                </a>
            </div>
        </div>
        
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-electric animate-pulse" />
           <span>SYSTEM ONLINE</span>
        </div>
      </footer>
    </section>
  );
};