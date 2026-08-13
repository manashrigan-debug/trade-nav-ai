import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

interface Props {
  title?: string;
  message?: string;
  type?: 'demo' | 'simulation' | 'ai';
}

export const DisclaimerBanner: React.FC<Props> = ({
  title = 'DEMO DATA & SIMULATION MODE ACTIVE',
  message = 'All tariff rates, weather conditions, port delays, and voyage optimizations represent simulated operational decision support data.',
  type = 'demo'
}) => {
  return (
    <div className="bg-navy-800/80 border border-cyan-500/30 rounded-xl p-3.5 mb-6 flex items-start space-x-3 text-xs sm:text-sm text-cyan-200 shadow-sm backdrop-blur-sm">
      <div className="p-1 bg-cyan-500/20 text-cyan-400 rounded-lg shrink-0 mt-0.5">
        {type === 'simulation' ? <AlertTriangle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="font-bold uppercase tracking-wider text-cyan-300 text-[11px] bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
            {type === 'demo' ? 'DEMO DATA' : type === 'simulation' ? 'SIMULATED INTELLIGENCE' : 'AI ESTIMATE'}
          </span>
          <span className="font-semibold text-slate-200">{title}</span>
        </div>
        <p className="text-slate-400 mt-1 text-xs leading-relaxed">{message}</p>
      </div>
    </div>
  );
};
