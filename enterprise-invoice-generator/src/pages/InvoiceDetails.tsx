import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { downloadInvoicePDF } from "../utils/pdfGenerator";

interface Company {
  companyName: string;
  gstNumber: string;
  address: string;
}

interface Customer {
  customerName: string;
  email: string;
  phone: string;
}

interface InvoiceItem {
  productName: string;
  hsnCode: string;
  quantity: number;
  price: number;
  gstRate: number;
  amount: number;
}

interface Invoice {
  _id: string;
  invoiceNumber: string;
  company: Company;
  customer: Customer;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subTotal: number;
  gstTotal: number;
  grandTotal: number;
  notes: string;
  status: string;
}

const InvoiceDetails = () => {
  const { id } = useParams();

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoice();
  }, []);

  const fetchInvoice = async () => {
    try {
      const res = await api.get(`/invoices/${id}`);
      setInvoice(res.data.invoice);
    } catch (error) {
      console.error("Fetch Invoice Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-xl font-semibold">
        Loading Invoice...
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          Invoice Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="p-8">

      <div
  id="invoice-preview"
  className="bg-white shadow rounded-xl p-8"
>

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              {invoice.invoiceNumber}
            </h1>

            <p className="text-gray-500 mt-2">
              Status:{" "}
              <span className="font-semibold">
                {invoice.status}
              </span>
            </p>
          </div>

          <button
  id="download-btn"
  onClick={() =>
    downloadInvoicePDF(invoice.invoiceNumber)
  }
  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg"
>
  Download PDF
</button>


        </div>

        <div className="grid grid-cols-2 gap-10 mb-8">

          <div>
            <h2 className="text-xl font-semibold mb-3">
              Company
            </h2>

            <p>{invoice.company.companyName}</p>

            <p>{invoice.company.address}</p>

            <p>GST: {invoice.company.gstNumber}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              Customer
            </h2>

            <p>{invoice.customer.customerName}</p>

            <p>{invoice.customer.email}</p>

            <p>{invoice.customer.phone}</p>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-10 mb-8">

          <div>
            <p>
              <strong>Invoice Date:</strong>{" "}
              {new Date(invoice.invoiceDate).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p>
              <strong>Due Date:</strong>{" "}
              {new Date(invoice.dueDate).toLocaleDateString()}
            </p>
          </div>

        </div>

        <table className="w-full border">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">
                Product
              </th>

              <th className="p-3 text-left">
                HSN
              </th>

              <th className="p-3 text-left">
                Qty
              </th>

              <th className="p-3 text-left">
                Price
              </th>

              <th className="p-3 text-left">
                GST
              </th>

              <th className="p-3 text-left">
                Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {invoice.items.map((item, index) => (

              <tr
                key={index}
                className="border-t"
              >

                <td className="p-3">
                  {item.productName}
                </td>

                <td className="p-3">
                  {item.hsnCode}
                </td>

                <td className="p-3">
                  {item.quantity}
                </td>

                <td className="p-3">
                  ₹{item.price.toLocaleString()}
                </td>

                <td className="p-3">
                  {item.gstRate}%
                </td>

                <td className="p-3">
                  ₹{item.amount.toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="flex justify-end mt-8">

          <div className="w-80">

            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>₹{invoice.subTotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between py-2">
              <span>GST</span>
              <span>₹{invoice.gstTotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between py-3 border-t text-xl font-bold">
              <span>Grand Total</span>
              <span>₹{invoice.grandTotal.toLocaleString()}</span>
            </div>

          </div>

        </div>

        {invoice.notes && (

          <div className="mt-8">

            <h2 className="font-semibold mb-2">
              Notes
            </h2>

            <p className="text-gray-700">
              {invoice.notes}
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default InvoiceDetails;