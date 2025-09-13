import React from 'react';
import { MapPin, TrendingUp } from 'lucide-react';

const TopDestinations: React.FC = () => {
  const destinations = [
    { rank: 1, name: 'India Gate', tourists: 456, safety: 85, color: 'bg-yellow-500' },
    { rank: 2, name: 'Red Fort', tourists: 387, safety: 82, color: 'bg-gray-400' },
    { rank: 3, name: 'Qutub Minar', tourists: 298, safety: 79, color: 'bg-orange-500' },
    { rank: 4, name: 'Lotus Temple', tourists: 234, safety: 91, color: 'bg-blue-500' },
    { rank: 5, name: 'Humayuns Tomb', tourists: 189, safety: 88, color: 'bg-blue-600' }
  ];

  const getSafetyColor = (safety: number) => {
    if (safety >= 85) return 'bg-green-500';
    if (safety >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <MapPin className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Top Destinations</h3>
        </div>
      </div>

      <div className="space-y-4">
        {destinations.map((destination) => (
          <div key={destination.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 ${destination.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                {destination.rank}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{destination.name}</h4>
                <p className="text-sm text-gray-500">{destination.tourists} tourists</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium text-gray-900">Safety: {destination.safety}</span>
              </div>
              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getSafetyColor(destination.safety)} transition-all duration-300`}
                  style={{ width: `${destination.safety}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDestinations;