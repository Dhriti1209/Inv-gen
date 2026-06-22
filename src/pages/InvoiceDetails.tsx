import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "../app/store";

import InvoicePreview from "../components/invoice/InvoicePreview";
import { downloadInvoicePDF } from "../utils/pdfGenerator";

const InvoiceDetails = () => {
  const { id } = useParams();

  const invoice = useSelector(
    (state: RootState) =>
      state.invoice.invoices.find(
        (invoice) => invoice.id === id
      )
  );

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
      <h1 className="text-4xl font-bold mb-8">
        Invoice Details
      </h1>

      <InvoicePreview invoice={invoice} />

      <div className="flex gap-4 mt-6">
        <button
          onClick={downloadInvoicePDF}
          className="
            bg-blue-500
            hover:bg-blue-600
            text-white
            px-5
            py-3
            rounded-lg
          "
        >
          Download PDF
        </button>

        <button
          className="
            bg-green-500
            hover:bg-green-600
            text-white
            px-5
            py-3
            rounded-lg
          "
        >
          Mark Paid
        </button>
      </div>
    </div>
  );
};

export default InvoiceDetails;