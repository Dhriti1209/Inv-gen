import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const Dashboard = () => {
  const customers = useSelector(
    (state: RootState) =>
      state.customer.customers
  );

  const invoices = useSelector(
    (state: RootState) =>
      state.invoice.invoices
  );

  const revenue = invoices.reduce(
    (sum, invoice) => sum + invoice.total,
    0
  );

  const pendingInvoices =
    invoices.filter(
      (invoice) =>
        invoice.status === "Pending"
    ).length;

  const cards = [
    {
      title: "Customers",
      value: customers.length,
    },
    {
      title: "Invoices",
      value: invoices.length,
    },
    {
      title: "Revenue",
      value: `₹${revenue}`,
    },
    {
      title: "Pending",
      value: pendingInvoices,
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="
              bg-white
              p-6
              rounded-xl
              shadow
            "
          >
            <h3 className="text-gray-500">
              {card.title}
            </h3>

            <p className="text-3xl font-bold mt-2">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;