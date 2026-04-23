import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../ui/page-transition';
import { SystemContainer } from '../ui/container';
import { CornerBorders } from '../ui/corner-borders';

const ModelCTA = ({ color }: { color: string }) => (
  <Link to="/pricing" className="inline-block relative group mt-12">
    <div className="absolute -inset-0.5 rounded-xl opacity-30 group-hover:opacity-100 blur transition duration-500" style={{ backgroundColor: color }} />
    <button className="relative bg-[#050505] text-white px-8 py-4 border border-white/20 rounded-xl font-mono text-sm uppercase tracking-widest flex items-center gap-3 transition-colors hover:bg-white/5">
      Deploy System
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
        <path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path>
      </svg>
    </button>
  </Link>
);

function CodeModel() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0, 1, 1, 0]);

  const terminalContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const lineAnim = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div ref={ref} className="min-h-[120vh] relative flex items-center overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 100% 50%, #22c55e 0%, transparent 50%)'}} />
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 py-24">
        
        <motion.div style={{ opacity, y }} className="flex flex-col justify-center relative">
          <SystemContainer>
            <div className="font-mono text-[#22c55e] text-sm tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
              01 
            </div>
            <h2 className="text-5xl md:text-7xl font-sans font-medium mb-6 tracking-tight">Syntax.<br/><span className="text-white/40">Perfected.</span></h2>
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mb-6">
              Code generation that doesn't guess. Deterministic output for complex architecture. Built to construct, refactor, and scale environments dynamically.
            </p>
            <ModelCTA color="#22c55e" />
          </SystemContainer>
        </motion.div>
        
        <div className="relative h-[60vh] lg:h-[80vh] border border-white/10 bg-[#050505] rounded-xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(34,197,94,0.03)]">
          {}
          <div className="h-12 border-b border-white/10 flex items-center px-4 justify-between bg-[#0a0a0a]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">~/system/bin/sys_code_gen</div>
            <div className="w-12" />
          </div>
          
          {}
          <motion.div 
            variants={terminalContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-50px" }}
            className="flex-1 p-6 font-mono text-xs md:text-sm leading-relaxed overflow-y-auto no-scrollbar"
          >
            <motion.div variants={lineAnim} className="text-white/40 mb-4">Last login: Sun Apr 19 2026 on tty1</motion.div>
            
            <motion.div variants={lineAnim} className="mb-2">
              <span className="text-[#22c55e]">root@auralith</span><span className="text-white">:</span><span className="text-blue-400">~</span><span className="text-white">$</span> ./init_model.sh --target SYS.CODE_GEN
            </motion.div>
            <motion.div variants={lineAnim} className="text-white/60 mb-1">[INFO] Bootstrapping core logic...</motion.div>
            <motion.div variants={lineAnim} className="text-white/60 mb-1">[INFO] Allocating secure memory...</motion.div>
            <motion.div variants={lineAnim} className="text-[#22c55e] mb-4">[OK] Model loaded and active.</motion.div>
            
            <motion.div variants={lineAnim} className="mb-2">
              <span className="text-[#22c55e]">root@auralith</span><span className="text-white">:</span><span className="text-blue-400">~</span><span className="text-white">$</span> compile_logic --scale max
            </motion.div>
            <motion.div variants={lineAnim} className="text-white/60 mb-2">Deploying infrastructure...</motion.div>
            
            <motion.div variants={lineAnim} className="mb-4 flex items-center gap-2">
               <span className="text-white/40">[</span>
               <span className="text-[#22c55e] tracking-tighter cursor-default select-none">████████████████████░░░░</span>
               <span className="text-white/40">]</span> <span className="text-white/80">85%</span>
            </motion.div>
            
            <motion.div variants={lineAnim} className="grid grid-cols-2 gap-4 mt-6 mb-6">
              <div className="border border-[#22c55e]/20 bg-[#22c55e]/5 p-3 rounded-md">
                <div className="text-[10px] text-white/40 uppercase mb-1">Latency</div>
                <div className="text-[#22c55e] font-semibold">0.04 ms</div>
              </div>
              <div className="border border-[#22c55e]/20 bg-[#22c55e]/5 p-3 rounded-md">
                <div className="text-[10px] text-white/40 uppercase mb-1">Safe Runtime</div>
                <div className="text-[#22c55e] font-semibold">TRUE</div>
              </div>
            </motion.div>

            <motion.div variants={lineAnim} className="mb-2">
              <span className="text-[#22c55e]">root@auralith</span><span className="text-white">:</span><span className="text-blue-400">~</span><span className="text-white">$</span> <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}>_</motion.span>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

function SynthesisModel() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ["start start", "end end"] 
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const blob1X = useTransform(scrollYProgress, [0, 1], ["-80%", "0%"]);
  const blob2X = useTransform(scrollYProgress, [0, 1], ["80%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <div ref={ref} className="h-[300vh] relative border-t border-white/5">
      <div className="sticky top-0 h-[100dvh] flex items-center overflow-hidden pt-[100px]">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #3b82f6 0%, transparent 60%)'}} />
        <motion.div style={{ x }} className="flex min-w-[200vw] px-[10vw] items-center gap-[10vw] lg:gap-[20vw]">
          
          <div className="w-[85vw] lg:w-[40vw] shrink-0 relative">
            <SystemContainer className="flex flex-col justify-center">
              <div className="relative z-10 flex flex-col justify-center">
                <motion.div 
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="font-mono text-[#3b82f6] text-sm tracking-widest mb-4 flex items-center gap-2"
                >
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} className="block w-3 h-3 border border-[#3b82f6] rounded-sm" />
                  02 
                </motion.div>
              
              <h2 className="text-5xl md:text-7xl font-sans font-medium mb-6 tracking-tight flex flex-col gap-1">
                <motion.span 
                  initial={{ y: 20, opacity: 0 }} 
                  whileInView={{ y: 0, opacity: 1 }} 
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Data
                </motion.span>
                <motion.span 
                  initial={{ y: 20, opacity: 0 }} 
                  whileInView={{ y: 0, opacity: 1 }} 
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-white/40"
                >
                  Distilled.
                </motion.span>
              </h2>
              
              <motion.p 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-white/60 text-lg md:text-xl font-light leading-relaxed mb-10"
              >
                Signal from noise. We process petabytes of unstructured text into factual landscapes. A horizontally scaled engine that synthesizes reality.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <div className="flex justify-between font-mono text-[10px] text-white/50 uppercase mb-2">
                    <span>Context Integration</span>
                    <span className="text-[#3b82f6]">1M+ Parameters</span>
                  </div>
                  <div className="w-full h-[2px] bg-white/5 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent w-[50%]"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-mono text-[10px] text-white/50 uppercase mb-2">
                    <span>Factual Cohesion</span>
                    <span className="text-[#a855f7]">99.98% Precision</span>
                  </div>
                  <div className="w-full h-[2px] bg-white/5 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-transparent via-[#a855f7] to-transparent w-[30%]"
                      animate={{ x: ['-100%', '300%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 1 }}
                    />
                  </div>
                </div>
              </motion.div>

              <div className="mt-8">
                <ModelCTA color="#3b82f6" />
              </div>
              </div>
            </SystemContainer>
          </div>
          
          <div className="w-[80vw] lg:w-[50vw] h-[50vh] lg:h-[60vh] shrink-0 relative flex items-center justify-center">
            
            <div className="relative w-64 h-64 lg:w-[30rem] lg:h-[30rem] flex items-center justify-center">
              {}
              <div className="absolute inset-0 filter blur-3xl opacity-60">
                <motion.div 
                  style={{ x: blob1X, scale }}
                  className="absolute left-0 top-1/4 w-48 h-48 lg:w-72 lg:h-72 bg-[#3b82f6] rounded-full mix-blend-screen"
                />
                <motion.div 
                  style={{ x: blob2X, scale }}
                  className="absolute right-0 bottom-1/4 w-48 h-48 lg:w-72 lg:h-72 bg-[#a855f7] rounded-full mix-blend-screen"
                />
              </div>

              {}
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 15 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-10 w-48 h-48 lg:w-72 lg:h-72 border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center cursor-pointer"
                style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
              >
                <div className="absolute w-[110%] h-[110%] border border-white/20 rounded-full" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[130%] h-[130%] border border-dashed border-[#3b82f6]/30 rounded-full"
                />
                
                {}
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 bg-gradient-to-tr from-[#3b82f6] to-[#a855f7] rounded-full shadow-[0_0_40px_rgba(59,130,246,0.6)]"
                />
                
                {}
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="absolute top-0 w-3 h-3 bg-[#a855f7] rounded-full shadow-[0_0_10px_#a855f7]" />
                  <div className="absolute bottom-0 w-2 h-2 bg-[#3b82f6] rounded-full shadow-[0_0_10px_#3b82f6]" />
                </motion.div>
                
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}

function VisionModel() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const filter = useTransform(scrollYProgress, [0, 0.5, 1], ["blur(10px)", "blur(0px)", "blur(10px)"]);

  return (
    <div ref={ref} className="min-h-screen relative flex items-center justify-center py-32 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center z-10 relative">
        <SystemContainer className="mb-16 w-full max-w-4xl mx-auto">
          <div className="relative z-10 flex flex-col items-center">
            <div className="font-mono text-[#f59e0b] text-sm tracking-widest mb-4">03 // SYS.VISION</div>
            <h2 className="text-5xl md:text-7xl font-sans font-medium mb-6 tracking-tight">Vision.<br/><span className="text-white/40">Absolute.</span></h2>
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              Near-perfect recognition. Mapping spatial environments and extracting semantic meaning instantly. It doesn't just see; it understands context and depth.
            </p>
          </div>
        </SystemContainer>
        
        <motion.div style={{ scale, filter }} className="w-full h-[50vh] lg:h-[60vh] border border-white/10 bg-[#0a0a0a]/80 rounded-2xl relative overflow-hidden shadow-2xl backdrop-blur-md">
          <CornerBorders />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)' }} />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-[#f59e0b]/0 via-[#f59e0b]/10 to-[#f59e0b]/0 h-[30%] w-full border-b border-[#f59e0b]/50" 
            animate={{ top: ['-30%', '100%'] }} 
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 lg:w-48 lg:h-48 border border-[#f59e0b]/50 rounded-full flex items-center justify-center relative">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] px-2 text-[#f59e0b] font-mono text-[10px]">FOCUS</div>
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#0a0a0a] px-2 text-[#f59e0b] font-mono text-[10px]">TRACKING</div>
               <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#0a0a0a] py-2 text-[#f59e0b] font-mono text-[10px] [writing-mode:vertical-lr]">OBJ_DETECT</div>
               <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-[#0a0a0a] py-2 text-[#f59e0b] font-mono text-[10px] [writing-mode:vertical-lr]">DEPTH_MAP</div>

              <div className="w-2 h-2 bg-[#f59e0b] rounded-full absolute shadow-[0_0_15px_#f59e0b]" />
              <motion.div animate={{ scale: [1, 1.5], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-12 h-12 border border-[#f59e0b] rounded-full absolute" />
            </div>
          </div>
          
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#f59e0b]/60" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#f59e0b]/60" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#f59e0b]/60" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#f59e0b]/60" />
        </motion.div>

        <ModelCTA color="#f59e0b" />
      </div>
    </div>
  );
}

function AudioModel() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div ref={ref} className="min-h-screen relative flex items-center justify-center overflow-hidden border-t border-white/5">
      {}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.15]">
        {Array.from({length: 6}).map((_, i) => (
          <motion.div 
            key={i}
            className="absolute border border-[#ec4899] rounded-full"
            style={{ width: `${(i+1)*18}vw`, height: `${(i+1)*18}vw` }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 2 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.div style={{ y }} className="max-w-4xl mx-auto px-6 text-center z-10 relative">
        <SystemContainer className="bg-[#0a0a0a]/80 p-12 lg:p-20 shadow-2xl">
          <div className="font-mono text-[#ec4899] text-sm tracking-widest mb-4 relative z-10">04 // SYS.AUDIO</div>
          <h2 className="text-5xl md:text-7xl font-sans font-medium mb-6 tracking-tight relative z-10">Acoustic.<br/><span className="text-white/40">Clarity.</span></h2>
          <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mb-12 relative z-10">
            Real-time speech synthesis and acoustic processing. Translates emotion, tone, and intent with absolute fidelity. The true voice of our architecture.
          </p>
          
          <div className="flex justify-center items-center gap-1.5 h-24 mb-12 py-4">
            {Array.from({length: 40}).map((_, i) => (
              <motion.div 
                key={i} 
                className="w-1.5 bg-[#ec4899] rounded-full"
                animate={{ height: ['20%', `${20 + Math.random() * 80}%`, '20%'] }} 
                transition={{ duration: 0.3 + Math.random() * 0.4, repeat: Infinity, repeatType: 'reverse' }}
              />
            ))}
          </div>

          <ModelCTA color="#ec4899" />
        </SystemContainer>
      </motion.div>
    </div>
  );
}

function ReasoningModel() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className="min-h-[150vh] relative py-32 border-t border-white/5">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 0% 50%, #06b6d4 0%, transparent 50%)'}} />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
        <div className="lg:sticky top-[30vh] self-start relative">
          <SystemContainer>
            <div className="font-mono text-[#06b6d4] text-sm tracking-widest mb-4">05 // SYS.REASONING</div>
            <h2 className="text-5xl md:text-7xl font-sans font-medium mb-6 tracking-tight">Autonomous.<br/><span className="text-white/40">Logic.</span></h2>
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mb-6">
              Multi-step deduction infrastructure. It doesn't just predict the next token; it plans, evaluates, and course-corrects dynamically. The secure core of autonomous agent behavior.
            </p>
            <ModelCTA color="#06b6d4" />
          </SystemContainer>
        </div>

        <div className="relative pt-12 lg:pt-32">
          <svg className="absolute left-[31px] top-0 bottom-0 w-4 h-full" overflow="visible">
            <line x1="2" y1="0" x2="2" y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeDasharray="4 4" />
            <motion.line x1="2" y1="0" x2="2" y2="100%" stroke="#06b6d4" strokeWidth="2" style={{ pathLength }} />
          </svg>
          
          {[
            { title: 'Hypothesis Generation', desc: 'Formulates multiple potential pathways to solve the ambiguous problem state based on extensive context parameters.' },
            { title: 'Simulation Matrix', desc: 'Runs internal simulations of proposed actions to predict long-term outcomes and side effects.' },
            { title: 'Execution & Calibration', desc: 'Selects the optimal path and dynamically executes actions while continually monitoring feedback loops.' }
          ].map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true, margin: "-10%" }}
              className="mb-24 relative pl-20"
            >
              <div className="absolute left-[18px] top-3 w-8 h-8 bg-[#0a0a0a] border-2 border-[#06b6d4] rounded-full z-10 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                 <div className="w-2 h-2 bg-[#06b6d4] rounded-full" />
              </div>
              <h3 className="text-xl lg:text-2xl font-mono text-white mb-3">Phase 0{i+1}: {step.title}</h3>
              <p className="text-white/50 leading-relaxed text-base lg:text-lg">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Models() {
  return (
    <PageTransition>
      <div className="w-full flex flex-col pt-32">
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden pb-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
            <SystemContainer className="p-12 lg:p-20 shadow-2xl flex flex-col items-center">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
                 <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                 <span className="text-xs font-mono tracking-widest text-white/70 uppercase">Intelligence Matrix</span>
               </div>
               <h1 className="text-6xl md:text-8xl font-sans font-medium tracking-tight mb-8">
                Intelligence.<br/><span className="text-white/30">Deployed.</span>
               </h1>
               <p className="text-xl md:text-2xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
                 Our suite of specialized neural models. Engineered for specific operational domains. Infrastructure-grade performance, deployed.
               </p>
            </SystemContainer>
          </motion.div>
        </div>

        {}
        <CodeModel />
        <SynthesisModel />
        <VisionModel />
        <AudioModel />
        <ReasoningModel />
        
        <div className="h-[10vh]" />
      </div>
    </PageTransition>
  );
}
