import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState(false);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check for hover targets
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [data-interactive="true"]');
      const isText = target.closest('p, span, h1, h2, h3, h4, h5, h6');
      
      setIsHovering(!!isInteractive);
      setHoverText(!!isText && !isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: isHovering ? 'rgba(207, 255, 5, 0.1)' : 'transparent',
          border: isHovering ? '1px solid #cfff05' : '1px solid #cfff05',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 3.5 : hoverText ? 0.2 : 1,
          height: hoverText ? 24 : isHovering ? 48 : 12,
          width: hoverText ? 2 : isHovering ? 48 : 12,
          borderRadius: hoverText ? 0 : '50%',
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      
      {/* Ghost Trail */}
      <motion.div
         className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#cfff05] opacity-20 pointer-events-none z-[9998]"
         style={{
           x: springX,
           y: springY,
           translateX: '-50%',
           translateY: '-50%',
         }}
         transition={{ delay: 0.05 }}
      />
    </>
  );
};
