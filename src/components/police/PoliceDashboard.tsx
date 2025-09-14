import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AlertPanel from './AlertPanel';
import TouristTable from './TouristTable';
import AlertDetailsModal from './AlertDetailsModal';
import LiveMap from '../common/LiveMap';
import { Shield, Users, AlertTriangle, MapPin, TrendingUp } from 'lucide-react';
import { fetchTourists, fetchAlerts } from '../../utils/api';
import { Tourist, Alert } from '../../types';

const PoliceDashboard: React.FC = () => {
  const { user } = useAuth();
  const [tourists, setTourists] = useState<Tourist[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [touristData, alertData] = await Promise.all([
          fetchTourists(),
          fetchAlerts()
        ]);
        setTourists(touristData);
        setAlerts(alertData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
  };

  const handleCallTourist = () => {
    console.log('Calling tourist...');
    setSelectedAlert(null);
  };

  const handleAssignOfficer = () => {
    console.log('Assigning officer...');
    setSelectedAlert(null);
  };

  const handleGenerateReport = () => {
    console.log('Generating E-FIR...');
    setSelectedAlert(null);
  };

  const stats = [
    {
      title: 'Active Tourists',
      value: '1247',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Currently active'
    },
    {
      title: 'Active Alerts',
      value: '1',
      change: '-5%',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Needs attention'
    },
    {
      title: 'In Progress',
      value: '1',
      change: '0%',
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Being handled'
    },
    {
      title: 'Resolved Today',
      value: '1',
      change: '+2%',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Completed'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Police Control Room</h1>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last updated: 10:12:25 AM</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-sm text-gray-500">{stat.title}</span>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                {stat.description && (
                  <p className="text-sm text-gray-500">{stat.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Alerts</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Critical Alert */}
              <div 
                className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg cursor-pointer hover:bg-red-100 transition-colors"
                onClick={() => handleAlertClick(alerts[0])}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                        CRITICAL
                      </span>
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                        OPEN
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">John Doe</h3>
                    <p className="text-sm text-gray-700 mb-2">Emergency panic button activated</p>
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        India Gate, New Delhi
                      </span>
                      <span>8:00:00 PM</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">
                      Call
                    </button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
                      Assign Officer
                    </button>
                  </div>
                </div>
              </div>

              {/* High Priority Alert */}
              <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                        HIGH
                      </span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        IN PROGRESS
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Jane Smith</h3>
                    <p className="text-sm text-gray-700 mb-2">Unusual movement pattern detected</p>
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        Red Fort, Delhi
                      </span>
                      <span>7:45:00 PM</span>
                      <span className="text-blue-600">Officer Kumar</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resolved Alert */}
              <div className="border-l-4 border-gray-300 bg-gray-50 p-4 rounded-r-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                        MEDIUM
                      </span>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                        RESOLVED
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Mike Johnson</h3>
                    <p className="text-sm text-gray-700 mb-2">Safety score dropped below threshold</p>
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        Chandni Chowk, Delhi
                      </span>
                      <span>7:15:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Tourist Map */}
        <div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Live Tourist Map</h2>
            </div>
            <LiveMap height="h-96" showControls={true} />
          </div>
        </div>
      </div>

      {/* Alert Details Modal */}
      {selectedAlert && (
        <AlertDetailsModal
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
          onCallTourist={handleCallTourist}
          onAssignOfficer={handleAssignOfficer}
          onGenerateReport={handleGenerateReport}
        />
      )}

      {/* Legacy sections - keeping for backward compatibility */}
      <div className="hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 
                  stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">from last week</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alerts Panel */}
      <AlertPanel alerts={alerts} />

      {/* Tourist Monitoring Table */}
      <TouristTable tourists={tourists} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-3">Live Map View</h3>
          </div>
          <p className="text-gray-600 text-sm">View real-time tourist locations and incidents on map</p>
        </button>

        <button className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-3">SOP Workflow</h3>
          </div>
          <p className="text-gray-600 text-sm">Access emergency response procedures and workflows</p>
        </button>

        <button className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-3">Evidence Management</h3>
          </div>
          <p className="text-gray-600 text-sm">Manage incident reports, photos, and evidence</p>
        </button>
      </div>
    </div>
  );
};

export default PoliceDashboard;