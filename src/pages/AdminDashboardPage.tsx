import React from 'react';
import { useAppData } from '../context/AppDataContext';
import { MetricCard } from '../components/common/MetricCard';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { Shield, Users, Boxes, IndianRupee, Camera, FileText } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { shipments, suppliers, damageCases, alerts } = useAppData();

  const totalUsers = 3;
  const activeShipmentsCount = shipments.length;
  const totalValueINR = 2460000;
  const damageCount = damageCases.length;
  const claimsGeneratedCount = damageCases.filter(d => d.claimDraft).length;

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title="SYSTEM ADMINISTRATOR CONTROL PANEL"
        message="Provides global platform overview, registered user statistics, active trade volume, damage incident counts, and generated claims metrics."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard title="Total Registered Users" value={totalUsers} icon={<Users className="w-5 h-5" />} />
        <MetricCard title="Active Shipments" value={activeShipmentsCount} icon={<Boxes className="w-5 h-5" />} />
        <MetricCard title="Total Trade Value" value="₹24.6L" icon={<IndianRupee className="w-5 h-5" />} />
        <MetricCard title="Recorded Damage Cases" value={damageCount} icon={<Camera className="w-5 h-5" />} />
        <MetricCard title="Claims Generated" value={claimsGeneratedCount} icon={<FileText className="w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <h3 className="text-sm font-bold text-white mb-3">System Suppliers Overview</h3>
          <div className="space-y-2 text-xs">
            {suppliers.slice(0, 4).map(s => (
              <div key={s.id} className="p-3 bg-navy-800 rounded-xl border border-slate-750 flex justify-between items-center">
                <span className="font-bold text-white">{s.name}</span>
                <span className="font-mono text-cyan-400">{s.overallScore}/100</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <h3 className="text-sm font-bold text-white mb-3">System Health & Telemetry Status</h3>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="p-3 bg-navy-800 rounded-xl border border-slate-750 flex justify-between">
              <span>Database Connection:</span>
              <span className="font-mono text-emerald-400 font-bold">In-Memory / MongoDB Dual Mode OK</span>
            </div>
            <div className="p-3 bg-navy-800 rounded-xl border border-slate-750 flex justify-between">
              <span>AI Intelligence Service:</span>
              <span className="font-mono text-cyan-400 font-bold">Deterministic Simulation Engine Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
