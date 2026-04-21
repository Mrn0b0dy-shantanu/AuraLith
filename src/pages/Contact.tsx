import { motion } from "framer-motion";
import { PageTransition } from "../components/layout/PageTransition";
import { ArrowRight, Mail, MapPin, Terminal } from "lucide-react";
import { SpotlightCard } from "../components/ui/SpotlightCard";
import { SystemContainer } from "../components/ui/SystemContainer";

export default function Contact() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto pt-32 pb-40 relative px-4 md:px-8">
        <SystemContainer label="SYS.CONTACT.01">
          <h1 className="text-5xl md:text-8xl font-sans font-medium tracking-tighter leading-[0.85] mb-8 uppercase text-center">
            Initiate <br />
            <span className="text-transparent text-stroke-white text-stroke-1 opacity-50">
              Contact
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl font-mono leading-relaxed mx-auto text-center">
            [ Whether you need custom bare-metal deployment or have questions
            about our latency SLAs, our engineering team is ready. ]
          </p>
        </SystemContainer>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border border-white/10">
          <SpotlightCard
            spotlightColor="rgba(255, 255, 255, 0.05)"
            className="bg-[#0a0a0a]/80 backdrop-blur-md p-8 md:p-12 relative"
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "linear" }}
            >
              <div className="absolute top-4 right-4 text-white/20 font-mono text-xs">
                // CHANNELS
              </div>

              <div className="space-y-12 mt-8">
                <div className="flex items-start gap-6 group cursor-pointer border border-white/5 p-6 hover:bg-[#111] transition-colors duration-0">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-[#22c55e] group-hover:text-[#22c55e] transition-colors duration-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">
                      Direct Line
                    </h3>
                    <p className="text-lg font-mono text-white/80">
                      engineering@auralith.ai
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group cursor-pointer border border-white/5 p-6 hover:bg-[#111] transition-colors duration-0">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-[#22c55e] group-hover:text-[#22c55e] transition-colors duration-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">
                      Headquarters
                    </h3>
                    <p className="text-lg font-mono text-white/80">
                      Uttara, Dhaka
                      <br />
                      <span className="text-white/40 text-sm">Bangladesh</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group cursor-pointer border border-white/5 p-6 hover:bg-[#111] transition-colors duration-0">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-[#22c55e] group-hover:text-[#22c55e] transition-colors duration-0">
                    <Terminal size={20} />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">
                      System Status
                    </h3>
                    <p className="text-lg font-mono text-[#22c55e] flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#22c55e] animate-pulse" />
                      All Systems Operational
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(255, 255, 255, 0.05)"
            className="bg-[#0a0a0a]/80 backdrop-blur-md p-8 md:p-12 relative"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "linear" }}
            >
              <div className="absolute top-4 right-4 text-white/20 font-mono text-xs">
                // TRANSMIT
              </div>

              <form className="mt-8" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-8">
                  <div className="relative border border-white/10 p-4 focus-within:border-[#22c55e] transition-colors duration-0 bg-[#111] rounded-xl">
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2"
                    >
                      &gt; Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-transparent text-lg font-mono text-white focus:outline-none placeholder-white/10"
                      placeholder="Enter your name..."
                    />
                  </div>

                  <div className="relative border border-white/10 p-4 focus-within:border-[#22c55e] transition-colors duration-0 bg-[#111] rounded-xl">
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2"
                    >
                      &gt; Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-transparent text-lg font-mono text-white focus:outline-none placeholder-white/10"
                      placeholder="Enter your email..."
                    />
                  </div>

                  <div className="relative border border-white/10 p-4 focus-within:border-[#22c55e] transition-colors duration-0 bg-[#111] rounded-xl">
                    <label
                      htmlFor="company"
                      className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2"
                    >
                      &gt; Company (Optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="w-full bg-transparent text-lg font-mono text-white focus:outline-none placeholder-white/10"
                      placeholder="Enter your company..."
                    />
                  </div>

                  <div className="relative border border-white/10 p-4 focus-within:border-[#22c55e] transition-colors duration-0 bg-[#111] rounded-xl">
                    <label
                      htmlFor="message"
                      className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2"
                    >
                      &gt; Project Details
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full bg-transparent text-lg font-mono text-white focus:outline-none placeholder-white/10 resize-none"
                      placeholder="Describe your requirements..."
                    />
                  </div>

                  <button
                    type="button"
                    className="w-full bg-white text-black py-4 px-8 font-mono text-xs uppercase tracking-widest flex items-center justify-between group hover:bg-[#22c55e] hover:text-white transition-colors duration-0 border border-white rounded-xl"
                  >
                    <span>[ Transmit Request ]</span>
                    <ArrowRight className="transform group-hover:translate-x-2 transition-transform duration-0" />
                  </button>
                </div>
              </form>
            </motion.div>
          </SpotlightCard>
        </div>
      </div>
    </PageTransition>
  );
}
