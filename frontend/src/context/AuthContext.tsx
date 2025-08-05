import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

interface AuthContextType {
  user: { _id: string; username: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userData: { _id: string; username: string; token: string }) => void;
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
