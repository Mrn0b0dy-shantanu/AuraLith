import { useStore } from "../../store";
import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import Hero from "./Hero";

export function Overlay() {
  const { inputText } = useStore();
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setRotation((prevRotation) => (prevRotation + 0.15) % 360);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const gradientColors = ["#9614d0", "#b525cc", "#8b5cf6"].join(", ");

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
      {/* Section 1: Hero */}
      <Hero />

      {/* Section 2: Signal Transmission */}
      <section className="min-h-[360vh] flex flex-col items-end justify-center p-4 md:p-24 pointer-events-none text-right">
        <motion.div
          className="max-w-xl bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-6 md:p-8 relative rounded-4xl"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-35% 0px -35% 0px" }}
        >
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#22c55e]" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#22c55e]" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#22c55e]" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#22c55e]" />

          <h2 className="text-xs tracking-[0.4em] text-[#22c55e] uppercase mb-6 font-mono font-medium border-b border-white/10 pb-2 inline-block">
            Phase_01
          </h2>
          <h3 className="text-4xl md:text-6xl font-medium text-white mb-8 tracking-tighter font-sans uppercase">
            Ingestion & Routing
          </h3>
          <p className="text-white/60 leading-relaxed font-mono text-sm md:text-base">
            [ Request captured. Bypassing standard API gateways for
            direct-to-silicon routing. Latency profile established at
            sub-millisecond threshold. ]
          </p>
        </motion.div>
      </section>

      {/* Section 3: Fragmentation / Deconstruction */}
      <section className="min-h-[120vh] flex flex-col items-start justify-center p-4 md:p-24 pointer-events-none text-left">
        <motion.div
          className="max-w-xl bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-6 md:p-8 relative rounded-4xl"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-35% 0px -35% 0px" }}
        >
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#22c55e]" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#22c55e]" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#22c55e]" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#22c55e]" />

          <h2 className="text-xs tracking-[0.4em] text-[#22c55e] uppercase mb-6 font-mono font-medium border-b border-white/10 pb-2 inline-block">
            Phase_02
          </h2>
          <h3 className="text-4xl md:text-6xl font-medium text-white mb-8 tracking-tighter font-sans uppercase">
            Parallel Execution
          </h3>
          <p className="text-white/60 leading-relaxed font-mono text-sm md:text-base">
            [ Tokenization and parallel processing initiated. The payload is
            distributed across active-active clusters, ensuring zero-bottleneck
            execution. ]
          </p>
        </motion.div>
      </section>

      {/* Section 5: Transformation */}
      <section className="min-h-[300vh] flex flex-col items-end justify-center p-4 md:p-24 pointer-events-none text-right">
        <motion.div
          className="max-w-xl bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-6 md:p-8 relative rounded-4xl"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-35% 0px -35% 0px" }}
        >
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#22c55e]" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#22c55e]" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#22c55e]" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#22c55e]" />

          <h2 className="text-xs tracking-[0.4em] text-[#22c55e] uppercase mb-6 font-mono font-medium border-b border-white/10 pb-2 inline-block">
            Phase_03
          </h2>
          <h3 className="text-4xl md:text-6xl font-medium text-white mb-8 tracking-tighter font-sans uppercase">
            Synthesis & Output
          </h3>
          <p className="text-white/60 leading-relaxed font-mono text-sm md:text-base">
            [ Inference complete. The output is synthesized and compressed,
            optimizing for maximum throughput and minimal network overhead. ]
          </p>
        </motion.div>
      </section>

      {/* Section 6: Final Output */}
      <section className="min-h-[110vh] flex flex-col items-center justify-center p-4 md:p-8 relative">
        <motion.div
          className="max-w-3xl w-full text-center z-10 bg-[#0a0a0a]/60 backdrop-blur-xl p-8 md:p-16 border border-white/10 relative rounded-3xl"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-35% 0px -35% 0px" }}
        >
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/50" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/50" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/50" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/50" />

          <div className="absolute top-4 right-4 text-white/20 font-mono text-xs">
            // OUTPUT
          </div>

          <h2 className="text-xs tracking-[0.4em] text-[#22c55e] uppercase mb-12 font-mono font-medium border-b border-white/10 pb-4 inline-block">
            Telemetry Report
          </h2>
          <div className="text-4xl md:text-6xl font-medium text-white leading-tight mb-16 tracking-tighter font-sans uppercase">
            {inputText ? (
              <span className="text-white">{inputText}</span>
            ) : (
              <span className="text-white/20 font-mono text-4xl">
                [ Awaiting input sequence... ]
              </span>
            )}
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-white/10 flex-1 max-w-[100px]" />
            <p className="text-[#22c55e] text-xs tracking-[0.2em] font-mono uppercase">
              Execution successful. Latency: 0.8ms.
            </p>
            <div className="h-px bg-white/10 flex-1 max-w-[100px]" />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
