import React from 'react';
import { useAppData } from '../context/AppDataContext';
import {
  Ship,
  Plane,
  Train,
  Truck,
  ArrowRight,
  ShieldCheck,
  Compass,
  Users,
  FileCheck2,
  GitFork,
  Navigation,
  Camera,
  FileText,
  CheckCircle2,
  Boxes
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab } = useAppData();

  const features = [
    {
      title: 'AI Supplier Selection',
      description: 'Dynamic weighted scoring analyzing reliability, historical delays, prices, and geopolitical risk metrics.',
      icon: <Users className="w-6 h-6 text-cyan-400" />,
      tab: 'suppliers'
    },
    {
      title: 'Customs Intelligence',
      description: 'Instant 4-digit/6-digit HS classification with duty, tax estimates, and automated document checklist verification.',
      icon: <FileCheck2 className="w-6 h-6 text-blue-400" />,
      tab: 'customs'
    },
    {
      title: 'Multimodal Optimization',
      description: 'Compare Sea, Air, Rail, and Road combinations for minimum cost, transit time, carbon emissions, and safety.',
      icon: <GitFork className="w-6 h-6 text-amber-400" />,
      tab: 'routes'
    },
    {
      title: 'Maritime Decision Support',
      description: 'Simulate speed adjustments, port diversions, and route alterations against bunker fuel and expected cargo loss formulas.',
      icon: <Navigation className="w-6 h-6 text-emerald-400" />,
      tab: 'voyage'
    },
    {
      title: 'Cargo Risk Prediction',
      description: 'CargoGuard AI evaluates packaging, temperature, humidity, and wave shocks to prevent damage before occurrence.',
      icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
      tab: 'cargoguard'
    },
    {
      title: 'AI Damage Detection',
      description: 'Upload container photos to detect water damage, denting, rust, or leaks with automated severity assessment.',
      icon: <Camera className="w-6 h-6 text-rose-400" />,
      tab: 'damage-detect'
    },
    {
      title: 'Automated Complaint Generation',
      description: 'Instantly convert damaged shipment reports into formal, legally structured claims for carriers and insurers.',
      icon: <FileText className="w-6 h-6 text-cyan-400" />,
      tab: 'claim-generator'
    }
  ];

  return (
    <div className="min-h-screen bg-navy-900 text-slate-100 flex flex-col justify-between font-sans">
      {/* Top Header */}
      <header className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-mono font-black shadow-lg shadow-cyan-500/20">
            TN
          </div>
          <div>
            <span className="font-extrabold tracking-wide text-base text-white">TRADE NAV AI</span>
            <span className="ml-2 text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">v1.0 MVP</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-200 border border-slate-700 transition-colors"
          >
            Open Dashboard
          </button>
          <button
            onClick={() => setActiveTab('planner')}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/20"
          >
            Start Planning
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium">
            <Boxes className="w-3.5 h-3.5" />
            <span>Multimodal Intelligence Platform for Sea 🚢 Air ✈️ Rail 🚆 Road 🚛</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            TRADE NAV AI
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 text-3xl sm:text-5xl mt-2 font-bold">
              "From Trade Planning to Cargo Recovery"
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            An intelligent platform for importers, exporters, and logistics operators to plan, optimize, monitor, and protect international shipments across sea, air, rail, and road.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('planner')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 hover:scale-[1.02] transition-transform flex items-center justify-center space-x-2"
            >
              <span>Start Planning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('features');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-navy-800 text-slate-200 hover:text-white border border-slate-700 font-semibold text-sm hover:bg-navy-750 transition-colors"
            >
              Explore Features
            </button>
          </div>
        </div>

        {/* Interactive Supply Chain Flow Diagram */}
        <div className="mt-16 bg-navy-850/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 text-center mb-6">
            INTELLIGENT END-TO-END MULTIMODAL FLOW
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-center relative">
            <div className="p-4 rounded-xl bg-navy-800 border border-slate-750 flex flex-col items-center">
              <Users className="w-6 h-6 text-slate-300 mb-2" />
              <span className="font-bold text-xs text-white">1. Supplier</span>
              <span className="text-[10px] text-slate-400 mt-1">Shenzhen / Shanghai</span>
            </div>

            <div className="p-4 rounded-xl bg-navy-800 border border-slate-750 flex flex-col items-center">
              <Boxes className="w-6 h-6 text-slate-300 mb-2" />
              <span className="font-bold text-xs text-white">2. Origin</span>
              <span className="text-[10px] text-slate-400 mt-1">Export Terminal</span>
            </div>

            <div className="p-4 rounded-xl bg-navy-800 border border-cyan-500/40 flex flex-col items-center shadow-lg shadow-cyan-500/10">
              <div className="flex space-x-1 mb-2 text-cyan-400">
                <Ship className="w-4 h-4" />
                <Plane className="w-4 h-4" />
                <Train className="w-4 h-4" />
                <Truck className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs text-cyan-300">3. Multimodal</span>
              <span className="text-[10px] text-cyan-400 mt-1">Sea / Air / Rail / Road</span>
            </div>

            <div className="p-4 rounded-xl bg-navy-800 border border-slate-750 flex flex-col items-center">
              <CheckCircle2 className="w-6 h-6 text-slate-300 mb-2" />
              <span className="font-bold text-xs text-white">4. Port / Terminal</span>
              <span className="text-[10px] text-slate-400 mt-1">Customs Clearance</span>
            </div>

            <div className="p-4 rounded-xl bg-navy-800 border border-slate-750 flex flex-col items-center">
              <Truck className="w-6 h-6 text-slate-300 mb-2" />
              <span className="font-bold text-xs text-white">5. Destination</span>
              <span className="text-[10px] text-slate-400 mt-1">Inland ICD Hub</span>
            </div>

            <div className="p-4 rounded-xl bg-navy-800 border border-emerald-500/40 flex flex-col items-center">
              <ShieldCheck className="w-6 h-6 text-emerald-400 mb-2" />
              <span className="font-bold text-xs text-emerald-300">6. Customer</span>
              <span className="text-[10px] text-slate-400 mt-1">Verified Delivery</span>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div id="features" className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Comprehensive Intelligence Suite</h2>
            <p className="text-slate-400 text-sm mt-1">Designed for Merchants, Importers, Exporters, Logistics Managers, and Maritime Master Operators</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <div
                key={idx}
                onClick={() => setActiveTab(feat.tab)}
                className="bg-navy-800/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:-translate-y-1 group"
              >
                <div className="p-3 rounded-xl bg-navy-750 w-fit mb-4 border border-slate-700/60 group-hover:border-cyan-500/40 transition-colors">
                  {feat.icon}
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-2">{feat.description}</p>
                <div className="mt-4 flex items-center text-xs font-semibold text-cyan-400 group-hover:underline">
                  <span>Explore Feature</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© 2026 TRADE NAV AI — AI-Powered Multimodal Trade & Logistics Intelligence Platform.</p>
        <p className="mt-1 text-[11px] text-slate-600">Simulated decision support MVP platform. Not a certified SOLAS navigation system.</p>
      </footer>
    </div>
  );
};
