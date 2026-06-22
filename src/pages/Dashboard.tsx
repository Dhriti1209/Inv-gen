const Dashboard = () => {
  const stats = [
    {
      title: "Customers",
      value: "12",
    },
    {
      title: "Invoices",
      value: "28",
    },
    {
      title: "Pending",
      value: "5",
    },
    {
      title: "Revenue",
      value: "₹45,000",
    },
  ];

  const recentInvoices = [
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
      <h1 className="text-4xl font-bold text-gray-700 mb-8">
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            <h3 className="text-gray-500 text-sm">
              {stat.title}
            </h3>

            <p className="text-3xl font-bold text-blue-500 mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Invoices */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Recent Invoices
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">
                Invoice ID
              </th>

              <th className="text-left py-3">
                Customer
              </th>

              <th className="text-left py-3">
                Amount
              </th>

              <th className="text-left py-3">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {recentInvoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b"
              >
                <td className="py-3">
                  {invoice.id}
                </td>

                <td className="py-3">
                  {invoice.customer}
                </td>

                <td className="py-3">
                  {invoice.amount}
                </td>

                <td className="py-3">
                  <span
                    className={
                      invoice.status === "Paid"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }
                  >
                    {invoice.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;