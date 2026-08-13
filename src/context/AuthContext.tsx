import React, { createContext, useContext, useState, useEffect } from 'react';
import { IUser, UserRole } from '../types';

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(() => {
    const saved = localStorage.getItem('tradenav_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr-1',
      name: 'Senior Trade Manager',
      email: 'demo@tradenav.ai',
      role: 'Merchant',
      company: 'Global Trade Dynamics Inc'
    };
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem('tradenav_token') || 'demo_jwt_token');

  const login = (email: string, role: UserRole = 'Merchant') => {
    const newUser: IUser = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      role,
      company: 'Global Trade Dynamics'
    };
    setUser(newUser);
    setToken('demo_jwt_token_active');
    localStorage.setItem('tradenav_user', JSON.stringify(newUser));
    localStorage.setItem('tradenav_token', 'demo_jwt_token_active');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('tradenav_user');
    localStorage.removeItem('tradenav_token');
  };

  const setRole = (role: UserRole) => {
    if (user) {
      const updated = { ...user, role };
      setUser(updated);
      localStorage.setItem('tradenav_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setRole, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
