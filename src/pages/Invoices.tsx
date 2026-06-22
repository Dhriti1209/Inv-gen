import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../app/store";
import { deleteInvoice } from "../features/invoices/invoiceSlice";

const Invoices = () => {
  const dispatch = useDispatch();

  const invoices = useSelector(
    (state: RootState) =>
      state.invoice.invoices
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Invoices
        </h1>

        <Link
          to="/invoices/create"
          className="
            bg-blue-500
            hover:bg-blue-600
            text-white
            px-5
            py-3
            rounded-lg
          "
        >
          Create Invoice
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">
                Invoice No
              </th>

              <th className="p-4 text-left">
                Customer
              </th>

              <th className="p-4 text-left">
                Total
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="
                    text-center
                    p-8
                    text-gray-500
                  "
                >
                  No invoices found.
                </td>
              </tr>
            ) : (
              invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-t"
                >
                  <td className="p-4">
                    {invoice.invoiceNumber}
                  </td>

                  <td className="p-4">
                    {invoice.customerName}
                  </td>

                  <td className="p-4">
                    ₹{invoice.total}
                  </td>

                  <td className="p-4">
                    <span
                      className={
                        invoice.status ===
                        "Paid"
                          ? "text-green-600 font-semibold"
                          : "text-orange-600 font-semibold"
                      }
                    >
                      {invoice.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link
                        to={`/invoices/${invoice.id}`}
                        className="
                          bg-blue-500
                          hover:bg-blue-600
                          text-white
                          px-3
                          py-2
                          rounded
                        "
                      >
                        View
                      </Link>

                      <button
                        onClick={() =>
                          dispatch(
                            deleteInvoice(
                              invoice.id
                            )
                          )
                        }
                        className="
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          px-3
                          py-2
                          rounded
                        "
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;