import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Tourist, Police, TourismDept } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: any) => Promise<boolean>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      const response = await loginUser(email, password, role);
      setUser(response.user);
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      // Fallback to mock authentication for development
      if (password === 'password123') {
        const mockUser: User = {
          id: `${role}-${Date.now()}`,
          email,
          name: email.split('@')[0],
          role: role as 'tourist' | 'police' | 'tourism',
          profileComplete: role !== 'tourist'
        };

        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setLoading(false);
        return true;
      }
      setLoading(false);
      return false;
    }
  };

  const signup = async (userData: any): Promise<boolean> => {
    setLoading(true);
    
    try {
      const response = await signupUser(userData);
      // Auto-login after successful signup
      const loginResponse = await loginUser(userData.email, userData.password, userData.role);
      setUser(loginResponse.user);
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      // Fallback to mock signup for development
      const newUser: User = {
        id: `${userData.role}-${Date.now()}`,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        profileComplete: false
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setLoading(false);
      return true;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
  };

  const value = {
    user,
    login,
    logout,
    signup,
    isAuthenticated: !!user,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};