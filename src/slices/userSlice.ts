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

export const getUsers: any = commonCreateAsyncThunk({
  type: 'user/getUsers',
  action: userService.getUsers
});

export const searchUsers: any = commonCreateAsyncThunk({
  type: 'user/searchUsers',
  action: userService.searchUsers
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
        state.actionState = { status: 'failed', error: action.payload as string, type: 'getUser' }
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
        state.actionState = { status: 'failed', error: action.payload as string, type: 'getUsers' }
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
        state.actionState = { status: 'failed', error: action.payload as string, type: 'searchUsers' }
      });
  }
});

export const { clearActionState, setFilter } = userSlice.actions;

export default userSlice.reducer; 