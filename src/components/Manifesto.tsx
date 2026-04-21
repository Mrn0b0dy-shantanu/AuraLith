import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const text = "In a landscape cluttered with hallucinations and approximations, Auralith stands as a monolith of certainty. Engineered from the ground up for absolute precision, zero-latency inference, and unwavering reliability.";
  const words = text.split(" ");

  return (
    <section ref={containerRef} className="relative w-full py-48 px-4 flex items-center justify-center overflow-hidden bg-[#050505]">
      <motion.div 
        style={{ y, opacity }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-display font-medium leading-tight tracking-tight">
          We don't build toys. <br />
          <span className="text-neutral-500">We build engines of truth.</span>
        </h2>
        <p className="mt-12 text-lg md:text-xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed flex flex-wrap justify-center gap-x-2">
          {words.map((word, i) => {
            const start = 0.2 + (i / words.length) * 0.4;
            const end = start + 0.1;
            const wordOpacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
            return (
              <motion.span key={i} style={{ opacity: wordOpacity }}>
                {word}
              </motion.span>
            );
          })}
        </p>
      </motion.div>
    </section>
  );
}
