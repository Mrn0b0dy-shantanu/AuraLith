import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './ui/navbar';
import Home from './pages/Home';
import Features from './pages/Features';
import Models from './pages/Models';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Docs from './pages/Docs';
import { Glow } from './ui/glow';
import PixelTransition from './ui/pixel-transition';
import { CinematicFooter } from './ui/motion-footer';
import CustomCursor from './ui/custom-cursor';

const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

function AppContent() {
  return (
    <div className="w-full min-h-screen text-white font-sans selection:bg-[#22c55e] selection:text-white relative z-0 bg-[#0a0a0a]">
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundSize: '60px 60px',
            backgroundImage: `
              linear-gradient(to right, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px),
              linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px)
            `,
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
          }}
        />

        <Glow />
        <CustomCursor />
        <div
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-difference"
          style={{ backgroundImage: noiseSvg }}
        />
        <AppNavbar />

        <main className="relative z-10 w-full min-h-screen flex flex-col bg-transparent">
          <PixelTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/models" element={<Models />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/docs" element={<Docs />} />
            </Routes>
          </PixelTransition>
        </main>

        <CinematicFooter />
      </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
