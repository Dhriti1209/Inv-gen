import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Company",
      path: "/company",
    },
    {
      name: "Customers",
      path: "/customers",
    },
    {
      name: "Products",
      path: "/products",
    },
    {
      name: "Invoices",
      path: "/invoices",
    },
    
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6 border-b">
        <h1 className="text-3xl font-bold text-[#7DA9FF]">
          InvoiceGen
        </h1>
      </div>

      <nav className="p-4 flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-3 rounded-xl transition-all ${
              location.pathname === item.path
                ? "bg-[#7DA9FF] text-white"
                : "hover:bg-[#EEF5FF]"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;