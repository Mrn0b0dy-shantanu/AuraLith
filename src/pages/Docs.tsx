import { motion } from 'framer-motion';
import { PageTransition } from '../components/layout/PageTransition';
import { Terminal, Book, Code2, Cpu, Network, Lock, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { SystemContainer } from '../components/ui/SystemContainer';

const sections = [
  {
    title: 'Core Concepts',
    icon: Book,
    description: 'Understand the deterministic architecture and latency optimization strategies.',
    links: ['Architecture Overview', 'Latency Profiling', 'Deterministic Execution']
  },
  {
    title: 'API Reference',
    icon: Code2,
    description: 'Complete documentation for REST, gRPC, and WebSocket endpoints.',
    links: ['Authentication', 'Inference Endpoints', 'Streaming Responses']
  },
  {
    title: 'Hardware Optimization',
    icon: Cpu,
    description: 'Guides for deploying on bare-metal and maximizing GPU utilization.',
    links: ['CUDA Configuration', 'Memory Management', 'Batching Strategies']
  },
  {
    title: 'Network Topology',
    icon: Network,
    description: 'Configuring VPC peering, private links, and multi-region failover.',
    links: ['VPC Peering', 'Active-Active Setup', 'Load Balancing']
  },
  {
    title: 'Security & Compliance',
    icon: Lock,
    description: 'SOC2, HIPAA, and custom encryption key management.',
    links: ['Data Residency', 'BYOK Setup', 'Audit Logging']
  }
];

export default function Docs() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install @auralith/sdk');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto pt-32 pb-40 relative px-4 md:px-8">
        <SystemContainer label="SYS.DOCS.01">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "linear" }}
          >
            <h1 className="text-5xl md:text-8xl font-sans font-medium tracking-tighter leading-[0.85] mb-8 uppercase text-center">
              System <br />
              <span className="text-transparent text-stroke-white text-stroke-1 opacity-50">Manual</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 font-mono leading-relaxed max-w-2xl mx-auto text-center">
              [ Everything you need to integrate, optimize, and scale your infrastructure on AuraLith. ]
            </p>
          </motion.div>
        </SystemContainer>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/10 border border-white/10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "linear" }}
            className="lg:col-span-5 bg-[#0a0a0a]/80 backdrop-blur-md p-8 md:p-12 relative"
          >
            <div className="absolute top-4 right-4 text-white/20 font-mono text-xs">
              // INIT
            </div>

            <div className="sticky top-32 mt-8">
              <h2 className="text-sm font-mono uppercase tracking-widest mb-6 flex items-center gap-3 text-white/40">
                <Terminal className="text-[#22c55e]" size={16} />
                Quick Initialization
              </h2>
              
              <div className="bg-[#111] border border-white/10 rounded-none overflow-hidden group">
                <div className="flex items-center px-4 py-2 border-b border-white/10 bg-[#0a0a0a]">
                  <div className="text-xs font-mono text-[#22c55e] uppercase tracking-widest">bash</div>
                </div>
                <div className="p-6 font-mono text-sm relative">
                  <div className="text-white/40 mb-2"># Install the core SDK</div>
                  <div className="flex items-center justify-between group/code">
                    <div className="text-[#22c55e]">
                      <span className="text-white/40 select-none mr-4">$</span>
                      npm install @auralith/sdk
                    </div>
                    <button 
                      onClick={handleCopy}
                      className="text-white/40 hover:text-white transition-colors opacity-0 group-hover/code:opacity-100"
                    >
                      {copied ? <Check size={16} className="text-[#22c55e]" /> : <Copy size={16} />}
                    </button>
                  </div>
                  
                  <div className="text-white/40 mt-6 mb-2"># Initialize client</div>
                  <div className="text-[#8b5cf6]">
                    <span className="text-[#8b5cf6]">import</span> {'{ AuraClient }'} <span className="text-[#8b5cf6]">from</span> '@auralith/sdk';
                  </div>
                  <div className="mt-2 text-white/80">
                    <span className="text-[#8b5cf6]">const</span> client = <span className="text-[#8b5cf6]">new</span> AuraClient({'{'}
                  </div>
                  <div className="ml-4 text-white/80">
                    apiKey: process.env.AURALITH_KEY,
                  </div>
                  <div className="ml-4 text-white/80">
                    latencyProfile: <span className="text-[#22c55e]">'ultra-low'</span>
                  </div>
                  <div className="text-white/80">
                    {'});'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 bg-[#0a0a0a]/80 backdrop-blur-md p-8 md:p-12 relative">
            <div className="absolute top-4 right-4 text-white/20 font-mono text-xs">
              // INDEX
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 mt-8">
              {sections.map((section, index) => (
                <SpotlightCard
                  key={section.title}
                  spotlightColor="rgba(34, 197, 94, 0.15)"
                  className="bg-[#0a0a0a]/80 backdrop-blur-md p-8 hover:bg-[#111]/80 transition-colors duration-0 group relative overflow-hidden"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 * index, ease: "linear" }}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#22c55e] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                    
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#22c55e] group-hover:text-[#22c55e] transition-colors duration-0">
                      <section.icon size={20} strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-xl font-sans font-medium mb-3 tracking-tight uppercase">{section.title}</h3>
                    <p className="text-white/50 text-xs font-mono leading-relaxed mb-8 h-12">
                      {section.description}
                    </p>
                    
                    <ul className="space-y-3 relative z-10">
                      {section.links.map((link, i) => (
                        <li key={i}>
                          <a href="#" className="text-xs font-mono text-white/70 hover:text-[#22c55e] flex items-center gap-2 group/link transition-colors">
                            <span className="text-white/20 group-hover/link:text-[#22c55e]">&gt;</span>
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
