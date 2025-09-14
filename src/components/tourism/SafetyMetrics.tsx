import React from 'react';
import { Shield, BarChart3 } from 'lucide-react';

const SafetyMetrics: React.FC = () => {
  const metrics = [
    {
      title: 'Low Risk',
      value: 968,
      color: 'bg-green-100 text-green-600',
      iconBg: 'bg-green-50'
    },
    {
      title: 'Medium Risk',
      value: 234,
      color: 'bg-yellow-100 text-yellow-600',
      iconBg: 'bg-yellow-50'
    },
    {
      title: 'High Risk',
      value: 45,
      color: 'bg-red-100 text-red-600',
      iconBg: 'bg-red-50'
    },
    {
      title: 'Average Score',
      value: 78,
      color: 'bg-blue-100 text-blue-600',
      iconBg: 'bg-blue-50'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-gray-50 rounded-lg">
          <Shield className="w-6 h-6 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 ml-3">Safety Metrics Overview</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center">
            <div className={`w-16 h-16 rounded-full ${metric.iconBg} flex items-center justify-center mx-auto mb-3`}>
              {metric.title === 'Average Score' ? (
                <BarChart3 className={`w-8 h-8 ${metric.color.split(' ')[1]}`} />
              ) : (
                <Shield className={`w-8 h-8 ${metric.color.split(' ')[1]}`} />
              )}
            </div>
            <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
            <p className={`text-2xl font-bold ${metric.color.split(' ')[1]}`}>
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafetyMetrics;