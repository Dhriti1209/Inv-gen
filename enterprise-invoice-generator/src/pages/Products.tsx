import { useEffect, useState } from "react";
import api from "../services/api";

interface Product {
  _id: string;
  productName: string;
  description: string;
  hsnCode: string;
  price: number;
  gstRate: number;
  unit: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    gst: "",
  });

  const [editingId, setEditingId] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products);
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
      const productData = {
        productName: formData.productName,
        description: formData.description,
        price: Number(formData.price),
        gstRate: Number(formData.gst),
      };

      if (editingId) {
        await api.put(`/products/${editingId}`, productData);
        alert("Product updated successfully!");
      } else {
        await api.post("/products", productData);
        alert("Product added successfully!");
      }

      setFormData({
        productName: "",
        description: "",
        price: "",
        gst: "",
      });

      setEditingId("");

      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    }
  };

  const handleEdit = async (product: Product) => {
    try {
      const res = await api.get(`/products/${product._id}`);

      const p = res.data.product;

      setEditingId(p._id);

      setFormData({
        productName: p.productName || "",
        description: p.description || "",
        price: p.price?.toString() || "",
        gst: p.gstRate?.toString() || "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed to load product.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Products</h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-2xl mb-6">
          {editingId ? "Edit Product" : "Add Product"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="number"
            name="gst"
            placeholder="GST %"
            value={formData.gst}
            onChange={handleChange}
            className="border p-3 rounded"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">GST</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="p-4">{product.productName}</td>
                <td className="p-4">{product.description}</td>
                <td className="p-4">₹{product.price}</td>
                <td className="p-4">{product.gstRate}%</td>

                <td className="p-4 flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-8 text-gray-500"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;