import { useState } from "react";

const CreateInvoice = () => {
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

  const gst = subtotal * 0.18;

  const total = subtotal + gst;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Create Invoice
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <input
          placeholder="Customer Name"
          className="border p-3 rounded w-full mb-6"
        />

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
                    className="border p-2"
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

        <button
          onClick={addItem}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>

        <div className="mt-8 text-right">
          <p>
            Subtotal: ₹{subtotal}
          </p>

          <p>
            GST (18%): ₹{gst}
          </p>

          <h2 className="text-2xl font-bold">
            Total: ₹{total}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;