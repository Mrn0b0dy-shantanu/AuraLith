import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function Glow() {
  const location = useLocation();
  
  const isGreen = ['/pricing', '/about'].includes(location.pathname);
  const isPurple = ['/features', '/docs'].includes(location.pathname);

  if (!isGreen && !isPurple) return null;

  const theme = isGreen ? 'green' : 'purple';

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden flex justify-center">
      <AnimatePresence mode="wait">
        {theme === 'green' && (
          <motion.div
            key="green-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-[-200px] w-[140vw] max-w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#22c55e]/20 via-[#22c55e]/5 to-transparent blur-[100px] rounded-[100%]"
          />
        )}
        {theme === 'purple' && (
          <motion.div
            key="purple-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-[-200px] w-[140vw] max-w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#8b5cf6]/20 via-[#8b5cf6]/5 to-transparent blur-[100px] rounded-[100%]"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
