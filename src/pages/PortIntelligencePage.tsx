import React from 'react';
import { useAppData } from '../context/AppDataContext';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { RiskBadge } from '../components/common/RiskBadge';
import { Anchor, Clock, DollarSign, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const PortIntelligencePage: React.FC = () => {
  const { ports } = useAppData();

  const chartData = ports.map(p => ({
    name: p.name.split(' ')[0],
    waitingTime: p.waitingTimeHours,
    handlingCost: p.handlingCostPerTEUINR / 1000,
    suitability: p.suitabilityScore
  }));

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title="PORT INTELLIGENCE COMPARATIVE ANALYTICS"
        message="Monitors berth congestion levels, container terminal waiting times, TEU handling tariffs, and port suitability scores across major Indian & Asian sea hubs."
      />

      {/* Comparison Chart Bar */}
      <div className="bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-1">Berth Waiting Time Comparison (Hours)</h3>
        <p className="text-xs text-slate-400 mb-4">Lower waiting time reduces demurrage exposure and vessel delay costs</p>

        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip
                formatter={(val: any) => [`${val} Hours`, 'Wait Time']}
                contentStyle={{ backgroundColor: '#172033', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar dataKey="waitingTime" fill="#06B6D4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Port Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ports.map(port => (
          <div key={port.id} className="bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center space-x-1.5">
                    <Anchor className="w-4 h-4 text-cyan-400" />
                    <span>{port.name}</span>
                  </h4>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30 mt-1 inline-block">
                    {port.code} | {port.country}
                  </span>
                </div>
                <RiskBadge risk={port.congestionLevel} size="sm" />
              </div>

              <div className="grid grid-cols-2 gap-3 my-4 text-xs">
                <div className="p-3 bg-navy-800 rounded-xl border border-slate-750">
                  <span className="text-[10px] text-slate-400 block mb-0.5">Berth Wait Time</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">{port.waitingTimeHours} hrs</span>
                </div>

                <div className="p-3 bg-navy-800 rounded-xl border border-slate-750">
                  <span className="text-[10px] text-slate-400 block mb-0.5">Handling / TEU</span>
                  <span className="font-mono font-bold text-white text-sm">₹{(port.handlingCostPerTEUINR/1000).toFixed(0)}k</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Delay:</span>
                  <span className="font-mono font-bold text-slate-100">+{port.estimatedDelayDays} Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Suitability Index:</span>
                  <span className="font-mono font-bold text-emerald-400">{port.suitabilityScore}/100</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              <span className="font-bold text-slate-300 block mb-1">Specialization:</span>
              <div className="flex flex-wrap gap-1">
                {port.specialization.map((spec, i) => (
                  <span key={i} className="bg-navy-800 px-2 py-0.5 rounded border border-slate-750 text-slate-300">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
