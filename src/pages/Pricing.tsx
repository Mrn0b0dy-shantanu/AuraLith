import { PageTransition } from '../ui/page-transition';
import { useState } from 'react';
import { SpotlightCard } from '../ui/card';
import { SystemContainer } from '../ui/container';

const plans = [
  {
    name: 'Compute',
    description: 'Lean teams. Specialized applications.',
    price: { monthly: 499, annual: 399 },
    features: [
      '10M Tokens / month',
      'Standard Latency (50ms)',
      'Community Support',
      'Shared Infrastructure',
      'REST API Access'
    ],
    color: 'border-white/10 hover:border-white/30',
    button: 'bg-transparent hover:bg-white/10 text-white border border-white/20'
  },
  {
    name: 'Infrastructure',
    description: 'Production systems. Guaranteed execution.',
    price: { monthly: 1499, annual: 1199 },
    features: [
      '100M Tokens / month',
      'Sub-millisecond Latency',
      'Dedicated Slack Channel',
      'Isolated Compute Instances',
      'gRPC & WebSocket Access',
      'Custom Fine-tuning'
    ],
    color: 'border-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.1)]',
    button: 'bg-[#22c55e] hover:bg-[#8b5cf6] text-black hover:text-white transition-colors duration-0',
    popular: true
  },
  {
    name: 'Enterprise',
    description: 'Organizations deploying at planetary scale.',
    price: { monthly: 'Custom', annual: 'Custom' },
    features: [
      'Unlimited Tokens',
      'Bare-Metal Deployment',
      '24/7 Phone Support',
      'On-Premises Option',
      'Dedicated Solutions Engineer',
      'SLA Guarantee (99.99%)'
    ],
    color: 'border-white/10 hover:border-white/30',
    button: 'bg-white text-black hover:bg-white/80 transition-colors duration-0'
  }
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto pt-32 pb-40 relative px-4 md:px-8">
        <SystemContainer label="SYS.PRICING.01">
          <h1 className="text-5xl md:text-8xl font-sans font-medium tracking-tighter leading-[0.85] mb-8 uppercase text-center">
            Scale.<br />
            <span className="text-transparent text-stroke-white text-stroke-1 opacity-50">Unlocked.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl font-mono leading-relaxed mx-auto text-center mb-12">
            [ Predictable compute. No hidden egress. No rate limits. You only pay for execution. ]
          </p>

          <div className="flex justify-center">
            <div className="inline-flex items-center p-1 border border-white/20 bg-[#0a0a0a]/80 backdrop-blur-md">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 md:px-8 py-3 font-mono text-[10px] md:text-xs uppercase tracking-widest transition-colors duration-0 ${!isAnnual ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 md:px-8 py-3 font-mono text-[10px] md:text-xs uppercase tracking-widest transition-colors duration-0 ${isAnnual ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
              >
                Annually <span className={isAnnual ? 'text-black/60' : 'text-[#22c55e]'}>[-20%]</span>
              </button>
            </div>
          </div>
        </SystemContainer>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 relative mt-16">
          {plans.map((plan, index) => (
            <SpotlightCard
              key={plan.name}
              spotlightColor={plan.popular ? "rgba(34, 197, 94, 0.15)" : "rgba(255, 255, 255, 0.05)"}
              className={`relative p-10 bg-[#0a0a0a]/80 backdrop-blur-md transition-colors duration-0 group h-full flex flex-col ${plan.popular ? 'bg-[#111]/80' : 'hover:bg-[#0f0f0f]/80'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 w-full h-1 bg-[#22c55e]" />
              )}
              
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-sans font-medium tracking-tight uppercase">{plan.name}</h3>
                <span className="text-white/20 font-mono text-xs">0{index + 1}</span>
              </div>
              
              <p className="text-white/50 text-xs font-mono h-12 mb-8 leading-relaxed">
                {plan.description}
              </p>
               
              <div className="mb-10 border-b border-white/10 pb-8">
                <span className="text-5xl font-sans font-medium tracking-tighter">
                  {typeof plan.price.monthly === 'number' ? '$' : ''}
                  {isAnnual ? plan.price.annual : plan.price.monthly}
                </span>
                {typeof plan.price.monthly === 'number' && (
                  <span className="text-white/40 ml-2 font-mono text-xs uppercase tracking-widest">/mo</span>
                )}
              </div>

              <ul className="space-y-4 flex-grow mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs font-mono text-white/70">
                    <span className={plan.popular ? 'text-[#22c55e]' : 'text-white/30'}>&gt;</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 font-mono text-xs uppercase tracking-widest ${plan.button}`}>
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Deploy Now'}
              </button>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
