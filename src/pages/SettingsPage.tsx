import React from 'react';
import { useAuth } from '../context/AuthContext';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { Settings, User, Shield, KeyRound, Bell } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, setRole } = useAuth();

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title="USER PROFILE & SYSTEM PREFERENCES"
        message="Configure active operational persona, alert notifications, and AI model key parameters."
      />

      <div className="bg-navy-850 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 max-w-3xl">
        <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold font-mono text-xl flex items-center justify-center">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user?.name || 'Senior Trade Manager'}</h2>
            <p className="text-xs text-slate-400">{user?.email || 'demo@tradenav.ai'} | {user?.company || 'Global Trade Dynamics'}</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Operational Persona / Role</label>
            <select
              value={user?.role || 'Merchant'}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full sm:w-64 bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-cyan-400 font-mono font-bold focus:border-cyan-500 outline-none"
            >
              <option value="Merchant">Merchant / Trader</option>
              <option value="Exporter">Exporter</option>
              <option value="Importer">Importer</option>
              <option value="Logistics Manager">Logistics Manager</option>
              <option value="Maritime Operator">Shipping Operator</option>
              <option value="Admin">Administrator</option>
            </select>
          </div>

          <div className="p-4 bg-navy-800 rounded-xl border border-slate-750 space-y-2">
            <span className="text-slate-200 font-bold block">AI Service API Key Config</span>
            <p className="text-slate-400">System is currently running on built-in deterministic simulation engine. Enter AI API key in .env for live LLM mode.</p>
            <input
              type="password"
              disabled
              value="••••••••••••••••••••••••••••"
              className="w-full bg-navy-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-500 font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
