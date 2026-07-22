import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import Product from "../models/Product";
import Company from "../models/Company";

// Create Product
export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const {
      productName,
      description,
      hsnCode,
      price,
      gstRate,
      unit,
    } = req.body;

    if (!productName || price == null) {
      return res.status(400).json({
        success: false,
        message: "Product name and price are required.",
      });
    }

    // Find logged-in user's company
    const company = await Company.findOne({
      owner: req.user?._id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Please create a company first.",
      });
    }

    const product = await Product.create({
      productName,
      description,
      hsnCode,
      price,
      gstRate,
      unit,
      company: company._id,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All Products
export const getProducts = async (req: AuthRequest, res: Response) => {
  try {
    const company = await Company.findOne({
      owner: req.user?._id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    const products = await Product.find({
      company: company._id,
    });

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get Products Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Product By ID
export const getProductById = async (req: AuthRequest, res: Response) => {
  try {
    const company = await Company.findOne({
      owner: req.user?._id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    const product = await Product.findOne({
      _id: req.params.id,
      company: company._id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Get Product By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update Product
export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const company = await Company.findOne({
      owner: req.user?._id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    const product = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
        company: company._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    console.error("Update Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete Product
export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const company = await Company.findOne({
      owner: req.user?._id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      company: company._id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};