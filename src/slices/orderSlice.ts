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
  filter: {
    search?: string;
    state: string;
    branch: string;
    dateRange?: DateRange | null;
  };
  statistics: {
    totalOrders: number;
    totalRevenue: number;
    totalCustomers: number;
  };
  orderCountByBranches: {
    branch_id: number;
    count: number;
  }[];
  pagination: Pagination;
  visibleColumns: Map<string, boolean>;
  actionState: RequestState;
}

const initialState: OrderState = {
  orders: [],
  recentOrders: [],
  order: null,
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
  statistics: {
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  },
  orderCountByBranches: [],
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

export const getStatisticsByBranchAndDate: any = commonCreateAsyncThunk({
  type: 'order/getStatisticsByBranchAndDate',
  action: orderService.getStatisticsByBranchAndDate,
});

export const getOrderCountByBranches: any = commonCreateAsyncThunk({
  type: 'order/getOrderCountByBranches',
  action: orderService.getOrderCountByBranches,
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
        const payload = action.payload as any;
        let message = "Có lỗi xảy ra. Vui lòng thử lại.";
        if (payload?.errors?.length > 0) {
          const error = payload.errors[0];
          message = error.message;
        }
        state.actionState = { status: 'failed', type: 'getOrders', error: message };
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
        const payload = action.payload as any;
        let message = "Có lỗi xảy ra. Vui lòng thử lại.";
        if (payload?.errors?.length > 0) {
          const error = payload.errors[0];
          message = error.message;
        }
        state.actionState = { status: 'failed', type: 'getOrdersCount', error: message };
      })
      .addCase(getOrder.pending, (state) => {
        state.actionState = { status: 'loading', type: 'getOrder' };
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.order = parseOrder(action.payload.data.data);
        state.actionState = { status: 'completed', type: 'getOrder' };
      })
      .addCase(getOrder.rejected, (state, action) => {
        const payload = action.payload as any;
        let message = "Có lỗi xảy ra. Vui lòng thử lại.";
        if (payload?.errors?.length > 0) {
          const error = payload.errors[0];
          message = error.message;
        }
        state.actionState = { status: 'failed', type: 'getOrder', error: message };
      })

      .addCase(searchOrders.pending, (state) => {
        state.actionState = { status: 'loading', type: 'searchOrders' };
      })
      .addCase(searchOrders.fulfilled, (state, action) => {
        const data = action.payload.data.data;
        state.orders = parseOrders(data);
        if (data.length > 0) {
          state.pagination.totalRecords = data.length || 0;
          state.pagination.totalPages = 1;
        }
        state.actionState = { status: 'completed', type: 'searchOrders' };
      })
      .addCase(searchOrders.rejected, (state, action) => {
        const payload = action.payload as any;
        let message = "Có lỗi xảy ra. Vui lòng thử lại.";
        if (payload?.errors?.length > 0) {
          const error = payload.errors[0];
          message = error.message;
        }
        state.actionState = { status: 'failed', type: 'searchOrders', error: message };
      })

      .addCase(getRecentOrders.pending, (state) => {
        state.actionState = { status: 'loading', type: 'getRecentOrders' };
      })
      .addCase(getRecentOrders.fulfilled, (state, action) => {
        state.recentOrders = parseOrders(action.payload.data.data);
        state.actionState = { status: 'completed', type: 'getRecentOrders' };
      })
      .addCase(getRecentOrders.rejected, (state, action) => {
        const payload = action.payload as any;
        let message = "Có lỗi xảy ra. Vui lòng thử lại.";
        if (payload?.errors?.length > 0) {
          const error = payload.errors[0];
          message = error.message;
        }
        state.actionState = { status: 'failed', type: 'getRecentOrders', error: message };
      })

      .addCase(getStatisticsByBranchAndDate.pending, (state) => {
        state.actionState = { status: 'loading', type: 'getStatisticsByBranchAndDate' };
      })
      .addCase(getStatisticsByBranchAndDate.fulfilled, (state, action) => {
        console.log(action.payload);
        const data = action.payload.data.data;
        if (data.length > 0) {
          state.statistics.totalOrders = data[0]?.countDistinct?.id || 0;
          state.statistics.totalCustomers = data[0]?.countDistinct?.customer || 0;
          state.statistics.totalRevenue = data[0]?.sum?.total_price || 0;
        }
        state.actionState = { status: 'completed', type: 'getStatisticsByBranchAndDate' };
      })
      .addCase(getStatisticsByBranchAndDate.rejected, (state, action) => {
        const payload = action.payload as any;
        let message = "Có lỗi xảy ra. Vui lòng thử lại.";
        if (payload?.errors?.length > 0) {
          const error = payload.errors[0];
          message = error.message;
        }
        state.actionState = { status: 'failed', type: 'getStatisticsByBranchAndDate', error: message };
      })

      .addCase(getOrderCountByBranches.pending, (state) => {
        state.actionState = { status: 'loading', type: 'getOrderCountByBranches' };
      })
      .addCase(getOrderCountByBranches.fulfilled, (state, action) => {
        const data = action.payload.data.data;
        if (data.length > 0) {
          state.orderCountByBranches = data.map((item: any) => ({
            branch_id: item.branch,
            count: item.countDistinct?.id || 0
          }));
        }
        state.actionState = { status: 'completed', type: 'getOrderCountByBranches' };
      })
      .addCase(getOrderCountByBranches.rejected, (state, action) => {
        const payload = action.payload as any;
        let message = "Có lỗi xảy ra. Vui lòng thử lại.";
        if (payload?.errors?.length > 0) {
          const error = payload.errors[0];
          message = error.message;
        }
        state.actionState = { status: 'failed', type: 'getOrderCountByBranches', error: message };
      });
  }
})

export const { clearActionState, toggleColumn, setPage, setLimit, setFilter, setOrder } = orderSlice.actions;
export default orderSlice.reducer;  