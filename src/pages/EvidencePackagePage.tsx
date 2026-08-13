import React, { useState } from 'react';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { ScoreMeter } from '../components/common/ScoreMeter';
import { PackageCheck, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export const EvidencePackagePage: React.FC = () => {
  const [checklist, setChecklist] = useState({
    shipmentId: true,
    invoice: true,
    packingList: true,
    billOfLading: true,
    photos: true,
    inspectionReport: false,
    deliveryRecord: true,
    lossEstimate: true
  });

  const totalItems = Object.keys(checklist).length;
  const checkedItems = Object.values(checklist).filter(Boolean).length;
  const claimReadinessPercent = Math.round((checkedItems / totalItems) * 100); // 88-92%

  const toggleItem = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title="CLAIM EVIDENCE READINESS CHECKLIST"
        message="Verifies required documentation completeness before submitting damage claims to carriers or insurers."
      />

      <div className="bg-navy-850 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          <ScoreMeter score={claimReadinessPercent} label="Claim Readiness" size="lg" />
          <div>
            <h2 className="text-2xl font-extrabold text-white">Claim Evidence Readiness: {claimReadinessPercent}%</h2>
            <p className="text-xs text-slate-300 mt-1">
              {checklist.inspectionReport ? 'All required evidence documents attached.' : '⚠️ Inspection report missing. Upload formal surveyor report to reach 100% readiness.'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-navy-850 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white mb-2">Evidence Documents Checklist</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {Object.entries(checklist).map(([key, val]) => (
            <div
              key={key}
              onClick={() => toggleItem(key as any)}
              className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                val ? 'bg-navy-800 border-slate-750' : 'bg-navy-800/40 border-rose-500/30'
              }`}
            >
              <div className="flex items-center space-x-3">
                {val ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-rose-400" />}
                <span className={`font-bold capitalize ${val ? 'text-slate-100' : 'text-rose-300'}`}>
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                val ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}>
                {val ? 'VERIFIED ✓' : 'MISSING ✗'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
