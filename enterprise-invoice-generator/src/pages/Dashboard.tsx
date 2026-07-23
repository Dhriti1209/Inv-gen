import { useEffect, useState } from "react";
import api from "../services/api";

interface RecentInvoice {
  _id: string;
  invoiceNumber: string;
  grandTotal: number;
  status: string;
  createdAt: string;
  customer: {
    _id: string;
    customerName: string;
  };
}

interface DashboardData {
  totalRevenue: number;
  totalInvoices: number;
  totalCustomers: number;
  totalProducts: number;
  recentInvoices: RecentInvoice[];
}

const Dashboard = () => {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/dashboard");
        setDashboard(response.data.data);
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-xl">
        Loading Dashboard...
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="p-8 text-red-500">
        Failed to load dashboard.
      </div>
    );
  }

  const cards = [
    {
      title: "Revenue",
      value: `₹${dashboard.totalRevenue}`,
    },
    {
      title: "Invoices",
      value: dashboard.totalInvoices,
    },
    {
      title: "Customers",
      value: dashboard.totalCustomers,
    },
    {
      title: "Products",
      value: dashboard.totalProducts,
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow p-6"
          >
            <h3 className="text-gray-500 text-lg">
              {card.title}
            </h3>

            <p className="text-3xl font-bold mt-3">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Invoices */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-5">
          Recent Invoices
        </h2>

        {dashboard.recentInvoices.length === 0 ? (
          <p className="text-gray-500">
            No invoices found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Invoice</th>
                  <th className="text-left py-3">Customer</th>
                  <th className="text-left py-3">Status</th>
                  <th className="text-left py-3">Amount</th>
                  <th className="text-left py-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {dashboard.recentInvoices.map((invoice) => (
                  <tr
                    key={invoice._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3">
                      {invoice.invoiceNumber}
                    </td>

                    <td className="py-3">
                      {invoice.customer.customerName}
                    </td>

                    <td className="py-3">
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

                    <td className="py-3">
                      ₹{invoice.grandTotal}
                    </td>

                    <td className="py-3">
                      {new Date(
                        invoice.createdAt
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;