import { RequestState } from "@/app/state";
import { createSlice } from "@reduxjs/toolkit";
import { File, parseFile } from "@/model/File.model";
import { commonCreateAsyncThunk } from "@/app/thunk";
import { fileService } from "@/services/File.service";

interface FileState {
  requestState: RequestState;
}

const initialState: FileState = {
  requestState: { status: "idle" },
};

export const uploadFile: any = commonCreateAsyncThunk({
  type: "file/uploadFile",
  action: fileService.uploadFile,
});

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    clearFileState: (state) => {
      state.requestState = { status: "idle" };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadFile.pending, (state) => {
      state.requestState = { status: "loading", type: "uploadFile" };
    });
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      const data = action.payload.data.data;
      state.requestState = { status: "completed", type: "uploadFile", data: parseFile(data) };
    });
    builder.addCase(uploadFile.rejected, (state, action) => {
      state.requestState = { status: "failed", error: action.error.message, type: "uploadFile" };
    });
  },
});

export const { clearFileState } = fileSlice.actions;

export default fileSlice.reducer;