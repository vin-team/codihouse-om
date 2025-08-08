import { RequestState } from "@/app/state";
import { commonCreateAsyncThunk } from "@/app/thunk";
import { Order, parseOrder, parseOrders } from "@/model/Order.model";
import { Pagination } from "@/model/Pagination.mode";
import { orderService } from "@/services/order.service";
import { createSlice } from "@reduxjs/toolkit";
import { DateRange } from "react-day-picker";

interface OrderState {
  orders: Order[];
  recentOrders: Order[];
  order: Order | null;
  isFilter: boolean;
  filter: {
    search?: string;
    state: string;
    branch: string;
    dateRange?: DateRange | null;
  };
  pagination: Pagination;
  visibleColumns: Map<string, boolean>;
  actionState: RequestState;
}

const initialState: OrderState = {
  orders: [],
  recentOrders: [],
  order: null,
  isFilter: false,
  filter: {
    search: '',
    state: '',
    branch: '',
    dateRange: null,
  },
  pagination: {
    page: 1,
    limit: 25,
    totalRecords: 0,
    totalPages: 1,
  },
  visibleColumns: new Map([
    'customer',
    'customerPhone',
    'customerEmail',
    'branch',
    'source',
    'amount',
    'status',
    'date',
    'time',
    'note'
  ].map(column => [column, true])),
  actionState: { status: 'idle', type: '' },
};

export const getOrders: any = commonCreateAsyncThunk({
  type: 'order/getOrders',
  action: orderService.getOrders,
});

export const getOrdersCount = commonCreateAsyncThunk({
  type: 'order/getOrdersCount',
  action: orderService.getOrdersCount,
});

export const getOrder: any = commonCreateAsyncThunk({
  type: 'order/getOrder',
  action: orderService.getOrder,
});

export const searchOrders: any = commonCreateAsyncThunk({
  type: 'order/searchOrders',
  action: orderService.searchOrders,
});

export const getRecentOrders: any = commonCreateAsyncThunk({
  type: 'order/getRecentOrders',
  action: orderService.getRecentOrders,
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearActionState: (state) => {
      state.actionState = { status: 'idle', type: '' }
    },
    toggleColumn: (state, action) => {
      state.visibleColumns.set(action.payload, !state.visibleColumns.get(action.payload));
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setLimit: (state, action) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 1;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setIsFilter: (state, action) => {
      state.isFilter = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.actionState = { status: 'loading', type: 'getOrders' };
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = parseOrders(action.payload.data.data);
        state.actionState = { status: 'completed', type: 'getOrders' };
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.actionState = { status: 'failed', type: 'getOrders', error: action.error.message };
      })

      .addCase(getOrdersCount.pending, (state) => {
        state.actionState = { status: 'loading', type: 'getOrdersCount' };
      })
      .addCase(getOrdersCount.fulfilled, (state, action) => {
        const data = action.payload.data.data;
        if (data.length > 0) {
          state.pagination.totalRecords = data[0].count || 0;
          state.pagination.totalPages = Math.ceil((state.pagination.totalRecords || 0) / state.pagination.limit);
        }
        state.actionState = { status: 'completed', type: 'getOrdersCount' };
      })

      .addCase(getOrdersCount.rejected, (state, action) => {
        state.actionState = { status: 'failed', type: 'getOrdersCount', error: action.error.message };
      })
      .addCase(getOrder.pending, (state) => {
        state.actionState = { status: 'loading', type: 'getOrder' };
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.order = parseOrder(action.payload.data.data);
        state.actionState = { status: 'completed', type: 'getOrder' };
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.actionState = { status: 'failed', type: 'getOrder', error: action.error.message };
      })

      .addCase(searchOrders.pending, (state) => {
        state.actionState = { status: 'loading', type: 'searchOrders' };
      })
      .addCase(searchOrders.fulfilled, (state, action) => {
        state.orders = parseOrders(action.payload.data.data);
        state.actionState = { status: 'completed', type: 'searchOrders' };
      })
      .addCase(searchOrders.rejected, (state, action) => {
        state.actionState = { status: 'failed', type: 'searchOrders', error: action.error.message };
      })

      .addCase(getRecentOrders.pending, (state) => {
        state.actionState = { status: 'loading', type: 'getRecentOrders' };
      })
      .addCase(getRecentOrders.fulfilled, (state, action) => {
        state.recentOrders = parseOrders(action.payload.data.data);
        state.actionState = { status: 'completed', type: 'getRecentOrders' };
      })
      .addCase(getRecentOrders.rejected, (state, action) => {
        state.actionState = { status: 'failed', type: 'getRecentOrders', error: action.error.message };
      });
  }
})

export const { clearActionState, toggleColumn, setPage, setLimit, setFilter, setIsFilter, setOrder } = orderSlice.actions;
export default orderSlice.reducer;  