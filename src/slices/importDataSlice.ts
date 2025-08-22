import { RequestState } from "@/app/state";
import { ImportData, parseImportData } from "@/model/ImportData.model";
import { createSlice } from "@reduxjs/toolkit";
import { commonCreateAsyncThunk } from "@/app/thunk";
import { importDataService } from "@/services/importData.service";

interface ImportDataState {
  importDataList: ImportData[];
  importData: ImportData | null;
  filter: {
    type: string;
    importLogs: number[];
  };
  requestState: RequestState;
}

const initialState: ImportDataState = {
  importDataList: [],
  importData: null,
  filter: {
    type: '',
    importLogs: [],
  },
  requestState: { status: "idle" },
};

export const getImportsData: any = commonCreateAsyncThunk({
  type: "importData/getImportsData",
  action: importDataService.getImportsData,
});

export const updateImportData: any = commonCreateAsyncThunk({
  type: "importData/updateImportData",
  action: importDataService.updateImportData,
});

const importDataSlice = createSlice({
  name: "importData",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearImportDataState: (state) => {
      state.requestState = { status: "idle" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getImportsData.pending, (state) => {
        state.requestState = { status: "loading", type: "getImportsData" };
      })
      .addCase(getImportsData.fulfilled, (state, action) => {
        const data = action.payload.data.data;
        if (data.length > 0) {
          const importDataList = data.map((item: any) => parseImportData(item));
          state.importDataList = importDataList;
        }
        state.requestState = { status: "completed", type: "getImportsData" };
      })
      .addCase(getImportsData.rejected, (state, action) => {
        state.requestState = { status: "failed", error: action.error.message, type: "getImportsData" };
      })
      .addCase(updateImportData.pending, (state) => {
        state.requestState = { status: "loading", type: "updateImportData" };
      })
      .addCase(updateImportData.fulfilled, (state, action) => {
        const data = action.payload.data.data;
        state.importData = parseImportData(data);
        state.requestState = { status: "completed", type: "updateImportData", data: parseImportData(data) };
      })
      .addCase(updateImportData.rejected, (state, action) => {
        const payload = action.payload as any;
        let message = "Có lỗi xảy ra. Vui lòng thử lại.";
        if (payload?.errors?.length > 0) {
          const error = payload.errors[0];
          if (error.extensions?.code === 'INVALID_PAYLOAD') {
            message = "File không hợp lệ hoặc không đúng với định dạng. Vui lòng kiểm tra lại.";
          } else {
            message = error.message;
          }
        }
        state.requestState = { status: "failed", error: message, type: "updateImportData" };
      })
  },
});

export const { clearImportDataState, setFilter } = importDataSlice.actions;

export default importDataSlice.reducer;