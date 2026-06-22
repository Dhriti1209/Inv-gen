import type { Invoice } from "../../features/invoices/invoiceSlice";

interface InvoicePreviewProps {
  invoice: Invoice;
}

const InvoicePreview = ({
  invoice,
}: InvoicePreviewProps) => {
  return (
    <div
      id="invoice-preview"
      className="bg-white p-8 rounded-xl shadow mt-8"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-600">
            InvoiceGen
          </h1>

          <p className="text-gray-500 mt-2">
            Enterprise Invoice Generator
          </p>
        </div>

        <div className="text-right">
          <h2 className="text-2xl font-bold">
            INVOICE
          </h2>

          <p>
            #{invoice.invoiceNumber}
          </p>

          <p className="text-gray-500">
            Status: {invoice.status}
          </p>
        </div>
      </div>

      {/* Customer Details */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-semibold text-lg mb-2">
            Bill To
          </h3>

          <p>{invoice.customerName}</p>
        </div>

        <div className="text-right">
          <p>
            <strong>Issue Date:</strong>{" "}
            {invoice.issueDate}
          </p>

          <p>
            <strong>Due Date:</strong>{" "}
            {invoice.dueDate}
          </p>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3 text-left">
              Description
            </th>

            <th className="border p-3">
              Qty
            </th>

            <th className="border p-3">
              Price
            </th>

            <th className="border p-3">
              Amount
            </th>
          </tr>
        </thead>

        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.id}>
              <td className="border p-3">
                {item.description}
              </td>

              <td className="border p-3 text-center">
                {item.quantity}
              </td>

              <td className="border p-3 text-center">
                ₹{item.price}
              </td>

              <td className="border p-3 text-center">
                ₹
                {item.quantity *
                  item.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div className="flex justify-end mt-8">
        <div className="w-80">
          <div className="flex justify-between py-2">
            <span>Subtotal</span>

            <span>
              ₹{invoice.subtotal}
            </span>
          </div>

          <div className="flex justify-between py-2">
            <span>Tax</span>

            <span>
              ₹{invoice.tax}
            </span>
          </div>

          <hr />

          <div className="flex justify-between py-3 text-xl font-bold">
            <span>Total</span>

            <span>
              ₹{invoice.total}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 border-t pt-4 text-center text-gray-500">
        <p>
          Thank you for your business.
        </p>

        <p>
          Generated using InvoiceGen
        </p>
      </div>
    </div>
  );
};

export default InvoicePreview;