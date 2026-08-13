import React from 'react';
import { useAppData } from '../context/AppDataContext';
import { useAuth } from '../context/AuthContext';
import { MetricCard } from '../components/common/MetricCard';
import { RiskBadge } from '../components/common/RiskBadge';
import { ScoreMeter } from '../components/common/ScoreMeter';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { MapView } from '../components/map/MapView';
import {
  Boxes,
  IndianRupee,
  ShieldAlert,
  PiggyBank,
  ArrowUpRight,
  Ship,
  Plane,
  Train,
  Truck,
  Layers,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const { shipments, ports, alerts, setActiveTab } = useAppData();
  const { user } = useAuth();
  const role = user?.role || 'Merchant';

const dashboardConfig = {
  Merchant: {
    title: 'MERCHANT TRADE COMMAND CENTER',
    subtitle: 'Monitor suppliers, trade costs, shipments, and operational savings.',
    healthLabel: 'Merchant Trade Health'
  },

  Importer: {
    title: 'IMPORT OPERATIONS CENTER',
    subtitle: 'Monitor incoming shipments, customs exposure, supplier risk, and landed costs.',
    healthLabel: 'Import Health Score'
  },

  Exporter: {
    title: 'EXPORT OPERATIONS CENTER',
    subtitle: 'Monitor export consignments, routes, compliance, and destination risk.',
    healthLabel: 'Export Health Score'
  },

  'Logistics Manager': {
    title: 'LOGISTICS CONTROL TOWER',
    subtitle: 'Monitor multimodal routes, shipment movement, delays, and transport efficiency.',
    healthLabel: 'Logistics Health Score'
  },

  'Maritime Operator': {
    title: 'MARITIME OPERATIONS CENTER',
    subtitle: 'Monitor voyages, ports, vessel routes, congestion, and maritime risk.',
    healthLabel: 'Maritime Health Score'
  },

  Admin: {
    title: 'TRADE NAV AI ADMIN CENTER',
    subtitle: 'Monitor platform-wide trade operations, users, alerts, and system performance.',
    healthLabel: 'System Health Score'
  }
}[role];

  const dashboardMetrics = {
  Merchant: {
    shipments: '08',
    value: '₹24.6L',
    risk: '02',
    savings: '₹3.8L',
    shipmentSubtitle: 'Sea: 3 | Air: 2 | Multimodal: 2 | Rail: 1',
    valueSubtitle: 'Across 8 active global consignments',
    riskSubtitle: '2 shipments require attention',
    savingsSubtitle: 'Via AI route optimization'
  },

  Importer: {
    shipments: '05',
    value: '₹18.4L',
    risk: '03',
    savings: '₹2.6L',
    shipmentSubtitle: 'Incoming: 5 active consignments',
    valueSubtitle: 'Total inbound shipment value',
    riskSubtitle: 'Customs & supplier risks detected',
    savingsSubtitle: 'Potential landed-cost savings'
  },

  Exporter: {
    shipments: '06',
    value: '₹31.2L',
    risk: '01',
    savings: '₹4.2L',
    shipmentSubtitle: 'Export consignments in transit',
    valueSubtitle: 'Total outbound trade value',
    riskSubtitle: '1 destination risk flagged',
    savingsSubtitle: 'Via route optimization'
  },

  'Logistics Manager': {
    shipments: '12',
    value: '₹42.8L',
    risk: '04',
    savings: '₹5.1L',
    shipmentSubtitle: 'Across Sea, Air, Rail & Road',
    valueSubtitle: 'Managed logistics value',
    riskSubtitle: '4 logistics exceptions',
    savingsSubtitle: 'Via multimodal optimization'
  },

  'Maritime Operator': {
    shipments: '09',
    value: '₹36.5L',
    risk: '02',
    savings: '₹3.4L',
    shipmentSubtitle: 'Active maritime movements',
    valueSubtitle: 'Cargo under maritime operations',
    riskSubtitle: '2 voyage risks detected',
    savingsSubtitle: 'Via voyage optimization'
  },

  Admin: {
    shipments: '27',
    value: '₹1.24Cr',
    risk: '07',
    savings: '₹18.6L',
    shipmentSubtitle: 'Platform-wide active shipments',
    valueSubtitle: 'Total monitored trade value',
    riskSubtitle: '7 active platform alerts',
    savingsSubtitle: 'Estimated platform savings'
  }
}[role];

  // Mode Distribution Data for Chart
  const modeData = [
    { name: 'Sea 🚢', count: 3, color: '#06B6D4' },
    { name: 'Air ✈️', count: 2, color: '#3B82F6' },
    { name: 'Multimodal 🚢🚆🚛', count: 2, color: '#8B5CF6' },
    { name: 'Rail 🚆', count: 1, color: '#F59E0B' }
  ];

  // Cost Breakdown Data
  const costBreakdownData = [
    { category: 'Product', amount: 1840000 },
    { category: 'Freight', amount: 280000 },
    { category: 'Customs Duty', amount: 220000 },
    { category: 'Port & Inland', amount: 120000 }
  ];

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title={dashboardConfig.title}
        message={dashboardConfig.subtitle}
      />

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Shipments"
          value={dashboardMetrics.shipments}
          subtitle={dashboardMetrics.shipmentSubtitle}
          icon={<Boxes className="w-5 h-5" />}
          badgeText="Active"
          badgeType="safe"
        />
        <MetricCard
          title="Total Trade Value"
          value={dashboardMetrics.value}
          subtitle={dashboardMetrics.valueSubtitle}
          icon={<IndianRupee className="w-5 h-5" />}
          trend={{ value: '14%', positive: true }}
        />
        <MetricCard
          title="At-Risk Shipments"
          value={dashboardMetrics.risk}
          subtitle={dashboardMetrics.riskSubtitle}
          icon={<ShieldAlert className="w-5 h-5" />}
          badgeText="2 Flagged"
          badgeType="critical"
        />
        <MetricCard
          title="Expected Savings"
          value={dashboardMetrics.savings}
          subtitle={dashboardMetrics.savingsSubtitle}
          icon={<PiggyBank className="w-5 h-5" />}
          trend={{ value: '18%', positive: true }}
        />
      </div>

      {/* Main Map & Health Score Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Multimodal Map View */}
        <div className="lg:col-span-2 bg-navy-850 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <span>Global Multimodal Transit Map</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 radar-pulse" />
              </h3>
              <p className="text-xs text-slate-400">Live position telemetry across maritime sea lanes, air corridors, and rail routes</p>
            </div>
            <button
              onClick={() => setActiveTab('routes')}
              className="text-xs text-cyan-400 font-semibold hover:underline flex items-center space-x-1"
            >
              <span>Optimize Routes</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex-1 min-h-[340px]">
            <MapView shipments={shipments} ports={ports} height="h-full" />
          </div>
        </div>

        {/* Right 1 Col: Overall Trade Health Score & Overall Risk Badges */}
        <div className="bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              {dashboardConfig.healthLabel}
            </h3>
            <p className="text-xs text-slate-400">Composite index evaluating cost efficiency, timelines & supplier safety</p>
          </div>

          <div className="py-3 flex justify-center">
            <ScoreMeter score={86} label="Global Trade Health Score" size="lg" />
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Overall Cargo Risk</span>
              <RiskBadge risk="LOW" />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Customs Clearance Risk</span>
              <RiskBadge risk="MEDIUM" />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Port Congestion Exposure</span>
              <span className="text-amber-400 font-mono font-medium text-xs">Moderate (Kolkata Berth Queue)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Primary Shipment Card & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Shipment TRD10294 */}
        <div className="bg-navy-850 border border-cyan-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full pointer-events-none" />

          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/40">
                FEATURED SHIPMENT
              </span>
              <h3 className="text-lg font-bold text-white font-mono mt-1">TRD10294</h3>
            </div>
            <ScoreMeter score={86} size="sm" label="" />
          </div>

          <div className="mt-4 p-3 bg-navy-800 rounded-xl border border-slate-750 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Route:</span>
              <span className="font-bold text-slate-100">Shanghai → Mumbai → Pune</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Cargo:</span>
              <span className="font-medium text-slate-200">High-Precision Microcontrollers</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Transport Mode:</span>
              <span className="font-mono text-cyan-400 font-semibold">Sea + Rail + Road</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">ETA Arrival:</span>
              <span className="font-bold text-emerald-400">18 Aug 2026</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400">Cargo Risk:</span>
              <RiskBadge risk="LOW" size="sm" />
            </div>
            <button
              onClick={() => setActiveTab('tracking')}
              className="text-cyan-400 hover:underline font-semibold"
            >
              Track Live Timeline →
            </button>
          </div>
        </div>

        {/* Transport Mode Distribution Chart */}
        <div className="bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <h3 className="text-sm font-bold text-white mb-1">Transport Mode Distribution</h3>
          <p className="text-[11px] text-slate-400 mb-4">Modal share across active trade consignments</p>

          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={modeData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={65}
                  paddingAngle={4}
                >
                  {modeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#172033', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 text-[11px]">
            {modeData.map(m => (
              <div key={m.name} className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                <span className="text-slate-300 font-medium">{m.name}: {m.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trade Cost Breakdown Chart */}
        <div className="bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <h3 className="text-sm font-bold text-white mb-1">Active Cost Structure</h3>
          <p className="text-[11px] text-slate-400 mb-4">Aggregated landed cost distribution (₹)</p>

          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costBreakdownData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="category" type="category" stroke="#94A3B8" fontSize={10} width={80} />
                <Tooltip
                  formatter={(val: any) => [`₹${(Number(val)/100000).toFixed(1)}L`, 'Cost']}
                  contentStyle={{ backgroundColor: '#172033', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="amount" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-center mt-2">
            <button
              onClick={() => setActiveTab('landed-cost')}
              className="text-xs text-cyan-400 font-semibold hover:underline"
            >
              Open Full Landed Cost Calculator →
            </button>
          </div>
        </div>
      </div>

      {/* Recent Active Consignments Data Table */}
      <div className="bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white">Active International Consignments</h3>
            <p className="text-xs text-slate-400">Real-time status tracking for active shipments</p>
          </div>
          <button
            onClick={() => setActiveTab('tracking')}
            className="px-3 py-1.5 rounded-lg bg-navy-800 border border-slate-700 text-xs text-cyan-400 font-semibold hover:bg-navy-750"
          >
            View All Shipments
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-navy-800 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3 rounded-l-lg">Tracking #</th>
                <th className="p-3">Route (Origin → Destination)</th>
                <th className="p-3">Cargo Description</th>
                <th className="p-3">Mode</th>
                <th className="p-3">ETA</th>
                <th className="p-3">Health Score</th>
                <th className="p-3 rounded-r-lg text-right">Cargo Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {shipments.slice(0, 5).map(shp => (
                <tr key={shp.id} className="hover:bg-navy-800/50 transition-colors">
                  <td className="p-3 font-mono font-bold text-cyan-400">{shp.trackingNumber}</td>
                  <td className="p-3 font-medium text-white">{shp.originCity} → {shp.destinationCity}</td>
                  <td className="p-3 text-slate-300">{shp.cargoDescription}</td>
                  <td className="p-3 font-mono text-cyan-300">{shp.transportMode}</td>
                  <td className="p-3 text-emerald-400 font-semibold">{shp.eta}</td>
                  <td className="p-3 font-mono font-bold text-white">{shp.tradeHealthScore}/100</td>
                  <td className="p-3 text-right">
                    <RiskBadge risk={shp.cargoRisk} size="sm" />
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
