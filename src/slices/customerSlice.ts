import { RequestState } from "@/app/state";
import { commonCreateAsyncThunk } from "@/app/thunk";
import { Customer, parseCustomer, parseCustomers } from "@/model/Customer.model";
import { Pagination } from "@/model/Pagination.mode";
import { customerService } from "@/services/customer.service";
import { createSlice } from "@reduxjs/toolkit";

interface CustomerState {
  customers: Customer[];
  customer: Customer | null;
  filter: {
    search?: string;
    state: string;
    orderCount: string;
    totalExpenditure: string;
  };
  pagination: Pagination;
  requestState: RequestState;
}

const initialState: CustomerState = {
  customers: [],
  customer: null,
  filter: {
    search: '',
    state: '',
    orderCount: '',
    totalExpenditure: '',
  },
  pagination: {
    page: 1,
    limit: 25,
    totalRecords: 0,
    totalPages: 1,
  },
  requestState: { status: 'idle', type: '' },
};

export const getCustomers: any = commonCreateAsyncThunk({
  type: 'customer/getCustomers',
  action: customerService.getCustomers,
});

export const getCustomersCount: any = commonCreateAsyncThunk({
  type: 'customer/getCustomersCount',
  action: customerService.getCustomersCount,
});

export const getCustomer: any = commonCreateAsyncThunk({
  type: 'customer/getCustomer',
  action: customerService.getCustomer,
});

export const searchCustomers: any = commonCreateAsyncThunk({
  type: 'customer/searchCustomers',
  action: customerService.searchCustomers,
});

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    clearCustomerState: (state) => {
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
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.requestState = { status: 'loading', type: 'getCustomers' };
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.customers = parseCustomers(action.payload.data.data);
        state.requestState = { status: 'completed', type: 'getCustomers' };
      })
      .addCase(getCustomers.rejected, (state, action) => {
        const payload = action.payload as any;
        let message = "Có lỗi xảy ra. Vui lòng thử lại.";
        if (payload?.errors?.length > 0) {
          const error = payload.errors[0];
          message = error.message;
        }
        state.requestState = { status: 'failed', type: 'getCustomers', error: message };
      })

      .addCase(getCustomersCount.pending, (state) => {
        state.requestState = { status: 'loading', type: 'getCustomersCount' };
      })
      .addCase(getCustomersCount.fulfilled, (state, action) => {
        const data = action.payload.data.data;
        if (data.length > 0) {
          state.pagination.totalRecords = data[0].count || 0;
          state.pagination.totalPages = Math.ceil((state.pagination.totalRecords || 0) / state.pagination.limit);
        }
        state.pagination.totalPages = Math.ceil((state.pagination.totalRecords || 0) / state.pagination.limit);
        state.requestState = { status: 'completed', type: 'getCustomersCount' };
      })
      .addCase(getCustomersCount.rejected, (state, action) => {
        const payload = action.payload as any;
        let message = "Có lỗi xảy ra. Vui lòng thử lại.";
        if (payload?.errors?.length > 0) {
          const error = payload.errors[0];
          message = error.message;
        }
        state.requestState = { status: 'failed', type: 'getCustomersCount', error: message };
      })

      .addCase(getCustomer.pending, (state) => {
        state.requestState = { status: 'loading', type: 'getCustomer' };
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.customer = parseCustomer(action.payload.data.data);
        state.requestState = { status: 'completed', type: 'getCustomer' };
      })
      .addCase(getCustomer.rejected, (state, action) => {
        const payload = action.payload as any;
        let message = "Có lỗi xảy ra. Vui lòng thử lại.";
        if (payload?.errors?.length > 0) {
          const error = payload.errors[0];
          message = error.message;
        }
        state.requestState = { status: 'failed', type: 'getCustomer', error: message };
      })

      .addCase(searchCustomers.pending, (state) => {
        state.requestState = { status: 'loading', type: 'searchCustomers' };
      })
      .addCase(searchCustomers.fulfilled, (state, action) => {
        const data = action.payload.data.data;
        state.customers = parseCustomers(data);
        if (data.length > 0) {
          state.pagination.totalRecords = data.length || 0;
          state.pagination.totalPages = 1;
        }
        state.requestState = { status: 'completed', type: 'searchCustomers' };
      })
      .addCase(searchCustomers.rejected, (state, action) => {
        const payload = action.payload as any;
        let message = "Có lỗi xảy ra. Vui lòng thử lại.";
        if (payload?.errors?.length > 0) {
          const error = payload.errors[0];
          message = error.message;
        }
        state.requestState = { status: 'failed', type: 'searchCustomers', error: message };
      });
  },
});

export const { clearCustomerState, setPage, setLimit, setFilter } = customerSlice.actions;

export default customerSlice.reducer;