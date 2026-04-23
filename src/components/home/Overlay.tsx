import { useStore } from "../../lib/store";
import { motion, Variants } from "framer-motion";
import { useEffect } from "react";
import Hero from "./Hero";

const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export function Overlay() {
  const { inputText } = useStore();

  useEffect(() => {
    
  }, []);



  const textVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 350, damping: 25 },
    },
  };

  return (
    <div className="w-full">
      {}
      <Hero />

      {}
      <section className="min-h-[360vh] flex flex-col items-end justify-center p-4 md:p-24 pointer-events-none text-right">
        <motion.div
          className="max-w-xl bg-[#0a0a0a]/30 backdrop-blur-md border border-white/[0.05] p-6 md:p-8 relative rounded-4xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.05),inset_0_-1px_2px_rgba(0,0,0,0.8),0_0_30px_-10px_rgba(34,197,94,0.1)]"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-35% 0px -35% 0px" }}
        >
          {}
          <div className="absolute inset-0 rounded-4xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-[0.03] mix-blend-screen" style={{ backgroundImage: noiseSvg }} />
            <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/[0.02] via-transparent to-[#8b5cf6]/[0.02]" />
          </div>

          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#22c55e]/50 z-10" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#22c55e]/50 z-10" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#22c55e]/50 z-10" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#22c55e]/50 z-10" />

          <div className="relative z-10">
            <h2 className="text-xs tracking-[0.4em] text-[#22c55e] uppercase mb-6 font-mono font-medium border-b border-white/[0.05] pb-2 inline-block">
              Phase_01
            </h2>
            <h3 className="text-4xl md:text-6xl font-medium text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)] mb-8 tracking-tighter font-sans uppercase">
              Ingestion
            </h3>
            <p className="text-white/40 leading-relaxed font-mono text-sm md:text-base font-light">
              [ Requests don't wait. We bypass standard gateways for
              direct-to-metal routing. Sub-millisecond latency. Guaranteed. ]
            </p>
          </div>
        </motion.div>
      </section>

      {}
      <section className="min-h-[120vh] flex flex-col items-start justify-center p-4 md:p-24 pointer-events-none text-left">
        <motion.div
          className="max-w-xl bg-[#0a0a0a]/30 backdrop-blur-md border border-white/[0.05] p-6 md:p-8 relative rounded-4xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.05),inset_0_-1px_2px_rgba(0,0,0,0.8),0_0_30px_-10px_rgba(34,197,94,0.1)]"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-35% 0px -35% 0px" }}
        >
          {}
          <div className="absolute inset-0 rounded-4xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-[0.03] mix-blend-screen" style={{ backgroundImage: noiseSvg }} />
            <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/[0.02] via-transparent to-[#8b5cf6]/[0.02]" />
          </div>

          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#22c55e]/50 z-10" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#22c55e]/50 z-10" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#22c55e]/50 z-10" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#22c55e]/50 z-10" />

          <div className="relative z-10">
            <h2 className="text-xs tracking-[0.4em] text-[#22c55e] uppercase mb-6 font-mono font-medium border-b border-white/[0.05] pb-2 inline-block">
              Phase_02
            </h2>
            <h3 className="text-4xl md:text-6xl font-medium text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)] mb-8 tracking-tighter font-sans uppercase">
              Execution
            </h3>
            <p className="text-white/40 leading-relaxed font-mono text-sm md:text-base font-light">
              [ Parallel processing by default. Payloads distribute across
              active clusters instantly. Zero bottlenecks. ]
            </p>
          </div>
        </motion.div>
      </section>

      {}
      <section className="min-h-[300vh] flex flex-col items-end justify-center p-4 md:p-24 pointer-events-none text-right">
        <motion.div
          className="max-w-xl bg-[#0a0a0a]/30 backdrop-blur-md border border-white/[0.05] p-6 md:p-8 relative rounded-4xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.05),inset_0_-1px_2px_rgba(0,0,0,0.8),0_0_30px_-10px_rgba(34,197,94,0.1)]"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-35% 0px -35% 0px" }}
        >
          {}
          <div className="absolute inset-0 rounded-4xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-[0.03] mix-blend-screen" style={{ backgroundImage: noiseSvg }} />
            <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/[0.02] via-transparent to-[#8b5cf6]/[0.02]" />
          </div>

          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#22c55e]/50 z-10" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#22c55e]/50 z-10" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#22c55e]/50 z-10" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#22c55e]/50 z-10" />

          <div className="relative z-10">
            <h2 className="text-xs tracking-[0.4em] text-[#22c55e] uppercase mb-6 font-mono font-medium border-b border-white/[0.05] pb-2 inline-block">
              Phase_03
            </h2>
            <h3 className="text-4xl md:text-6xl font-medium text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)] mb-8 tracking-tighter font-sans uppercase">
              Output
            </h3>
            <p className="text-white/40 leading-relaxed font-mono text-sm md:text-base font-light">
              [ Inference complete. Data synthesized, compressed, and
              delivered before standard APIs even wake up. ]
            </p>
          </div>
        </motion.div>
      </section>

      {}
      <section className="min-h-[110vh] flex flex-col items-center justify-center p-4 md:p-8 relative">
        <motion.div
          className="max-w-3xl w-full text-center z-10 bg-[#0a0a0a]/30 backdrop-blur-md border border-white/[0.05] p-8 md:p-16 relative rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.05),inset_0_-1px_2px_rgba(0,0,0,0.8),0_0_30px_-10px_rgba(34,197,94,0.1)]"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-35% 0px -35% 0px" }}
        >
          {}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-[0.03] mix-blend-screen" style={{ backgroundImage: noiseSvg }} />
            <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/[0.02] via-transparent to-[#8b5cf6]/[0.02]" />
          </div>

          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/30 z-10" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/30 z-10" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/30 z-10" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/30 z-10" />

          <div className="absolute top-4 right-4 text-white/20 font-mono text-xs z-10">
            
          </div>

          <div className="relative z-10">
            <h2 className="text-xs tracking-[0.4em] text-[#22c55e] uppercase mb-12 font-mono font-medium border-b border-white/[0.05] pb-4 inline-block">
              Telemetry Report
            </h2>
            <div className="text-4xl md:text-6xl font-medium text-white leading-tight mb-16 tracking-tighter font-sans uppercase drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
              {inputText ? (
                <span className="text-white">{inputText}</span>
              ) : (
                <span className="text-white/20 font-mono text-4xl">
                  [ System idle. Awaiting command... ]
                </span>
              )}
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px bg-white/10 flex-1 max-w-[100px]" />
              <p className="text-[#22c55e] text-xs tracking-[0.2em] font-mono uppercase font-light">
                Execution verified. Latency: 0.8ms.
              </p>
              <div className="h-px bg-white/10 flex-1 max-w-[100px]" />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
