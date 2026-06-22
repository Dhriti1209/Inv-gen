import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface CustomerState {
  customers: Customer[];
}

const initialState: CustomerState = {
  customers: [],
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addCustomer: (
      state,
      action: PayloadAction<Customer>
    ) => {
      state.customers.push(action.payload);
    },

    deleteCustomer: (
      state,
      action: PayloadAction<string>
    ) => {
      state.customers = state.customers.filter(
        (customer) =>
          customer.id !== action.payload
      );
    },
  },
});

export const {
  addCustomer,
  deleteCustomer,
} = customerSlice.actions;

export default customerSlice.reducer;