import { RequestState } from "@/app/state";
import { createSlice } from "@reduxjs/toolkit";

interface OrderState {
  visibleColumns: Map<string, boolean>;
  actionState: RequestState;
}

const initialState: OrderState = {
  visibleColumns: new Map([
    'customer',
    'customerPhone',
    'customerEmail',
    'branch',
    'salesChannel',
    'amount',
    'status',
    'date',
    'time',
    'note'
  ].map(column => [column, true])),
  actionState: { status: 'idle', type: '' },
};

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
  },
  extraReducers: (_builder) => {
  }
})

export const { clearActionState, toggleColumn } = orderSlice.actions;
export default orderSlice.reducer;