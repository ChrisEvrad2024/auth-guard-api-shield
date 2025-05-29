
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, User } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  resendVerificationCode: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  toggleMFA: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error('Failed to get current user:', error);
          await authService.logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    setUser(response.user);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const register = async (email: string, password: string) => {
    await authService.register(email, password);
  };

  const verifyEmail = async (code: string) => {
    await authService.verifyEmail(code);
    await refreshUser();
  };

  const resendVerificationCode = async () => {
    await authService.resendVerificationCode();
  };

  const requestPasswordReset = async (email: string) => {
    await authService.requestPasswordReset(email);
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    await authService.changePassword(currentPassword, newPassword);
  };

  const toggleMFA = async () => {
    await authService.toggleMFA();
    await refreshUser();
  };

  const refreshUser = async () => {
    if (authService.isAuthenticated()) {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to refresh user:', error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        verifyEmail,
        resendVerificationCode,
        requestPasswordReset,
        changePassword,
        toggleMFA,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
