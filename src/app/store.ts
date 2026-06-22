import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../features/customers/customerSlice";
import authReducer from "../features/auth/authSlice";
import invoiceReducer from "../features/invoices/invoiceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    invoice: invoiceReducer,
    customer: customerReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;