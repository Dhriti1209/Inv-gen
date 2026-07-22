import { useEffect, useState } from "react";
import api from "../services/api";

interface Customer {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [editingId, setEditingId] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data.customers);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await api.put(`/customers/${editingId}`, formData);
        alert("Customer updated successfully!");
      } else {
        await api.post("/customers", formData);
        alert("Customer added successfully!");
      }

      setFormData({
        customerName: "",
        email: "",
        phone: "",
        address: "",
      });

      setEditingId("");

      fetchCustomers();
    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditingId(customer._id);

    setFormData({
      customerName: customer.customerName,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await api.delete(`/customers/${id}`);

      alert("Customer deleted successfully!");

      fetchCustomers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Customers</h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-2xl mb-6">
          {editingId ? "Edit Customer" : "Add Customer"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-3 rounded"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          {editingId ? "Update Customer" : "Add Customer"}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id} className="border-t">
                <td className="p-4">{customer.customerName}</td>
                <td className="p-4">{customer.email}</td>
                <td className="p-4">{customer.phone}</td>
                <td className="p-4">{customer.address}</td>

                <td className="p-4 flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(customer)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(customer._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {customers.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-8 text-gray-500"
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;