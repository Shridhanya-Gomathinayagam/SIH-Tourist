import React from 'react';
import { X, Phone, UserCheck, FileText, MapPin, Clock } from 'lucide-react';
import { Alert } from '../../types';

interface AlertDetailsModalProps {
  alert: Alert;
  onClose: () => void;
  onCallTourist: () => void;
  onAssignOfficer: () => void;
  onGenerateReport: () => void;
}

const AlertDetailsModal: React.FC<AlertDetailsModalProps> = ({
  alert,
  onClose,
  onCallTourist,
  onAssignOfficer,
  onGenerateReport
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'acknowledged':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Alert Details</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-500">Tourist</label>
              <p className="text-lg font-semibold text-gray-900 mt-1">John Doe</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Alert Type</label>
              <p className="text-lg font-semibold text-gray-900 mt-1 capitalize">{alert.type}</p>
            </div>
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-500 mb-2 block">Priority</label>
              <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(alert.priority)}`}>
                {alert.priority.toUpperCase()}
              </span>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 mb-2 block">Status</label>
              <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(alert.status)}`}>
                {alert.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-gray-500">Location</label>
            <div className="mt-2">
              <p className="text-lg font-semibold text-gray-900">{alert.location.address}</p>
              <p className="text-sm text-gray-500 mt-1">28.6139, 77.209</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-500">Description</label>
            <p className="text-gray-900 mt-2">{alert.message}</p>
          </div>

          {/* Timestamp */}
          <div>
            <label className="text-sm font-medium text-gray-500">Timestamp</label>
            <div className="flex items-center mt-2">
              <Clock className="w-4 h-4 text-gray-400 mr-2" />
              <p className="text-gray-900">1/15/2025, 8:00:00 PM</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-200 flex space-x-3">
          <button
            onClick={onCallTourist}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Call Tourist</span>
          </button>
          
          <button
            onClick={onAssignOfficer}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserCheck className="w-4 h-4" />
            <span>Assign Officer</span>
          </button>
          
          <button
            onClick={onGenerateReport}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Generate E-FIR</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDetailsModal;