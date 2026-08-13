import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import { mockTradeAnalysis } from '../services/api';
import { Priority, TransportMode } from '../types';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { RiskBadge } from '../components/common/RiskBadge';
import { ScoreMeter } from '../components/common/ScoreMeter';
import { Compass, ArrowRight, ShieldCheck, Truck, Plane, Ship, Train, Layers, Sparkles } from 'lucide-react';

export const TradePlannerPage: React.FC = () => {
  const { addToast } = useAppData();

  const [formData, setFormData] = useState({
    product: 'High-Precision Microcontrollers',
    quantity: 5000,
    unitValue: 492,
    originCountry: 'China',
    originCity: 'Shanghai',
    destinationCountry: 'India',
    destinationCity: 'Pune',
    cargoType: 'Electronics & Chips',
    cargoValue: 2460000,
    priority: 'Balanced' as Priority,
    preferredMode: 'Multimodal' as TransportMode
  });

  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const res = mockTradeAnalysis(formData);
      setAnalysisResult(res);
      setLoading(false);
      addToast('Trade Analysis Complete', 'Multimodal route & supplier recommendations generated.', 'success');
    }, 600);
  };

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title="TRADE PLANNING INTELLIGENCE ENGINE"
        message="Enter shipment parameters to calculate recommended suppliers, multimodal route combinations, estimated landed costs, and trade health risk scores."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Form (5 Cols) */}
        <div className="lg:col-span-5 bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center space-x-2.5 pb-3 mb-4 border-b border-slate-800">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Trade Consignment Form</h2>
              <p className="text-xs text-slate-400">Configure origin, destination & priority parameters</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Product Description</label>
              <input
                type="text"
                required
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Quantity</label>
                <input
                  type="number"
                  required
                  value={formData.quantity}
                  onChange={(e) => {
                    const qty = Number(e.target.value);
                    setFormData({
                      ...formData,
                      quantity: qty,
                      cargoValue: qty * formData.unitValue
                    });
                  }}
                  className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Unit Value (₹)</label>
                <input
                  type="number"
                  required
                  value={formData.unitValue}
                  onChange={(e) => {
                    const uv = Number(e.target.value);
                    setFormData({
                      ...formData,
                      unitValue: uv,
                      cargoValue: formData.quantity * uv
                    });
                  }}
                  className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none font-mono"
                />
              </div>
            </div>

            <div className="p-2.5 bg-navy-800/80 rounded-lg border border-slate-750 flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">Calculated Cargo Value:</span>
              <span className="font-mono font-bold text-cyan-400 text-sm">₹{formData.cargoValue.toLocaleString('en-IN')}</span>
            </div>

            {/* Origin & Destination */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Origin City & Country</label>
                <input
                  type="text"
                  required
                  value={formData.originCity}
                  onChange={(e) => setFormData({ ...formData, originCity: e.target.value })}
                  placeholder="City"
                  className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-1.5 text-white mb-1 focus:border-cyan-500 outline-none"
                />
                <input
                  type="text"
                  required
                  value={formData.originCountry}
                  onChange={(e) => setFormData({ ...formData, originCountry: e.target.value })}
                  placeholder="Country"
                  className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-1.5 text-slate-300 focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Destination City & Country</label>
                <input
                  type="text"
                  required
                  value={formData.destinationCity}
                  onChange={(e) => setFormData({ ...formData, destinationCity: e.target.value })}
                  placeholder="City"
                  className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-1.5 text-white mb-1 focus:border-cyan-500 outline-none"
                />
                <input
                  type="text"
                  required
                  value={formData.destinationCountry}
                  onChange={(e) => setFormData({ ...formData, destinationCountry: e.target.value })}
                  placeholder="Country"
                  className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-1.5 text-slate-300 focus:border-cyan-500 outline-none"
                />
              </div>
            </div>

            {/* Priority Selection */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Optimization Priority</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Cheapest', 'Fastest', 'Safest', 'Balanced', 'Lowest Carbon'] as Priority[]).map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority: p })}
                    className={`py-1.5 px-2 rounded-lg border text-[11px] font-semibold text-center transition-all ${
                      formData.priority === p
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500'
                        : 'bg-navy-800 text-slate-400 border-slate-750 hover:bg-navy-750'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center justify-center space-x-2 mt-4"
            >
              {loading ? (
                <span>Simulating Intelligence Engine...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Trade Analysis</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Output Analysis (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {analysisResult ? (
            <div className="bg-navy-850 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-500/40">
                    TRADE ANALYSIS COMPLETE
                  </span>
                  <h2 className="text-xl font-extrabold text-white mt-1">Recommended Consignment Strategy</h2>
                </div>
                <ScoreMeter score={analysisResult.tradeHealthScore} label="Trade Health" size="md" />
              </div>

              {/* Analysis Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
                <div className="p-3.5 bg-navy-800 rounded-xl border border-slate-750 space-y-1">
                  <span className="text-slate-400 font-medium">Recommended Supplier:</span>
                  <p className="font-bold text-white text-sm">{analysisResult.bestSupplier}</p>
                </div>

                <div className="p-3.5 bg-navy-800 rounded-xl border border-slate-750 space-y-1">
                  <span className="text-slate-400 font-medium">Recommended Transport Mode:</span>
                  <p className="font-bold text-cyan-400 text-sm flex items-center space-x-1.5">
                    <span>{analysisResult.recommendedTransportMode}</span>
                  </p>
                </div>

                <div className="p-3.5 bg-navy-800 rounded-xl border border-slate-750 space-y-1">
                  <span className="text-slate-400 font-medium">Estimated Landed Cost:</span>
                  <p className="font-bold text-emerald-400 text-base font-mono">
                    ₹{analysisResult.estimatedLandedCost.toLocaleString('en-IN')}
                    <span className="text-[11px] font-normal text-slate-400 block">
                      (₹{analysisResult.costPerUnit.toLocaleString('en-IN')} / unit)
                    </span>
                  </p>
                </div>

                <div className="p-3.5 bg-navy-800 rounded-xl border border-slate-750 space-y-1">
                  <span className="text-slate-400 font-medium">Estimated Delivery Transit:</span>
                  <p className="font-bold text-white text-base font-mono">
                    {analysisResult.estimatedDeliveryTimeDays} Business Days
                  </p>
                </div>
              </div>

              {/* Risk Breakdown Matrix */}
              <div className="p-4 bg-navy-800 rounded-xl border border-slate-750 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Risk Assessment Breakdown</h4>
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-2 bg-navy-850 rounded border border-slate-700">
                    <span className="text-[10px] text-slate-400 block mb-1">Cargo Risk</span>
                    <RiskBadge risk={analysisResult.cargoRisk} size="sm" />
                  </div>
                  <div className="p-2 bg-navy-850 rounded border border-slate-700">
                    <span className="text-[10px] text-slate-400 block mb-1">Customs Risk</span>
                    <RiskBadge risk={analysisResult.customsRisk} size="sm" />
                  </div>
                  <div className="p-2 bg-navy-850 rounded border border-slate-700">
                    <span className="text-[10px] text-slate-400 block mb-1">Geopolitical Risk</span>
                    <RiskBadge risk={analysisResult.geopoliticalRisk} size="sm" />
                  </div>
                </div>
              </div>

              {/* AI Insights bullet list */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">AI Operational Recommendations</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {analysisResult.aiInsights.map((insight: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-cyan-400 font-bold mt-0.5">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-navy-850 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
              <Compass className="w-12 h-12 text-cyan-500/40 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Analysis Generated Yet</h3>
              <p className="text-xs max-w-md mx-auto">
                Fill in the consignment details on the left and submit to run the trade intelligence simulation engine.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
