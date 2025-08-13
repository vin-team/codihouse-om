import { RequestState } from "@/app/state";
import { ImportData, parseImportData } from "@/model/ImportData.model";
import { createSlice } from "@reduxjs/toolkit";
import { commonCreateAsyncThunk } from "@/app/thunk";
import { importDataService } from "@/services/importData.service";

interface ImportDataState {
  importDataList: ImportData[];
  importData: ImportData | null;
  requestState: RequestState;
}

const initialState: ImportDataState = {
  importDataList: [],
  importData: null,
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
        state.requestState = { status: "failed", error: action.error.message, type: "updateImportData" };
      })
  },
});

export const { clearImportDataState } = importDataSlice.actions;

export default importDataSlice.reducer;