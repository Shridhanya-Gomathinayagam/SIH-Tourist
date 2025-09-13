import React, { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, CheckCircle, X } from 'lucide-react';

interface GeoAlert {
  id: string;
  type: 'warning' | 'danger' | 'safe';
  title: string;
  message: string;
  location: string;
  timestamp: string;
}

const GeoFencingAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<GeoAlert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'High Tourist Activity Zone',
      message: 'You are entering a crowded area. Stay alert and keep your belongings secure.',
      location: 'Calangute Beach Main Area',
      timestamp: '2 minutes ago'
    },
    {
      id: '2',
      type: 'safe',
      title: 'Safe Zone Entered',
      message: 'You are now in a designated safe zone with good security coverage.',
      location: 'Tourist Information Center',
      timestamp: '15 minutes ago'
    }
  ]);

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'danger':
        return {
          container: 'bg-red-50 border-red-200',
          icon: 'text-red-600',
          title: 'text-red-900',
          message: 'text-red-700'
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 border-yellow-200',
          icon: 'text-yellow-600',
          title: 'text-yellow-900',
          message: 'text-yellow-700'
        };
      case 'safe':
        return {
          container: 'bg-green-50 border-green-200',
          icon: 'text-green-600',
          title: 'text-green-900',
          message: 'text-green-700'
        };
      default:
        return {
          container: 'bg-gray-50 border-gray-200',
          icon: 'text-gray-600',
          title: 'text-gray-900',
          message: 'text-gray-700'
        };
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'danger':
        return AlertTriangle;
      case 'warning':
        return AlertTriangle;
      case 'safe':
        return CheckCircle;
      default:
        return MapPin;
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-green-50 rounded-lg">
            <MapPin className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 ml-3">Location Alerts</h3>
        </div>
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="text-gray-600">All clear! No active alerts in your area.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <MapPin className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 ml-3">Location Alerts</h3>
        <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {alerts.length} Active
        </span>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => {
          const styles = getAlertStyles(alert.type);
          const Icon = getAlertIcon(alert.type);
          
          return (
            <div
              key={alert.id}
              className={`border rounded-lg p-4 ${styles.container} relative`}
            >
              <button
                onClick={() => dismissAlert(alert.id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="flex items-start space-x-3 pr-8">
                <div className={`p-1 ${styles.icon}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${styles.title} mb-1`}>
                    {alert.title}
                  </h4>
                  <p className={`text-sm ${styles.message} mb-2`}>
                    {alert.message}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {alert.location}
                    </span>
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Geo-fencing alerts help you stay aware of your surroundings. 
          Always follow local guidelines and trust your instincts.
        </p>
      </div>
    </div>
  );
};

export default GeoFencingAlerts;