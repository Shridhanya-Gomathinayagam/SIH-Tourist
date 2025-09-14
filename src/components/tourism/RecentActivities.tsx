import React from 'react';
import { Activity, FileText, Shield } from 'lucide-react';

const RecentActivities: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'digital_id',
      title: 'Digital ID issued to Sarah Johnson',
      time: '2 minutes ago',
      icon: FileText,
      color: 'bg-green-50 text-green-600'
    },
    {
      id: 2,
      type: 'kyc',
      title: 'KYC verified for Raj Patel',
      time: '5 minutes ago',
      icon: Shield,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 3,
      type: 'digital_id',
      title: 'Digital ID issued to Emma Wilson',
      time: '12 minutes ago',
      icon: FileText,
      color: 'bg-green-50 text-green-600'
    },
    {
      id: 4,
      type: 'kyc',
      title: 'KYC verified for Ali Khan',
      time: '18 minutes ago',
      icon: Shield,
      color: 'bg-blue-50 text-blue-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Activity className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 ml-3">Recent Activities</h3>
        </div>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All Activities
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${activity.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivities;