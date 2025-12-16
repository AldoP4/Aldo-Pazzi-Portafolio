import React from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { CaseStudies } from './components/CaseStudies';
import { Stats } from './components/Stats';
import { Gallery } from './components/Gallery';
import { Philosophy } from './components/Philosophy';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';

const App: React.FC = () => {
  return (
    <div className="bg-void min-h-screen w-full relative">
      <CustomCursor />
      <Navigation />
      
      <main>
        <Hero />
        <Services />
        <CaseStudies />
        <Stats />
        <Gallery />
        <Philosophy />
        <Contact />
      </main>
      
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[50] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
    </div>
  );
};

export default App;
