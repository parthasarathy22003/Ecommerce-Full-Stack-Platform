import { useEffect, useState } from "react";
import api from "../api/api.js";
import { useNavigate, useParams } from "react-router";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", price: "", description: "", category: "", image: "", stock: "" });

  const loadProduct = async () => {
    const res = await api.get("/products");
    const product = res.data.find((p) => p.id === parseInt(id));
    if (product) setForm(product);
  };

  useEffect(() => { loadProduct(); }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/update/${id}`, form);
      alert("Product updated!");
      navigate("/admin/products");
    } catch (err) {
      alert("Error updating product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Edit Product</h2>
          <p className="text-gray-500 mt-1">Update your product details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="title" value={form.title} onChange={handleChange} placeholder="Product Title" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" required />
            <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} placeholder="Price ($)" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" required />
          </div>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows="3" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
            <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
            <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
          </div>
          <button type="submit" className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:shadow-lg text-white font-bold py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-md">
            ✏️ Update Product
          </button>
        </form>
      </div>
    </div>
  );
}