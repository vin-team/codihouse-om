import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../services/auth.service';
import { commonCreateAsyncThunk } from '../app/thunk';
import { RequestState } from '@/app/state';
import { HttpService } from '@/services/http/HttpService';

// Reset password state
export interface ResetPasswordState {
  step: number;
  email: string;
  token: string;
  isLoading: boolean;
  error: string;
}

// Async thunks
export const login: any = commonCreateAsyncThunk({
  type: 'auth/login',
  action: authService.login
});

export const logout: any = commonCreateAsyncThunk({
  type: 'auth/logout',
  action: authService.logout
});

export const requestResetPassword: any = commonCreateAsyncThunk({
  type: 'auth/requestResetPassword',
  action: authService.requestResetPassword
});

export const resetPassword: any = commonCreateAsyncThunk({
  type: 'auth/resetPassword',
  action: authService.resetPassword
});

export const refreshToken: any = commonCreateAsyncThunk({
  type: 'auth/refreshToken',
  action: authService.refreshToken
});

interface AuthState {
  actionState: RequestState;
  error: string | "";
  resetPassword: ResetPasswordState;
}

const initialState: AuthState = {
  actionState: { status: 'idle', type: '' },
  error: "",
  resetPassword: {
    step: 1,
    email: '',
    token: '',
    isLoading: false,
    error: '',
  },
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearActionState: (state) => {
      state.actionState = { status: 'idle', type: '' }
    },
    changeError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    setResetPasswordStep: (state, action: PayloadAction<number>) => {
      state.resetPassword.step = action.payload;
    },
    setResetPasswordEmail: (state, action: PayloadAction<string>) => {
      state.resetPassword.email = action.payload;
    },
    setResetPasswordToken: (state, action: PayloadAction<string>) => {
      state.resetPassword.token = action.payload;
    },
    setResetPasswordLoading: (state, action: PayloadAction<boolean>) => {
      state.resetPassword.isLoading = action.payload;
    },
    setResetPasswordError: (state, action: PayloadAction<string>) => {
      state.resetPassword.error = action.payload;
    },
    resetResetPassword: (state) => {
      state.resetPassword = initialState.resetPassword;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.actionState = { status: 'loading', type: 'login' }
      })
      .addCase(login.fulfilled, (state, action) => {
        authService.setTokens(action.payload.data.data)
        state.actionState = { status: 'completed', type: 'login' }
      })
      .addCase(login.rejected, (state, action) => {
        const payload = action.payload as any;
        let message = ''
        if (payload.errors.length > 0) {
          const extensions = payload.errors[0].extensions;
          if (extensions.code === 'INVALID_CREDENTIALS') {
            message = 'Email hoặc mật khẩu không chính xác';
          }
        }

        state.error = message;
        state.actionState = { status: 'failed', error: message, type: 'login' }
      })

      .addCase(logout.pending, (state) => {
        state.actionState = { status: 'loading', type: 'logout' }
      })
      .addCase(logout.fulfilled, (state) => {
        authService.clearTokens();
        state.actionState = { status: 'completed', type: 'logout' }
      })
      .addCase(logout.rejected, (state, action) => {
        state.actionState = { status: 'failed', error: action.payload as string, type: 'logout' }
      })

      .addCase(requestResetPassword.pending, (state) => {
        state.actionState = { status: 'loading', type: 'requestResetPassword' }
      })
      .addCase(requestResetPassword.fulfilled, (state) => {
        state.actionState = { status: 'completed', type: 'requestResetPassword' }
      })
      .addCase(requestResetPassword.rejected, (state, action) => {
        state.actionState = { status: 'failed', error: action.payload as string, type: 'requestResetPassword' }
      })

      .addCase(resetPassword.pending, (state) => {
        state.actionState = { status: 'loading', type: 'resetPassword' }
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.actionState = { status: 'completed', type: 'resetPassword' }
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.actionState = { status: 'failed', error: action.payload as string, type: 'resetPassword' }
      })

      .addCase(refreshToken.pending, (state) => {
        state.actionState = { status: 'loading', type: 'refreshToken' }
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        const payload = action.payload as any;
        const accessToken = payload.data?.data?.access_token;
        const refreshToken = payload.data?.data?.refresh_token;
        
        if (accessToken && refreshToken) {
          HttpService.setToken(accessToken);
          HttpService.setLocalRefToken(refreshToken);
        }
        state.actionState = { status: 'completed', type: 'refreshToken' }
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.actionState = { status: 'failed', error: action.payload as string, type: 'refreshToken' }
      })
  },
});

export const {
  clearActionState,
  changeError,
  setResetPasswordStep,
  setResetPasswordEmail,
  setResetPasswordToken,
  setResetPasswordLoading,
  setResetPasswordError,
  resetResetPassword,
} = authSlice.actions;

export default authSlice.reducer; 