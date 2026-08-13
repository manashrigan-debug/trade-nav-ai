import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { IShipment, IPort } from '../../types';

// Fix Leaflet Default Icon Assets
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

interface Props {
  shipments?: IShipment[];
  ports?: IPort[];
  selectedShipmentId?: string;
  onSelectShipment?: (shipment: IShipment) => void;
  height?: string;
}

export const MapView: React.FC<Props> = ({
  shipments = [],
  ports = [],
  selectedShipmentId,
  onSelectShipment,
  height = 'h-96'
}) => {
  // Center near Arabian Sea / South Asia hub
  const defaultCenter: [number, number] = [19.0760, 72.8777];

  const modeColors: Record<string, string> = {
    Sea: '#06B6D4',       // Cyan
    Air: '#3B82F6',       // Blue
    Rail: '#F59E0B',      // Amber
    Road: '#10B981',      // Emerald
    Multimodal: '#8B5CF6' // Purple
  };

  return (
    <div className={`w-full ${height} rounded-xl overflow-hidden border border-slate-800 relative z-0`}>
      <MapContainer
        center={defaultCenter}
        zoom={4}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        {/* Dark Matter Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Draw Shipment Routes */}
        {shipments.map(shp => {
          if (!shp.waypoints || shp.waypoints.length < 2) return null;
          const positions: [number, number][] = shp.waypoints.map(w => w.location);
          const color = modeColors[shp.transportMode] || '#06B6D4';
          const isSelected = selectedShipmentId === shp.id;

          return (
            <React.Fragment key={shp.id}>
              <Polyline
                positions={positions}
                pathOptions={{
                  color,
                  weight: isSelected ? 4 : 2.5,
                  dashArray: shp.transportMode === 'Air' ? '6, 6' : undefined,
                  opacity: isSelected ? 1.0 : 0.75
                }}
              />
              {shp.waypoints.map((wp, idx) => (
                <Marker
                  key={`${shp.id}-wp-${idx}`}
                  position={wp.location}
                  eventHandlers={{
                    click: () => onSelectShipment && onSelectShipment(shp)
                  }}
                >
                  <Popup>
                    <div className="p-1 max-w-xs font-sans text-xs">
                      <div className="font-bold text-cyan-400 text-sm flex items-center justify-between">
                        <span>{shp.trackingNumber}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                          {shp.transportMode}
                        </span>
                      </div>
                      <p className="text-slate-200 font-medium mt-1">{wp.name}</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">{shp.cargoDescription}</p>
                      <div className="mt-2 pt-2 border-t border-slate-700 flex justify-between text-[11px]">
                        <span className="text-slate-400">ETA: <strong className="text-slate-200">{shp.eta}</strong></span>
                        <span className="text-emerald-400 font-bold">Health: {shp.tradeHealthScore}/100</span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </React.Fragment>
          );
        })}

        {/* Draw Port Markers */}
        {ports.map(port => (
          <Marker key={port.id} position={port.coordinates}>
            <Popup>
              <div className="p-1 font-sans text-xs">
                <div className="font-bold text-slate-100 flex items-center justify-between">
                  <span>⚓ {port.name}</span>
                  <span className="text-[10px] text-cyan-400 font-mono">[{port.code}]</span>
                </div>
                <p className="text-slate-300 mt-1">Congestion: <strong className={port.congestionLevel === 'HIGH' ? 'text-rose-400' : 'text-emerald-400'}>{port.congestionLevel}</strong></p>
                <p className="text-slate-400 text-[11px]">Berth Waiting Time: {port.waitingTimeHours} hrs</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
