import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import Company from "../models/Company";
import Invoice from "../models/Invoice";
import Customer from "../models/Customer";
import Product from "../models/Product";

export const getDashboardData = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    // Find company owned by logged-in user
    const company = await Company.findOne({
      owner: req.user._id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    // Fetch dashboard data in parallel
    const [
      revenueResult,
      totalInvoices,
      totalCustomers,
      totalProducts,
      recentInvoices,
    ] = await Promise.all([
      Invoice.aggregate([
        {
          $match: {
            company: company._id,
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$grandTotal",
            },
          },
        },
      ]),

      Invoice.countDocuments({
        company: company._id,
      }),

      Customer.countDocuments({
        company: company._id,
      }),

      Product.countDocuments({
        company: company._id,
      }),

      Invoice.find({
        company: company._id,
      })
        .populate("customer", "customerName")
        .select(
          "invoiceNumber grandTotal status createdAt customer"
        )
        .sort({
          createdAt: -1,
        })
        .limit(5),
    ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    return res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        totalInvoices,
        totalCustomers,
        totalProducts,
        recentInvoices,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data.",
    });
  }
};