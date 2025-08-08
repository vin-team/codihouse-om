import { createSlice } from "@reduxjs/toolkit";
import { RequestState } from "@/app/state";
import { commonCreateAsyncThunk } from "@/app/thunk";
import { searchService } from "@/services/search.service";
import { parseSearchCustomers, parseSearchOrders, SearchResult } from "@/model/Search.model";

interface SearchState {
  searchResult: SearchResult;
  requestState: RequestState;
}

const initialState: SearchState = {
  searchResult: {
    orders: [],
    customers: [],
  },
  requestState: { status: 'idle' },
}

export const search: any = commonCreateAsyncThunk({
  type: 'search',
  action: searchService.search
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearActionState: (state) => {
      state.requestState = { status: 'idle' };
    },
    clearSearchResult: (state) => {
      state.searchResult = {
        orders: [],
        customers: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state) => {
        state.requestState = { status: 'loading' };
      })
      .addCase(search.fulfilled, (state, action) => {
        const data = action.payload?.data.data?.results || [];
        if (data.length > 0) {
          data.forEach((item: any) => {
            if (item.indexUid === 'order') {
              state.searchResult.orders = parseSearchOrders(item.hits);
            }

            if (item.indexUid === 'customer') {
              state.searchResult.customers = parseSearchCustomers(item.hits);
            }
          });
        }
        state.requestState = { status: 'completed' };
      })
      .addCase(search.rejected, (state) => {
        state.requestState = { status: 'failed' };
      });
  },
});

export const { clearActionState, clearSearchResult } = searchSlice.actions;
export default searchSlice.reducer;