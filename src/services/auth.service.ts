import { HttpService } from './http/HttpService';
import { parseExecuteResult } from './http/parse.service';
import { storage } from '../utils/storage.util';

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
    return parseExecuteResult(response);
  }

  async requestResetPassword(data: ResetPasswordRequest) {
    const response = await HttpService.doPostRequest('/auth/password/request', data, false);
    return parseExecuteResult(response);
  }

  async resetPassword(data: ChangePasswordRequest) {
    const response = await HttpService.doPostRequest('/auth/password/reset', data, false);
    return parseExecuteResult(response);
  }

  async refreshToken() {
    try {
      const refreshToken = HttpService.getLocalRefreshToken();

      const response = await HttpService.doPostRequest(
        '/auth/refresh',
        {
          refreshToken: HttpService.getLocalRefreshToken(),
        },
        false
      );

      const result = parseExecuteResult(response);

      if (result.code === 200 && result.data) {
        HttpService.setToken(result.data.data.access_token);
        HttpService.setLocalRefToken(result.data.data.refresh_token);
      }

      return result;
    } catch (error: any) {
      return {
        code: error.response?.status || 500,
        message: error.response?.data?.message || 'Làm mới token thất bại'
      };
    }
  }

  setTokens(data: LoginResponse) {
    HttpService.setToken(data.access_token);
    HttpService.setLocalRefToken(data.refresh_token);
  }

  clearTokens() {
    storage.clear();
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