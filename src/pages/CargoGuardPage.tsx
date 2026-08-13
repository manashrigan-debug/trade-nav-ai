import React, { useState } from 'react';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { ScoreMeter } from '../components/common/ScoreMeter';
import { RiskBadge } from '../components/common/RiskBadge';
import { ShieldCheck, AlertTriangle, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

export const CargoGuardPage: React.FC = () => {
  const [cargoParams, setCargoParams] = useState({
    cargoType: 'High-Precision Microcontrollers',
    packagingType: 'Standard Carton',
    transportMode: 'Sea',
    cargoValue: 2460000,
    weatherRisk: 72,
    fragility: 'Fragile',
    humiditySensitivity: 'High',
    voyageDurationDays: 22
  });

  const [result, setResult] = useState<any>({
    cargoRiskScore: 78,
    riskCategory: 'HIGH',
    reasons: [
      'Fragile microelectronic cargo rating.',
      'Long maritime voyage duration (22 days).',
      'High relative humidity exposure expected in tropical sea lanes.',
      'Rough sea conditions & wave shock potential.'
    ],
    preventiveActions: [
      'Use heavy-duty moisture protection desiccants inside container.',
      'Upgrade from standard cartons to reinforced wooden crating.',
      'Deploy smart IoT telemetry sensor for real-time temperature/humidity alerts.',
      'Consider temperature-controlled reefer container or express air transport.'
    ]
  });

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    let score = 40;
    const reasons: string[] = [];

    if (cargoParams.fragility === 'Fragile') {
      score += 25;
      reasons.push('Fragile cargo rating requires shock-absorbing packaging.');
    }
    if (cargoParams.weatherRisk > 50) {
      score += 18;
      reasons.push('High marine storm weather risk along maritime corridor.');
    }
    if (cargoParams.voyageDurationDays > 18) {
      score += 12;
      reasons.push('Extended voyage duration increases cumulative environmental exposure.');
    }

    score = Math.min(95, score);
    setResult({
      cargoRiskScore: score,
      riskCategory: score > 70 ? 'HIGH' : score > 40 ? 'MEDIUM' : 'LOW',
      reasons,
      preventiveActions: [
        'Use moisture protection desiccants in container.',
        'Improve packaging with heavy-duty shock absorbers.',
        'Deploy IoT sensor tracking for temperature/humidity monitoring.'
      ]
    });
  };

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title="CARGOGUARD PREDICTIVE DAMAGE PREVENTION ENGINE"
        message="Evaluates commodity sensitivity, packaging resilience, transit duration, and atmospheric wave motion to predict cargo damage BEFORE it occurs."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form (5 Cols) */}
        <div className="lg:col-span-5 bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-slate-800">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Cargo & Packaging Inputs</h3>
          </div>

          <form onSubmit={handlePredict} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Cargo Type</label>
              <input
                type="text"
                value={cargoParams.cargoType}
                onChange={(e) => setCargoParams({ ...cargoParams, cargoType: e.target.value })}
                className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white font-medium focus:border-cyan-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Packaging Type</label>
                <select
                  value={cargoParams.packagingType}
                  onChange={(e) => setCargoParams({ ...cargoParams, packagingType: e.target.value })}
                  className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none"
                >
                  <option value="Standard Carton">Standard Carton</option>
                  <option value="Reinforced Wooden Crate">Reinforced Crate</option>
                  <option value="Palletized Shrink Wrap">Palletized Shrink</option>
                  <option value="Vacuum Sealed Barrier">Vacuum Sealed</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Fragility Level</label>
                <select
                  value={cargoParams.fragility}
                  onChange={(e) => setCargoParams({ ...cargoParams, fragility: e.target.value })}
                  className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none"
                >
                  <option value="Standard">Standard</option>
                  <option value="Fragile">Fragile</option>
                  <option value="High Precision">High Precision</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Voyage Duration (Days)</label>
                <input
                  type="number"
                  value={cargoParams.voyageDurationDays}
                  onChange={(e) => setCargoParams({ ...cargoParams, voyageDurationDays: Number(e.target.value) })}
                  className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Weather Risk Index</label>
                <input
                  type="range"
                  min="10"
                  max="95"
                  value={cargoParams.weatherRisk}
                  onChange={(e) => setCargoParams({ ...cargoParams, weatherRisk: Number(e.target.value) })}
                  className="w-full accent-cyan-500"
                />
                <span className="text-[10px] text-cyan-400 font-mono font-bold block text-right">{cargoParams.weatherRisk}/100</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center justify-center space-x-2 mt-4"
            >
              <span>Predict Damage Risk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Output: Predictive Damage Assessment (7 Cols) */}
        <div className="lg:col-span-7 bg-navy-850 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 bg-rose-950 px-2.5 py-0.5 rounded border border-rose-500/40">
                PREDICTIVE DAMAGE SCORE
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">Cargo Damage Risk Assessment</h2>
            </div>
            <div className="flex items-center space-x-3">
              <RiskBadge risk={result.riskCategory} size="lg" />
              <ScoreMeter score={result.cargoRiskScore} label="Damage Risk" size="sm" />
            </div>
          </div>

          {/* Key Primary Reasons */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Primary Predictive Risk Drivers</span>
            </h4>
            <div className="space-y-2 text-xs">
              {result.reasons.map((r: string, idx: number) => (
                <div key={idx} className="p-3 bg-navy-800 rounded-xl border border-slate-750 flex items-start space-x-2 text-slate-200">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Preventive Actions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Recommended Preventive Actions</span>
            </h4>
            <div className="space-y-2 text-xs">
              {result.preventiveActions.map((act: string, idx: number) => (
                <div key={idx} className="p-3 bg-navy-800 rounded-xl border border-slate-750 flex items-center space-x-3 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold">{act}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
