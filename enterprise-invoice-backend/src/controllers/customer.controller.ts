import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import Customer from "../models/Customer";
import Company from "../models/Company";

// Create Customer
export const createCustomer = async (req: AuthRequest, res: Response) => {
  try {
    const {
      customerName,
      email,
      phone,
      gstNumber,
      billingAddress,
      shippingAddress,
    } = req.body;

    if (!customerName || !email) {
      return res.status(400).json({
        success: false,
        message: "Customer name and email are required.",
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

    const customer = await Customer.create({
      customerName,
      email,
      phone,
      gstNumber,
      billingAddress,
      shippingAddress,
      company: company._id,
    });

    return res.status(201).json({
      success: true,
      message: "Customer created successfully.",
      customer,
    });
  } catch (error) {
    console.error("Create Customer Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All Customers
export const getCustomers = async (req: AuthRequest, res: Response) => {
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

    const customers = await Customer.find({
      company: company._id,
    });

    return res.status(200).json({
      success: true,
      count: customers.length,
      customers,
    });
  } catch (error) {
    console.error("Get Customers Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Customer By ID
export const getCustomerById = async (req: AuthRequest, res: Response) => {
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

    const customer = await Customer.findOne({
      _id: req.params.id,
      company: company._id,
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    return res.status(200).json({
      success: true,
      customer,
    });
  } catch (error) {
    console.error("Get Customer By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update Customer
export const updateCustomer = async (req: AuthRequest, res: Response) => {
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

    const customer = await Customer.findOneAndUpdate(
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

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully.",
      customer,
    });
  } catch (error) {
    console.error("Update Customer Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete Customer
export const deleteCustomer = async (req: AuthRequest, res: Response) => {
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

    const customer = await Customer.findOneAndDelete({
      _id: req.params.id,
      company: company._id,
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Customer Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};