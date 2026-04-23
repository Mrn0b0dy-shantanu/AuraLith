import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Magnetic from "../../ui/magnetic";

export default function FinalCallToAction() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section 
      ref={containerRef}
      className="w-full min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden"
    >
      {}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(34,197,94,0.15) 0%, rgba(10,10,10,1) 60%)",
          scale,
          opacity
        }}
      />
      
      <div className="max-w-4xl w-full px-4 text-center relative z-10 flex flex-col items-center">
        <motion.h2 
          className="text-5xl md:text-8xl font-medium text-white mb-8 tracking-tighter"
          style={{ opacity }}
        >
          Stop reading.<br/>
          <span className="text-white/50">Start building.</span>
        </motion.h2>

        <Magnetic>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(34,197,94,0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 px-10 py-5 bg-[#22c55e] text-[#0a0a0a] rounded-full font-bold text-lg md:text-xl shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-shadow duration-300"
          >
            Initialize Auralith Environment
          </motion.button>
        </Magnetic>

        <p className="mt-8 text-white/30 font-mono text-sm tracking-widest">
          NO CREDIT CARD REQUIRED. OPEN BETA.
        </p>
      </div>
    </section>
  );
}
