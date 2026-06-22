import { useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import type { RootState } from "../app/store";

import InvoicePreview from "../components/invoice/InvoicePreview";

import type { Invoice } from "../features/invoices/invoiceSlice";
import { addInvoice } from "../features/invoices/invoiceSlice";

import { downloadInvoicePDF } from "../utils/pdfGenerator";

const CreateInvoice = () => {
  const dispatch = useDispatch();

  const customers = useSelector(
    (state: RootState) =>
      state.customer.customers
  );

  const [customerName, setCustomerName] =
    useState("");

  const [items, setItems] = useState([
    {
      item: "",
      quantity: 1,
      price: 0,
    },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
        item: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  const updateItem = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...items];

    updated[index] = {
      ...updated[index],
      [field]:
        field === "item"
          ? value
          : Number(value),
    };

    setItems(updated);
  };

  const subtotal = items.reduce(
    (sum, item) =>
      sum + item.quantity * item.price,
    0
  );

  const tax = subtotal * 0.18;

  const total = subtotal + tax;

  const invoice: Invoice = {
    id: Date.now().toString(),

    invoiceNumber:
      "INV-" + Date.now(),

    customerName,

    issueDate:
      new Date()
        .toISOString()
        .split("T")[0],

    dueDate:
      new Date()
        .toISOString()
        .split("T")[0],

    items: items.map((item, index) => ({
      id: index.toString(),
      description: item.item,
      quantity: item.quantity,
      price: item.price,
    })),

    subtotal,
    tax,
    total,

    status: "Pending",
  };

  const saveInvoice = () => {
    if (!customerName) {
      alert("Please select a customer");
      return;
    }

    dispatch(addInvoice(invoice));

    alert("Invoice Saved Successfully!");
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Create Invoice
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        {/* Customer Dropdown */}
        <select
          value={customerName}
          onChange={(e) =>
            setCustomerName(
              e.target.value
            )
          }
          className="border p-3 rounded w-full mb-6"
        >
          <option value="">
            Select Customer
          </option>

          {customers.map((customer) => (
            <option
              key={customer.id}
              value={customer.name}
            >
              {customer.name}
            </option>
          ))}
        </select>

        {/* Items Table */}
        <table className="w-full mb-6">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    value={item.item}
                    onChange={(e) =>
                      updateItem(
                        index,
                        "item",
                        e.target.value
                      )
                    }
                    className="border p-2 w-full"
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(
                        index,
                        "quantity",
                        e.target.value
                      )
                    }
                    className="border p-2"
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      updateItem(
                        index,
                        "price",
                        e.target.value
                      )
                    }
                    className="border p-2"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex gap-4 mb-6">
          <button
            onClick={addItem}
            className="
              bg-green-500
              text-white
              px-4
              py-2
              rounded
            "
          >
            Add Item
          </button>

          <button
            onClick={saveInvoice}
            className="
              bg-purple-600
              text-white
              px-4
              py-2
              rounded
            "
          >
            Save Invoice
          </button>
        </div>

        <div className="text-right">
          <p>
            Subtotal: ₹
            {subtotal.toFixed(2)}
          </p>

          <p>
            GST (18%): ₹
            {tax.toFixed(2)}
          </p>

          <h2 className="text-2xl font-bold">
            Total: ₹
            {total.toFixed(2)}
          </h2>
        </div>
      </div>

      <InvoicePreview invoice={invoice} />

      <div className="flex justify-end mt-6">
        <button
          onClick={downloadInvoicePDF}
          className="
            bg-blue-500
            hover:bg-blue-600
            text-white
            px-6
            py-3
            rounded-lg
          "
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default CreateInvoice;