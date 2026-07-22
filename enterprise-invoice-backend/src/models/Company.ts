import mongoose, { Document, Schema } from "mongoose";

export interface ICompany extends Document {
  companyName: string;
  gstNumber: string;
  panNumber: string;
  email: string;
  phone: string;
  address: string;
  invoicePrefix: string;
  owner: mongoose.Types.ObjectId;
}

const companySchema = new Schema<ICompany>(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    gstNumber: {
      type: String,
      default: "",
    },

    panNumber: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    invoicePrefix: {
      type: String,
      default: "INV",
    },

    owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
}
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICompany>("Company", companySchema);