import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Benchmarks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const data = [
    { name: 'Auralith v2', speed: 100, accuracy: 99.8, cost: 10 },
    { name: 'Competitor X', speed: 45, accuracy: 92.1, cost: 85 },
    { name: 'Competitor Y', speed: 60, accuracy: 88.4, cost: 60 },
    { name: 'Legacy Model', speed: 15, accuracy: 75.0, cost: 100 },
  ];

  return (
    <section ref={containerRef} className="w-full py-32 px-4 bg-[#050505] border-t border-neutral-900 overflow-hidden">
      <motion.div style={{ y }} className="max-w-6xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-medium mb-4">Empirical Superiority.</h2>
          <p className="text-neutral-500 font-mono text-sm uppercase tracking-widest">Benchmark Results / Q3 2026</p>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-500 font-mono text-xs uppercase tracking-widest">
                <th className="pb-4 font-normal w-1/4">Model</th>
                <th className="pb-4 font-normal w-1/4">Inference Speed</th>
                <th className="pb-4 font-normal w-1/4">Accuracy Score</th>
                <th className="pb-4 font-normal w-1/4">Compute Cost</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <motion.tr 
                  key={row.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`border-b border-neutral-900/50 hover:bg-neutral-900/50 transition-colors group ${i === 0 ? 'text-white' : 'text-neutral-400'}`}
                >
                  <td className={`py-6 font-display text-lg transition-transform duration-300 group-hover:translate-x-2 ${i === 0 ? 'font-medium' : 'font-light'}`}>
                    {row.name}
                  </td>
                  <td className="py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-full max-w-[100px] h-1 bg-neutral-900 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${row.speed}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                          className={`h-full ${i === 0 ? 'bg-white' : 'bg-neutral-700'}`}
                        />
                      </div>
                      <span className="font-mono text-sm">{row.speed}k t/s</span>
                    </div>
                  </td>
                  <td className="py-6 font-mono text-sm">{row.accuracy}%</td>
                  <td className="py-6 font-mono text-sm">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <span key={j} className={j < (row.cost / 20) ? (i === 0 ? 'text-white' : 'text-neutral-500') : 'text-neutral-800'}>
                          $
                        </span>
                      ))}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}
