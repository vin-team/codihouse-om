import { HttpService } from './http/HttpService';
import { parseExecuteResult } from './http/parse.service';
import { storage } from '../utils/storage.util';
import { parseCommonHttpResult } from './http/parseCommonResult';

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  time_expired: number;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ChangePasswordRequest {
  token: string;
  password: string;
}

class AuthService {
  async login(credentials: LoginRequest) {
    const response = await HttpService.doPostRequest(
      '/auth/login',
      credentials,
      false
    );

    return parseExecuteResult(response);
  }

  async logout() {
    const response = await HttpService.doPostRequest('/auth/logout',
      { refresh_token: HttpService.getLocalRefreshToken() });
    return parseCommonHttpResult(response);
  }

  async requestResetPassword(data: ResetPasswordRequest) {
    const response = await HttpService.doPostRequest('/auth/password/request', data, false);
    return parseCommonHttpResult(response);
  }

  async resetPassword(data: ChangePasswordRequest) {
    const response = await HttpService.doPostRequest('/auth/password/reset', data, false);
    return parseCommonHttpResult(response);
  }

  async refreshToken() {
    const response = await HttpService.doPostRequest(
      '/auth/refresh',
      {
        refresh_token: HttpService.getLocalRefreshToken(),
      },
      false
    );

    return parseCommonHttpResult(response);
  }

  setTokens(data: LoginResponse) {
    HttpService.setToken(data.access_token);
    HttpService.setLocalRefToken(data.refresh_token);
  }

  clearTokens() {
    storage.removeItem(process.env.NEXT_PUBLIC_storageTokenKey!);
    storage.removeItem(process.env.NEXT_PUBLIC_storageRefreshTokenKey!);
    storage.removeItem(process.env.NEXT_PUBLIC_storageAccessTokenKey!);
    storage.removeItem(process.env.NEXT_PUBLIC_storageUserKey!);
    storage.removeItem(process.env.NEXT_PUBLIC_storageRoleKey!);
  }

  isAuthenticated(): boolean {
    return !!HttpService.getLocalToken();
  }

  getCurrentUser() {
    const user = storage.getItem(process.env.NEXT_PUBLIC_storageUserKey!);
    if (user) {
      try {
        const payload = JSON.parse(user);
        return payload;
      } catch (error) {
        return null;
      }
    }
    return null;
  }
}

export const authService = new AuthService(); 