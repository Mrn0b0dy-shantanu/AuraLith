import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  
  
  const springConfigDot = { damping: 25, stiffness: 450, mass: 0.1 };
  const springConfigRing = { damping: 30, stiffness: 180, mass: 0.4 };

  const dotX = useSpring(mouseX, springConfigDot);
  const dotY = useSpring(mouseY, springConfigDot);

  const ringX = useSpring(mouseX, springConfigRing);
  const ringY = useSpring(mouseY, springConfigRing);

  useEffect(() => {
    
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const mouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const mouseDown = () => setIsClicked(true);
    const mouseUp = () => setIsClicked(false);
    const mouseEnter = () => setIsVisible(true);
    const mouseLeave = () => {
      setIsVisible(false);
      setIsClicked(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const tagName = target.tagName.toLowerCase();
      
      if (
        tagName === 'a' || 
        tagName === 'button' || 
        target.closest('a') || 
        target.closest('button') ||
        (target.hasAttribute('role') && target.getAttribute('role') === 'button') ||
        target.classList.contains('interactive') || 
        (target as any).onclick
      ) {
        setCursorVariant('interactive');
        return;
      }
      
      
      if (
        tagName === 'p' || 
        tagName === 'h1' || 
        tagName === 'h2' || 
        tagName === 'h3' || 
        tagName === 'h4' || 
        tagName === 'h5' || 
        tagName === 'h6' || 
        tagName === 'span' || 
        tagName === 'strong' || 
        tagName === 'em' ||
        tagName === 'li' || 
        tagName === 'label'
      ) {
        setCursorVariant('text');
        return;
      }

      setCursorVariant('default');
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseenter', mouseEnter);
    document.documentElement.addEventListener('mouseleave', mouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseenter', mouseEnter);
      document.documentElement.removeEventListener('mouseleave', mouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  
  if (isTouchDevice) return null;

  const variantsDot = {
    default: {
      width: 6,
      height: 6,
      backgroundColor: '#22c55e', 
      borderRadius: '50%',
      x: '-50%',
      y: '-50%',
      opacity: 0.8,
      scale: isClicked ? 0.5 : 1,
    },
    interactive: {
      width: 10,
      height: 10,
      backgroundColor: '#a855f7', 
      borderRadius: '50%',
      x: '-50%',
      y: '-50%',
      opacity: 1,
      scale: isClicked ? 0.7 : 1,
    },
    text: {
      width: 2,
      height: 20,
      backgroundColor: '#22c55e', 
      borderRadius: '2px',
      x: '-50%',
      y: '-50%',
      opacity: 0.6,
      scale: isClicked ? 0.8 : 1,
    }
  };

  const variantsRing = {
    default: {
      width: 28,
      height: 28,
      border: '1px solid rgba(168, 85, 247, 0.3)', 
      boxShadow: '0 0 10px rgba(168, 85, 247, 0.1)',
      backgroundColor: 'transparent',
      borderRadius: '50%',
      x: '-50%',
      y: '-50%',
      opacity: 1,
      scale: isClicked ? 0.8 : 1,
    },
    interactive: {
      width: 44,
      height: 44,
      border: '1px solid rgba(168, 85, 247, 0.6)',
      boxShadow: '0 0 16px rgba(168, 85, 247, 0.3)',
      backgroundColor: 'rgba(168, 85, 247, 0.05)',
      borderRadius: '50%',
      x: '-50%',
      y: '-50%',
      opacity: 1,
      scale: isClicked ? 0.9 : 1.1,
    },
    text: {
      width: 16,
      height: 16,
      border: '1px solid rgba(34, 197, 94, 0)',
      boxShadow: '0 0 0px rgba(34, 197, 94, 0)',
      backgroundColor: 'transparent',
      borderRadius: '50%',
      x: '-50%',
      y: '-50%',
      opacity: 0,
      scale: 0.5,
    }
  };

  return (
    <div style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}>
      {}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ left: ringX, top: ringY }}
        variants={variantsRing}
        animate={cursorVariant}
        transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
      />
      {}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ left: dotX, top: dotY }}
        variants={variantsDot}
        animate={cursorVariant}
        transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
      />
    </div>
  );
}
