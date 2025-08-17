import { RequestState } from "@/app/state";
import { RootState } from "@/app/store";
import { commonCreateAsyncThunk } from "@/app/thunk";
import { parseUser, parseUsers, UserModel } from "@/model/User.model";
import { userService } from "@/services/user.service";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: UserModel;
  users: UserModel[];
  filter: {
    search: string;
  };
  actionState: RequestState;
}

const initialState: UserState = {
  user: {} as UserModel,
  users: [],
  filter: {
    search: '',
  },
  actionState: { status: 'idle' },
};

// Async thunks
export const getUser: any = commonCreateAsyncThunk({
  type: 'user/get',
  action: userService.getUser
});

export const getUserById: any = commonCreateAsyncThunk({
  type: 'user/getUserById',
  action: userService.getUserById
});

export const getUsers: any = commonCreateAsyncThunk({
  type: 'user/getUsers',
  action: userService.getUsers
});

export const searchUsers: any = commonCreateAsyncThunk({
  type: 'user/searchUsers',
  action: userService.searchUsers
});

export const updateUser: any = commonCreateAsyncThunk({
  type: 'user/updateUser',
  action: userService.updateUser
});

export const addUser: any = commonCreateAsyncThunk({
  type: 'user/addUser',
  action: userService.addUser
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearActionState: (state) => {
      state.actionState = { status: 'idle' }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.actionState = { status: 'loading', type: 'getUser' }
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = parseUser(action.payload.data.data)
        userService.setUser(state.user);
        state.actionState = { status: 'completed', type: 'getUser' }
      })
      .addCase(getUser.rejected, (state, action) => {
        const payload = action.payload as any;
        let message = "Có lỗi xảy ra. Vui lòng thử lại.";
        if (payload?.errors?.length > 0) {
          const error = payload.errors[0];
          message = error.message;
        }
        state.actionState = { status: 'failed', error: message, type: 'getUser' }
      })

      // Get User By Id
      .addCase(getUserById.pending, (state) => {
        state.actionState = { status: 'loading', type: 'getUserById' }
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = parseUser(action.payload.data.data)
        state.actionState = { status: 'completed', type: 'getUserById' }
      })
      .addCase(getUserById.rejected, (state, action) => {
        const payload = action.payload as any;
        let message = "Có lỗi xảy ra. Vui lòng thử lại.";
        if (payload?.errors?.length > 0) {
          const error = payload.errors[0];
          message = error.message;
        }
        state.actionState = { status: 'failed', error: message, type: 'getUserById' }
      })

      // Get Users
      .addCase(getUsers.pending, (state) => {
        state.actionState = { status: 'loading', type: 'getUsers' }
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = parseUsers(action.payload.data.data)
        state.actionState = { status: 'completed', type: 'getUsers' }
      })
      .addCase(getUsers.rejected, (state, action) => {
        const payload = action.payload as any;
        let message = "Có lỗi xảy ra. Vui lòng thử lại.";
        if (payload?.errors?.length > 0) {
          const error = payload.errors[0];
          message = error.message;
        }
        state.actionState = { status: 'failed', error: message, type: 'getUsers' }
      })

      // Search Users
      .addCase(searchUsers.pending, (state) => {
        state.actionState = { status: 'loading', type: 'searchUsers' }
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.users = parseUsers(action.payload.data.data)
        state.actionState = { status: 'completed', type: 'searchUsers' }
      })
      .addCase(searchUsers.rejected, (state, action) => {
        const payload = action.payload as any;
        let message = "Có lỗi xảy ra. Vui lòng thử lại.";
        if (payload?.errors?.length > 0) {
          const error = payload.errors[0];
          message = error.message;
        }
        state.actionState = { status: 'failed', error: message, type: 'searchUsers' }
      })

      // Add User
      .addCase(addUser.pending, (state) => {
        state.actionState = { status: 'loading', type: 'addUser' }
      })
      .addCase(addUser.fulfilled, (state) => {
        state.actionState = { status: 'completed', type: 'addUser' }
      })
      .addCase(addUser.rejected, (state, action) => {
        const payload = action.payload as any;
        let message = "Có lỗi xảy ra. Vui lòng thử lại.";
        if (payload?.errors?.length > 0) {
          const error = payload.errors[0];
          message = error.message;
        }
        state.actionState = { status: 'failed', error: message, type: 'addUser' }
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.actionState = { status: 'loading', type: 'updateUser' }
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.actionState = { status: 'completed', type: 'updateUser' }
      })
      .addCase(updateUser.rejected, (state, action) => {
        const payload = action.payload as any;
        let message = "Có lỗi xảy ra. Vui lòng thử lại.";
        if (payload?.errors?.length > 0) {
          const error = payload.errors[0];
          message = error.message;
        }
        state.actionState = { status: 'failed', error: message, type: 'updateUser' }
      })
  }
});

export const { clearActionState, setFilter } = userSlice.actions;

export default userSlice.reducer; 