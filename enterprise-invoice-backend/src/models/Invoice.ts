import mongoose, { Document, Schema } from "mongoose";

interface IInvoiceItem {
  product: mongoose.Types.ObjectId;
  productName: string;
  hsnCode: string;
  quantity: number;
  price: number;
  gstRate: number;
  amount: number;
}

export interface IInvoice extends Document {
  invoiceNumber: string;
  company: mongoose.Types.ObjectId;
  customer: mongoose.Types.ObjectId;

  invoiceDate: Date;
  dueDate: Date;

  items: IInvoiceItem[];

  subTotal: number;
  gstTotal: number;
  grandTotal: number;

  notes?: string;

  status: "Draft" | "Sent" | "Paid" | "Overdue";

  pdfUrl?: string;
}

const invoiceItemSchema = new Schema<IInvoiceItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    hsnCode: {
      type: String,
      default: "",
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
    },

    gstRate: {
      type: Number,
      default: 18,
    },

    amount: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const invoiceSchema = new Schema<IInvoice>(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },

    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    invoiceDate: {
      type: Date,
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    items: {
      type: [invoiceItemSchema],
      required: true,
    },

    subTotal: {
      type: Number,
      required: true,
    },

    gstTotal: {
      type: Number,
      required: true,
    },

    grandTotal: {
      type: Number,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Draft", "Sent", "Paid", "Overdue"],
      default: "Draft",
    },

    pdfUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IInvoice>("Invoice", invoiceSchema);