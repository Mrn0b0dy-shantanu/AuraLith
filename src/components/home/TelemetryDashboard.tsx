import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function TelemetryDashboard() {
  const containerRef = useRef<HTMLElement>(null);

  const [uptime, setUptime] = useState(99.999);
  const [latency, setLatency] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency((prev) =>
        Math.max(Math.min(prev + (Math.random() * 2 - 1), 18), 8),
      );
      // Occasionally tick uptime up or down to look live
      if (Math.random() > 0.9) {
        setUptime(99.999);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full min-h-screen py-32 pb-50 flex flex-col items-center justify-center relative border-t border-white/10"
    >
      <div className="max-w-7xl w-full px-4">
        <div className="bg-[#0a0a0a]/60 backdrop-blur-md border border-white/10 rounded-[40px] p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.1)_0%,transparent_50%)]" />

          {/* Text Side */}
          <div className="flex-1 relative z-10">
            <h2 className="text-xs tracking-[0.4em] text-[#22c55e] uppercase mb-6 font-mono font-medium inline-block">
              <span className="w-2 h-2 inline-block bg-[#22c55e] rounded-full mr-3 animate-pulse" />
              Network State
            </h2>
            <h3 className="text-4xl md:text-5xl font-medium text-white mb-8 tracking-tighter">
              Performance & Trust Validation
            </h3>
            <p className="text-white/50 text-lg max-w-md font-light leading-relaxed mb-12">
              Our infrastructure is constantly monitored and transparently
              reported. Zero downtime. Zero surprises.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <motion.div
                  className="text-4xl font-mono text-white mb-2"
                  key={uptime}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                >
                  {uptime}%
                </motion.div>
                <div className="text-xs font-mono uppercase tracking-widest text-[#8b5cf6]">
                  Guaranteed Uptime
                </div>
              </div>
              <div>
                <motion.div
                  className="text-4xl font-mono text-white mb-2"
                  key={Math.round(latency)}
                  initial={{ color: "#22c55e" }}
                  animate={{ color: "#ffffff" }}
                >
                  &lt;{Math.round(latency)}ms
                </motion.div>
                <div className="text-xs font-mono uppercase tracking-widest text-[#22c55e]">
                  Avg Inference Latency
                </div>
              </div>
            </div>
          </div>

          {/* Visual Side */}
          <div className="flex-1 h-[400px] relative w-full flex items-center justify-center">
            <svg
              viewBox="0 0 200 200"
              className="w-64 h-64 md:w-80 md:h-80 overflow-visible"
            >
              {/* Subtle background grids */}
              <defs>
                <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Orbital Rings */}
              {[90, 65, 40].map((r, i) => (
                <circle
                  key={i}
                  cx="100"
                  cy="100"
                  r={r}
                  fill="none"
                  stroke="white"
                  strokeOpacity={0.05 - i * 0.01}
                  strokeWidth="1"
                />
              ))}

              {/* Scanning Line */}
              <motion.line
                x1="100"
                y1="100"
                x2="100"
                y2="10"
                stroke="#22c55e"
                strokeWidth="1"
                strokeOpacity="0.2"
                style={{ originX: "100px", originY: "100px" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              {/* Central Nucleus */}
              <motion.circle
                cx="100"
                cy="100"
                r="20"
                fill="#8b5cf6"
                fillOpacity="0.1"
                stroke="#8b5cf6"
                strokeOpacity="0.3"
                strokeWidth="1"
                animate={{ r: [20, 22, 20], strokeOpacity: [0.3, 0.5, 0.3] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <circle cx="100" cy="100" r="6" fill="white" fillOpacity="0.2" />

              {/* Data Nodes */}
              {[0, 72, 144, 216, 288].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const r = 65;
                const x = 100 + Math.cos(rad) * r;
                const y = 100 + Math.sin(rad) * r;
                return (
                  <g key={i}>
                    {/* Glow */}
                    <motion.circle
                      cx={x}
                      cy={y}
                      r="12"
                      fill="url(#coreGradient)"
                      animate={{
                        opacity: [0.2, 0.6, 0.2],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    />
                    {/* Dot */}
                    <motion.circle
                      cx={x}
                      cy={y}
                      r="3"
                      fill="#22c55e"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    />
                    {/* Connection to core */}
                    <motion.line
                      x1="100"
                      y1="100"
                      x2={x}
                      y2={y}
                      stroke="#22c55e"
                      strokeWidth="0.5"
                      strokeOpacity="0"
                      animate={{ strokeOpacity: [0, 0.15, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
