import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import { Experience } from '../components/home/Experience';
import { Overlay } from '../components/home/Overlay';
import { Suspense } from 'react';


import ComparativeAnalysis from '../components/home/ComparativeAnalysis';
import UseCasesGrid from '../components/home/UseCasesGrid';
import TelemetryDashboard from '../components/home/TelemetryDashboard';

export default function Home() {
  return (
    <div className="w-full text-white font-sans selection:bg-[#22c55e]/30 relative flex flex-col">
      {}
      <div className="w-full h-screen sticky top-0 z-10 shrink-0">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <fog attach="fog" args={['#0a0a0a', 5, 30]} />
          <Suspense fallback={null}>
            <ScrollControls pages={10.0} damping={0.1}>
              <Experience />
              <Scroll html style={{ width: '100%' }}>
                <Overlay />
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>

      {}
      <div 
        className="relative z-20 w-full flex flex-col items-center bg-[#0a0a0a]"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 300px)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 300px)'
        }}
      >
        {}
        <div className="absolute inset-0 z-0 bg-grid pointer-events-none" />
        
        <div className="relative z-10 w-full flex flex-col items-center">
          <ComparativeAnalysis />
          <UseCasesGrid />
          <TelemetryDashboard />
        </div>
      </div>
    </div>
  );
}
