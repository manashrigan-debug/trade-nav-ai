import React from 'react';

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: { value: string; positive: boolean };
  badgeText?: string;
  badgeType?: 'safe' | 'warning' | 'critical' | 'neutral';
}

export const MetricCard: React.FC<Props> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  badgeText,
  badgeType = 'neutral'
}) => {
  let badgeColor = 'bg-slate-800 text-slate-300 border-slate-700';
  if (badgeType === 'safe') badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  if (badgeType === 'warning') badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  if (badgeType === 'critical') badgeColor = 'bg-rose-500/10 text-rose-400 border-rose-500/30';

  return (
    <div className="bg-navy-800/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-lg hover:border-slate-700 transition-all duration-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
        {icon && <div className="p-2 bg-navy-750 border border-slate-700/60 text-cyan-400 rounded-lg">{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white">{value}</span>
        {badgeText && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${badgeColor}`}>
            {badgeText}
          </span>
        )}
      </div>
      {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
      {trend && (
        <div className="mt-2 flex items-center text-xs">
          <span className={`font-semibold ${trend.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
          <span className="text-slate-400 ml-1.5">vs last month</span>
        </div>
      )}
    </div>
  );
};
