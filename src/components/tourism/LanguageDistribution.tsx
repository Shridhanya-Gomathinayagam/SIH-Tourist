import React from 'react';
import { Globe } from 'lucide-react';

const LanguageDistribution: React.FC = () => {
  const languageData = [
    { language: 'English', count: 6234, percentage: 39.3, color: 'bg-blue-500' },
    { language: 'Hindi', count: 3456, percentage: 21.8, color: 'bg-blue-600' },
    { language: 'Tamil', count: 2134, percentage: 13.5, color: 'bg-blue-700' },
    { language: 'Telugu', count: 1567, percentage: 9.9, color: 'bg-blue-800' },
    { language: 'Others', count: 2456, percentage: 15.5, color: 'bg-blue-900' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Globe className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 ml-3">Language Distribution</h3>
      </div>

      <div className="space-y-4">
        {languageData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
              <span className="text-sm font-medium text-gray-900">{item.language}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{item.count.toLocaleString()}</span>
              <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageDistribution;