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
  user: {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    role: {
      id: string;
      name: string;
    };
  };
}

export interface ResetPasswordRequest {
  email: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface ChangePasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

class AuthService {
  async login(credentials: LoginRequest) {
    try {
      const response = await HttpService.doPostRequest(
        '/auth/login',
        credentials,
        false
      );
      const result = parseExecuteResult(response);
      console.log(result);
      if (result.code === 200 && result.data) {
        HttpService.setToken(result.data.data.access_token);
        HttpService.setLocalRefToken(result.data.data.refresh_token);
      }

      return result;
    } catch (error: any) {
      return {
        code: error.response?.status || 500,
        message: error.response?.data?.message || 'Đăng nhập thất bại'
      };
    }
  }

  async logout() {
    try {
      const response = await HttpService.doPostRequest('/auth/logout', {});
      const result = parseExecuteResult(response);

      if (result.code === 200) {
        this.clearTokens();
      }

      return result;
    } catch (error: any) {
      return {
        code: error.response?.status || 500,
        message: error.response?.data?.message || 'Đăng xuất thất bại'
      };
    }
  }

  async requestResetPassword(data: ResetPasswordRequest) {
    try {
      const response = await HttpService.doPostRequest(
        '/auth/forgot-password',
        data,
        false
      );
      return parseExecuteResult(response);
    } catch (error: any) {
      return {
        code: error.response?.status || 500,
        message: error.response?.data?.message || 'Gửi email đặt lại mật khẩu thất bại'
      };
    }
  }

  async verifyOTP(data: VerifyOTPRequest) {
    try {
      const response = await HttpService.doPostRequest(
        '/auth/verify-otp',
        data,
        false
      );
      return parseExecuteResult(response);
    } catch (error: any) {
      return {
        code: error.response?.status || 500,
        message: error.response?.data?.message || 'Mã OTP không hợp lệ'
      };
    }
  }

  async changePassword(data: ChangePasswordRequest) {
    try {
      const response = await HttpService.doPostRequest(
        '/auth/reset-password',
        data,
        false
      );
      return parseExecuteResult(response);
    } catch (error: any) {
      return {
        code: error.response?.status || 500,
        message: error.response?.data?.message || 'Đặt lại mật khẩu thất bại'
      };
    }
  }

  async refreshToken() {
    try {
      const refreshToken = HttpService.getLocalRefreshToken();
      const username = HttpService.getUsername();
      const deviceId = HttpService.getLocalDeviceId();

      const response = await HttpService.doPostRequest(
        '/auth/refresh',
        {
          username,
          refreshToken,
          device: deviceId
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

  // Helper methods
  clearTokens() {
    storage.removeItem(process.env.NEXT_PUBLIC_storageAccessTokenKey!);
    storage.removeItem(process.env.NEXT_PUBLIC_storageRefreshTokenKey!);
    storage.removeItem(process.env.NEXT_PUBLIC_storageUserIdKey!);
    storage.removeItem(process.env.NEXT_PUBLIC_storageUsernameKey!);
    storage.removeItem(process.env.NEXT_PUBLIC_storageDeviceIdKey!);
  }

  isAuthenticated(): boolean {
    return !!HttpService.getLocalToken();
  }

  getCurrentUser() {
    const token = HttpService.getLocalToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
      } catch (error) {
        return null;
      }
    }
    return null;
  }
}

export const authService = new AuthService(); 