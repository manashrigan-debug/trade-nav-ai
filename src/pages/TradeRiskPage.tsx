import React from 'react';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { ScoreMeter } from '../components/common/ScoreMeter';
import { RiskBadge } from '../components/common/RiskBadge';
import { ShieldAlert, AlertTriangle, Activity, Clock } from 'lucide-react';

export const TradeRiskPage: React.FC = () => {
  const riskCategories = [
    { name: 'Geopolitical Risk', score: 18, risk: 'LOW', details: 'Stable trade corridor across South-East Asian passages.' },
    { name: 'Supplier Reliability Risk', score: 22, risk: 'LOW', details: 'Verified suppliers with 92%+ historical on-time dispatch.' },
    { name: 'Customs Clearance Risk', score: 45, risk: 'MEDIUM', details: 'BIS licensing verification requirements for electronics.' },
    { name: 'Port Congestion Risk', score: 58, risk: 'MEDIUM', details: 'Moderate berth queuing at JNPT & high delay at Kolkata.' },
    { name: 'Route Transit Risk', score: 28, risk: 'LOW', details: 'Favorable wave height conditions along Arabian Sea.' },
    { name: 'Cargo Sensitivity Risk', score: 62, risk: 'HIGH', details: 'Microcontrollers sensitive to container humidity peaks.' },
    { name: 'Multimodal Transport Risk', score: 25, risk: 'LOW', details: 'Dedicated container rail corridor scheduled.' }
  ];

  const timelineEvents = [
    { date: '12 Aug 2026', title: 'Port Congestion Spike', desc: 'Kolkata berth wait time increased from 24h to 42h.', severity: 'AMBER' },
    { date: '10 Aug 2026', title: 'Suez Canal Convoy Slowdown', desc: 'Convoy spacing increased by 18 hours due to maintenance.', severity: 'AMBER' },
    { date: '08 Aug 2026', title: 'Customs Policy Clarification', desc: 'Revised duty tariff notification issued for electrical components.', severity: 'BLUE' }
  ];

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title="TRADE RISK INTELLIGENCE DASHBOARD"
        message="Synthesizes geopolitical, supplier, customs, port, route, cargo, and transport risks into a consolidated trade risk index."
      />

      {/* Top Banner Score */}
      <div className="bg-navy-850 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          <ScoreMeter score={34} label="Trade Risk Index" size="lg" />
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-extrabold text-white">TRADE RISK SCORE: 34 / 100</h2>
              <RiskBadge risk="LOW" size="lg" />
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
              <strong>Main Risk Driver:</strong> Moderate port congestion at Kolkata Syama Prasad Port and container humidity sensitivity for electronics cargo. Overall trade passage remains low-risk.
            </p>
          </div>
        </div>
      </div>

      {/* 7 Risk Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {riskCategories.map((cat, idx) => (
          <div key={idx} className="bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white">{cat.name}</h4>
              <RiskBadge risk={cat.risk} size="sm" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400 font-medium">Risk Score:</span>
              <span className="font-mono font-bold text-white text-base">{cat.score}/100</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed bg-navy-800 p-2.5 rounded-xl border border-slate-750">
              {cat.details}
            </p>
          </div>
        ))}
      </div>

      {/* Risk Timeline */}
      <div className="bg-navy-850 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
          <Clock className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white">Trade Risk Incident Timeline</h3>
        </div>

        <div className="space-y-4">
          {timelineEvents.map((evt, idx) => (
            <div key={idx} className="flex items-start space-x-4 text-xs">
              <span className="font-mono text-cyan-400 font-bold shrink-0 w-24 pt-0.5">{evt.date}</span>
              <div className="p-3 bg-navy-800 rounded-xl border border-slate-750 flex-1">
                <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded mr-2 ${
                  evt.severity === 'AMBER' ? 'bg-amber-500/20 text-amber-400' : 'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {evt.severity}
                </span>
                <span className="font-bold text-white">{evt.title}</span>
                <p className="text-slate-400 mt-1">{evt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
