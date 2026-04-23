import { motion } from "framer-motion";
import { PageTransition } from "../ui/page-transition";
import { SpotlightCard } from "../ui/card";
import { SystemContainer } from "../ui/container";

export default function About() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto pt-32 pb-40 relative px-4 md:px-8">
        <SystemContainer label="SYS.ABOUT.01">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8 relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "linear" }}
                className="text-5xl md:text-8xl font-sans font-medium tracking-tighter leading-[0.85] mb-12 uppercase"
              >
                Execution. <br />
                <span className="text-white/40">Not</span>
                <br />
                Illusion.
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "linear" }}
                className="space-y-8 text-lg md:text-xl text-white/60 font-mono leading-relaxed max-w-3xl"
              >
                <p>
                  [ The industry is distracted by conversational illusions. We
                  engineer the foundational logic for systems that cannot fail.
                  ]
                </p>
                <p>
                  [ No poems. No parlor tricks. Just deterministic execution,
                  sub-millisecond latency, and unbreakable fault tolerance. ]
                </p>
              </motion.div>
            </div>

            <div className="lg:col-span-4 relative mt-12 lg:mt-0">
              <div className="aspect-[3/4] bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 relative overflow-hidden group p-2">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#22c55e]" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#22c55e]" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#22c55e]" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#22c55e]" />

                <div className="w-full h-full relative border border-white/5">
                  <div className="absolute inset-0 bg-[url('https://www.cnet.com/a/img/resize/94d603762d21e9a002300bdea0d93a5e133a7e16/hub/2009/10/07/10556205-f0fe-11e2-8c7c-d4ae52e62bcc/CH1245.jpg?auto=webp&width=1200')] bg-cover bg-center opacity-30 mix-blend-luminosity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-[#22c55e] font-mono text-xs uppercase tracking-widest mb-2 border-b border-white/10 pb-2">
                      Facility 01
                    </div>
                    <div className="text-white font-mono text-sm uppercase tracking-tight">
                      Silicon Valley Data Center
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 border border-[#22c55e]/30 bg-[#22c55e]/5 p-6 relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#22c55e]" />
                <div className="font-mono text-xs uppercase tracking-widest mb-2 text-[#22c55e]">
                  Current Capacity
                </div>
                <div className="text-4xl font-sans font-medium tracking-tighter">
                  14.2<span className="text-lg text-white/50"> EFLOPS</span>
                </div>
              </div>
            </div>
          </div>
        </SystemContainer>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "linear" }}
        >
          <SystemContainer label="SYS.PRINCIPLES.02" className="mt-16">
            <h2 className="text-4xl md:text-6xl font-sans font-medium tracking-tighter mb-16 uppercase">
              Core Principles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
              {[
                {
                  number: "01",
                  title: "Performance. Absolute.",
                  desc: "Every line of code, every hardware choice is optimized for speed. Latency measured in microseconds.",
                },
                {
                  number: "02",
                  title: "Zero Magic",
                  desc: "We reject the black box. Deterministic, verifiable, strictly bounded execution.",
                },
                {
                  number: "03",
                  title: "Zero Downtime",
                  desc: "Systems designed to survive catastrophic failure. Active-active replication. Unbreakable.",
                },
              ].map((principle, i) => (
                <SpotlightCard
                  key={i}
                  spotlightColor="rgba(34, 197, 94, 0.15)"
                  className="relative group bg-[#0a0a0a]/80 backdrop-blur-md p-8 hover:bg-[#111]/80 transition-colors duration-0"
                >
                  <div className="text-[#22c55e] font-mono text-xs mb-6 pb-4 border-b border-white/10 flex justify-between">
                    <span>PRINCIPLE_{principle.number}</span>
                    <span>[ VERIFIED ]</span>
                  </div>
                  <h3 className="text-2xl font-sans font-medium mb-4 tracking-tight uppercase">
                    {principle.title}
                  </h3>
                  <p className="text-white/50 font-mono text-sm leading-relaxed">
                    {principle.desc}
                  </p>
                </SpotlightCard>
              ))}
            </div>
          </SystemContainer>
        </motion.div>
      </div>
    </PageTransition>
  );
}
