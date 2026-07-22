import { useEffect, useState } from "react";
import api from "../services/api";

import InvoicePreview from "../components/invoice/InvoicePreview";
import { downloadInvoicePDF } from "../utils/pdfGenerator";

interface Customer {
  _id: string;
  customerName: string;
}

interface Product {
  _id: string;
  productName: string;
  hsnCode: string;
  price: number;
  gstRate: number;
}

interface InvoiceItem {
  product: string;
  productName: string;
  hsnCode: string;
  quantity: number;
  price: number;
  gstRate: number;
  amount: number;
}

const CreateInvoice = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [customer, setCustomer] = useState("");

  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [dueDate, setDueDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [notes, setNotes] = useState("");

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      product: "",
      productName: "",
      hsnCode: "",
      quantity: 1,
      price: 0,
      gstRate: 18,
      amount: 0,
    },
  ]);

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchCustomers = async () => {
  try {
    const res = await api.get("/customers");

    console.log("Customers API:", res.data);

    setCustomers(res.data.customers || []);
  } catch (err) {
    console.error("Customer Fetch Error:", err);
    setCustomers([]);
  }
};

const fetchProducts = async () => {
  try {
    const res = await api.get("/products");

    console.log("Products API:", res.data);

    setProducts(res.data.products || []);
  } catch (err) {
    console.error("Product Fetch Error:", err);
    setProducts([]);
  }
};

  const addItem = () => {
    setItems([
      ...items,
      {
        product: "",
        productName: "",
        hsnCode: "",
        quantity: 1,
        price: 0,
        gstRate: 18,
        amount: 0,
      },
    ]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleProductChange = (
    index: number,
    productId: string
  ) => {
    const selected = products.find(
      (p) => p._id === productId
    );

    if (!selected) return;

    const updated = [...items];

    updated[index] = {
      ...updated[index],
      product: selected._id,
      productName: selected.productName,
      hsnCode: selected.hsnCode,
      price: selected.price,
      gstRate: selected.gstRate,
      amount: selected.price * updated[index].quantity,
    };

    setItems(updated);
  };

  const handleQuantityChange = (
    index: number,
    quantity: number
  ) => {
    const updated = [...items];

    updated[index].quantity = quantity;

    updated[index].amount =
      quantity * updated[index].price;

    setItems(updated);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const totalGST = items.reduce(
    (sum, item) =>
      sum + (item.amount * item.gstRate) / 100,
    0
  );

  const grandTotal = subtotal + totalGST;

  const saveInvoice = async () => {
    try {
      await api.post("/invoices", {
        customer,
        invoiceDate,
        dueDate,
        notes,
        items,
      });

      alert("Invoice created successfully!");

      setCustomer("");
      setNotes("");

      setItems([
        {
          product: "",
          productName: "",
          hsnCode: "",
          quantity: 1,
          price: 0,
          gstRate: 18,
          amount: 0,
        },
      ]);
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to create invoice"
      );
    }
  };
    return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Create Invoice
      </h1>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">

        {/* Customer Details */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block font-medium mb-2">
              Customer
            </label>

            <select
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Customer</option>

              {customers.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.customerName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Invoice Date
            </label>

            <input
              type="date"
              value={invoiceDate}
              onChange={(e) =>
                setInvoiceDate(e.target.value)
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Notes
            </label>

            <input
              type="text"
              placeholder="Optional Notes"
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

        </div>

        {/* Items */}

        <div>

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-xl font-semibold">
              Invoice Items
            </h2>

            <button
              onClick={addItem}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Add Item
            </button>

          </div>

          <div className="space-y-4">

            {items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center"
              >
                <select
                  value={item.product}
                  onChange={(e) =>
                    handleProductChange(
                      index,
                      e.target.value
                    )
                  }
                  className="border rounded-lg p-2"
                >
                  <option value="">
                    Select Product
                  </option>

                  {products.map((product) => (
                    <option
                      key={product._id}
                      value={product._id}
                    >
                      {product.productName}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={item.hsnCode}
                  readOnly
                  className="border rounded-lg p-2 bg-gray-100"
                />

                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(e) =>
                    handleQuantityChange(
                      index,
                      Number(e.target.value)
                    )
                  }
                  className="border rounded-lg p-2"
                />

                <input
                  type="number"
                  value={item.price}
                  readOnly
                  className="border rounded-lg p-2 bg-gray-100"
                />

                <input
                  type="number"
                  value={item.gstRate}
                  readOnly
                  className="border rounded-lg p-2 bg-gray-100"
                />

                <input
                  type="number"
                  value={item.amount}
                  readOnly
                  className="border rounded-lg p-2 bg-gray-100"
                />

                <button
                  onClick={() => removeItem(index)}
                  className="bg-red-500 text-white rounded-lg px-3 py-2"
                >
                  Remove
                </button>

              </div>
            ))}

          </div>

        </div>

        {/* Totals */}

        <div className="flex justify-end">

          <div className="w-full md:w-80 space-y-2">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹ {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>GST</span>
              <span>₹ {totalGST.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹ {grandTotal.toFixed(2)}</span>
            </div>

          </div>

        </div>
                {/* Buttons */}

        <div className="flex justify-end gap-4 pt-6">

          <button
            onClick={saveInvoice}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
          >
            Save Invoice
          </button>

          <button
  onClick={() => downloadInvoicePDF("Invoice-Preview")}
  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
>
  Download PDF
</button>

        </div>

      </div>

      {/* Invoice Preview */}

      <div id="invoice-preview" className="mt-10">

        <InvoicePreview
          invoice={{
            customerName:
              customers.find((c) => c._id === customer)?.customerName || "",

            invoiceNumber: "Preview",

            issueDate: invoiceDate,

            dueDate,

            items: items.map((item, index) => ({
  id: index.toString(),
  description: item.productName,
  quantity: item.quantity,
  price: item.price,
})),

            subtotal,

            tax: totalGST,

            total: grandTotal,

            status: "Pending",
          }}
        />

      </div>

    </div>
  );
};

export default CreateInvoice;