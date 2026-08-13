import React from 'react';

interface Props {
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | string;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<Props> = ({ risk, size = 'md' }) => {
  const normRisk = (risk || 'LOW').toUpperCase();

  let colorClasses = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  if (normRisk === 'MEDIUM' || normRisk === 'MODERATE' || normRisk === 'AMBER') {
    colorClasses = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  } else if (normRisk === 'HIGH' || normRisk === 'RED' || normRisk === 'CRITICAL') {
    colorClasses = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : size === 'lg' ? 'px-3 py-1.5 text-sm font-semibold' : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span className={`inline-flex items-center rounded-full border ${colorClasses} ${sizeClasses} font-mono tracking-wide shadow-sm`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${normRisk === 'HIGH' || normRisk === 'CRITICAL' ? 'bg-rose-400 animate-pulse' : normRisk === 'MEDIUM' ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
      {normRisk}
    </span>
  );
};
