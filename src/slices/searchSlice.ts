import { createSlice } from "@reduxjs/toolkit";
import { RequestState } from "@/app/state";
import { commonCreateAsyncThunk } from "@/app/thunk";
import { searchService } from "@/services/search.service";
import { parseSearchCustomers, parseSearchOrders, SearchResult } from "@/model/Search.model";

interface SearchState {
  searchResult: SearchResult;
  requestState: RequestState;
  currentPageOrders: number;
  currentPageCustomers: number;
}

const initialState: SearchState = {
  searchResult: {
    orders: [],
    customers: [],
  },
  currentPageOrders: 0,
  currentPageCustomers: 0,
  requestState: { status: 'idle' },
}

export const searchOrders: any = commonCreateAsyncThunk({
  type: 'searchOrders',
  action: searchService.searchOrders
});

export const searchCustomers: any = commonCreateAsyncThunk({
  type: 'searchCustomers',
  action: searchService.searchCustomers
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
    setCurrentPageOrders: (state, action) => {
      state.currentPageOrders = action.payload;
    },
    setCurrentPageCustomers: (state, action) => {
      state.currentPageCustomers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchOrders.pending, (state) => {
        state.requestState = { status: 'loading' };
      })
      .addCase(searchOrders.fulfilled, (state, action) => {
        const data = action.payload?.data.data?.results || [];
        if (data.length > 0) {
          data.forEach((item: any) => {
            if (item.indexUid === 'order') {
              state.searchResult.orders = parseSearchOrders(item.hits);
            }
          });
        }
        state.requestState = { status: 'completed' };
      })
      .addCase(searchOrders.rejected, (state) => {
        state.requestState = { status: 'failed' };
      })

      .addCase(searchCustomers.pending, (state) => {
        state.requestState = { status: 'loading' };
      })
      .addCase(searchCustomers.fulfilled, (state, action) => {
        const data = action.payload?.data.data?.results || [];
        if (data.length > 0) {
          data.forEach((item: any) => {
            if (item.indexUid === 'customer') {
              state.searchResult.customers = parseSearchCustomers(item.hits);
            }
          });
        }
        state.requestState = { status: 'completed' };
      })
      .addCase(searchCustomers.rejected, (state) => {
        state.requestState = { status: 'failed' };
      });
  },
});

export const { clearActionState, clearSearchResult, setCurrentPageOrders, setCurrentPageCustomers } = searchSlice.actions;
export default searchSlice.reducer;