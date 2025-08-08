import { RequestState } from "@/app/state";
import { commonCreateAsyncThunk } from "@/app/thunk";
import { Branch, parseBranch, parseBranches } from "@/model/Branch.model";
import { Pagination } from "@/model/Pagination.mode";
import branchService from "@/services/branch.service";
import { createSlice } from "@reduxjs/toolkit";

interface BranchState {
  branches: Branch[];
  branch: Branch | null;
  filter: {
    search: string;
  };
  pagination: Pagination;
  requestState: RequestState;
}

const initialState: BranchState = {
  branches: [],
  branch: null,
  filter: {
    search: '',
  },
  pagination: {
    page: 1,
    limit: 25,
    totalRecords: 0,
    totalPages: 1,
  },
  requestState: { status: 'idle', type: '' },
};

export const getBranches: any = commonCreateAsyncThunk({
  type: 'branch/getBranches',
  action: branchService.getBranches,
});

export const getBranchesCount: any = commonCreateAsyncThunk({
  type: 'branch/getBranchesCount',
  action: branchService.getBranchesCount,
});

export const getBranch: any = commonCreateAsyncThunk({
  type: 'branch/getBranch',
  action: branchService.getBranch,
});

export const createBranch: any = commonCreateAsyncThunk({
  type: 'branch/createBranch',
  action: branchService.createBranch,
});

export const updateBranch: any = commonCreateAsyncThunk({
  type: 'branch/updateBranch',
  action: branchService.updateBranch,
});

export const searchBranches: any = commonCreateAsyncThunk({
  type: 'branch/searchBranches',
  action: branchService.searchBranches,
});

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    clearBranchState: (state) => {
      state.branches = [];
      state.requestState = { status: 'idle', type: '' };
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setLimit: (state, action) => {
      state.pagination.limit = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBranches.pending, (state) => {
        state.requestState = { status: 'loading', type: 'getBranches' };
      })
      .addCase(getBranches.fulfilled, (state, action) => {
        state.branches = parseBranches(action.payload.data.data);
        state.requestState = { status: 'completed', type: 'getBranches' };
      })
      .addCase(getBranches.rejected, (state, action) => {
        state.requestState = { status: 'failed', type: 'getBranches', error: action.error.message };
      })

      .addCase(getBranchesCount.pending, (state) => {
        state.requestState = { status: 'loading', type: 'getBranchesCount' };
      })
      .addCase(getBranchesCount.fulfilled, (state, action) => {
        const data = action.payload.data.data;
        if (data.length > 0) {
          state.pagination.totalRecords = data[0].count || 0;
          state.pagination.totalPages = Math.ceil((state.pagination.totalRecords || 0) / state.pagination.limit);
        }
        state.pagination.totalPages = Math.ceil((state.pagination.totalRecords || 0) / state.pagination.limit);
        state.requestState = { status: 'completed', type: 'getBranchesCount' };
      })
      .addCase(getBranchesCount.rejected, (state, action) => {
        state.requestState = { status: 'failed', type: 'getBranchesCount', error: action.error.message };
      })

      .addCase(getBranch.pending, (state) => {
        state.requestState = { status: 'loading', type: 'getBranch' };
      })
      .addCase(getBranch.fulfilled, (state, action) => {
        state.branch = parseBranch(action.payload.data.data);
        state.requestState = { status: 'completed', type: 'getBranch' };
      })
      .addCase(getBranch.rejected, (state, action) => {
        state.requestState = { status: 'failed', type: 'getBranch', error: action.error.message };
      })

      .addCase(updateBranch.pending, (state) => {
        state.requestState = { status: 'loading', type: 'updateBranch' };
      })
      .addCase(updateBranch.fulfilled, (state, action) => {
        state.branch = parseBranch(action.payload.data.data);
        state.requestState = { status: 'completed', type: 'updateBranch' };
      })
      .addCase(updateBranch.rejected, (state, action) => {
        state.requestState = { status: 'failed', type: 'updateBranch', error: action.error.message };
      })

      .addCase(createBranch.pending, (state) => {
        state.requestState = { status: 'loading', type: 'createBranch' };
      })
      .addCase(createBranch.fulfilled, (state, action) => {
        state.branch = parseBranch(action.payload.data.data);
        state.requestState = { status: 'completed', type: 'createBranch' };
      })
      .addCase(createBranch.rejected, (state, action) => {
        state.requestState = { status: 'failed', type: 'createBranch', error: action.error.message };
      })

      .addCase(searchBranches.pending, (state) => {
        state.requestState = { status: 'loading', type: 'searchBranches' };
      })
      .addCase(searchBranches.fulfilled, (state, action) => {
        state.branches = parseBranches(action.payload.data.data);
        state.requestState = { status: 'completed', type: 'searchBranches' };
      })
      .addCase(searchBranches.rejected, (state, action) => {
        state.requestState = { status: 'failed', type: 'searchBranches', error: action.error.message };
      });
  },
});

export const { clearBranchState, setPage, setLimit, setFilter } = branchSlice.actions;

export default branchSlice.reducer;