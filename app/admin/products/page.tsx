"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, AlertCircle, Package } from "lucide-react";
import toast from "react-hot-toast";
import ProductFormModal from "../components/ProductFormModal";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  stock: number;
  minStockLevel: number;
  image?: string;
  tagline?: string;
}

export default function AdminProductsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // Load products from localStorage on mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setIsLoading(true);
    try {
      const stored = localStorage.getItem("products");
      const data = stored ? JSON.parse(stored) : [];
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async (productData: any) => {
    try {
      const newProduct = {
        ...productData,
        id: productData.slug || productData.id,
        createdAt: new Date().toISOString(),
      };

      let updated;
      
      if (editingProduct) {
        // Update existing product
        updated = products.map((p) =>
          p.id === editingProduct.id ? { ...newProduct, id: editingProduct.id } : p
        );
        toast.success("✅ Product updated successfully!");
        setEditingProduct(null);
      } else {
        // Add new product
        updated = [...products, newProduct];
        toast.success("✅ Product added successfully!");
      }

      localStorage.setItem("products", JSON.stringify(updated));
      setProducts(updated);
      setShowForm(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to save product");
      throw error;
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const updated = products.filter((p) => p.id !== productId);
      localStorage.setItem("products", JSON.stringify(updated));
      setProducts(updated);
      toast.success("Product deleted!");
    } catch (error: any) {
      toast.error("Failed to delete product");
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    if (!product) return false;

    const name = product.name || "";
    const id = product.id || "";
    const category = product.category || "";

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Calculate stats
  const stats = {
    total: products.length,
    inStock: products.filter((p) => p.stock > 0).length,
    lowStock: products.filter(
      (p) => p.stock > 0 && p.stock <= p.minStockLevel
    ).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] to-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 font-josefin mb-2">
          📦 Product Management
        </h1>
        <p className="text-slate-600">Manage your product inventory and stock</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-[#F0E6D2] shadow-sm">
          <p className="text-slate-600 text-sm mb-2">Total Products</p>
          <p className="text-3xl font-bold text-[#C5A059]">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#F0E6D2] shadow-sm">
          <p className="text-slate-600 text-sm mb-2">In Stock</p>
          <p className="text-3xl font-bold text-green-600">{stats.inStock}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#F0E6D2] shadow-sm">
          <p className="text-slate-600 text-sm mb-2">Low Stock ⚠️</p>
          <p className="text-3xl font-bold text-orange-600">{stats.lowStock}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#F0E6D2] shadow-sm">
          <p className="text-slate-600 text-sm mb-2">Out of Stock ❌</p>
          <p className="text-3xl font-bold text-red-600">{stats.outOfStock}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#C5A059] text-white rounded-lg hover:bg-[#B38F4D] transition font-semibold shadow-md"
        >
          <Plus size={20} /> Add New Product
        </button>

        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-[#F0E6D2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-3 border border-[#F0E6D2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30"
        >
          <option value="All">All Categories</option>
          <option value="Lehenga">Lehenga</option>
          <option value="Saree">Saree</option>
          <option value="Drape">Drape</option>
        </select>
      </div>

      {/* Products Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#C5A059] border-t-transparent"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#F0E6D2]">
          <Package size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-600 text-lg mb-4">
            {products.length === 0
              ? "No products yet. Start by adding your first product!"
              : "No products match your search"}
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-[#C5A059] text-white rounded-lg hover:bg-[#B38F4D] transition"
          >
            Add First Product
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl border border-[#F0E6D2] shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FDFBF7] border-b border-[#F0E6D2]">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Product Info
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Category
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">
                  Price
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">
                  Stock
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, idx) => (
                <tr
                  key={product.id}
                  className="border-b border-[#F0E6D2] hover:bg-[#FDFBF7] transition"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {product.tagline || product.id}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-[#FDFBF7] text-[#C5A059] text-xs font-semibold rounded-full border border-[#F0E6D2]">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-semibold text-slate-900">
                    ₹{product.price?.toLocaleString("en-IN") || 0}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-center">
                      <p className="text-lg font-bold text-slate-900">
                        {product.stock}
                      </p>
                      <p className="text-xs text-slate-500">
                        Min: {product.minStockLevel}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${
                        product.stock === 0
                          ? "bg-red-100 text-red-700"
                          : product.stock <= product.minStockLevel
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {product.stock === 0
                        ? "❌ Out of Stock"
                        : product.stock <= product.minStockLevel
                        ? "⚠️ Low Stock"
                        : "✅ In Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Product Form Modal */}
      {showForm && (
        <ProductFormModal
          onClose={handleCloseForm}
          onSubmit={handleAddProduct}
          editingProduct={editingProduct}
        />
      )}
    </div>
  );
}
