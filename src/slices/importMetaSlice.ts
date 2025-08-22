import { createSlice } from "@reduxjs/toolkit";
import { ImportMeta, parseImportMeta } from "@/model/ImportMeta.model";
import { RequestState } from "@/app/state";
import { commonCreateAsyncThunk } from "@/app/thunk";
import { importMetaService } from "@/services/importMeta.service";
import { Pagination } from "@/model/Pagination.mode";
import { ImportLog, parseImportLogList } from "@/model/ImportLog.model";

interface ImportMetaState {
  importMeta: ImportMeta | null,
  importLogs: ImportLog[],
  twoImportLogs: ImportLog[],
  pagination: Pagination,
  requestState: RequestState,
}

const initialState: ImportMetaState = {
  importMeta: null,
  importLogs: [],
  twoImportLogs: [],
  pagination: {
    page: 1,
    limit: 15,
  },
  requestState: { status: "idle" },
};

export const getImportMeta: any = commonCreateAsyncThunk({
  type: "importMeta/getImportMeta",
  action: importMetaService.getImportMeta,
});

export const getImportLogs: any = commonCreateAsyncThunk({
  type: "importMeta/getImportLogs",
  action: importMetaService.getImportLogs,
});

export const getTwoImportLogs: any = commonCreateAsyncThunk({
  type: "importMeta/getTwoImportLogs",
  action: importMetaService.getTwoImportLogs,
});

const importMetaSlice = createSlice({
  name: "importMeta",
  initialState,
  reducers: {
    clearImportMetaState: (state) => {
      state.requestState = { status: "idle" };
    },
    clearImportMeta: (state) => {
      state.importMeta = null;
    },
    setTotalPages: (state, action) => {
      state.pagination.totalPages = action.payload;
    },
    setTotalRecords: (state, action) => {
      state.pagination.totalRecords = action.payload;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getImportMeta.pending, (state) => {
        state.requestState = { status: "loading", type: "getImportMeta" };
      })
      .addCase(getImportMeta.fulfilled, (state, action) => {
        const data = action.payload.data.data;
        if (data.length > 0) {
          state.importMeta = parseImportMeta(data[0]);
        }
        state.requestState = { status: "completed", type: "getImportMeta" };
      })
      .addCase(getImportMeta.rejected, (state, action) => {
        state.requestState = { status: "failed", error: action.error.message, type: "getImportMeta" };
      })

      .addCase(getImportLogs.pending, (state) => {
        state.requestState = { status: "loading", type: "getImportLogs" };
      })
      .addCase(getImportLogs.fulfilled, (state, action) => {
        state.importLogs = parseImportLogList(action.payload.data.data);
        state.requestState = { status: "completed", type: "getImportLogs" };
      })
      .addCase(getImportLogs.rejected, (state, action) => {
        state.requestState = { status: "failed", error: action.error.message, type: "getImportLogs" };
      })
      .addCase(getTwoImportLogs.pending, (state) => {
        state.requestState = { status: "loading", type: "getTwoImportLogs" };
      })
      .addCase(getTwoImportLogs.fulfilled, (state, action) => {
        state.twoImportLogs = parseImportLogList(action.payload.data.data);
        state.requestState = { status: "completed", type: "getTwoImportLogs" };
      })
      .addCase(getTwoImportLogs.rejected, (state, action) => {
        state.requestState = { status: "failed", error: action.error.message, type: "getTwoImportLogs" };
      })
  }
});

export const { clearImportMetaState, clearImportMeta, setTotalPages, setTotalRecords, setPage } = importMetaSlice.actions;
export default importMetaSlice.reducer;