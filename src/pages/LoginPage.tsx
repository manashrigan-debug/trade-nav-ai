import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppDataContext';
import { UserRole } from '../types';
import { Shield, KeyRound, Mail, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { setActiveTab, addToast } = useAppData();
  const [email, setEmail] = useState('demo@tradenav.ai');
  const [password, setPassword] = useState('demo123');
  const [role, setRole] = useState<UserRole>('Merchant');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
    addToast('Authentication Successful', `Welcome back! Logged in as ${role}.`, 'success');
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-navy-850 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-mono font-black text-xl mx-auto shadow-lg shadow-cyan-500/20">
            TN
          </div>
          <h2 className="text-2xl font-bold text-white">Sign In to TRADE NAV AI</h2>
          <p className="text-xs text-slate-400">Access enterprise multimodal intelligence platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Select Operational Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full bg-navy-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-cyan-400 font-mono focus:border-cyan-500 outline-none"
            >
              <option value="Merchant">Merchant / Trader</option>
              <option value="Exporter">Exporter</option>
              <option value="Importer">Importer</option>
              <option value="Logistics Manager">Logistics Manager</option>
              <option value="Maritime Operator">Shipping / Maritime Operator</option>
              <option value="Admin">System Administrator</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-navy-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-navy-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:border-cyan-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center justify-center space-x-2 mt-4"
          >
            <span>Sign In to Platform</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-400">
            Don't have an account?{' '}
            <button onClick={() => setActiveTab('register')} className="text-cyan-400 font-semibold hover:underline">
              Register now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
