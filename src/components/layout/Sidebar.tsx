import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-[#7DA9FF]">
          InvoiceGen
        </h1>
      </div>

      <nav className="px-3 flex flex-col gap-2">
        <Link
          to="/dashboard"
          className="px-4 py-3 rounded-xl hover:bg-[#EEF5FF]"
        >
          Dashboard
        </Link>

        <Link
          to="/customers"
          className="px-4 py-3 rounded-xl hover:bg-[#EEF5FF]"
        >
          Customers
        </Link>

        <Link
          to="/invoices"
          className="px-4 py-3 rounded-xl hover:bg-[#EEF5FF]"
        >
          Invoices
        </Link>

        <Link
          to="/invoices/create"
          className="px-4 py-3 rounded-xl hover:bg-[#EEF5FF]"
        >
          Create Invoice
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;