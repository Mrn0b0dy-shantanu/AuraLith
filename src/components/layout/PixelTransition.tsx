import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useLocation } from 'react-router-dom';
import './PixelTransition.css';

interface PixelTransitionProps {
  children: React.ReactElement;
  gridSize?: number;
  pixelColor?: string;
  animationStepDuration?: number;
}

export default function PixelTransition({
  children,
  gridSize = 25,
  pixelColor = '#0a0a0a',
  animationStepDuration = 0.25,
}: PixelTransitionProps) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  
  const pixelGridRef = useRef<HTMLDivElement>(null);
  const delayedCallRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;

    pixelGridEl.innerHTML = '';

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel-transition-pixel');
        pixel.style.backgroundColor = pixelColor;

        const size = 100 / gridSize;
        pixel.style.width = `${size + 0.5}%`; // Slight overlap to prevent gaps
        pixel.style.height = `${size + 0.5}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;
        pixelGridEl.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor]);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      const pixelGridEl = pixelGridRef.current;
      if (!pixelGridEl) {
        setDisplayLocation(location);
        return;
      }

      const pixels = pixelGridEl.querySelectorAll('.pixel-transition-pixel');
      if (!pixels.length) {
        setDisplayLocation(location);
        return;
      }

      gsap.killTweensOf(pixels);
      if (delayedCallRef.current) {
        delayedCallRef.current.kill();
      }

      gsap.set(pixels, { display: 'none' });

      const totalPixels = pixels.length;
      const staggerDuration = animationStepDuration / totalPixels;

      // 1. Cover the screen
      gsap.to(pixels, {
        display: 'block',
        duration: 0,
        stagger: {
          each: staggerDuration,
          from: 'random'
        }
      });

      // 2. Swap content when screen is covered
      delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
        setDisplayLocation(location);
        window.scrollTo(0, 0);
      });

      // 3. Uncover the screen
      gsap.to(pixels, {
        display: 'none',
        duration: 0,
        delay: animationStepDuration + 0.1,
        stagger: {
          each: staggerDuration,
          from: 'random'
        }
      });
    }
  }, [location, displayLocation.pathname, animationStepDuration]);

  return (
    <>
      {React.cloneElement(children as React.ReactElement, { location: displayLocation } as any)}
      <div 
        ref={pixelGridRef} 
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{ width: '100vw', height: '100vh' }}
      />
    </>
  );
}
