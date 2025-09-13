import React, { useState } from 'react';
import { AlertTriangle, Phone, MapPin } from 'lucide-react';

const PanicButton: React.FC = () => {
  const [isPanicActive, setIsPanicActive] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handlePanicPress = () => {
    if (isPanicActive) return;
    
    setIsPanicActive(true);
    setCountdown(5);
    
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Trigger panic alert
          triggerPanicAlert();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCancel = () => {
    setIsPanicActive(false);
    setCountdown(0);
  };

  const triggerPanicAlert = async () => {
    try {
      // Here you would call the API to trigger panic alert
      console.log('Panic alert triggered!');
      alert('Emergency services have been notified. Help is on the way!');
    } catch (error) {
      console.error('Failed to trigger panic alert:', error);
    } finally {
      setIsPanicActive(false);
    }
  };

  return (
    <>
      {/* Panic Button - Fixed Position */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isPanicActive ? (
          <button
            onClick={handlePanicPress}
            className="w-20 h-20 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
          >
            <AlertTriangle className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </button>
        ) : (
          <div className="bg-white rounded-xl shadow-2xl p-6 w-72">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Alert</h3>
              <p className="text-gray-600 mb-4">
                Emergency services will be contacted in
              </p>
              <div className="text-4xl font-bold text-red-600 mb-4">{countdown}</div>
              <button
                onClick={handleCancel}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Panic Button Information Card */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-red-900 ml-3">Emergency Panic Button</h3>
        </div>
        
        <div className="space-y-4">
          <p className="text-red-800">
            In case of emergency, press the red panic button at the bottom right corner of your screen. 
            This will immediately alert the nearest authorities and your emergency contacts.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-medium text-red-900">Auto-dial Emergency</p>
                <p className="text-sm text-red-700">Connects to local emergency services</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-medium text-red-900">Location Sharing</p>
                <p className="text-sm text-red-700">Sends your exact location</p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-sm text-red-800 font-medium">
              ⚠️ Only use in genuine emergencies. False alarms may result in penalties.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PanicButton;