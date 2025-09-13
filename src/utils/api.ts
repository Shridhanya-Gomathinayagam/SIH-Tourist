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

// API functions
export const fetchTourists = async (): Promise<Tourist[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockTourists;
};

export const fetchAlerts = async (): Promise<Alert[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockAlerts;
};

export const fetchTripStatistics = async (): Promise<TripStatistic> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockTripStatistics;
};

export const updateSafetyScore = async (score: number): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};

export const triggerPanic = async (): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};

export const acknowledgeAlert = async (alertId: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};