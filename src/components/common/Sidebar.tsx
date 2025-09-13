import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  User,
  Shield,
  Building2,
  Home,
  AlertTriangle,
  Map,
  FileText,
  Users,
  BarChart3,
  Phone,
  MessageSquare,
  Settings,
  BookOpen
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const getNavigationItems = () => {
    if (!user) return [];

    switch (user.role) {
      case 'tourist':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: Home },
          { path: '/profile', label: 'Profile', icon: User },
          { path: '/emergency-contacts', label: 'Emergency Contacts', icon: Phone },
          { path: '/awareness-guide', label: 'Safety Guide', icon: BookOpen },
          { path: '/chatbot', label: 'AI Assistant', icon: MessageSquare },
          { path: '/settings', label: 'Settings', icon: Settings }
        ];
      case 'police':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: Home },
          { path: '/alerts', label: 'Real-time Alerts', icon: AlertTriangle },
          { path: '/tourists', label: 'Tourist Monitor', icon: Users },
          { path: '/map', label: 'Live Map', icon: Map },
          { path: '/evidence', label: 'Evidence', icon: FileText },
          { path: '/sop', label: 'SOP Workflow', icon: Shield }
        ];
      case 'tourism':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: Home },
          { path: '/registry', label: 'Tourist Registry', icon: Users },
          { path: '/analytics', label: 'Analytics', icon: BarChart3 },
          { path: '/statistics', label: 'Trip Statistics', icon: BarChart3 },
          { path: '/risk-alerts', label: 'Risk Alerts', icon: AlertTriangle }
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'tourist':
        return <User className="w-6 h-6" />;
      case 'police':
        return <Shield className="w-6 h-6" />;
      case 'tourism':
        return <Building2 className="w-6 h-6" />;
      default:
        return <User className="w-6 h-6" />;
    }
  };

  const getRoleColor = () => {
    switch (user?.role) {
      case 'tourist':
        return 'text-blue-600';
      case 'police':
        return 'text-red-600';
      case 'tourism':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo and Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-blue-50 ${getRoleColor()}`}>
            {getRoleIcon()}
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Smart Safety</h1>
            <p className="text-sm text-gray-500 capitalize">{user?.role} Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-blue-700">
              {user?.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;