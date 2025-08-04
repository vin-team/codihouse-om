import { RequestState } from "@/app/state";
import { RootState } from "@/app/store";
import { commonCreateAsyncThunk } from "@/app/thunk";
import { parseUser, UserModel } from "@/model/User.model";
import { userService } from "@/services/user.service";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: UserModel;
  actionState: RequestState;
}

const initialState: UserState = {
  user: {} as UserModel,
  actionState: { status: 'idle' },
};

// Async thunks
export const getUser = commonCreateAsyncThunk<void>({
  type: 'user/get',
  action: userService.getUser
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearActionState: (state) => {
      state.actionState = { status: 'idle' }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.actionState = { status: 'loading' }
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = parseUser(action.payload.data.data)
        userService.setUser(state.user);
        state.actionState = { status: 'completed' }
      })
      .addCase(getUser.rejected, (state, action) => {
        state.actionState = { status: 'failed', error: action.payload as string }
      });
  }
});

export const { clearActionState } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserActionState = (state: RootState) => state.user.actionState;

export default userSlice.reducer; 