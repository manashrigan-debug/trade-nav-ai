import React, { useState } from 'react';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { Coins, IndianRupee, ArrowRight } from 'lucide-react';

export const CargoLossEstimatorPage: React.FC = () => {
  const [lossData, setLossData] = useState({
    totalCargoValue: 2000000,
    totalQuantity: 500,
    damagedQuantity: 120,
    unitValue: 3500,
    packagingLoss: 25000,
    transportWriteOff: 15000
  });

  const estimatedProductLoss = lossData.damagedQuantity * lossData.unitValue; // ₹4,20,000
  const totalEstimatedLoss = estimatedProductLoss + lossData.packagingLoss + lossData.transportWriteOff;

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title="CARGO FINANCIAL LOSS QUANTIFICATION ENGINE"
        message="Calculates direct commodity write-offs, packaging degradation losses, and unrecoverable freight expenses."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (6 Cols) */}
        <div className="lg:col-span-6 bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-slate-800">
            <Coins className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Loss Inputs</h3>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Total Consignment Value (₹)</label>
              <input
                type="number"
                value={lossData.totalCargoValue}
                onChange={(e) => setLossData({ ...lossData, totalCargoValue: Number(e.target.value) })}
                className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Total Unit Quantity</label>
              <input
                type="number"
                value={lossData.totalQuantity}
                onChange={(e) => setLossData({ ...lossData, totalQuantity: Number(e.target.value) })}
                className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Damaged Quantity</label>
              <input
                type="number"
                value={lossData.damagedQuantity}
                onChange={(e) => setLossData({ ...lossData, damagedQuantity: Number(e.target.value) })}
                className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Unit Value (₹)</label>
              <input
                type="number"
                value={lossData.unitValue}
                onChange={(e) => setLossData({ ...lossData, unitValue: Number(e.target.value) })}
                className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Packaging Damage Write-off (₹)</label>
              <input
                type="number"
                value={lossData.packagingLoss}
                onChange={(e) => setLossData({ ...lossData, packagingLoss: Number(e.target.value) })}
                className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Freight Write-off (₹)</label>
              <input
                type="number"
                value={lossData.transportWriteOff}
                onChange={(e) => setLossData({ ...lossData, transportWriteOff: Number(e.target.value) })}
                className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Output: Quantified Loss (6 Cols) */}
        <div className="lg:col-span-6 bg-navy-850 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="p-5 bg-navy-800 border border-rose-500/40 rounded-2xl">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400">TOTAL ESTIMATED FINANCIAL LOSS</span>
            <h2 className="text-3xl font-extrabold font-mono text-rose-400 mt-1">
              ₹{totalEstimatedLoss.toLocaleString('en-IN')}
            </h2>
            <p className="text-xs text-slate-400 mt-1">Damaged: {lossData.damagedQuantity} / {lossData.totalQuantity} units ({((lossData.damagedQuantity/lossData.totalQuantity)*100).toFixed(1)}% of lot)</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between p-3 bg-navy-800 rounded-xl border border-slate-750">
              <span className="text-slate-300">Direct Commodity Write-off:</span>
              <span className="font-mono font-bold text-white">₹{estimatedProductLoss.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between p-3 bg-navy-800 rounded-xl border border-slate-750">
              <span className="text-slate-300">Packaging Loss:</span>
              <span className="font-mono font-bold text-white">₹{lossData.packagingLoss.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between p-3 bg-navy-800 rounded-xl border border-slate-750">
              <span className="text-slate-300">Unrecoverable Freight Write-off:</span>
              <span className="font-mono font-bold text-white">₹{lossData.transportWriteOff.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
