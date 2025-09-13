import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';

// Tourist Components
import TouristDashboard from './components/tourist/TouristDashboard';

// Police Components
import PoliceDashboard from './components/police/PoliceDashboard';

// Tourism Department Components
import TourismDashboard from './components/tourism/TourismDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardRouter />
                </ProtectedRoute>
              }
            />
            
            {/* Tourist Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={['tourist']}>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900">Profile Page</h1>
                    <p className="text-gray-600 mt-2">KYC verification and trip details coming soon...</p>
                  </div>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/emergency-contacts"
              element={
                <ProtectedRoute allowedRoles={['tourist']}>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900">Emergency Contacts</h1>
                    <p className="text-gray-600 mt-2">Manage your emergency contacts...</p>
                  </div>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/awareness-guide"
              element={
                <ProtectedRoute allowedRoles={['tourist']}>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900">Safety Guide</h1>
                    <p className="text-gray-600 mt-2">Safety tips and guidelines...</p>
                  </div>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/chatbot"
              element={
                <ProtectedRoute allowedRoles={['tourist']}>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
                    <p className="text-gray-600 mt-2">Chat with AI for safety assistance...</p>
                  </div>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/settings"
              element={
                <ProtectedRoute allowedRoles={['tourist']}>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-600 mt-2">App settings and preferences...</p>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Police Routes */}
            <Route
              path="/alerts"
              element={
                <ProtectedRoute allowedRoles={['police']}>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900">Real-time Alerts</h1>
                    <p className="text-gray-600 mt-2">Monitor active alerts and emergencies...</p>
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/tourists"
              element={
                <ProtectedRoute allowedRoles={['police']}>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900">Tourist Monitor</h1>
                    <p className="text-gray-600 mt-2">Monitor tourist activities and safety...</p>
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/map"
              element={
                <ProtectedRoute allowedRoles={['police']}>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900">Live Map</h1>
                    <p className="text-gray-600 mt-2">Real-time map with tourist locations...</p>
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/evidence"
              element={
                <ProtectedRoute allowedRoles={['police']}>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900">Evidence Management</h1>
                    <p className="text-gray-600 mt-2">Upload and manage evidence...</p>
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/sop"
              element={
                <ProtectedRoute allowedRoles={['police']}>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900">SOP Workflow</h1>
                    <p className="text-gray-600 mt-2">Emergency response procedures...</p>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Tourism Department Routes */}
            <Route
              path="/registry"
              element={
                <ProtectedRoute allowedRoles={['tourism']}>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900">Tourist Registry</h1>
                    <p className="text-gray-600 mt-2">Manage tourist registrations...</p>
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/analytics"
              element={
                <ProtectedRoute allowedRoles={['tourism']}>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                    <p className="text-gray-600 mt-2">Tourism analytics and insights...</p>
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/statistics"
              element={
                <ProtectedRoute allowedRoles={['tourism']}>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900">Trip Statistics</h1>
                    <p className="text-gray-600 mt-2">Detailed trip statistics...</p>
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/risk-alerts"
              element={
                <ProtectedRoute allowedRoles={['tourism']}>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900">Risk Alerts</h1>
                    <p className="text-gray-600 mt-2">High-risk area monitoring...</p>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Default redirects */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Unauthorized access */}
            <Route
              path="/unauthorized"
              element={
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
                    <p className="text-gray-600 mt-2">You don't have permission to access this page.</p>
                  </div>
                </div>
              }
            />
            
            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
                    <p className="text-gray-600 mt-2">The page you're looking for doesn't exist.</p>
                  </div>
                </div>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

// Dashboard Router Component to handle role-based dashboard routing
const DashboardRouter: React.FC = () => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <ProtectedRoute allowedRoles={['tourist']}>
            <TouristDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path=""
        element={
          <ProtectedRoute allowedRoles={['police']}>
            <PoliceDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path=""
        element={
          <ProtectedRoute allowedRoles={['tourism']}>
            <TourismDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;