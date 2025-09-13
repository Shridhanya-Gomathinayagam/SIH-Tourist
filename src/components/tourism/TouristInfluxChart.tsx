import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';

const TouristInfluxChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'day' | 'week' | 'month'>('day');

  const chartData = {
    day: [
      { time: '12 AM', value: 45 },
      { time: '2 AM', value: 32 },
      { time: '4 AM', value: 28 },
      { time: '6 AM', value: 65 },
      { time: '8 AM', value: 89 },
      { time: '10 AM', value: 120 },
      { time: '12 PM', value: 145 },
      { time: '2 PM', value: 132 },
      { time: '4 PM', value: 156 },
      { time: '6 PM', value: 134 },
      { time: '8 PM', value: 98 },
      { time: '10 PM', value: 76 },
      { time: '12 AM', value: 54 }
    ]
  };

  const maxValue = Math.max(...chartData.day.map(d => d.value));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Tourist Influx Trend</h3>
        </div>
        
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {(['day', 'week', 'month'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 flex items-end space-x-2">
        {chartData.day.map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gray-100 rounded-t-sm relative" style={{ height: '200px' }}>
              <div
                className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm transition-all duration-500 absolute bottom-0"
                style={{ height: `${(data.value / maxValue) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">
              {data.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TouristInfluxChart;