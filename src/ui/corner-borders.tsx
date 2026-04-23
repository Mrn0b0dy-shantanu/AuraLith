export interface CornerBordersProps {
  color?: string;
  size?: 'sm' | 'md';
}

export function CornerBorders({ color = 'border-white/50', size = 'sm' }: CornerBordersProps) {
  if (size === 'md') {
    return (
      <>
        <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${color}`} />
        <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${color}`} />
        <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${color}`} />
        <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${color}`} />
      </>
    );
  }

  return (
    <>
      <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${color}`} />
      <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${color}`} />
      <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${color}`} />
      <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${color}`} />
    </>
  );
}
