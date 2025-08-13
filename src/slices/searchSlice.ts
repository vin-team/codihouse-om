import { createSlice } from "@reduxjs/toolkit";
import { RequestState } from "@/app/state";
import { commonCreateAsyncThunk } from "@/app/thunk";
import { searchService } from "@/services/search.service";
import { parseSearchCustomers, parseSearchOrders, SearchResult } from "@/model/Search.model";

interface SearchState {
  searchResult: SearchResult;
  requestState: RequestState;
  pagination: {
    orders: {
      estimatedTotalHits: number;
      currentPage: number;
    },
    customers: {
      estimatedTotalHits: number;
      currentPage: number;
    }
  };
}

const initialState: SearchState = {
  searchResult: {
    orders: [],
    customers: [],
  },
  pagination: {
    orders: {
      estimatedTotalHits: 0,
      currentPage: 0,
    },
    customers: {
      estimatedTotalHits: 0,
      currentPage: 0,
    }
  },
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
      state.pagination.orders.currentPage = action.payload;
    },
    setCurrentPageCustomers: (state, action) => {
      state.pagination.customers.currentPage = action.payload;
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
              state.pagination.orders.estimatedTotalHits = item.estimatedTotalHits || 0;
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
              state.pagination.customers.estimatedTotalHits = item.estimatedTotalHits || 0;
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