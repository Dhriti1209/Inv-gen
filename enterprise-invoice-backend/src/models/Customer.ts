import mongoose, { Document, Schema } from "mongoose";

export interface ICustomer extends Document {
  customerName: string;
  email: string;
  phone: string;
  gstNumber: string;
  billingAddress: string;
  shippingAddress: string;
  company: mongoose.Types.ObjectId | null;
}

const customerSchema = new Schema<ICustomer>(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      default: "",
    },

    gstNumber: {
      type: String,
      default: "",
    },

    billingAddress: {
      type: String,
      default: "",
    },

    shippingAddress: {
      type: String,
      default: "",
    },

    company: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Company",
  required: true,
}
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICustomer>("Customer", customerSchema);