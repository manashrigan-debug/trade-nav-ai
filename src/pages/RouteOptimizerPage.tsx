import React, { useState } from 'react';
import { Priority, IRouteOption } from '../types';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { ScoreMeter } from '../components/common/ScoreMeter';
import { RiskBadge } from '../components/common/RiskBadge';
import { GitFork, CheckCircle2, Clock, IndianRupee, ShieldCheck, Leaf, Sparkles, Ship, Plane, Train, Truck } from 'lucide-react';

export const RouteOptimizerPage: React.FC = () => {
  const [priority, setPriority] = useState<Priority>('Balanced');

  const routes: IRouteOption[] = [
    {
      id: 'route-sea-rail-road',
      name: 'Sea + Rail + Road (Multimodal)',
      mode: 'Multimodal',
      modesBreakdown: ['Ocean Vessel', 'Container Rail', 'Inland Trucking'],
      costINR: 820000,
      transitTimeDays: 18,
      riskScore: 18,
      cargoSafetyPercent: 92,
      reliabilityPercent: 94,
      carbonEmissions: 'Low',
      overallScore: 89,
      legs: [
        { mode: 'Sea', from: 'Shanghai Port', to: 'JNPT Gateway Port', durationDays: 12, costINR: 500000 },
        { mode: 'Rail', from: 'JNPT Gateway Port', to: 'ICD Pune Terminal', durationDays: 4, costINR: 200000 },
        { mode: 'Road', from: 'ICD Pune Terminal', to: 'Factory Warehouse', durationDays: 2, costINR: 120000 }
      ]
    },
    {
      id: 'route-air-road',
      name: 'Air + Road (Express Air Freight)',
      mode: 'Air',
      modesBreakdown: ['Air Cargo Freighter', 'Dedicated Trucking'],
      costINR: 1240000,
      transitTimeDays: 4,
      riskScore: 12,
      cargoSafetyPercent: 96,
      reliabilityPercent: 98,
      carbonEmissions: 'High',
      overallScore: 86,
      legs: [
        { mode: 'Air', from: 'PVG Shanghai Airport', to: 'BOM Airport Customs', durationDays: 3, costINR: 1050000 },
        { mode: 'Road', from: 'BOM Airport Customs', to: 'Pune Facility', durationDays: 1, costINR: 190000 }
      ]
    },
    {
      id: 'route-sea-road',
      name: 'Sea + Direct Road',
      mode: 'Sea',
      modesBreakdown: ['Container Freighter', 'Interstate Trucking'],
      costINR: 890000,
      transitTimeDays: 21,
      riskScore: 24,
      cargoSafetyPercent: 88,
      reliabilityPercent: 86,
      carbonEmissions: 'Low',
      overallScore: 81,
      legs: [
        { mode: 'Sea', from: 'Shanghai Port', to: 'Mumbai Port', durationDays: 16, costINR: 650000 },
        { mode: 'Road', from: 'Mumbai Port', to: 'Pune Facility', durationDays: 5, costINR: 240000 }
      ]
    },
    {
      id: 'route-rail-road',
      name: 'Trans-Continental Rail + Road',
      mode: 'Rail',
      modesBreakdown: ['Dedicated Freight Express Rail', 'Local Trucking'],
      costINR: 980000,
      transitTimeDays: 12,
      riskScore: 20,
      cargoSafetyPercent: 90,
      reliabilityPercent: 91,
      carbonEmissions: 'Medium',
      overallScore: 85,
      legs: [
        { mode: 'Rail', from: 'Origin Freight Corridor', to: 'Border Hub', durationDays: 9, costINR: 760000 },
        { mode: 'Road', from: 'Border Hub', to: 'Destination Warehouse', durationDays: 3, costINR: 220000 }
      ]
    }
  ];

  // Re-evaluate recommended route based on selected priority
  let recommendedId = 'route-sea-rail-road';
  if (priority === 'Fastest') recommendedId = 'route-air-road';
  if (priority === 'Cheapest') recommendedId = 'route-sea-rail-road';
  if (priority === 'Safest') recommendedId = 'route-air-road';
  if (priority === 'Lowest Carbon') recommendedId = 'route-sea-rail-road';
  if (priority === 'Balanced') recommendedId = 'route-sea-rail-road';

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title="MULTIMODAL ROUTE OPTIMIZATION ENGINE"
        message="Simulates and compares multimodal transport legs across Sea, Air, Rail, and Road combinations for cost, transit duration, carbon emissions, and safety."
      />

      {/* Priority Selection Bar */}
      <div className="bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <GitFork className="w-5 h-5 text-cyan-400" />
            <span>Select Optimization Priority Filter</span>
          </h3>
          <p className="text-xs text-slate-400">Re-ranks transport combinations according to operational criteria</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(['Balanced', 'Cheapest', 'Fastest', 'Safest', 'Lowest Carbon'] as Priority[]).map(p => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                priority === p
                  ? 'bg-cyan-500 text-navy-950 border-cyan-400 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-navy-800 text-slate-300 border-slate-700 hover:bg-navy-750'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Route Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {routes.map(r => {
          const isRecommended = r.id === recommendedId;

          return (
            <div
              key={r.id}
              className={`bg-navy-850 border rounded-2xl p-6 shadow-xl relative flex flex-col justify-between transition-all ${
                isRecommended
                  ? 'border-cyan-500 ring-1 ring-cyan-500/50 shadow-cyan-500/10'
                  : 'border-slate-800'
              }`}
            >
              {isRecommended && (
                <div className="absolute -top-3 right-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-lg flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>RECOMMENDED FOR "{priority.toUpperCase()}"</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center space-x-2">
                      <span>{r.name}</span>
                    </h4>
                    <div className="flex space-x-1.5 mt-1 text-[11px] text-slate-400">
                      {r.modesBreakdown.map((m, i) => (
                        <span key={i} className="bg-navy-800 px-2 py-0.5 rounded border border-slate-750 font-mono">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ScoreMeter score={r.overallScore} size="sm" label="" />
                </div>

                {/* Core Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 my-4 text-xs">
                  <div className="p-3 bg-navy-800 rounded-xl border border-slate-750">
                    <span className="text-[10px] text-slate-400 block mb-0.5">Est. Cost</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      ₹{(r.costINR / 100000).toFixed(1)}L
                    </span>
                  </div>

                  <div className="p-3 bg-navy-800 rounded-xl border border-slate-750">
                    <span className="text-[10px] text-slate-400 block mb-0.5">Transit Time</span>
                    <span className="font-mono font-bold text-white text-sm">
                      {r.transitTimeDays} Days
                    </span>
                  </div>

                  <div className="p-3 bg-navy-800 rounded-xl border border-slate-750">
                    <span className="text-[10px] text-slate-400 block mb-0.5">Cargo Safety</span>
                    <span className="font-mono font-bold text-cyan-400 text-sm">
                      {r.cargoSafetyPercent}%
                    </span>
                  </div>
                </div>

                {/* Environmental & Risk Attributes */}
                <div className="space-y-2 text-xs pt-2 border-t border-slate-800">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 flex items-center space-x-1">
                      <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Carbon Footprint:</span>
                    </span>
                    <span className={`font-bold font-mono ${
                      r.carbonEmissions === 'Low' ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {r.carbonEmissions} Impact
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Route Safety Rating:</span>
                    <RiskBadge risk={r.riskScore < 15 ? 'LOW' : 'MEDIUM'} size="sm" />
                  </div>
                </div>
              </div>

              {/* Legs Breakdown */}
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                <span className="font-bold text-slate-300 uppercase tracking-wider block mb-1">Leg Breakdown:</span>
                <div className="space-y-1">
                  {r.legs.map((leg, idx) => (
                    <div key={idx} className="flex justify-between font-mono">
                      <span>{leg.mode}: {leg.from} → {leg.to}</span>
                      <span className="text-slate-300">{leg.durationDays}d | ₹{(leg.costINR/1000).toFixed(0)}k</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
