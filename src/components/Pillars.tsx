import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const pillars = [
  {
    id: '01',
    title: 'Fast.',
    description: 'Sub-millisecond latency. Optimized inference architecture ensures your requests are processed before you even finish asking.',
    metric: '0.8ms',
    metricLabel: 'Average Inference Time'
  },
  {
    id: '02',
    title: 'Reliable.',
    description: '99.999% uptime. Distributed across global edge nodes with redundant failovers. It simply does not go down.',
    metric: '99.999%',
    metricLabel: 'Guaranteed Uptime'
  },
  {
    id: '03',
    title: 'Accurate.',
    description: 'Zero hallucinations. Deterministic outputs backed by rigorous mathematical verification and continuous alignment.',
    metric: '0.00%',
    metricLabel: 'Hallucination Rate'
  }
];

export default function Pillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-[#050505]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Background elements that react to scroll */}
        <motion.div 
          className="absolute inset-0 z-0 opacity-10"
          style={{
            background: 'radial-gradient(circle at center, #ffffff 0%, transparent 70%)',
            scale: useTransform(scrollYProgress, [0, 1], [0.5, 2]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.15, 0.05])
          }}
        />

        <div className="container mx-auto px-4 md:px-12 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side: Dynamic content */}
            <div className="relative h-[400px] flex flex-col justify-center">
              {pillars.map((pillar, index) => {
                const start = index / pillars.length;
                const end = (index + 1) / pillars.length;
                
                // Active state for this specific pillar
                const opacity = useTransform(
                  scrollYProgress,
                  [Math.max(0, start - 0.1), start, end - 0.1, Math.min(1, end + 0.1)],
                  [0, 1, 1, 0]
                );
                
                const y = useTransform(
                  scrollYProgress,
                  [Math.max(0, start - 0.1), start, end - 0.1, Math.min(1, end + 0.1)],
                  [50, 0, 0, -50]
                );

                return (
                  <motion.div 
                    key={pillar.id}
                    style={{ opacity, y }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <span className="text-neutral-600 font-mono text-sm mb-4 tracking-widest">PHASE {pillar.id}</span>
                    <h3 className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-6">
                      {pillar.title}
                    </h3>
                    <p className="text-xl text-neutral-400 font-light max-w-md leading-relaxed">
                      {pillar.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Right side: Dynamic metrics/visuals */}
            <div className="relative h-[400px] flex items-center justify-center lg:justify-end border-l border-neutral-800 pl-12">
              {pillars.map((pillar, index) => {
                const start = index / pillars.length;
                const end = (index + 1) / pillars.length;
                
                const opacity = useTransform(
                  scrollYProgress,
                  [Math.max(0, start - 0.1), start, end - 0.1, Math.min(1, end + 0.1)],
                  [0, 1, 1, 0]
                );
                
                const scale = useTransform(
                  scrollYProgress,
                  [Math.max(0, start - 0.1), start, end - 0.1, Math.min(1, end + 0.1)],
                  [0.8, 1, 1, 1.2]
                );

                return (
                  <motion.div 
                    key={`metric-${pillar.id}`}
                    style={{ opacity, scale }}
                    className="absolute flex flex-col items-start lg:items-end text-left lg:text-right"
                  >
                    <div className="text-7xl md:text-9xl font-mono font-light tracking-tighter text-white mb-4">
                      {pillar.metric}
                    </div>
                    <div className="text-sm font-mono text-neutral-500 uppercase tracking-widest">
                      {pillar.metricLabel}
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
