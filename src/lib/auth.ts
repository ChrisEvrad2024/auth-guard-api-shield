
import { toast } from "@/hooks/use-toast";

const API_BASE_URL = 'http://localhost:3000/api';

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
  token: string;
  refreshToken: string;
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

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  }

  async register(email: string, password: string) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    return data;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    this.setTokens(data.token, data.refreshToken);
    return data;
  }

  async verifyEmail(code: string) {
    const data = await this.request('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });

    return data;
  }

  async resendVerificationCode() {
    const data = await this.request('/auth/resend-verification', {
      method: 'POST',
    });

    return data;
  }

  async requestPasswordReset(email: string) {
    const data = await this.request('/auth/request-password-reset', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    return data;
  }

  async changePassword(currentPassword: string, newPassword: string) {
    const data = await this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    return data;
  }

  async getCurrentUser(): Promise<User> {
    const data = await this.request('/auth/me');
    return data.user;
  }

  async toggleMFA() {
    const data = await this.request('/auth/mfa', {
      method: 'POST',
    });

    return data;
  }

  async logout() {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearTokens();
    }
  }

  async googleAuth(idToken: string) {
    const data = await this.request('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    });

    this.setTokens(data.token, data.refreshToken);
    return data;
  }

  private setTokens(token: string, refreshToken: string) {
    this.token = token;
    this.refreshToken = refreshToken;
    localStorage.setItem('token', token);
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
}

export const authService = new AuthService();
