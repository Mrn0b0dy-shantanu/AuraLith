import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const cases = [
  {
    id: "01",
    title: "High-Frequency Oracles",
    subtitle: "Sub-1ms decision engines",
    desc: "Deploy deterministic agent workflows that execute alongside latency-critical market data.",
    color: "#22c55e",
    icon: (
      <svg viewBox="0 0 100 40" className="w-full h-20 opacity-50 overflow-visible">
        <motion.path
          d="M0 20 Q 25 0 50 20 T 100 20"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          animate={{ x: [0, -100] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M100 20 Q 125 0 150 20 T 200 20"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          animate={{ x: [0, -100] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    )
  },
  {
    id: "02",
    title: "Agent Orchestration",
    subtitle: "Multi-path parallel execution",
    desc: "Route complex inference tasks through distributed clusters without managing context states.",
    color: "#8b5cf6",
    icon: (
      <svg viewBox="0 0 100 40" className="w-full h-20 opacity-50">
        <circle cx="20" cy="20" r="4" fill="#8b5cf6" />
        <circle cx="50" cy="10" r="4" fill="#8b5cf6" />
        <circle cx="50" cy="30" r="4" fill="#8b5cf6" />
        <circle cx="80" cy="20" r="4" fill="#8b5cf6" />
        <motion.path d="M 20 20 L 50 10" stroke="#8b5cf6" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, repeat: Infinity }} />
        <motion.path d="M 20 20 L 50 30" stroke="#8b5cf6" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2, repeat: Infinity }} />
        <motion.path d="M 50 10 L 80 20" stroke="#8b5cf6" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.4, repeat: Infinity }} />
        <motion.path d="M 50 30 L 80 20" stroke="#8b5cf6" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.6, repeat: Infinity }} />
      </svg>
    )
  },
  {
    id: "03",
    title: "Real-time Generative UI",
    subtitle: "Zero-flicker client deployments",
    desc: "Stream executable frontend components directly from our edge network to the user's DOM.",
    color: "#f59e0b",
    icon: (
      <svg viewBox="0 0 100 40" className="w-full h-20 opacity-50">
        <motion.rect x="10" y="10" width="20" height="20" rx="2" stroke="#f59e0b" fill="none" strokeWidth="2" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.rect x="40" y="10" width="50" height="20" rx="2" stroke="#f59e0b" fill="none" strokeWidth="2" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} />
      </svg>
    )
  }
];

export default function UseCasesGrid() {
  const containerRef = useRef<HTMLElement>(null);
  
  return (
    <section 
      ref={containerRef}
      className="w-full min-h-screen py-32 flex flex-col items-center justify-center relative"
    >
      <div className="max-w-7xl w-full px-4">
        <h2 className="text-xs tracking-[0.4em] text-white/50 uppercase mb-6 font-mono font-medium border-b border-white/10 pb-2 inline-block">
          Applications
        </h2>
        <h3 className="text-4xl md:text-6xl font-medium text-white mb-20 tracking-tighter">
          Real Scenarios <br />
          <span className="text-white/30">for Real Scale.</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="group bg-white/[0.02] border border-white/5 rounded-3xl p-8 relative overflow-hidden transition-all duration-300 hover:bg-white/[0.04]"
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: c.color }}
              />
              <div className="text-xs font-mono mb-8 opacity-40">{c.id}</div>
              
              <div className="mb-8 overflow-hidden relative">
                {c.icon}
              </div>

              <h4 className="text-xl font-medium text-white mb-2 tracking-wide">{c.title}</h4>
              <h5 className="text-sm font-mono tracking-wider mb-6" style={{ color: c.color }}>{c.subtitle}</h5>
              <p className="text-sm text-white/50 leading-relaxed max-w-sm">
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
