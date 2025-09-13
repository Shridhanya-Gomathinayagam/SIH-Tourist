import React, { useState } from 'react';
import { MapPin, Navigation, Users, AlertTriangle, Shield } from 'lucide-react';

interface MapProps {
  showControls?: boolean;
  height?: string;
  tourists?: any[];
  alerts?: any[];
}

const LiveMap: React.FC<MapProps> = ({ 
  showControls = true, 
  height = "h-96",
  tourists = [],
  alerts = []
}) => {
  const [activeLayer, setActiveLayer] = useState<'tourists' | 'alerts' | 'zones'>('tourists');

  const mapLayers = [
    { id: 'tourists', label: 'Tourists', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, color: 'bg-red-100 text-red-600' },
    { id: 'zones', label: 'Zones', icon: Shield, color: 'bg-green-100 text-green-600' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Live Location</h3>
          {showControls && (
            <div className="flex space-x-2">
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Navigation className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="relative">
        {/* Map Container */}
        <div className={`${height} bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden`}>
          {/* Mock Map Background */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 400 300">
              <path d="M50 150 Q200 50 350 150 T350 250" stroke="#cbd5e1" strokeWidth="2" fill="none" />
              <path d="M100 100 Q250 200 400 100" stroke="#cbd5e1" strokeWidth="1" fill="none" />
              <path d="M0 200 Q150 100 300 200" stroke="#cbd5e1" strokeWidth="1" fill="none" />
            </svg>
          </div>

          {/* Safety Zones */}
          <div className="absolute top-16 left-16">
            <div className="relative">
              {/* Safe Zone (Green) */}
              <div className="w-24 h-24 bg-green-200 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute inset-0 w-16 h-16 bg-green-300 rounded-full m-4 opacity-80"></div>
              <div className="absolute inset-0 w-8 h-8 bg-green-500 rounded-full m-8 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Moderate Zone (Yellow/Orange) */}
          <div className="absolute top-32 right-20">
            <div className="relative">
              <div className="w-20 h-20 bg-orange-200 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute inset-0 w-12 h-12 bg-orange-300 rounded-full m-4 opacity-80"></div>
              <div className="absolute inset-0 w-6 h-6 bg-orange-500 rounded-full m-7 flex items-center justify-center">
                <AlertTriangle className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          {/* Risk Zone (Red) */}
          <div className="absolute bottom-16 right-32">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          </div>

          {/* Current Location Marker */}
          <div className="absolute top-20 left-20">
            <div className="w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
          </div>
        </div>

        {/* Map Controls */}
        {showControls && (
          <div className="absolute top-4 right-4 space-y-2">
            {mapLayers.map((layer) => {
              const Icon = layer.icon;
              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id as any)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg shadow-sm transition-all ${
                    activeLayer === layer.id
                      ? layer.color
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{layer.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-sm p-4 min-w-32">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Safe (80+)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Moderate (60-79)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Risk (&lt;60)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;