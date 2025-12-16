import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const textX = useTransform(scrollY, [0, 500], [0, 100]);
  const textXReverse = useTransform(scrollY, [0, 500], [0, -100]);
  const imageScale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const imageY = useTransform(scrollY, [0, 500], [0, 50]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let animationFrameId: number;

    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const particleCount = width < 768 ? 40 : 90;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3
      });
    }

    const mouse = { x: -1000, y: -1000 };

    const animate = () => {
      ctx.fillStyle = '#030303';
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x -= dx * 0.005;
          p.y -= dy * 0.005;
        }

        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Connect
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${0.1 - dist2 / 1200})`;
            // Electric pulse occasionally
            if (Math.random() > 0.999 && dist2 < 50) {
               ctx.strokeStyle = '#cfff05';
               ctx.shadowBlur = 10;
               ctx.shadowColor = '#cfff05';
            } else {
               ctx.shadowBlur = 0;
            }
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <section ref={containerRef} id="intro" className="relative h-screen w-full overflow-hidden flex flex-col">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      <motion.div 
        className="relative z-10 w-full px-6 md:px-12 max-w-7xl mx-auto flex flex-col h-full pt-32 pb-12 justify-between"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* UPPER AREA: Typography Left / Image Right */}
        <div className="flex-grow flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 w-full gap-8 items-center">
                
                {/* NAME */}
                <div className="lg:col-span-7 flex flex-col mix-blend-difference relative z-20">
                    <motion.h1 
                        style={{ x: textXReverse }} 
                        variants={itemVariants} 
                        className="text-[15vw] lg:text-[11vw] leading-[0.85] font-thin tracking-tightest text-pure select-none whitespace-nowrap"
                    >
                        ALDO
                    </motion.h1>
                    <motion.h1 
                        style={{ x: textX }} 
                        variants={itemVariants} 
                        className="text-[15vw] lg:text-[11vw] leading-[0.85] font-thin tracking-tightest text-pure select-none pl-[5vw] lg:pl-[8vw] whitespace-nowrap"
                    >
                        PAZZI
                    </motion.h1>
                </div>

                {/* PROFILE IMAGE (Rectangular/Complete) */}
                <motion.div 
                    variants={itemVariants}
                    style={{ scale: imageScale, y: imageY }}
                    className="lg:col-span-5 flex justify-center lg:justify-end relative z-10 mt-8 lg:mt-0"
                >
                    {/* Container constrained to max width but maintaining aspect ratio */}
                    <div className="relative w-full max-w-[300px] lg:max-w-[380px] aspect-[4/5] rounded-sm group">
                        
                        {/* Interactive Border Frame */}
                        <div className="absolute -inset-2 border border-electric/30 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100" />
                        
                        {/* Corner Accents */}
                        <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-electric opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-electric opacity-50 group-hover:opacity-100 transition-opacity" />

                        <div className="w-full h-full overflow-hidden rounded-sm bg-smoke/10 relative">
                            {/* Removed darken overlay to show full color by default */}
                            <div className="absolute inset-0 bg-void/0 z-10 transition-all duration-500" />
                            
                            <img 
                                src="https://i.imgur.com/ufq7XnL.jpeg" 
                                alt="Aldo Pazzi Portrait"
                                className="w-full h-full object-cover object-center grayscale-0 contrast-100 brightness-100 group-hover:saturate-125 group-hover:contrast-110 group-hover:scale-105 transition-all duration-700 ease-out"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>

        {/* LOWER AREA: Description Left / Work Preview Right */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between border-t border-smoke pt-6 gap-8">
            <p className="text-ghost max-w-md text-lg md:text-xl font-light leading-relaxed backdrop-blur-sm">
                AI-native builder of automations, apps and digital experiences.
                <br className="hidden md:block"/> Building with AI, not just talking about it.
            </p>
            
            <div className="flex items-center gap-6 md:gap-8 self-end md:self-auto">
                <motion.button 
                    data-interactive="true"
                    whileHover={{ x: 10 }}
                    className="group flex items-center gap-4 text-xl font-light whitespace-nowrap"
                    onClick={() => {
                        const el = document.getElementById('work');
                        el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    Explore the work
                    <span className="relative w-12 h-[1px] bg-white group-hover:bg-electric transition-colors duration-300">
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-current rotate-45" />
                    </span>
                </motion.button>
            </div>
        </motion.div>
      </motion.div>
    </section>
  );
};