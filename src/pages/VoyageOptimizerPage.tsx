import React, { useState } from 'react';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { ScoreMeter } from '../components/common/ScoreMeter';
import { Navigation, Compass, AlertTriangle, ShieldCheck, ArrowRight, Fuel, Clock, DollarSign } from 'lucide-react';

export const VoyageOptimizerPage: React.FC = () => {
  const [params, setParams] = useState({
    cargoValue: 20000000, // ₹2 Cr
    cargoType: 'Microcontrollers & Optical Sensors',
    vesselSpeedKnots: 16,
    fuelPricePerTonINR: 65000,
    remainingDistanceNM: 1800,
    weatherRiskScore: 68, // High storm swell
    portCongestionHours: 36,
    cargoSensitivity: 'Fragile',
    delayCostPerDayINR: 100000
  });

  const [simulatedResult, setSimulatedResult] = useState<any>({
    options: [
      {
        strategyName: 'Continue Current Plan',
        description: 'Maintain original course and knots despite active weather & port advisory.',
        fuelCostINR: 2200000,
        expectedDelayCostINR: 300000,
        expectedCargoLossINR: 600000,
        operationalRiskCostINR: 100000,
        expectedTotalCostINR: 3100000,
        transitDays: 4.7,
        isRecommended: false
      },
      {
        strategyName: 'Alternative Route Bypass',
        description: 'Divert 80 nautical miles south to bypass heavy storm swell & congested anchorage.',
        fuelCostINR: 2400000,
        expectedDelayCostINR: 100000,
        expectedCargoLossINR: 150000,
        operationalRiskCostINR: 50000,
        expectedTotalCostINR: 2650000,
        transitDays: 5.1,
        recommendationReason: 'Although the alternative route has higher fuel cost, it reduces expected cargo loss and delay exposure significantly.',
        isRecommended: true
      },
      {
        strategyName: 'Slow Speed Steaming',
        description: 'Reduce speed by 20% to conserve bunker fuel and synchronize with port berth availability.',
        fuelCostINR: 1800000,
        expectedDelayCostINR: 450000,
        expectedCargoLossINR: 400000,
        operationalRiskCostINR: 80000,
        expectedTotalCostINR: 2730000,
        transitDays: 5.8,
        isRecommended: false
      },
      {
        strategyName: 'Alternate Port Berthing',
        description: 'Divert berthing to Mundra deep-water terminal.',
        fuelCostINR: 2100000,
        expectedDelayCostINR: 120000,
        expectedCargoLossINR: 250000,
        operationalRiskCostINR: 60000,
        expectedTotalCostINR: 2530000,
        transitDays: 4.9,
        isRecommended: false
      }
    ],
    recommendedStrategy: 'Alternative Route Bypass',
    financialSavingsINR: 450000
  });

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();

    // Recalculate mathematical options
    const fuelBase = Math.round((params.remainingDistanceNM / (params.vesselSpeedKnots * 24)) * 35 * params.fuelPricePerTonINR);
    const currentFuel = fuelBase;
    const currentDelay = Math.round((params.portCongestionHours / 24) * params.delayCostPerDayINR);
    const currentCargoLoss = Math.round(params.cargoValue * (params.weatherRiskScore / 100) * 0.05);
    const currentTotal = currentFuel + currentDelay + currentCargoLoss + 100000;

    const altFuel = Math.round(fuelBase * 1.1);
    const altDelay = Math.round(0.3 * params.delayCostPerDayINR);
    const altCargoLoss = Math.round(params.cargoValue * 0.008);
    const altTotal = altFuel + altDelay + altCargoLoss + 50000;

    setSimulatedResult({
      options: [
        {
          strategyName: 'Continue Current Plan',
          description: 'Maintain course despite active sea swell.',
          fuelCostINR: currentFuel,
          expectedDelayCostINR: currentDelay,
          expectedCargoLossINR: currentCargoLoss,
          operationalRiskCostINR: 100000,
          expectedTotalCostINR: currentTotal,
          transitDays: 4.7,
          isRecommended: false
        },
        {
          strategyName: 'Alternative Route Bypass',
          description: 'Divert south to bypass storm swell & anchorage congestion.',
          fuelCostINR: altFuel,
          expectedDelayCostINR: altDelay,
          expectedCargoLossINR: altCargoLoss,
          operationalRiskCostINR: 50000,
          expectedTotalCostINR: altTotal,
          transitDays: 5.1,
          recommendationReason: 'Although the alternative route has higher fuel cost, it reduces expected cargo loss and delay exposure.',
          isRecommended: true
        }
      ],
      recommendedStrategy: 'Alternative Route Bypass',
      financialSavingsINR: Math.max(0, currentTotal - altTotal)
    });
  };

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title="DECISION SUPPORT SIMULATION ENGINE — NOT CERTIFIED NAVIGATION"
        message="This module models operational financial trade risk formulas. It does NOT replace official ECDIS navigation tools, master captain discretion, or SOLAS standards."
        type="simulation"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Parameter Controls (4 Cols) */}
        <div className="lg:col-span-4 bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-slate-800">
            <Navigation className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Voyage Parameters</h3>
          </div>

          <form onSubmit={handleSimulate} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Cargo Value (₹)</label>
              <input
                type="number"
                value={params.cargoValue}
                onChange={(e) => setParams({ ...params, cargoValue: Number(e.target.value) })}
                className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-1.5 text-white font-mono focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Vessel Speed (Knots)</label>
              <input
                type="number"
                value={params.vesselSpeedKnots}
                onChange={(e) => setParams({ ...params, vesselSpeedKnots: Number(e.target.value) })}
                className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-1.5 text-white font-mono focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Bunker Fuel Price (₹ / Ton)</label>
              <input
                type="number"
                value={params.fuelPricePerTonINR}
                onChange={(e) => setParams({ ...params, fuelPricePerTonINR: Number(e.target.value) })}
                className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-1.5 text-white font-mono focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Weather Risk Index (0-100)</label>
              <input
                type="range"
                min="10"
                max="95"
                value={params.weatherRiskScore}
                onChange={(e) => setParams({ ...params, weatherRiskScore: Number(e.target.value) })}
                className="w-full accent-cyan-500"
              />
              <span className="text-[10px] text-cyan-400 font-mono font-bold block text-right">{params.weatherRiskScore}/100</span>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Port Congestion (Hours)</label>
              <input
                type="number"
                value={params.portCongestionHours}
                onChange={(e) => setParams({ ...params, portCongestionHours: Number(e.target.value) })}
                className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-1.5 text-white font-mono focus:border-cyan-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center justify-center space-x-2 mt-4"
            >
              <span>Run Decision Model</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Output: Decision Matrix (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Formula Display Banner */}
          <div className="p-4 bg-navy-850 border border-slate-800 rounded-2xl flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">CORE COST FORMULA</span>
              <code className="text-slate-200 font-mono text-xs font-bold mt-0.5 block">
                Expected Total Cost = Actual Cost + Delay Cost + Expected Cargo Loss + Risk Cost
              </code>
            </div>
            {simulatedResult.financialSavingsINR > 0 && (
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block">NET SAVINGS</span>
                <span className="text-base font-extrabold font-mono text-emerald-400">
                  ₹{(simulatedResult.financialSavingsINR / 100000).toFixed(1)}L
                </span>
              </div>
            )}
          </div>

          {/* Strategy Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {simulatedResult.options.map((opt: any, idx: number) => (
              <div
                key={idx}
                className={`bg-navy-850 border rounded-2xl p-5 shadow-xl relative flex flex-col justify-between ${
                  opt.isRecommended
                    ? 'border-cyan-500 ring-1 ring-cyan-500/40'
                    : 'border-slate-800'
                }`}
              >
                {opt.isRecommended && (
                  <div className="absolute -top-3 right-4 bg-cyan-500 text-navy-950 text-[10px] font-extrabold px-3 py-0.5 rounded-full shadow-lg">
                    RECOMMENDED DECISION
                  </div>
                )}

                <div>
                  <h4 className="text-base font-bold text-white mb-1">{opt.strategyName}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{opt.description}</p>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-2 bg-navy-800 rounded border border-slate-750">
                      <span className="text-slate-400">Fuel Cost:</span>
                      <span className="font-mono font-bold text-white">₹{(opt.fuelCostINR/100000).toFixed(1)}L</span>
                    </div>
                    <div className="flex justify-between p-2 bg-navy-800 rounded border border-slate-750">
                      <span className="text-slate-400">Expected Delay Cost:</span>
                      <span className="font-mono font-bold text-amber-400">₹{(opt.expectedDelayCostINR/100000).toFixed(1)}L</span>
                    </div>
                    <div className="flex justify-between p-2 bg-navy-800 rounded border border-slate-750">
                      <span className="text-slate-400">Expected Cargo Risk Loss:</span>
                      <span className="font-mono font-bold text-rose-400">₹{(opt.expectedCargoLossINR/100000).toFixed(1)}L</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-300">EXPECTED TOTAL COST:</span>
                    <span className="text-lg font-mono font-extrabold text-cyan-400">
                      ₹{(opt.expectedTotalCostINR/100000).toFixed(1)}L
                    </span>
                  </div>

                  {opt.recommendationReason && (
                    <p className="mt-2 text-[11px] text-cyan-300 bg-cyan-950/60 p-2 rounded border border-cyan-500/30 leading-relaxed">
                      "{opt.recommendationReason}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
