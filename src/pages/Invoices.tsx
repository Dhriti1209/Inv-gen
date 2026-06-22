import { Link } from "react-router-dom";

const Invoices = () => {
  const invoices = [
    {
      id: "INV-001",
      customer: "John Doe",
      amount: "₹5000",
      status: "Paid",
    },
    {
      id: "INV-002",
      customer: "Jane Smith",
      amount: "₹2500",
      status: "Pending",
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-bold">
          Invoices
        </h1>

        <Link
          to="/invoices/create"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Invoice
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.customer}</td>
                <td>{invoice.amount}</td>
                <td>{invoice.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;