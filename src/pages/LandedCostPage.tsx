import React, { useState } from 'react';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { Calculator, IndianRupee, PieChart as PieIcon, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export const LandedCostPage: React.FC = () => {
  const [inputs, setInputs] = useState({
    productCost: 1000000,
    freight: 80000,
    insurance: 15000,
    customsDuty: 120000,
    taxes: 0,
    portHandling: 35000,
    storage: 0,
    inlandTransport: 30000,
    documentation: 0,
    quantity: 1000
  });

  const totalLandedCost =
    inputs.productCost +
    inputs.freight +
    inputs.insurance +
    inputs.customsDuty +
    inputs.taxes +
    inputs.portHandling +
    inputs.storage +
    inputs.inlandTransport +
    inputs.documentation;

  const costPerUnit = Math.round(totalLandedCost / (inputs.quantity || 1));

  const chartData = [
    { name: 'Product Cost', value: inputs.productCost, color: '#3B82F6' },
    { name: 'Freight', value: inputs.freight, color: '#06B6D4' },
    { name: 'Customs Duty', value: inputs.customsDuty, color: '#8B5CF6' },
    { name: 'Port Handling', value: inputs.portHandling, color: '#F59E0B' },
    { name: 'Inland Transport', value: inputs.inlandTransport, color: '#10B981' },
    { name: 'Insurance', value: inputs.insurance, color: '#EC4899' }
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title="LANDED COST FINANCIAL ENGINE"
        message="Computes cumulative true landed costs across product procurement, ocean/air freight, duty tariffs, port terminal handling, and inland trucking charges."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Form Column (6 Cols) */}
        <div className="lg:col-span-6 bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-slate-800">
            <Calculator className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Cost Parameter Inputs (₹)</h3>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Product Cost (FOB)</label>
              <input
                type="number"
                value={inputs.productCost}
                onChange={(e) => setInputs({ ...inputs, productCost: Number(e.target.value) })}
                className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Freight Charges</label>
              <input
                type="number"
                value={inputs.freight}
                onChange={(e) => setInputs({ ...inputs, freight: Number(e.target.value) })}
                className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Customs Duty</label>
              <input
                type="number"
                value={inputs.customsDuty}
                onChange={(e) => setInputs({ ...inputs, customsDuty: Number(e.target.value) })}
                className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Port Handling</label>
              <input
                type="number"
                value={inputs.portHandling}
                onChange={(e) => setInputs({ ...inputs, portHandling: Number(e.target.value) })}
                className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Inland Transport</label>
              <input
                type="number"
                value={inputs.inlandTransport}
                onChange={(e) => setInputs({ ...inputs, inlandTransport: Number(e.target.value) })}
                className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Cargo Insurance</label>
              <input
                type="number"
                value={inputs.insurance}
                onChange={(e) => setInputs({ ...inputs, insurance: Number(e.target.value) })}
                className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Consignment Quantity</label>
              <input
                type="number"
                value={inputs.quantity}
                onChange={(e) => setInputs({ ...inputs, quantity: Number(e.target.value) })}
                className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Results & Interactive Chart Column (6 Cols) */}
        <div className="lg:col-span-6 bg-navy-850 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="p-5 bg-gradient-to-r from-navy-800 to-navy-750 border border-cyan-500/40 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">TOTAL LANDED COST</span>
              <h2 className="text-3xl font-extrabold font-mono text-emerald-400 mt-1">
                ₹{totalLandedCost.toLocaleString('en-IN')}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">COST PER UNIT</span>
              <h3 className="text-2xl font-bold font-mono text-white mt-1">
                ₹{costPerUnit.toLocaleString('en-IN')}
              </h3>
            </div>
          </div>

          {/* Pie Chart Visual Breakdown */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Cost Element Distribution</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Amount']}
                    contentStyle={{ backgroundColor: '#172033', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', color: '#94A3B8' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
