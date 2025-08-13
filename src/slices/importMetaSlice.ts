import { createSlice } from "@reduxjs/toolkit";
import { ImportMeta, parseImportMeta } from "@/model/ImportMeta.model";
import { RequestState } from "@/app/state";
import { commonCreateAsyncThunk } from "@/app/thunk";
import { importMetaService } from "@/services/importMeta.service";

interface ImportMetaState {
  importMeta: ImportMeta | null,
  requestState: RequestState,
}

const initialState: ImportMetaState = {
  importMeta: null,
  requestState: { status: "idle" },
};

export const getImportMeta: any = commonCreateAsyncThunk({
  type: "importMeta/getImportMeta",
  action: importMetaService.getImportMeta,
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
  }
});

export const { clearImportMetaState, clearImportMeta } = importMetaSlice.actions;
export default importMetaSlice.reducer;