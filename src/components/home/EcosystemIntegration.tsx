import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function EcosystemIntegration() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

  return (
    <section
      ref={containerRef}
      className="w-full min-h-screen py-32 flex flex-col items-center justify-center relative"
    >
      <motion.div
        style={{ opacity, y }}
        className="max-w-6xl w-full px-4 flex flex-col items-center text-center"
      >
        <h2 className="text-xs tracking-[0.4em] text-[#22c55e] uppercase mb-6 font-mono font-medium border-b border-white/10 pb-2 inline-block">
          Ecosystem Interoperability
        </h2>
        <h3 className="text-4xl md:text-6xl font-medium text-white mb-16 tracking-tighter">
          Universal Node Access
        </h3>

        <div className="w-full max-w-4xl relative aspect-video border border-white/10 rounded-3xl bg-white/[0.02] backdrop-blur-md overflow-hidden flex items-center justify-center">
          {/* Node graph UI will go here */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.1)_0%,transparent_70%)]" />

          {/* Central Hub */}
          <div className="relative z-10 w-32 h-32 rounded-full border border-[#22c55e]/50 bg-[#22c55e]/10 flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.3)]">
            <span className="font-mono text-sm font-bold tracking-wider">
              AURALITH
            </span>
          </div>

          <div className="absolute bottom-8 w-full px-8">
            <div className="bg-black/80 border border-white/10 rounded-lg p-4 font-mono text-xs text-white/50 text-left overflow-x-hidden whitespace-nowrap">
              <span className="text-green-400">$</span> npm i @auralith/core
              --frozen-lockfile <br />
              <span className="text-purple-400 mt-2 block">import</span>{" "}
              {"{ AuralithClient }"}{" "}
              <span className="text-purple-400">from</span> "@auralith/core";
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
