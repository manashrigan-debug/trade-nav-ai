import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { RiskBadge } from '../components/common/RiskBadge';
import { MapView } from '../components/map/MapView';
import { MapPin, CheckCircle2, Clock, Truck, Ship, Plane, Train, ArrowRight } from 'lucide-react';

export const ShipmentTrackingPage: React.FC = () => {
  const { shipments, ports } = useAppData();
  const [selectedId, setSelectedId] = useState(shipments[0]?.id || 'shp-10294');

  const selected = shipments.find(s => s.id === selectedId) || shipments[0];

  const timelineSteps = [
    { name: 'Supplier Facility', status: 'completed' },
    { name: 'Origin Warehouse', status: 'completed' },
    { name: 'Origin Terminal Port', status: 'completed' },
    { name: `${selected.transportMode} Carriage`, status: 'current' },
    { name: 'Destination Terminal', status: 'pending' },
    { name: 'Customs Clearance', status: 'pending' },
    { name: 'Final Delivery ICD', status: 'pending' }
  ];

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title="MULTIMODAL CONSIGNMENT TRACKING TELEMETRY"
        message="Tracks live container positions, waypoints, transport legs, ETA predictions, and trade health scores across sea vessels, air freighters, rail corridors, and road trucking."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Shipment List (4 Cols) */}
        <div className="lg:col-span-4 bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Select Active Shipment</h3>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {shipments.map(shp => (
              <div
                key={shp.id}
                onClick={() => setSelectedId(shp.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedId === shp.id
                    ? 'bg-navy-800 border-cyan-500 ring-1 ring-cyan-500/40 shadow-md'
                    : 'bg-navy-800/50 border-slate-750 hover:bg-navy-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-cyan-400 text-xs">{shp.trackingNumber}</span>
                  <RiskBadge risk={shp.cargoRisk} size="sm" />
                </div>

                <p className="font-bold text-white text-xs mt-1">{shp.originCity} → {shp.destinationCity}</p>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">{shp.cargoDescription}</p>

                <div className="mt-2 pt-2 border-t border-slate-750/80 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-cyan-300 font-medium">{shp.transportMode}</span>
                  <span className="text-emerald-400 font-semibold">ETA: {shp.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Tracking Details & Visual Timeline (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Selected Header */}
          <div className="bg-navy-850 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-500/40">
                  LIVE CONSIGNMENT TELEMETRY
                </span>
                <h2 className="text-2xl font-extrabold font-mono text-white mt-1">{selected.trackingNumber}</h2>
                <p className="text-xs text-slate-300 font-medium mt-1">{selected.originCity} ({selected.originCountry}) → {selected.destinationCity} ({selected.destinationCountry})</p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block font-medium">Estimated Arrival</span>
                <span className="text-xl font-extrabold font-mono text-emerald-400">{selected.eta}</span>
              </div>
            </div>

            {/* Visual Shipment Timeline Flow */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">Consignment Transit Timeline</h4>

              <div className="grid grid-cols-1 sm:grid-cols-7 gap-2 text-center relative">
                {timelineSteps.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-md mb-2 ${
                      step.status === 'completed'
                        ? 'bg-emerald-500 text-navy-950 font-bold'
                        : step.status === 'current'
                        ? 'bg-cyan-500 text-navy-950 font-bold radar-pulse'
                        : 'bg-navy-800 text-slate-500 border border-slate-700'
                    }`}>
                      {step.status === 'completed' ? '✓' : idx + 1}
                    </div>
                    <span className={`text-[10px] font-semibold leading-tight ${
                      step.status === 'current' ? 'text-cyan-400 font-bold' : step.status === 'completed' ? 'text-slate-200' : 'text-slate-500'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Map View */}
            <div className="pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Live Map Telemetry Route</h4>
              <div className="h-64">
                <MapView shipments={[selected]} ports={ports} selectedShipmentId={selected.id} height="h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
