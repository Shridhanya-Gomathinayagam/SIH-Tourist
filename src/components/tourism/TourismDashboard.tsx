import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import TouristRegistry from './TouristRegistry';
import Analytics from './Analytics';
import TouristInfluxChart from './TouristInfluxChart';
import TopDestinations from './TopDestinations';
import { Building2, Users, BarChart3, MapPin, TrendingUp, AlertTriangle } from 'lucide-react';
import { fetchTourists, fetchTripStatistics } from '../../utils/api';
import { Tourist, TripStatistic } from '../../types';

const TourismDashboard: React.FC = () => {
  const { user } = useAuth();
  const [tourists, setTourists] = useState<Tourist[]>([]);
  const [statistics, setStatistics] = useState<TripStatistic | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [touristData, statisticsData] = await Promise.all([
          fetchTourists(),
          fetchTripStatistics()
        ]);
        setTourists(touristData);
        setStatistics(statisticsData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const quickStats = [
    {
      title: 'Total Tourists',
      value: '15,847',
      change: '+12.5% vs last month',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Now',
      value: '1,247',
      change: 'Peak: 1,456 (2:30 PM)',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      indicator: true
    },
    {
      title: 'Digital IDs Issued',
      value: '14,523',
      change: 'Pending: 342',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Avg Safety Score',
      value: '78',
      change: '+3.2 this week',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
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
          <h1 className="text-2xl font-bold text-gray-900">Tourism Department Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Export Report
          </button>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Last 24 Hours</option>
          </select>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                {stat.indicator && (
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className={`text-sm ${
                  stat.change.includes('+') ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {stat.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TouristInfluxChart />
        <TopDestinations />
      </div>

      {/* Legacy sections - keeping for backward compatibility but hidden */}
      <div className="hidden">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tourism Department Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Department: Tourism Board</p>
              <p className="text-xs text-gray-500">Regional Office</p>
            </div>
          </div>
        </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
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
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popular Destinations */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Popular Destinations</h2>
              <p className="text-sm text-gray-600">Top tourist destinations this month</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {statistics?.popularDestinations.map((destination, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
              <h3 className="font-medium text-gray-900">{destination.name}</h3>
              <p className="text-2xl font-bold text-purple-600 mt-2">{destination.count}</p>
              <p className="text-sm text-gray-500">tourists</p>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics and Registry */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Analytics statistics={statistics} />
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Recent Registrations</h2>
                <p className="text-sm text-gray-600">Latest tourist check-ins</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {tourists.slice(0, 3).map((tourist) => (
              <div key={tourist.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-700">
                      {tourist.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{tourist.name}</p>
                    <p className="text-sm text-gray-500">{tourist.destination}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{tourist.tripStartDate}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    tourist.kycStatus === 'verified' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {tourist.kycStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View All Registrations
          </button>
        </div>
      </div>

      {/* Full Tourist Registry */}
      <TouristRegistry tourists={tourists} />
      </div>
    </div>
  );
};

export default TourismDashboard;