import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../app/store";

import {
  addCustomer,
  deleteCustomer,
} from "../features/customers/customerSlice";

const Customers = () => {
  const dispatch = useDispatch();

  const customers = useSelector(
    (state: RootState) =>
      state.customer.customers
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] =
    useState("");

  const handleAddCustomer = () => {
    if (
      !name ||
      !email ||
      !phone ||
      !address
    )
      return;

    dispatch(
      addCustomer({
        id: Date.now().toString(),
        name,
        email,
        phone,
        address,
      })
    );

    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
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

        <div className="grid grid-cols-2 gap-4">
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

          <input
            placeholder="Address"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
            className="border p-3 rounded"
          />
        </div>

        <button
          onClick={handleAddCustomer}
          className="
            mt-4
            bg-blue-500
            text-white
            px-4
            py-2
            rounded
          "
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
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>

                <td>{customer.email}</td>

                <td>{customer.phone}</td>

                <td>{customer.address}</td>

                <td>
                  <button
                    onClick={() =>
                      dispatch(
                        deleteCustomer(
                          customer.id
                        )
                      )
                    }
                    className="
                      bg-red-500
                      text-white
                      px-3
                      py-1
                      rounded
                    "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;