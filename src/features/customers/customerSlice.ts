import { createSlice } from "@reduxjs/toolkit";

interface CustomerState {
  customers: any[];
}

const initialState: CustomerState = {
  customers: [],
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomers(state, action) {
      state.customers = action.payload;
    },
  },
});

export const { setCustomers } =
  customerSlice.actions;

export default customerSlice.reducer;