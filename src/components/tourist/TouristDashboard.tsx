import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SafetyScore from './SafetyScore';
import PanicButton from './PanicButton';
import GeoFencingAlerts from './GeoFencingAlerts';
import AIChatbot from './AIChatbot';
import LiveMap from '../common/LiveMap';
import { MapPin, Calendar, Phone, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

const TouristDashboard: React.FC = () => {
  const { user } = useAuth();
  const [safetyScore, setSafetyScore] = useState(8);
  const [showChatbot, setShowChatbot] = useState(false);

  // Mock tourist data
  const touristData = {
    kycStatus: 'verified',
    digitalId: 'DID-001-2024',
    destination: 'Goa, India',
    tripStartDate: '2024-01-15',
    tripEndDate: '2024-01-22',
    currentLocation: 'Calangute Beach, Goa',
    emergencyContactsCount: 3
  };

  const quickActions = [
    {
      title: 'Emergency Contacts',
      description: `${touristData.emergencyContactsCount} contacts`,
      icon: Phone,
      color: 'bg-green-50 text-green-600',
      action: () => {}
    },
    {
      title: 'Safety Guide',
      description: 'Tips and guidelines',
      icon: Shield,
      color: 'bg-blue-50 text-blue-600',
      action: () => {}
    },
    {
      title: 'AI Assistant',
      description: 'Get instant help',
      icon: AlertTriangle,
      color: 'bg-purple-50 text-purple-600',
      action: () => setShowChatbot(true)
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
            <p className="text-gray-600 mt-1">Stay safe and enjoy your trip to {touristData.destination}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center text-green-600 mb-1">
              <CheckCircle className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">KYC Verified</span>
            </div>
            <p className="text-xs text-gray-500">Digital ID: {touristData.digitalId}</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Trip Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-3">Current Trip</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Destination</p>
              <p className="font-medium text-gray-900">{touristData.destination}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="text-sm font-medium text-gray-900">{touristData.tripStartDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">End Date</p>
                <p className="text-sm font-medium text-gray-900">{touristData.tripEndDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Location */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-3">Location</h3>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Current Location</p>
            <p className="font-medium text-gray-900">{touristData.currentLocation}</p>
            <p className="text-xs text-green-600 mt-2">Safe Zone</p>
          </div>
        </div>

        {/* Safety Score */}
        <SafetyScore score={safetyScore} onScoreChange={setSafetyScore} />
      </div>

      {/* Trip Information Card */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Trip Information</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Edit Details
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Destination</p>
            <p className="font-semibold text-gray-900">New Delhi</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Start Date</p>
            <p className="font-semibold text-gray-900">1/15/2025</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Duration</p>
            <p className="font-semibold text-gray-900">5 days</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">End Date</p>
            <p className="font-semibold text-gray-900">1/20/2025</p>
          </div>
        </div>
      </div>

      {/* Live Location Map */}
      <LiveMap height="h-80" />

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-left"
              >
                <div className="flex items-center mb-2">
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-medium text-gray-900 ml-3">{action.title}</h4>
                </div>
                <p className="text-sm text-gray-600">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Alerts and Notifications */}
      <GeoFencingAlerts />

      {/* Panic Button */}
      <PanicButton />

      {/* AI Chatbot */}
      {showChatbot && (
        <AIChatbot onClose={() => setShowChatbot(false)} />
      )}
    </div>
  );
};

export default TouristDashboard;