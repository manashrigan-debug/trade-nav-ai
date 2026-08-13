import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { RiskBadge } from '../components/common/RiskBadge';
import { Users, Sliders, CheckCircle2, XCircle, Search, Star } from 'lucide-react';

export const SupplierIntelligencePage: React.FC = () => {
  const { suppliers } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');

  // Customizable Weighting System State
  const [weights, setWeights] = useState({
    reliability: 30,
    price: 20,
    quality: 20,
    delivery: 15,
    risk: 10,
    response: 5
  });

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

  // Recalculate supplier rankings based on weights
  const rankedSuppliers = suppliers.map(sup => {
    const riskFactor = 100 - sup.riskScore;
    const respFactor = Math.max(0, 100 - sup.responseTimeHours * 5);

    const score = Number(
      (
        (sup.reliabilityScore * weights.reliability +
          sup.priceScore * weights.price +
          sup.qualityScore * weights.quality +
          sup.deliveryScore * weights.delivery +
          riskFactor * weights.risk +
          respFactor * weights.response) /
        (totalWeight || 100)
      ).toFixed(1)
    );

    return {
      ...sup,
      calculatedScore: score,
      isRecommended: score >= 84
    };
  }).filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.country.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => b.calculatedScore - a.calculatedScore);

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title="SUPPLIER INTELLIGENCE RANKING ENGINE"
        message="Evaluates global suppliers using customizable multi-parameter weighted scoring. Adjust weight parameters to prioritize price, quality, or reliability."
      />

      {/* Customizable Weight Sliders Card */}
      <div className="bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Customizable Weighting Matrix</h3>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-500/30">
            Total Weight: {totalWeight}%
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
          <div>
            <div className="flex justify-between text-slate-300 font-semibold mb-1">
              <span>Reliability</span>
              <span className="font-mono text-cyan-400">{weights.reliability}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={weights.reliability}
              onChange={(e) => setWeights({ ...weights, reliability: Number(e.target.value) })}
              className="w-full accent-cyan-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 font-semibold mb-1">
              <span>Price</span>
              <span className="font-mono text-cyan-400">{weights.price}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={weights.price}
              onChange={(e) => setWeights({ ...weights, price: Number(e.target.value) })}
              className="w-full accent-cyan-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 font-semibold mb-1">
              <span>Quality</span>
              <span className="font-mono text-cyan-400">{weights.quality}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={weights.quality}
              onChange={(e) => setWeights({ ...weights, quality: Number(e.target.value) })}
              className="w-full accent-cyan-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 font-semibold mb-1">
              <span>Delivery Time</span>
              <span className="font-mono text-cyan-400">{weights.delivery}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={weights.delivery}
              onChange={(e) => setWeights({ ...weights, delivery: Number(e.target.value) })}
              className="w-full accent-cyan-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 font-semibold mb-1">
              <span>Country Risk</span>
              <span className="font-mono text-cyan-400">{weights.risk}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={weights.risk}
              onChange={(e) => setWeights({ ...weights, risk: Number(e.target.value) })}
              className="w-full accent-cyan-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 font-semibold mb-1">
              <span>Response Time</span>
              <span className="font-mono text-cyan-400">{weights.response}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={weights.response}
              onChange={(e) => setWeights({ ...weights, response: Number(e.target.value) })}
              className="w-full accent-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Supplier Directory Table & Search */}
      <div className="bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3">
          <div>
            <h3 className="text-base font-bold text-white">Ranked Supplier Directory</h3>
            <p className="text-xs text-slate-400">Calculated dynamic rankings for verified global vendors</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by supplier name or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-navy-800 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-navy-800 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3 rounded-l-lg">Rank & Supplier</th>
                <th className="p-3">Score</th>
                <th className="p-3">Reliability</th>
                <th className="p-3">Price Score</th>
                <th className="p-3">Quality</th>
                <th className="p-3">Historical Delay</th>
                <th className="p-3">Country Risk</th>
                <th className="p-3 text-right rounded-r-lg">Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {rankedSuppliers.map((sup, idx) => (
                <tr key={sup.id} className="hover:bg-navy-800/50 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-6 h-6 rounded-full bg-navy-800 border border-slate-700 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <div>
                        <span className="font-bold text-white block">{sup.name}</span>
                        <span className="text-[11px] text-slate-400">{sup.city}, {sup.country}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-3 font-mono font-bold text-sm text-cyan-400">
                    {sup.calculatedScore}/100
                  </td>

                  <td className="p-3 font-mono text-emerald-400">{sup.reliabilityScore}%</td>
                  <td className="p-3 font-mono text-blue-400">{sup.priceScore}%</td>
                  <td className="p-3 font-mono text-purple-400">{sup.qualityScore}%</td>
                  <td className="p-3 font-mono text-slate-300">{sup.historicalDelayDays} days</td>
                  <td className="p-3">
                    <RiskBadge risk={sup.riskScore < 20 ? 'LOW' : sup.riskScore < 35 ? 'MEDIUM' : 'HIGH'} size="sm" />
                  </td>

                  <td className="p-3 text-right">
                    {sup.isRecommended ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Recommended</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-medium text-[11px]">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Not Recommended</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
