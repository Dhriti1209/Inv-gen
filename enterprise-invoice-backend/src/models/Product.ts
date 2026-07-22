import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  productName: string;
  description: string;
  hsnCode: string;
  price: number;
  gstRate: number;
  unit: string;
  company: mongoose.Types.ObjectId | null;
}

const productSchema = new Schema<IProduct>(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    hsnCode: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    gstRate: {
      type: Number,
      default: 18,
    },

    unit: {
      type: String,
      default: "Nos",
    },

    company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>("Product", productSchema);