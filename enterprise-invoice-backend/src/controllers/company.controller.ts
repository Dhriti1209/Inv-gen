import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import Company from "../models/Company";

// Create Company
export const createCompany = async (req: AuthRequest, res: Response) => {
  try {
    const {
      companyName,
      gstNumber,
      panNumber,
      email,
      phone,
      address,
      invoicePrefix,
    } = req.body;

    if (!companyName || !email) {
      return res.status(400).json({
        success: false,
        message: "Company name and email are required.",
      });
    }

    const company = await Company.create({
      companyName,
      gstNumber,
      panNumber,
      email,
      phone,
      address,
      invoicePrefix,
      owner: req.user?._id,
    });

    return res.status(201).json({
      success: true,
      message: "Company created successfully.",
      company,
    });
  } catch (error) {
    console.error("Create Company Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All Companies
export const getCompanies = async (req: AuthRequest, res: Response) => {
  try {
    const companies = await Company.find({
      owner: req.user?._id,
    });

    return res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });
  } catch (error) {
    console.error("Get Companies Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Company By ID
export const getCompanyById = async (req: AuthRequest, res: Response) => {
  try {
    const company = await Company.findOne({
      _id: req.params.id,
      owner: req.user?._id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    console.error("Get Company By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update Company
export const updateCompany = async (req: AuthRequest, res: Response) => {
  try {
    const company = await Company.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user?._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company updated successfully.",
      company,
    });
  } catch (error) {
    console.error("Update Company Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete Company
export const deleteCompany = async (req: AuthRequest, res: Response) => {
  try {
    const company = await Company.findOneAndDelete({
      _id: req.params.id,
      owner: req.user?._id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Company Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};