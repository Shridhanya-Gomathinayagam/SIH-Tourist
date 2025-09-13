import React, { useState } from 'react';
import { Search, Filter, MapPin, Phone, Shield, AlertTriangle } from 'lucide-react';
import { Tourist } from '../../types';

interface TouristTableProps {
  tourists: Tourist[];
}

const TouristTable: React.FC<TouristTableProps> = ({ tourists }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'safe' | 'attention'>('all');

  const filteredTourists = tourists.filter(tourist => {
    const matchesSearch = 
      tourist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tourist.digitalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tourist.destination.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'all' || 
      (filterStatus === 'safe' && tourist.safetyScore >= 7) ||
      (filterStatus === 'attention' && tourist.safetyScore < 7);

    return matchesSearch && matchesFilter;
  });

  const getSafetyScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getKYCStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Tourist Monitoring</h2>
              <p className="text-sm text-gray-600">{filteredTourists.length} tourists in your jurisdiction</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, Digital ID, or destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Tourists</option>
            <option value="safe">Safe (7-10)</option>
            <option value="attention">Needs Attention (&lt;7)</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tourist Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trip Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Safety Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTourists.map((tourist) => (
              <tr key={tourist.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-700">
                        {tourist.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{tourist.name}</div>
                      <div className="text-sm text-gray-500">{tourist.digitalId}</div>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getKYCStatusColor(tourist.kycStatus)}`}>
                        {tourist.kycStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{tourist.destination}</div>
                  <div className="text-sm text-gray-500">
                    {tourist.tripStartDate} - {tourist.tripEndDate}
                  </div>
                  <div className="text-xs text-gray-500">{tourist.transportMode}</div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getSafetyScoreColor(tourist.safetyScore)}`}>
                      {tourist.safetyScore}/10
                    </span>
                    {tourist.safetyScore < 5 && (
                      <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />
                    )}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="truncate max-w-32">{tourist.currentLocation.address}</span>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 transition-colors">
                    <MapPin className="w-4 h-4" />
                  </button>
                  <button className="text-green-600 hover:text-green-900 transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="text-purple-600 hover:text-purple-900 transition-colors">
                    <Shield className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredTourists.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No tourists found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default TouristTable;