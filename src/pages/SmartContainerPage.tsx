import React, { useState } from 'react';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { Cpu, Thermometer, Droplets, Zap, RotateCcw, Lock, AlertTriangle, Radio } from 'lucide-react';

export const SmartContainerPage: React.FC = () => {
  const [selectedContainer, setSelectedContainer] = useState('MSCU1234567');

  const containers = [
    {
      id: 'MSCU1234567',
      shipmentId: 'TRD10294',
      cargo: 'Microcontrollers & Display Panels',
      route: 'Shanghai → Mumbai → Pune',
      temp: 22.4,
      humidity: 54,
      shock: 0.2,
      tilt: 1.1,
      doorOpen: false,
      status: 'NORMAL',
      lastUpdated: '10 mins ago'
    },
    {
      id: 'COSCO-88123',
      shipmentId: 'TRD10298',
      cargo: 'ABS Plastic Enclosures',
      route: 'Guangzhou → Mundra',
      temp: 31.8,
      humidity: 88, // EXCEEDED THRESHOLD
      shock: 0.8,
      tilt: 3.5,
      doorOpen: false,
      status: 'HUMIDITY ALERT',
      lastUpdated: '1 min ago'
    },
    {
      id: 'HAPAG-44321',
      shipmentId: 'TRD10296',
      cargo: 'Hydraulic Pumps & Valves',
      route: 'Hamburg → Chennai',
      temp: 24.1,
      humidity: 61,
      shock: 0.4,
      tilt: 2.0,
      doorOpen: false,
      status: 'NORMAL',
      lastUpdated: '25 mins ago'
    }
  ];

  const current = containers.find(c => c.id === selectedContainer) || containers[0];

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title="SIMULATED IOT TELEMETRY SENSOR DASHBOARD"
        message="Displays real-time container IoT sensor metrics including internal temperature (°C), relative humidity (%), impact shock (g-force), tilt pitch, and door seal integrity."
        type="demo"
      />

      {/* Container Selection Bar */}
      <div className="bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <span>Active IoT Telemetry Stream</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 radar-pulse" />
            </h3>
            <p className="text-xs text-slate-400">Select container tag for live sensor stream telemetry</p>
          </div>
        </div>

        <div className="flex gap-2">
          {containers.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedContainer(c.id)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                selectedContainer === c.id
                  ? 'bg-cyan-500 text-navy-950 border-cyan-400 shadow-md'
                  : 'bg-navy-800 text-slate-300 border-slate-700 hover:bg-navy-750'
              }`}
            >
              {c.id}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Telemetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Temp */}
        <div className="bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>TEMPERATURE</span>
            <Thermometer className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold font-mono text-white">{current.temp}°C</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Optimal
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Target Range: 15°C — 28°C</p>
        </div>

        {/* Humidity */}
        <div className={`bg-navy-850 border rounded-2xl p-5 shadow-xl ${
          current.humidity > 80 ? 'border-rose-500 ring-1 ring-rose-500/40' : 'border-slate-800'
        }`}>
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>RELATIVE HUMIDITY</span>
            <Droplets className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold font-mono text-white">{current.humidity}%</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${
              current.humidity > 80 ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            }`}>
              {current.humidity > 80 ? 'THRES. EXCEEDED' : 'Normal'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Max Threshold: 75% RH</p>
        </div>

        {/* Shock */}
        <div className="bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>IMPACT SHOCK (G-FORCE)</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold font-mono text-white">{current.shock}g</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Low Wave Shock
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Max Threshold: 2.5g</p>
        </div>

        {/* Door Status */}
        <div className="bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>DOOR SEAL INTEGRITY</span>
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold font-mono text-emerald-400">LOCKED</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Sealed
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Sensor Battery: 94%</p>
        </div>
      </div>

      {/* Container Details & Simulated Alert Banner */}
      <div className="bg-navy-850 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">CONTAINER TAG: {current.id}</span>
            <h3 className="text-lg font-bold text-white mt-0.5">{current.cargo}</h3>
            <p className="text-xs text-slate-400 mt-0.5">Route: {current.route} | Last Telemetry Ping: {current.lastUpdated}</p>
          </div>
        </div>

        {current.humidity > 80 && (
          <div className="p-4 bg-rose-500/15 border border-rose-500/40 rounded-xl flex items-start space-x-3 text-xs text-rose-200">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold text-white block uppercase tracking-wider text-[11px]">
                TELEMETRY WARNING: RELATIVE HUMIDITY EXCEEDED ({current.humidity}%)
              </span>
              <p className="text-rose-200 mt-1">
                Relative humidity inside container {current.id} hit 88% during passage through Malacca Strait. Desiccant saturation risk detected. Contact carrier agent at port berth for inspection.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
