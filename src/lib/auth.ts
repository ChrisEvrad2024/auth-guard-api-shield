import { toast } from "@/hooks/use-toast";

const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface User {
  id: number;
  email: string;
  role: {
    id: number;
    name: string;
    permissions: object;
  };
  is_active: boolean;
  email_verified: boolean;
  mfa_enabled: boolean;
  last_login: string | null;
}

export interface AuthResponse {
  user: User;
  accessToken: string; // Corrigé: backend renvoie 'accessToken' pas 'token'
  refreshToken: string;
  expiresIn: string;
}

export interface RegisterResponse {
  status: string;
  message: string;
  data: {
    id: number;
    email: string;
    verificationCode?: string; // En développement
  };
}

class AuthService {
  private token: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    this.token = localStorage.getItem('token');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Gestion des erreurs spécifiques
        const errorMessage = data.message || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`API Error [${endpoint}]:`, error.message);
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  async register(email: string, password: string): Promise<RegisterResponse> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Corrigé: utiliser 'accessToken' au lieu de 'token'
    this.setTokens(data.data.accessToken, data.data.refreshToken);
    return data.data;
  }

  // CORRIGÉ: Ajouter l'email comme paramètre
  async verifyEmail(email: string, code: string) {
    return this.request('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    });
  }

  // CORRIGÉ: Ajouter l'email comme paramètre
  async resendVerificationCode(email: string) {
    return this.request('/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async requestPasswordReset(email: string) {
    return this.request('/auth/request-password-reset', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, newPassword: string) {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  async getCurrentUser(): Promise<User> {
    const data = await this.request('/auth/me');
    return data.data;
  }

  async toggleMFA(enable: boolean) {
    return this.request('/auth/mfa/toggle', {
      method: 'POST',
      body: JSON.stringify({ enable }),
    });
  }

  async refreshAccessToken(): Promise<string> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    const data = await this.request('/auth/refresh-token', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: this.refreshToken }),
    });

    this.token = data.data.accessToken;
    localStorage.setItem('token', this.token);
    
    return this.token;
  }

  async logout() {
    try {
      if (this.refreshToken) {
        await this.request('/auth/logout', {
          method: 'POST',
          body: JSON.stringify({ refreshToken: this.refreshToken }),
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearTokens();
    }
  }

  async googleAuth(idToken: string, accessToken?: string): Promise<AuthResponse> {
    const data = await this.request('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ idToken, accessToken }),
    });

    this.setTokens(data.data.accessToken, data.data.refreshToken);
    return data.data;
  }

  private setTokens(accessToken: string, refreshToken: string) {
    this.token = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  private clearTokens() {
    this.token = null;
    this.refreshToken = null;
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }

  getRefreshToken(): string | null {
    return this.refreshToken;
  }

  // Méthode utilitaire pour stocker l'email temporairement
  setTempEmail(email: string) {
    sessionStorage.setItem('tempEmail', email);
  }

  getTempEmail(): string | null {
    return sessionStorage.getItem('tempEmail');
  }

  clearTempEmail() {
    sessionStorage.removeItem('tempEmail');
  }
}

export const authService = new AuthService();
