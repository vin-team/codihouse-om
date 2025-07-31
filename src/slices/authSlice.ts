import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../services/auth.service';
import type { LoginRequest, ResetPasswordRequest, VerifyOTPRequest, ChangePasswordRequest } from '../services/auth.service';
import { commonCreateAsyncThunk } from '../app/thunk';
import { setLogined } from './app';

// Async thunks
export const loginAsync = commonCreateAsyncThunk<LoginRequest>({
  type: 'auth/login',
  action: authService.login
});

export const logoutAsync = commonCreateAsyncThunk<void>({
  type: 'auth/logout',
  action: authService.logout
});

export const requestResetPasswordAsync = commonCreateAsyncThunk<ResetPasswordRequest>({
  type: 'auth/requestResetPassword',
  action: authService.requestResetPassword
});

export const verifyOTPAsync = commonCreateAsyncThunk<VerifyOTPRequest>({
  type: 'auth/verifyOTP',
  action: authService.verifyOTP
});

export const changePasswordAsync = commonCreateAsyncThunk<ChangePasswordRequest>({
  type: 'auth/changePassword',
  action: authService.changePassword
});

// State interface
interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  resetPasswordStep: number; // 1: email, 2: OTP, 3: new password, 4: success
  resetPasswordEmail: string;
  resetPasswordOTP: string;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false, // Will be updated on client-side
  isLoading: false,
  error: null,
  resetPasswordStep: 1,
  resetPasswordEmail: '',
  resetPasswordOTP: '',
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    initializeAuth: (state) => {
      state.isAuthenticated = authService.isAuthenticated();
    },
    setResetPasswordStep: (state, action: PayloadAction<number>) => {
      state.resetPasswordStep = action.payload;
    },
    setResetPasswordEmail: (state, action: PayloadAction<string>) => {
      state.resetPasswordEmail = action.payload;
    },
    setResetPasswordOTP: (state, action: PayloadAction<string>) => {
      state.resetPasswordOTP = action.payload;
    },
    resetResetPassword: (state) => {
      state.resetPasswordStep = 1;
      state.resetPasswordEmail = '';
      state.resetPasswordOTP = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.code === 200 && action.payload.data) {
          state.isAuthenticated = true;
          state.user = action.payload.data.user;
          state.error = null;
        } else {
          state.error = action.payload.message || 'Đăng nhập thất bại';
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logoutAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Request Reset Password
    builder
      .addCase(requestResetPasswordAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestResetPasswordAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resetPasswordStep = 2;
        state.error = null;
      })
      .addCase(requestResetPasswordAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Verify OTP
    builder
      .addCase(verifyOTPAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOTPAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.code === 200 && action.payload.data) {
          state.resetPasswordStep = 3;
          state.error = null;
        } else {
          state.error = action.payload.message || 'Mã OTP không hợp lệ';
        }
      })
      .addCase(verifyOTPAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Change Password
    builder
      .addCase(changePasswordAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changePasswordAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resetPasswordStep = 4;
        state.error = null;
      })
      .addCase(changePasswordAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const {
  clearError,
  initializeAuth,
  setResetPasswordStep,
  setResetPasswordEmail,
  setResetPasswordOTP,
  resetResetPassword
} = authSlice.actions;

// Export selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export const selectResetPasswordStep = (state: { auth: AuthState }) => state.auth.resetPasswordStep;
export const selectResetPasswordEmail = (state: { auth: AuthState }) => state.auth.resetPasswordEmail;
export const selectResetPasswordOTP = (state: { auth: AuthState }) => state.auth.resetPasswordOTP;

// Export reducer
export default authSlice.reducer; 