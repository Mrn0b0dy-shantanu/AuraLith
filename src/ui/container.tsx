import { ReactNode } from 'react';
import { CornerBorders } from './corner-borders';
import { SystemHeader } from './system-header';

export interface SystemContainerProps {
  children: ReactNode;
  label?: string;
  className?: string;
  cornerColor?: string;
}

export function SystemContainer({ children, label, className = '', cornerColor }: SystemContainerProps) {
  return (
    <div className={`border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md p-8 md:p-12 relative rounded-2xl ${className}`}>
      <CornerBorders color={cornerColor} />
      {label && <SystemHeader text={label} />}
      {children}
    </div>
  );
}
