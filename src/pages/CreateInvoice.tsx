import { useState } from "react";

function CreateInvoice() {
  const [customerName, setCustomerName] =
    useState("");

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">
        Create Invoice
      </h1>

      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) =>
          setCustomerName(e.target.value)
        }
        className="border p-2 w-full rounded"
      />
    </div>
  );
}

export default CreateInvoice;