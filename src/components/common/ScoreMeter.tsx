import React from 'react';

interface Props {
  score: number; // 0-100
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ScoreMeter: React.FC<Props> = ({ score, label = 'Trade Health', size = 'md' }) => {
  const normScore = Math.min(100, Math.max(0, score));
  const strokeDasharray = 283; // 2 * pi * 45
  const strokeDashoffset = strokeDasharray - (strokeDasharray * normScore) / 100;

  let color = '#10B981'; // Emerald
  if (normScore < 70) color = '#F59E0B'; // Amber
  if (normScore < 50) color = '#EF4444'; // Red

  const radius = size === 'lg' ? 52 : size === 'sm' ? 32 : 42;
  const strokeWidth = size === 'lg' ? 8 : size === 'sm' ? 5 : 6;
  const viewBoxSize = (radius + strokeWidth) * 2;
  const center = viewBoxSize / 2;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (circumference * normScore) / 100;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <svg width={viewBoxSize} height={viewBoxSize} className="-rotate-90 transform">
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#1E293B"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className={`font-mono font-bold text-white ${size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-sm' : 'text-lg'}`}>
            {normScore}
          </span>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">/100</span>
        </div>
      </div>
      {label && <span className="mt-1 text-xs text-slate-400 font-medium">{label}</span>}
    </div>
  );
};
