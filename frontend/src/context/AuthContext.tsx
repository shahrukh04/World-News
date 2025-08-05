import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userData: { user: User; token: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, token, isAuthenticated, login, logout } = useAuthStore();

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// Add a hook to check authentication status on component mount
export const useAuthCheck = (callback: () => void): void => {
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (isAuthenticated) {
      callback();
    }
  }, [isAuthenticated, callback]);
};
