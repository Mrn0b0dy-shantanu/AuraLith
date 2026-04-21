import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { PageTransition } from '../components/layout/PageTransition';
import { Zap, Shield, Cpu, Activity } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { ScrambleText } from '../components/ui/ScrambleText';
import { SystemContainer } from '../components/ui/SystemContainer';

function AnimatedCounter({ value, suffix = '', duration = 2 }: { value: number, suffix?: string, duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (current) => {
    if (value % 1 !== 0) {
      return current.toFixed(1) + suffix;
    }
    return Math.floor(current) + suffix;
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const features = [
  {
    title: 'Sub-millisecond Latency',
    description: 'Engineered for high-frequency trading and real-time robotics. Our inference engine bypasses traditional overhead, delivering responses faster than human perception.',
    statValue: 0.8,
    statSuffix: 'ms',
    label: 'P99 Latency',
    icon: Zap,
    color: 'text-[#22c55e]',
    bg: 'bg-[#22c55e]/10',
    border: 'border-[#22c55e]/50'
  },
  {
    title: 'Deterministic Accuracy',
    description: 'No hallucinations. No probabilistic guessing. We enforce strict semantic boundaries and verifiable logic gates for mission-critical deployments.',
    statValue: 99.9,
    statSuffix: '%',
    label: 'Factual Adherence',
    icon: Shield,
    color: 'text-[#8b5cf6]',
    bg: 'bg-[#8b5cf6]/10',
    border: 'border-[#8b5cf6]/50'
  },
  {
    title: 'Bare-Metal Efficiency',
    description: 'Optimized at the silicon level. We squeeze maximum FLOPs out of every GPU cycle, reducing your compute costs by an order of magnitude.',
    statValue: 10,
    statSuffix: 'x',
    label: 'Throughput Increase',
    icon: Cpu,
    color: 'text-[#8b5cf6]',
    bg: 'bg-[#8b5cf6]/10',
    border: 'border-[#8b5cf6]/50'
  },
  {
    title: 'Fault-Tolerant Architecture',
    description: 'Distributed by default. Multi-region active-active replication ensures your AI infrastructure never goes down, even during catastrophic zone failures.',
    statValue: 100,
    statSuffix: '%',
    label: 'Uptime SLA',
    icon: Activity,
    color: 'text-[#ff1919]',
    bg: 'bg-[#ff1919]/10',
    border: 'border-[#ff1919]/50'
  }
];

export default function Features() {
  const containerRef = useRef(null);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto relative pt-32 pb-40 px-4 md:px-8" ref={containerRef}>
        <SystemContainer label="SYS.PERFORMANCE.01">
          <h1 className="text-4xl md:text-8xl font-sans font-medium tracking-tighter leading-[0.85] mb-8 uppercase text-center">
            Performance<br />
            <span className="text-transparent text-stroke-white text-stroke-1 opacity-50">Without compromise</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl font-mono leading-relaxed mx-auto text-center">
            [ We don't build toys. We build infrastructure-grade intelligence designed for systems that cannot afford to fail. ]
          </p>
        </SystemContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 relative">
          {features.map((feature, index) => (
            <SpotlightCard key={index} spotlightColor="rgba(139, 92, 246, 0.15)" className="p-10 relative group overflow-hidden hover:bg-[#111]/80 transition-colors duration-300">
              <div className="absolute top-4 right-4 text-white/20 font-mono text-xs">
                {String(index + 1).padStart(2, '0')} // {feature.label.replace(' ', '_').toUpperCase()}
              </div>
              
              <div className={`w-12 h-12 border border-white/10 flex items-center justify-center mb-8 ${feature.color}`}>
                <feature.icon size={24} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-sans font-medium mb-4 tracking-tight uppercase">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed font-mono text-sm mb-12">
                {feature.description}
              </p>
              
              <div className="border-t border-white/10 pt-6 mt-auto">
                <div className="flex items-baseline gap-3">
                  <span className={`text-5xl md:text-6xl font-sans font-medium tracking-tighter ${feature.color}`}>
                    <AnimatedCounter value={feature.statValue} suffix={feature.statSuffix} />
                  </span>
                  <span className="text-white/40 text-xs font-mono uppercase tracking-widest">
                    {feature.label}
                  </span>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "linear" }}
        >
          <SystemContainer label="SYS.BENCHMARK.02" className="mt-16" cornerColor="border-[#22c55e]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5">
                <h2 className="text-4xl md:text-6xl font-sans font-medium mb-6 tracking-tighter uppercase">The Benchmark</h2>
                <p className="text-white/60 font-mono text-sm leading-relaxed">
                  Stop paying for bloated models. Our specialized architecture outperforms general-purpose LLMs on specific tasks while using a fraction of the compute.
                </p>
              </div>
              
              <div className="lg:col-span-7 space-y-8 mt-8 lg:mt-0">
                {[
                  { name: 'AuraLith Core', value: 100, color: 'bg-[#22c55e]', text: 'text-[#22c55e]' },
                  { name: 'Legacy Provider A', value: 45, color: 'bg-white/20', text: 'text-white/50' },
                  { name: 'Legacy Provider B', value: 30, color: 'bg-white/10', text: 'text-white/30' },
                ].map((item, i) => (
                  <div key={i} className="relative group">
                    <div className="flex justify-between text-xs mb-3 font-mono uppercase tracking-widest">
                      <span className={item.text}>[{item.name}]</span>
                      <span className={item.text}><AnimatedCounter value={item.value} />k tokens/s</span>
                    </div>
                    <div className="h-1 bg-white/5 w-full overflow-hidden relative border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.2 + (i * 0.1), ease: "linear" }}
                        className={`absolute top-0 left-0 h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SystemContainer>
        </motion.div>
      </div>
    </PageTransition>
  );
}
