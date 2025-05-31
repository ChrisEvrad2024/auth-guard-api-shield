import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User, AuthResponse } from '@/lib/auth';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  // CORRECTION: Ajouter le paramètre email
  verifyEmail: (email: string, code: string) => Promise<void>;
  // CORRECTION: Ajouter le paramètre email
  resendVerificationCode: (email: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  toggleMFA: () => Promise<any>;
  googleAuth: (idToken: string) => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Erreur d\'initialisation de l\'auth:', error);
        // Token peut être expiré, on nettoie
        await authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const response: AuthResponse = await authService.login(email, password);
      setUser(response.user);
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      await authService.register(email, password);
      // Après inscription, l'utilisateur doit vérifier son email
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès",
      });
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      // Même en cas d'erreur, on déconnecte localement
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (email: string, code: string): Promise<void> => {
    try {
      setLoading(true);
      await authService.verifyEmail(email, code); // Passer les deux paramètres
      // Recharger les données utilisateur après vérification
      if (authService.isAuthenticated()) {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Erreur de vérification:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationCode = async (email: string): Promise<void> => {
    try {
      await authService.resendVerificationCode(email); // Passer l'email
    } catch (error) {
      console.error('Erreur de renvoi du code:', error);
      throw error;
    }
  };

  const requestPasswordReset = async (email: string): Promise<void> => {
    try {
      await authService.requestPasswordReset(email);
    } catch (error) {
      console.error('Erreur de demande de réinitialisation:', error);
      throw error;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    try {
      await authService.changePassword(currentPassword, newPassword);
      toast({
        title: "Mot de passe modifié",
        description: "Votre mot de passe a été mis à jour avec succès",
      });
    } catch (error) {
      console.error('Erreur de changement de mot de passe:', error);
      throw error;
    }
  };

  const toggleMFA = async () => {
    try {
      const result = await authService.toggleMFA();
      // Recharger les données utilisateur
      await refreshUserData();
      return result;
    } catch (error) {
      console.error('Erreur MFA:', error);
      throw error;
    }
  };

  const googleAuth = async (idToken: string): Promise<void> => {
    try {
      setLoading(true);
      const response: AuthResponse = await authService.googleAuth(idToken);
      setUser(response.user);
    } catch (error) {
      console.error('Erreur d\'authentification Google:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshUserData = async (): Promise<void> => {
    try {
      if (authService.isAuthenticated()) {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Erreur de rafraîchissement des données:', error);
      // Si erreur, probablement token expiré
      await logout();
    }
  };

const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user && authService.isAuthenticated(),
    login,
    register,
    logout,
    verifyEmail,
    resendVerificationCode,
    requestPasswordReset,
    changePassword,
    toggleMFA,
    googleAuth,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
