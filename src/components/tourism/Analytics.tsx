import React from 'react';
import { BarChart3, TrendingUp, Users, AlertTriangle } from 'lucide-react';
import { TripStatistic } from '../../types';

interface AnalyticsProps {
  statistics: TripStatistic | null;
}

const Analytics: React.FC<AnalyticsProps> = ({ statistics }) => {
  if (!statistics) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  // Mock additional analytics data
  const monthlyData = [
    { month: 'Jan', tourists: 980, incidents: 12 },
    { month: 'Feb', tourists: 1120, incidents: 8 },
    { month: 'Mar', tourists: 1350, incidents: 15 },
    { month: 'Apr', tourists: 1180, incidents: 6 },
    { month: 'May', tourists: 1250, incidents: 5 }
  ];

  const maxTourists = Math.max(...monthlyData.map(d => d.tourists));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Tourism Analytics</h2>
            <p className="text-sm text-gray-600">Monthly trends and insights</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Total Tourists</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 mt-1">{statistics.totalTourists.toLocaleString()}</p>
          <p className="text-xs text-blue-700">This year</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-900">Safety Score</span>
          </div>
          <p className="text-2xl font-bold text-green-900 mt-1">{statistics.safetyScore.toFixed(1)}/10</p>
          <p className="text-xs text-green-700">Average</p>
        </div>
      </div>

      {/* Monthly Tourist Inflow Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Tourist Inflow</h3>
        <div className="space-y-3">
          {monthlyData.map((data, index) => (
            <div key={index} className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-600 w-8">{data.month}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(data.tourists / maxTourists) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-900 w-12 text-right">
                {data.tourists}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Incidents */}
      <div className="bg-yellow-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-900">Safety Incidents</span>
          </div>
          <span className="text-2xl font-bold text-yellow-900">{statistics.incidents}</span>
        </div>
        <p className="text-xs text-yellow-700 mt-1">This month (-40% from last month)</p>
      </div>
    </div>
  );
};

export default Analytics;