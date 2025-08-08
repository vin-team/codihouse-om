import { RequestState } from "@/app/state";
import { parseRole, parseRoles, RoleModel } from "@/model/Role.mode";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { roleService } from "@/services/role.service";
import { commonCreateAsyncThunk } from "@/app/thunk";

interface RoleState {
  role: RoleModel;
  roles: RoleModel[];
  actionState: RequestState;
}

const initialState: RoleState = {
  role: {} as RoleModel,
  roles: [],
  actionState: { status: 'idle' },
};

export const getRole: any = commonCreateAsyncThunk({
  type: 'role/get',
  action: roleService.getRole
});

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    clearActionState: (state) => {
      state.actionState = { status: 'idle' }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRole.pending, (state) => {
        state.actionState = { status: 'loading' }
      })
      .addCase(getRole.fulfilled, (state, action) => {
        state.role = parseRole(action.payload.data.data)
        roleService.setRole(state.role)
        state.actionState = { status: 'completed' }
      })
      .addCase(getRole.rejected, (state, action) => {
        state.actionState = { status: 'failed', error: action.payload as string }
      });
  }
})

export const { clearActionState } = roleSlice.actions;

export const selectRole = (state: RootState) => state.role.role;
export const selectRoleActionState = (state: RootState) => state.role.actionState;

export default roleSlice.reducer;