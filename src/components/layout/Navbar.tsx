import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { UserRole } from '../../types';
import { Menu, Bell, Search, LogOut, UserCheck, Shield, ChevronDown } from 'lucide-react';

export const Navbar: React.FC<{ onToggleSidebar: () => void }> = ({ onToggleSidebar }) => {
  const { user, logout, setRole } = useAuth();
  const { activeTab, setActiveTab, alerts } = useAppData();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const roles: UserRole[] = [
    'Merchant',
    'Exporter',
    'Importer',
    'Logistics Manager',
    'Maritime Operator',
    'Admin'
  ];

  const handleRoleSelect = (r: UserRole) => {
    setRole(r);
    setRoleDropdownOpen(false);
  };

  return (
    <header className="h-16 bg-navy-900 border-b border-slate-800 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-white border border-slate-700"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">
            {activeTab.replace('-', ' ')}
          </h1>
          <p className="text-[11px] text-slate-400 hidden sm:block">
            AI-Powered Multimodal Decision Support System
          </p>
        </div>
      </div>

      {/* Middle: Search */}
      <div className="hidden md:flex items-center flex-1 max-w-xs mx-6">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search shipments, HS codes, ports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-navy-800 border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Right Controls: Role Selector, Alerts, User Profile */}
      <div className="flex items-center space-x-3">
        {/* Role Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-navy-800 border border-slate-700 text-xs font-medium text-cyan-400 hover:bg-navy-750 transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-mono">{user?.role || 'Merchant'}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-navy-850 border border-slate-700 rounded-xl shadow-2xl z-50 py-1 text-xs">
              <div className="px-3 py-1.5 border-b border-slate-700 text-[10px] uppercase font-bold text-slate-400">
                Switch Operational Persona
              </div>
              {roles.map(r => (
                <button
                  key={r}
                  onClick={() => handleRoleSelect(r)}
                  className={`w-full text-left px-3 py-2 hover:bg-navy-750 flex items-center justify-between ${
                    user?.role === r ? 'text-cyan-400 font-bold bg-cyan-500/10' : 'text-slate-200'
                  }`}
                >
                  <span>{r}</span>
                  {user?.role === r && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Alerts Bell */}
        <div className="relative">
          <button
            onClick={() => setAlertsOpen(!alertsOpen)}
            className="p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-white border border-slate-700 relative"
          >
            <Bell className="w-4 h-4" />
            {alerts.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            )}
          </button>

          {alertsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-navy-850 border border-slate-700 rounded-xl shadow-2xl z-50 p-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-700 text-xs font-bold text-slate-200">
                <span>Active Risk Alerts</span>
                <button
                  onClick={() => {
                    setActiveTab('alerts');
                    setAlertsOpen(false);
                  }}
                  className="text-cyan-400 hover:underline text-[11px]"
                >
                  View All ({alerts.length})
                </button>
              </div>
              <div className="space-y-2 mt-2 max-h-64 overflow-y-auto">
                {alerts.slice(0, 3).map(alt => (
                  <div key={alt.id} className="p-2 bg-navy-800 rounded border border-slate-750 text-xs">
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        alt.severity === 'RED' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {alt.severity}
                      </span>
                      <span className="text-[10px] text-slate-400">{alt.timestamp}</span>
                    </div>
                    <p className="font-semibold text-slate-200 mt-1 text-[11px]">{alt.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar & Logout */}
        <button
          onClick={logout}
          title="Sign Out"
          className="p-2 rounded-lg bg-navy-800 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
