import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Magnetic from "./magnetic";
import { ScrambleText } from "./scramble-text";

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <footer
      ref={containerRef}
      className="w-full pt-32 pb-12 px-4 border-t border-neutral-900 overflow-hidden relative z-10"
    >
      <motion.div
        style={{ y, opacity }}
        className="max-w-6xl mx-auto flex flex-col items-center text-center relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-[#22c55e]" />

        <div className="mt-16 mb-8 text-[#22c55e] font-mono text-xs uppercase tracking-widest border border-[#22c55e]/30 bg-[#22c55e]/5 px-4 py-2">
          <ScrambleText text="SYS.TERMINATION_SEQUENCE" />
        </div>

        <h2 className="text-4xl md:text-6xl font-sans font-medium mb-12 tracking-tighter uppercase">
          Ready to build the future?
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 mb-32">
          <Magnetic>
            <button className="group relative px-8 py-4 bg-white text-black font-mono text-sm uppercase tracking-widest border border-white overflow-hidden rounded-xl">
              <span className="relative z-10 transition-colors duration-0 group-hover:text-white">
                [ Get API Keys ]
              </span>
              <div className="absolute inset-0 bg-[#22c55e] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />
            </button>
          </Magnetic>
          <Magnetic>
            <button className="group relative px-8 py-4 border border-white/20 text-white font-mono text-sm uppercase tracking-widest overflow-hidden bg-[#111] rounded-xl">
              <span className="relative z-10 transition-colors duration-0 group-hover:text-white">
                [ Contact Sales ]
              </span>
              <div className="absolute inset-0 bg-[#8b5cf6] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />
            </button>
          </Magnetic>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full relative"
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-full h-px bg-white" />
          </div>
          <h1 className="text-[2rem] leading-none font-sans font-bold tracking-tighter text-transparent text-stroke-white text-stroke-1 opacity-20 select-none uppercase relative z-10 px-8 inline-block">
            AURALITH
          </h1>
        </motion.div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-white/10 text-white/40 font-mono text-xs uppercase tracking-widest">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 bg-[#22c55e]" />
            <span>&copy; 2026 Auralith</span>
          </div>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a
              href="#"
              className="hover:text-[#22c55e] transition-colors duration-0"
            >
              Twitter
            </a>
            <a
              href="#"
              className="hover:text-[#22c55e] transition-colors duration-0"
            >
              GitHub
            </a>
            <a
              href="#"
              className="hover:text-[#22c55e] transition-colors duration-0"
            >
              Discord
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
