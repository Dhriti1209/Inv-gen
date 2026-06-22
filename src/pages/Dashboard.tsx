const Dashboard = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-[#4B5563] mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-gray-500">
            Total Customers
          </h3>

          <p className="text-3xl font-bold mt-2">
            12
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-gray-500">
            Total Invoices
          </h3>

          <p className="text-3xl font-bold mt-2">
            28
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-gray-500">
            Revenue
          </h3>

          <p className="text-3xl font-bold mt-2">
            ₹45,000
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;