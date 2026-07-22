import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: "Paid" | "Pending";
}

interface InvoiceState {
  invoices: Invoice[];
}

const initialState: InvoiceState = {
  invoices: [],
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    addInvoice: (
      state,
      action: PayloadAction<Invoice>
    ) => {
      state.invoices.push(action.payload);
    },

    deleteInvoice: (
      state,
      action: PayloadAction<string>
    ) => {
      state.invoices = state.invoices.filter(
        (invoice) => invoice.id !== action.payload
      );
    },

    updateInvoice: (
      state,
      action: PayloadAction<Invoice>
    ) => {
      const index = state.invoices.findIndex(
        (invoice) =>
          invoice.id === action.payload.id
      );

      if (index !== -1) {
        state.invoices[index] = action.payload;
      }
    },
  },
});

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;