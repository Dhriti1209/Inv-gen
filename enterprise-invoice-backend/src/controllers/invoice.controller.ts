import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import Company from "../models/Company";
import Customer from "../models/Customer";
import Product from "../models/Product";
import Invoice from "../models/Invoice";

export const createInvoice = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      customer,
      invoiceDate,
      dueDate,
      items,
      notes,
    } = req.body;

    if (!customer || !invoiceDate || !dueDate || !items?.length) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // Find logged-in user's company
    const company = await Company.findOne({
      owner: req.user?._id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    // Validate customer
    const customerExists = await Customer.findOne({
      _id: customer,
      company: company._id,
    });

    if (!customerExists) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    // Generate Invoice Number
    const totalInvoices = await Invoice.countDocuments({
      company: company._id,
    });

    const invoiceNumber =
      `${company.invoicePrefix}-${String(totalInvoices + 1).padStart(4, "0")}`;

    const invoiceItems = [];

    let subTotal = 0;
    let gstTotal = 0;

    for (const item of items) {

      const product = await Product.findOne({
        _id: item.product,
        company: company._id,
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product}`,
        });
      }

      const quantity = Number(item.quantity);

      const price = product.price;

      const gstRate = product.gstRate;

      const amount = quantity * price;

      const gstAmount = amount * gstRate / 100;

      subTotal += amount;
      gstTotal += gstAmount;

      invoiceItems.push({
        product: product._id,
        productName: product.productName,
        hsnCode: product.hsnCode,
        quantity,
        price,
        gstRate,
        amount,
      });
    }

    const grandTotal = subTotal + gstTotal;

    const invoice = await Invoice.create({
      invoiceNumber,
      company: company._id,
      customer: customerExists._id,
      invoiceDate,
      dueDate,
      items: invoiceItems,
      subTotal,
      gstTotal,
      grandTotal,
      notes,
    });

    return res.status(201).json({
      success: true,
      message: "Invoice created successfully.",
      invoice,
    });

  } catch (error) {
    console.error("Create Invoice Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Get All Invoices (with Search & Filter)
export const getInvoices = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const company = await Company.findOne({
      owner: req.user?._id,
    });
    console.log("User ID:", req.user?._id);
console.log("Company:", company);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    const { search, status } = req.query;

    const filter: any = {
      company: company._id,
    };

    // Filter by status
    if (status && status !== "All") {
      filter.status = status;
    }

    let invoices = await Invoice.find(filter)
      .populate("customer", "customerName email phone")
      .sort({ createdAt: -1 });
      console.log("Invoices:", invoices);

    // Search by invoice number or customer name
    if (search) {
      const keyword = search.toString().toLowerCase();

      invoices = invoices.filter((invoice: any) => {
        const invoiceMatch = invoice.invoiceNumber
          ?.toLowerCase()
          .includes(keyword);

        const customerMatch = invoice.customer?.customerName
          ?.toLowerCase()
          .includes(keyword);

        return invoiceMatch || customerMatch;
      });
    }

    return res.status(200).json({
      success: true,
      count: invoices.length,
      invoices,
    });
  } catch (error) {
    console.error("Get Invoices Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Get Invoice By ID
export const getInvoiceById = async (
  req: AuthRequest,
  res: Response
) => {
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

    const invoice = await Invoice.findOne({
      _id: req.params.id,
      company: company._id,
    })
      .populate("customer")
      .populate("company");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found.",
      });
    }

    return res.status(200).json({
      success: true,
      invoice,
    });
  } catch (error) {
    console.error("Get Invoice By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update Invoice
export const updateInvoice = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { customer, invoiceDate, dueDate, items, notes, status } = req.body;

    const company = await Company.findOne({
      owner: req.user?._id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    const invoice = await Invoice.findOne({
      _id: req.params.id,
      company: company._id,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found.",
      });
    }

    const customerExists = await Customer.findOne({
      _id: customer,
      company: company._id,
    });

    if (!customerExists) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    const invoiceItems = [];

    let subTotal = 0;
    let gstTotal = 0;

    for (const item of items) {
      const product = await Product.findOne({
        _id: item.product,
        company: company._id,
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found.",
        });
      }

      const quantity = Number(item.quantity);
      const amount = quantity * product.price;
      const gstAmount = amount * product.gstRate / 100;

      subTotal += amount;
      gstTotal += gstAmount;

      invoiceItems.push({
        product: product._id,
        productName: product.productName,
        hsnCode: product.hsnCode,
        quantity,
        price: product.price,
        gstRate: product.gstRate,
        amount,
      });
    }

    invoice.customer = customerExists._id;
    invoice.invoiceDate = invoiceDate;
    invoice.dueDate = dueDate;
    invoice.items = invoiceItems;
    invoice.subTotal = subTotal;
    invoice.gstTotal = gstTotal;
    invoice.grandTotal = subTotal + gstTotal;
    invoice.notes = notes;
    invoice.status = status;

    await invoice.save();

    return res.status(200).json({
      success: true,
      message: "Invoice updated successfully.",
      invoice,
    });

  } catch (error) {
    console.error("Update Invoice Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete Invoice
export const deleteInvoice = async (
  req: AuthRequest,
  res: Response
) => {
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

    const invoice = await Invoice.findOneAndDelete({
      _id: req.params.id,
      company: company._id,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Invoice deleted successfully.",
    });

  } catch (error) {
    console.error("Delete Invoice Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Update Invoice Status
export const updateInvoiceStatus = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { status } = req.body;

    const company = await Company.findOne({
      owner: req.user?._id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    const invoice = await Invoice.findOne({
      _id: req.params.id,
      company: company._id,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found.",
      });
    }

    const validStatus = ["Draft", "Sent", "Paid", "Overdue"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    invoice.status = status;

    await invoice.save();

    return res.status(200).json({
      success: true,
      message: "Invoice status updated successfully.",
      invoice,
    });

  } catch (error) {
    console.error("Update Invoice Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};