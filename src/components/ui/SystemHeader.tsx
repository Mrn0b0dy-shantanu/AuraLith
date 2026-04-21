import { ScrambleText } from './ScrambleText';

export interface SystemHeaderProps {
  text: string;
  className?: string;
  textColor?: string;
}

export function SystemHeader({ text, className = '', textColor = 'text-white/40' }: SystemHeaderProps) {
  return (
    <div className={`flex items-center gap-4 mb-8 ${className}`}>
      <div className="h-px bg-white/20 flex-1" />
      <ScrambleText text={text} className={`${textColor} font-mono text-xs uppercase tracking-widest`} />
      <div className="h-px bg-white/20 flex-1" />
    </div>
  );
}
