import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

interface Customer {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
}

interface Invoice {
  _id: string;
  invoiceNumber: string;
  customer: Customer;
  invoiceDate: string;
  dueDate: string;
  grandTotal: number;
  status: "Draft" | "Sent" | "Paid" | "Overdue";
}

const Invoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await api.get("/invoices");
      setInvoices(res.data.invoices);
    } catch (error) {
      console.error("Fetch Invoice Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this invoice?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/invoices/${id}`);

      setInvoices((prev) =>
        prev.filter((invoice) => invoice._id !== id)
      );
    } catch (error) {
      console.error("Delete Invoice Error:", error);
      alert("Failed to delete invoice.");
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-lg font-semibold">
        Loading invoices...
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Invoices</h1>

        <Link
          to="/invoices/create"
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          Create Invoice
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Invoice No</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Invoice Date</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-8 text-gray-500"
                >
                  No invoices found.
                </td>
              </tr>
            ) : (
              invoices.map((invoice) => (
                <tr
                  key={invoice._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4">
                    {invoice.invoiceNumber}
                  </td>

                  <td className="p-4">
                    {invoice.customer?.customerName}
                  </td>

                  <td className="p-4">
                    {new Date(
                      invoice.invoiceDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4 font-semibold">
                    ₹{invoice.grandTotal.toLocaleString()}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        invoice.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : invoice.status === "Sent"
                          ? "bg-blue-100 text-blue-700"
                          : invoice.status === "Overdue"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link
                        to={`/invoices/${invoice._id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
                      >
                        View
                      </Link>

                      <button
                        onClick={() => handleDelete(invoice._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;