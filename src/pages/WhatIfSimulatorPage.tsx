import React, { useState } from 'react';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { Sliders, ArrowRight, Sparkles, TrendingDown, Clock, ShieldCheck } from 'lucide-react';

export const WhatIfSimulatorPage: React.FC = () => {
  const [params, setParams] = useState({
    fuelPrice: 65000,
    port: 'Mundra',
    mode: 'Multimodal',
    delayDays: 0,
    quantity: 5000
  });

  // Calculate live What-If simulation deltas
  const currentCost = 1280000; // ₹12.8L
  const currentTime = 18;
  const currentRisk = 32;

  const simCost = params.port === 'Mundra' ? 1240000 : params.mode === 'Air' ? 1950000 : 1280000 + (params.delayDays * 40000);
  const simTime = params.port === 'Mundra' ? 16 : params.mode === 'Air' ? 4 : 18 + params.delayDays;
  const simRisk = params.port === 'Mundra' ? 27 : currentRisk + (params.delayDays * 4);

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title="WHAT-IF TRADE SIMULATOR SANDBOX"
        message="Interactive sandbox allowing logistics managers to tweak fuel prices, port berthing, transit modes, and delays to observe real-time cost, timeline, and risk deltas."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders & Controls (5 Cols) */}
        <div className="lg:col-span-5 bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 text-xs">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Simulator Controls</h3>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Target Destination Port</label>
            <select
              value={params.port}
              onChange={(e) => setParams({ ...params, port: e.target.value })}
              className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-cyan-400 font-semibold focus:border-cyan-500 outline-none"
            >
              <option value="Mumbai">Mumbai JNPT</option>
              <option value="Mundra">Mundra Port (Adani)</option>
              <option value="Chennai">Chennai Port</option>
              <option value="Kolkata">Kolkata Port</option>
              <option value="Singapore">Singapore Hub</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Transport Mode Combination</label>
            <select
              value={params.mode}
              onChange={(e) => setParams({ ...params, mode: e.target.value })}
              className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none"
            >
              <option value="Multimodal">Sea + Rail + Road (Multimodal)</option>
              <option value="Air">Air + Road (Express Air)</option>
              <option value="Sea">Sea + Road</option>
              <option value="Rail">Rail + Road</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 font-semibold mb-1">
              <span>Simulated Route Delay</span>
              <span className="font-mono text-cyan-400">+{params.delayDays} Days</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={params.delayDays}
              onChange={(e) => setParams({ ...params, delayDays: Number(e.target.value) })}
              className="w-full accent-cyan-500"
            />
          </div>
        </div>

        {/* Before / After Comparison Display (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Current Baseline */}
            <div className="bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-navy-800 px-2 py-0.5 rounded border border-slate-700">
                CURRENT BASELINE
              </span>
              <div className="space-y-2 text-xs pt-1">
                <div className="p-3 bg-navy-800 rounded-xl border border-slate-750">
                  <span className="text-slate-400 block text-[10px]">Total Cost</span>
                  <span className="font-mono font-bold text-white text-base">₹{(currentCost/100000).toFixed(1)}L</span>
                </div>

                <div className="p-3 bg-navy-800 rounded-xl border border-slate-750">
                  <span className="text-slate-400 block text-[10px]">Transit Duration</span>
                  <span className="font-mono font-bold text-white text-base">{currentTime} Days</span>
                </div>

                <div className="p-3 bg-navy-800 rounded-xl border border-slate-750">
                  <span className="text-slate-400 block text-[10px]">Risk Index</span>
                  <span className="font-mono font-bold text-white text-base">{currentRisk}/100</span>
                </div>
              </div>
            </div>

            {/* What-If Simulation Result */}
            <div className="bg-navy-850 border border-cyan-500/40 rounded-2xl p-5 shadow-xl space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/40">
                  WHAT IF SIMULATION
                </span>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>

              <div className="space-y-2 text-xs pt-1">
                <div className="p-3 bg-navy-800 rounded-xl border border-slate-750 flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Total Cost</span>
                    <span className="font-mono font-bold text-emerald-400 text-base">₹{(simCost/100000).toFixed(1)}L</span>
                  </div>
                  {simCost < currentCost && (
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      -₹{((currentCost - simCost)/100000).toFixed(1)}L Savings
                    </span>
                  )}
                </div>

                <div className="p-3 bg-navy-800 rounded-xl border border-slate-750 flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Transit Duration</span>
                    <span className="font-mono font-bold text-white text-base">{simTime} Days</span>
                  </div>
                  {simTime < currentTime && (
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      -{currentTime - simTime} Days Faster
                    </span>
                  )}
                </div>

                <div className="p-3 bg-navy-800 rounded-xl border border-slate-750 flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Risk Index</span>
                    <span className="font-mono font-bold text-cyan-400 text-base">{simRisk}/100</span>
                  </div>
                  {simRisk < currentRisk && (
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      Lower Risk
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
