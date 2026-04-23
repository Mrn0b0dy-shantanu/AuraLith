import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ComparativeAnalysis() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.4], [100, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const tpsX = 240;
  const latT = 12;

  return (
    <section
      ref={containerRef}
      className="w-full min-h-screen pb-50 pt-120 flex flex-col items-center justify-center relative"
    >
      <motion.div
        style={{ opacity: titleOpacity, y: titleY }}
        className="max-w-7xl w-full px-4 flex flex-col items-center"
      >
        <h2 className="text-xs tracking-[0.4em] text-[#8b5cf6] uppercase mb-6 font-mono font-medium border-b border-white/10 pb-2 inline-block">
          Architecture
        </h2>
        <h3 className="text-4xl md:text-6xl font-medium text-white mb-20 tracking-tighter text-center">
          Why Auralith Wins
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 opacity-50 filter grayscale transition-all duration-500 hover:opacity-70">
            <h4 className="font-mono text-sm tracking-wider text-white/50 mb-8 border-b border-white/5 pb-4">
              STANDARD_API
            </h4>
            <div className="flex flex-col gap-6 font-mono">
              <div className="flex justify-between">
                <span>Avg Latency</span>
                <span className="text-white">~250ms</span>
              </div>
              <div className="flex justify-between">
                <span>Concurrency Node</span>
                <span className="text-white">Single-thread</span>
              </div>
              <div className="flex justify-between">
                <span>TPS Limit</span>
                <span className="text-white">1.2x </span>
              </div>
            </div>
            <div className="w-full h-1 bg-white/5 mt-10 rounded overflow-hidden">
              <div className="h-full bg-white/20 w-1/3" />
            </div>
          </div>
          {}
          <div className="bg-[#0a0a0a]/60 backdrop-blur-md border border-[#8b5cf6]/30 shadow-[0_0_30px_rgba(139,92,246,0.1)] rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-transparent pointer-events-none" />
            <h4 className="font-mono text-sm tracking-wider text-[#8b5cf6] mb-8 border-b border-[#8b5cf6]/20 pb-4 flex justify-between">
              <span>AURALITH_CORE</span>
              <span className="animate-pulse">ACTIVE</span>
            </h4>
            <div className="flex flex-col gap-6 font-mono relative z-10">
              <div className="flex justify-between items-center group-hover:text-[#22c55e] transition-colors">
                <span>Avg Latency</span>
                <span className="text-2xl">{Math.round(latT)}ms</span>
              </div>
              <div className="flex justify-between">
                <span>Concurrency Node</span>
                <span className="text-white font-sans font-bold">
                  Parallel Mesh
                </span>
              </div>
              <div className="flex justify-between items-center group-hover:text-[#8b5cf6] transition-colors">
                <span>TPS Multiplier</span>
                <span className="text-2xl">{Math.round(tpsX)}x</span>
              </div>
            </div>

            <div className="w-full h-1 bg-white/5 mt-10 rounded overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#22c55e] to-[#8b5cf6] w-4/5" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
