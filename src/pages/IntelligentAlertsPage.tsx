import React from 'react';
import { useAppData } from '../context/AppDataContext';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { Bell, AlertTriangle, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';

export const IntelligentAlertsPage: React.FC = () => {
  const { alerts, setActiveTab } = useAppData();

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title="INTELLIGENT RISK ALERT CENTER"
        message="Provides actionable, real-time risk alerts with explicit 'What Should The User Do?' operational directives."
      />

      <div className="space-y-4">
        {alerts.map(alt => (
          <div
            key={alt.id}
            className={`bg-navy-850 border rounded-2xl p-5 shadow-xl transition-all ${
              alt.severity === 'RED'
                ? 'border-rose-500/50 bg-rose-950/10'
                : 'border-amber-500/40 bg-amber-950/10'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-extrabold tracking-wider ${
                  alt.severity === 'RED'
                    ? 'bg-rose-500 text-navy-950 animate-pulse'
                    : 'bg-amber-500 text-navy-950'
                }`}>
                  {alt.severity} SEVERITY
                </span>
                <h3 className="text-base font-bold text-white">{alt.title}</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">{alt.timestamp}</span>
            </div>

            <div className="my-3 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block">Trigger Reason:</span>
              <p className="bg-navy-800 p-3 rounded-xl border border-slate-750">{alt.reason}</p>
            </div>

            {/* WHAT SHOULD THE USER DO directive card */}
            <div className="p-3.5 bg-cyan-950/70 border border-cyan-500/40 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="font-extrabold text-cyan-300 block uppercase tracking-wider text-[10px] mb-0.5">
                  WHAT SHOULD THE USER DO?
                </span>
                <p className="text-white font-medium">{alt.recommendedAction}</p>
              </div>

              {alt.shipmentId && (
                <button
                  onClick={() => setActiveTab('tracking')}
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shrink-0 flex items-center space-x-1"
                >
                  <span>Inspect Shipment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
