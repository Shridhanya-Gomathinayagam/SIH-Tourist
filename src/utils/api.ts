import { Tourist, Alert, TripStatistic, EmergencyContact } from '../types';

// Mock data
export const mockTourists: Tourist[] = [
  {
    id: 'tourist-1',
    email: 'john.doe@email.com',
    name: 'John Doe',
    role: 'tourist',
    profileComplete: true,
    kycStatus: 'verified',
    digitalId: 'DID-001-2024',
    destination: 'Goa',
    transportMode: 'Flight',
    stayInfo: 'Beach Resort, Calangute',
    healthInfo: 'No medical conditions',
    emergencyContacts: [
      {
        id: 'ec-1',
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '+91-9876543210',
        email: 'jane.doe@email.com'
      }
    ],
    safetyScore: 8,
    currentLocation: {
      lat: 15.2993,
      lng: 74.1240,
      address: 'Calangute Beach, Goa'
    },
    tripStartDate: '2024-01-15',
    tripEndDate: '2024-01-22'
  },
  {
    id: 'tourist-2',
    email: 'mary.smith@email.com',
    name: 'Mary Smith',
    role: 'tourist',
    profileComplete: true,
    kycStatus: 'verified',
    digitalId: 'DID-002-2024',
    destination: 'Kerala',
    transportMode: 'Train',
    stayInfo: 'Houseboat, Alleppey',
    healthInfo: 'Diabetes medication',
    emergencyContacts: [
      {
        id: 'ec-2',
        name: 'Robert Smith',
        relationship: 'Brother',
        phone: '+91-9876543211'
      }
    ],
    safetyScore: 9,
    currentLocation: {
      lat: 9.4981,
      lng: 76.3388,
      address: 'Alleppey Backwaters, Kerala'
    },
    tripStartDate: '2024-01-10',
    tripEndDate: '2024-01-18'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    touristId: 'tourist-1',
    type: 'panic',
    message: 'Panic button activated by John Doe',
    timestamp: '2024-01-16T10:30:00Z',
    status: 'active',
    priority: 'critical',
    location: {
      lat: 15.2993,
      lng: 74.1240,
      address: 'Calangute Beach, Goa'
    }
  },
  {
    id: 'alert-2',
    touristId: 'tourist-2',
    type: 'geofence',
    message: 'Tourist entered high-risk zone',
    timestamp: '2024-01-16T09:15:00Z',
    status: 'acknowledged',
    priority: 'high',
    location: {
      lat: 9.4981,
      lng: 76.3388,
      address: 'Remote area near Alleppey'
    }
  }
];

export const mockTripStatistics: TripStatistic = {
  totalTourists: 1250,
  activeTourists: 89,
  safetyScore: 8.2,
  incidents: 5,
  popularDestinations: [
    { name: 'Goa', count: 320 },
    { name: 'Kerala', count: 280 },
    { name: 'Rajasthan', count: 210 },
    { name: 'Himachal Pradesh', count: 180 },
    { name: 'Tamil Nadu', count: 160 }
  ]
};

// API functions - Updated to use real backend
export const fetchTourists = async (): Promise<Tourist[]> => {
  try {
    const data = await apiRequest('/tourism/tourists');
    return data;
  } catch (error) {
    console.error('Failed to fetch tourists:', error);
    // Fallback to mock data
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTourists;
  }
};

export const fetchAlerts = async (): Promise<Alert[]> => {
  try {
    const data = await apiRequest('/police/alerts');
    return data;
  } catch (error) {
    console.error('Failed to fetch alerts:', error);
    // Fallback to mock data
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAlerts;
  }
};

export const fetchTripStatistics = async (): Promise<TripStatistic> => {
  try {
    const data = await apiRequest('/tourism/statistics');
    return data;
  } catch (error) {
    console.error('Failed to fetch statistics:', error);
    // Fallback to mock data
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTripStatistics;
  }
};

export const updateSafetyScore = async (score: number): Promise<boolean> => {
  try {
    await apiRequest('/tourist/profile', {
      method: 'PUT',
      body: JSON.stringify({ safety_score: score }),
    });
    return true;
  } catch (error) {
    console.error('Failed to update safety score:', error);
    return false;
  }
};

export const triggerPanic = async (): Promise<boolean> => {
  try {
    await apiRequest('/tourist/panic', {
      method: 'POST',
    });
    return true;
  } catch (error) {
    console.error('Failed to trigger panic:', error);
    return false;
  }
};

export const acknowledgeAlert = async (alertId: string): Promise<boolean> => {
  try {
    await apiRequest(`/police/alerts/${alertId}`, {
      method: 'PUT',
      body: JSON.stringify({ status: 'acknowledged' }),
    });
    return true;
  } catch (error) {
    console.error('Failed to acknowledge alert:', error);
    return false;
  }
};

// Authentication API functions
export const loginUser = async (email: string, password: string, role: string) => {
  try {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
    
    // Store token in localStorage
    if (response.access_token) {
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const signupUser = async (userData: any) => {
  try {
    const response = await apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return response;
  } catch (error) {
    console.error('Signup failed:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await apiRequest('/auth/me');
    return response;
  } catch (error) {
    console.error('Failed to get current user:', error);
    throw error;
  }
};

// Tourism Department API functions
export const getTourismAnalytics = async () => {
  try {
    const [influx, destinations, languages, safety] = await Promise.all([
      apiRequest('/tourism/analytics/influx'),
      apiRequest('/tourism/analytics/destinations'),
      apiRequest('/tourism/analytics/languages'),
      apiRequest('/tourism/analytics/safety-metrics'),
    ]);
    
    return { influx, destinations, languages, safety };
  } catch (error) {
    console.error('Failed to fetch tourism analytics:', error);
    return null;
  }
};

export const getRecentActivities = async () => {
  try {
    const data = await apiRequest('/tourism/activities/recent');
    return data;
  } catch (error) {
    console.error('Failed to fetch recent activities:', error);
    return [];
  }
};

// Police API functions
export const getPoliceDashboardStats = async () => {
  try {
    const data = await apiRequest('/police/dashboard/stats');
    return data;
  } catch (error) {
    console.error('Failed to fetch police stats:', error);
    return null;
  }
};