import { useState } from "react";

const Customers = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@test.com",
      phone: "9999999999",
    },
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const addCustomer = () => {
    if (!name || !email || !phone) return;

    setCustomers([
      ...customers,
      {
        id: Date.now(),
        name,
        email,
        phone,
      },
    ]);

    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Customers
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl mb-4">
          Add Customer
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="border p-3 rounded"
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="border p-3 rounded"
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="border p-3 rounded"
          />
        </div>

        <button
          onClick={addCustomer}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Customer
        </button>
      </div>

      <div className="bg-white rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;