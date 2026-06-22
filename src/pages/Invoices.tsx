import { Link } from "react-router-dom";

function Invoices() {
  return (
    <div>
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold">
          Invoices
        </h1>

        <Link
          to="/invoices/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Invoice
        </Link>
      </div>
    </div>
  );
}

export default Invoices;