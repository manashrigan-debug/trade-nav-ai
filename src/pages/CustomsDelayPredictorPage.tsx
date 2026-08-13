import React from 'react';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { ScoreMeter } from '../components/common/ScoreMeter';
import { RiskBadge } from '../components/common/RiskBadge';
import { Timer, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const CustomsDelayPredictorPage: React.FC = () => {
  const delayProbability = 72;

  const causes = [
    'Document mismatch detected between Bill of Lading (450) and Commercial Invoice (500).',
    'HS classification 6109.10 re-assessment audit queue.',
    'Port congestion & customs officer yard physical inspection backlog.'
  ];

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title="CUSTOMS HOLD & DELAY PREDICTION ENGINE"
        message="Evaluates document parity, HS classification confidence, regulatory licensing requirements, and port terminal congestion."
      />

      <div className="bg-navy-850 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          <ScoreMeter score={delayProbability} label="Delay Probability" size="lg" />
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-extrabold text-white">Customs Delay Probability: 72%</h2>
              <RiskBadge risk="HIGH" size="lg" />
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              High probability of customs hold or inspection query upon vessel berthing.
            </p>
          </div>
        </div>
      </div>

      {/* Main Causes & Recommended Mitigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <h4 className="text-sm font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Primary Causes for Predicted Delay</span>
          </h4>
          <div className="space-y-2 text-xs">
            {causes.map((c, i) => (
              <div key={i} className="p-3 bg-navy-800 rounded-xl border border-slate-750 text-slate-200">
                • {c}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Recommended Mitigation Actions</span>
          </h4>
          <div className="space-y-2 text-xs text-slate-200">
            <div className="p-3 bg-navy-800 rounded-xl border border-slate-750">
              1. Issue amended Bill of Lading parity correction prior to arrival.
            </div>
            <div className="p-3 bg-navy-800 rounded-xl border border-slate-750">
              2. Pre-file electronic Bill of Entry 48 hours in advance.
            </div>
            <div className="p-3 bg-navy-800 rounded-xl border border-slate-750">
              3. Upload digitally signed Certificate of Origin.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
