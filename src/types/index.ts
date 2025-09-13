export interface User {
  id: string;
  email: string;
  name: string;
  role: 'tourist' | 'police' | 'tourism';
  profileComplete: boolean;
}

export interface Tourist extends User {
  role: 'tourist';
  kycStatus: 'pending' | 'verified' | 'rejected';
  digitalId: string;
  destination: string;
  transportMode: string;
  stayInfo: string;
  healthInfo: string;
  emergencyContacts: EmergencyContact[];
  safetyScore: number;
  currentLocation: Location;
  tripStartDate: string;
  tripEndDate: string;
}

export interface Police extends User {
  role: 'police';
  policeId: string;
  station: string;
  jurisdiction: string;
}

export interface TourismDept extends User {
  role: 'tourism';
  employeeId: string;
  department: string;
  region: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Alert {
  id: string;
  touristId: string;
  type: 'panic' | 'geofence' | 'safety' | 'health';
  message: string;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'critical';
  location: Location;
}

export interface TripStatistic {
  totalTourists: number;
  activeTourists: number;
  safetyScore: number;
  incidents: number;
  popularDestinations: Array<{
    name: string;
    count: number;
  }>;
}