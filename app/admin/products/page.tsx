"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, X, Upload, Image as ImageIcon, Check, Loader2, AlertCircle, ToggleLeft, ToggleRight, RefreshCcw } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import productsData from "@/lib/products.json";

const DEFAULT_STUDIO = {
  name: "Khushi Chauhan Designer Studio",
  address: "Shop no. 113, 114, 115 Swaraj Plaza, 72 Rajpur Road, Dehradun-248001",
  landmark: "Opp. Madhu Ban Hotel, Uttarakhand",
};

export default function ProductsPage() {
  const EMPTY_DETAILS_FIELDS = {
    colour: "",
    styleNo: "",
    numberOfComponents: "",
    washCare: "",
    countryOfOrigin: "",
    fabric: "",
    work: "",
    includes: "",
  };

  const parseDetailsToFields = (details?: string[]) => {
    const get = (label: string) => {
      if (!details?.length) return "";
      const found = details.find((d) => d.startsWith(`${label}:`));
      if (!found) return "";
      return found.slice(label.length + 1).trim(); // after colon
    };

    return {
      colour: get("Colour"),
      styleNo: get("Style No"),
      numberOfComponents: get("Number of component"),
      washCare: get("Wash Care"),
      countryOfOrigin: get("Country of Origin"),
      fabric: get("Fabric"),
      work: get("Work"),
      includes: get("Includes"),
    };
  };

  const buildDetailsFromFields = (fields: typeof EMPTY_DETAILS_FIELDS) => {
    return [
      `Colour: ${fields.colour ?? ""}`.trimEnd(),
      `Style No: ${fields.styleNo ?? ""}`.trimEnd(),
      `Number of component: ${fields.numberOfComponents ?? ""}`.trimEnd(),
      `Wash Care: ${fields.washCare ?? ""}`.trimEnd(),
      `Country of Origin: ${fields.countryOfOrigin ?? ""}`.trimEnd(),
      `Fabric: ${fields.fabric ?? ""}`.trimEnd(),
      `Work: ${fields.work ?? ""}`.trimEnd(),
      `Includes: ${fields.includes ?? ""}`.trimEnd(),
    ];
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const defaultStudio = (productsData as any[])[0]?.studio ?? DEFAULT_STUDIO;

  const [newProduct, setNewProduct] = useState({
    name: "",
    tagline: "",
    category: "Lehenga",
    subCategory: "Lehenga",
    price: "",
    description: "",
    isOutOfStock: false,
    video: "",
    details: { ...EMPTY_DETAILS_FIELDS },
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const MAX_IMAGES = 7;
      const filesArray = Array.from(e.target.files);

      // Allow incremental uploads (user can select images multiple times).
      const remaining = Math.max(0, MAX_IMAGES - selectedFiles.length);
      const filesToAdd = remaining > 0 ? filesArray.slice(0, remaining) : [];

      if (filesToAdd.length === 0) {
        setError(`You can upload up to ${MAX_IMAGES} images.`);
        // Reset input so same file selection triggers `onChange` again.
        e.target.value = "";
        return;
      }

      setError(null);
      setSelectedFiles((prev) => [...prev, ...filesToAdd]);

      const urls = filesToAdd.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...urls]);

      // Reset input so selecting the same file again triggers `onChange`.
      e.target.value = "";
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, { cache: 'no-store' });
      if (!res.ok) throw new Error("Failed to load products from the database");
      const data = await res.json();
      if (Array.isArray(data)) {
        // Map backend relative paths to absolute URLs
        const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "");
        const formattedData = data.map(p => ({
          ...p,
          image: p.image?.startsWith("http") ? p.image : `${backendUrl}${p.image}`,
          images: p.images?.map((img: string) => img.startsWith("http") ? img : `${backendUrl}${img}`)
        }));
        setProducts(formattedData);
      } else {
        setProducts([]);
        setError("Invalid data format from the API");
      }
    } catch (error: any) {
      console.error("Failed to fetch products:", error);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const productId = newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const detailsLines = buildDetailsFromFields(newProduct.details);

    // Your storefront expects multiple gallery images.
    // (Products.json uses 6-7 images per item.)
    if (selectedFiles.length < 6) {
      setError("Please upload at least 6 product images (recommended: 6-7).");
      setIsLoading(false);
      return;
    }
    
    const formData = new FormData();
    formData.append("id", productId);
    formData.append("slug", productId);
    formData.append("name", newProduct.name);
    formData.append("category", newProduct.category);
    formData.append("subCategory", newProduct.subCategory?.trim() || newProduct.category);
    formData.append("price", newProduct.price);
    formData.append("description", newProduct.description);
    formData.append("tagline", newProduct.tagline?.trim() || `Elegant ${newProduct.name}`);
    formData.append("isOutOfStock", String(newProduct.isOutOfStock));
    if (newProduct.video?.trim()) {
      formData.append("video", newProduct.video.trim());
    }

    // `studio` is static across products, but backend parsers may expect either:
    // 1) bracketed keys: `studio[name]`, or
    // 2) a nested object: `studio` as JSON string.
    const studioToSend = defaultStudio;
    formData.append("studio", JSON.stringify(studioToSend));
    formData.append("studio[name]", studioToSend.name);
    formData.append("studio[address]", studioToSend.address);
    formData.append("studio[landmark]", studioToSend.landmark);

    // Backend should store `details` as an array of "Label: Value" strings.
    // Send both JSON and indexed fields for compatibility.
    formData.append("details", JSON.stringify(detailsLines));
    detailsLines.forEach((line, idx) => {
      formData.append(`details[${idx}]`, line);
    });
    
    selectedFiles.forEach(file => {
      formData.append("images", file);
    });
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: "POST",
        body: formData
      });
      if (res.ok) {
        fetchProducts();
        setIsAddModalOpen(false);
        setNewProduct({
          name: "",
          tagline: "",
          category: "Lehenga",
          subCategory: "Lehenga",
          price: "",
          description: "",
          isOutOfStock: false,
          video: "",
          details: { ...EMPTY_DETAILS_FIELDS },
        });
        setSelectedFiles([]);
        setPreviewUrls([]);
      } else {
        const errData = await res.json();
        setError(errData.message || "Failed to add product to the database.");
      }
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred while adding the product.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData();
    const studioToSend = selectedProduct?.studio ?? defaultStudio;
    if (studioToSend) {
      formData.append("studio", JSON.stringify(studioToSend));
      formData.append("studio[name]", studioToSend.name);
      formData.append("studio[address]", studioToSend.address);
      formData.append("studio[landmark]", studioToSend.landmark);
    }
    formData.append("name", selectedProduct.name);
    formData.append("category", selectedProduct.category);
    formData.append("subCategory", selectedProduct.subCategory?.trim() || selectedProduct.category);
    formData.append("price", String(selectedProduct.price));
    formData.append("description", selectedProduct.description);
    formData.append("tagline", selectedProduct.tagline?.trim() || `Elegant ${selectedProduct.name}`);
    if (selectedProduct.video?.trim()) {
      formData.append("video", selectedProduct.video.trim());
    }
    formData.append("isOutOfStock", String(selectedProduct.isOutOfStock));

    // Keep product details in sync with what we render in the edit modal.
    if (Array.isArray(selectedProduct.details)) {
      formData.append("details", JSON.stringify(selectedProduct.details));
      selectedProduct.details.forEach((line: string, idx: number) => {
        formData.append(`details[${idx}]`, line);
      });
    }
    
    if (selectedFiles.length > 0) {
      selectedFiles.forEach(file => {
        formData.append("images", file);
      });
    }
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${selectedProduct.id}`, {
        method: "PUT",
        body: formData
      });
      if (res.ok) {
        fetchProducts();
        setIsEditModalOpen(false);
        setSelectedProduct(null);
        setSelectedFiles([]);
        setPreviewUrls([]);
      } else {
        const errData = await res.json();
        setError(errData.message || "Failed to update product in the database.");
      }
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred while updating the product.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStockStatus = async (product: any) => {
    const updatedProduct = { ...product, isOutOfStock: !product.isOutOfStock };
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct)
      });
      if (res.ok) {
        fetchProducts(); // Re-fetch to see changes
      } else {
        setError("Failed to toggle stock status.");
      }
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred while toggling stock.");
    }
  };

  const deleteProduct = async (productId: string) => {
    if (window.confirm("Are you sure you want to permanently delete this product from the database?")) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, {
          method: "DELETE"
        });
        if (res.ok) {
          fetchProducts(); // Re-fetch to see changes
        } else {
          setError("Failed to delete product from the database.");
        }
      } catch (error: any) {
        setError(error.message || "An unexpected error occurred while deleting the product.");
      }
    }
  };

  const filteredProducts = products.filter(p => {
    const nameMatch = p.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = p.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSearch = nameMatch || categoryMatch;
    
    const matchesCategory = categoryFilter === "All Categories" || p.category === categoryFilter;
    const matchesStatus = statusFilter === "All Status" || 
                          (statusFilter === "In Stock" && !p.isOutOfStock) || 
                          (statusFilter === "Out of Stock" && p.isOutOfStock);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const selectedDetailsFields = selectedProduct ? parseDetailsToFields(selectedProduct.details) : EMPTY_DETAILS_FIELDS;
  const setEditDetailsField = (key: keyof typeof EMPTY_DETAILS_FIELDS, value: string) => {
    if (!selectedProduct) return;
    const nextFields = { ...selectedDetailsFields, [key]: value };
    setSelectedProduct({
      ...selectedProduct,
      details: buildDetailsFromFields(nextFields),
    });
  };

  return (
    <div className="space-y-8 font-josefin">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-slate-900">Products</h1>
          <p className="text-slate-500 mt-1">Live management of products.json</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={fetchProducts}
            className="flex items-center gap-2 px-4 py-3 bg-white border border-[#F0E6D2] text-slate-600 font-medium rounded-xl hover:bg-[#FDFBF7] transition-all"
          >
            <RefreshCcw size={18} className={isLoading ? "animate-spin" : ""} />
            Sync
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#C5A059] text-white font-medium rounded-xl hover:bg-[#B38F4D] transition-all duration-300 shadow-lg shadow-[#C5A059]/20"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-700">
          <AlertCircle size={20} />
          <p className="font-medium">{error}</p>
          <button onClick={fetchProducts} className="ml-auto underline font-bold">Try Again</button>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Products", value: products.length, icon: ImageIcon, color: "bg-blue-50 text-blue-600" },
          { label: "In Stock", value: products.filter(p => !p.isOutOfStock).length, icon: Check, color: "bg-emerald-50 text-emerald-600" },
          { label: "Out of Stock", value: products.filter(p => p.isOutOfStock).length, icon: AlertCircle, color: "bg-red-50 text-red-600" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-[#F0E6D2] shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-5 rounded-2xl border border-[#F0E6D2] shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/20 focus:border-[#C5A059] transition-all"
          />
        </div>
        <div className="flex gap-3">
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/20 transition-all"
          >
            <option>All Categories</option>
            <option>Lehenga</option>
            <option>Saree</option>
            <option>Suit</option>
            <option>Drape</option>
            <option>Dress</option>
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/20 transition-all"
          >
            <option>All Status</option>
            <option>In Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-[#F0E6D2] rounded-2xl shadow-sm overflow-hidden min-h-100">
        {isLoading ? (
          <div className="h-100 flex flex-col items-center justify-center gap-4">
            <Loader2 size={40} className="animate-spin text-[#C5A059]" />
            <p className="text-slate-500 animate-pulse font-medium uppercase tracking-widest text-xs">Accessing products.json...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="h-100 flex flex-col items-center justify-center gap-4 text-slate-400">
            <ImageIcon size={48} className="opacity-20" />
            <p className="font-medium">No products found matching your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-[#F0E6D2]">
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Product Info</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E6D2]">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-[#FDFBF7] transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200">
                          <Image 
                            src={product.image || "/images/placeholder.jpg"} 
                            alt={product.name || "Product"} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="max-w-60">
                          <span className="font-bold text-slate-900 block truncate">{product.name}</span>
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider">{product.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-bold text-slate-900">₹{Number(product.price).toLocaleString("en-IN")}</td>
                    <td className="px-8 py-5">
                      <button 
                        onClick={() => toggleStockStatus(product.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border uppercase tracking-wider ${
                          !product.isOutOfStock 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100' 
                            : 'bg-red-50 text-red-700 border-red-100 hover:bg-red-100'
                        }`}
                      >
                        {product.isOutOfStock ? <ToggleLeft size={16} className="text-red-400" /> : <ToggleRight size={16} className="text-emerald-400" />}
                        {product.isOutOfStock ? "Out of Stock" : "In Stock"}
                      </button>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsEditModalOpen(true);
                          }}
                          className="p-2.5 hover:bg-white border border-transparent hover:border-[#F0E6D2] rounded-xl text-slate-400 hover:text-[#C5A059] transition-all shadow-sm"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          className="p-2.5 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-xl text-slate-400 hover:text-red-500 transition-all shadow-sm"
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
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl border border-[#F0E6D2] overflow-hidden">
              <div className="p-10 border-b border-[#F0E6D2] flex justify-between items-center bg-[#FDFBF7]">
                <div>
                  <h2 className="text-3xl font-playfair font-bold text-slate-900 tracking-tight">Add New Product</h2>
                  <p className="text-slate-500 text-sm mt-1">This will update products.json immediately.</p>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="p-3 hover:bg-white rounded-full text-slate-400 transition-all border border-transparent hover:border-[#F0E6D2]"><X size={24} /></button>
              </div>
              <form onSubmit={handleAddProduct} className="p-10 max-h-[70vh] overflow-y-auto space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Product Name</label>
                    <input required type="text" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all" placeholder="e.g. Royal Bridal Lehenga" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct((prev) => {
                        const nextCategory = e.target.value;
                        const nextSubCategory =
                          !prev.subCategory?.trim() || prev.subCategory === prev.category
                            ? nextCategory
                            : prev.subCategory;
                        return { ...prev, category: nextCategory, subCategory: nextSubCategory };
                      })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all"
                    >
                      <option>Lehenga</option><option>Saree</option><option>Suit</option><option>Drape</option><option>Dress</option>
                    </select>

                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mt-4">Sub Category</label>
                    <input
                      required
                      type="text"
                      value={newProduct.subCategory}
                      onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all"
                      placeholder="e.g. Bridal Lehenga / Festive Lehenga"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Price (₹)</label>
                    <input required type="number" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all" placeholder="65000" />

                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mt-4">Tagline</label>
                    <input
                      type="text"
                      value={newProduct.tagline}
                      onChange={(e) => setNewProduct({ ...newProduct, tagline: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all"
                      placeholder="e.g. Red Magestic Twirl of 32 Kali"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Product Images (Gallery)</label>
                    <p className="text-[12px] text-slate-500 -mt-2">Recommended: upload 6-7 images.</p>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative w-24 h-24 rounded-xl overflow-hidden border border-[#F0E6D2]">
                          <Image src={url} alt="Preview" fill className="object-cover" />
                        </div>
                      ))}
                      <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-[#F0E6D2] rounded-xl cursor-pointer hover:bg-slate-50 transition-all text-slate-400">
                        <Upload size={20} />
                        <span className="text-[10px] font-bold mt-1 uppercase">Upload</span>
                        <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
                      </label>
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Video (URL / Path)</label>
                    <input
                      type="text"
                      value={newProduct.video}
                      onChange={(e) => setNewProduct({ ...newProduct, video: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all"
                      placeholder="/videos/32.mp4 or https://example.com/video.mp4"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Description</label>
                    <textarea required rows={4} value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all resize-none" placeholder="Craftsmanship details..." />
                  </div>

                  <div className="md:col-span-2 border-t border-[#F0E6D2] pt-8 space-y-6">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Product Details (Specs)</p>
                      <p className="text-slate-500 text-sm mt-1">This fills the specs table on the product page.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Colour</label>
                        <input
                          required
                          type="text"
                          value={newProduct.details.colour}
                          onChange={(e) => setNewProduct({ ...newProduct, details: { ...newProduct.details, colour: e.target.value } })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all"
                          placeholder="e.g. Space Cherry"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Style No</label>
                        <input
                          required
                          type="text"
                          value={newProduct.details.styleNo}
                          onChange={(e) => setNewProduct({ ...newProduct, details: { ...newProduct.details, styleNo: e.target.value } })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all"
                          placeholder="e.g. KCB001"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Number of component</label>
                        <input
                          required
                          type="text"
                          value={newProduct.details.numberOfComponents}
                          onChange={(e) => setNewProduct({ ...newProduct, details: { ...newProduct.details, numberOfComponents: e.target.value } })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all"
                          placeholder="e.g. 3"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Wash Care</label>
                        <input
                          required
                          type="text"
                          value={newProduct.details.washCare}
                          onChange={(e) => setNewProduct({ ...newProduct, details: { ...newProduct.details, washCare: e.target.value } })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all"
                          placeholder="e.g. Dry clean only"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Country of Origin</label>
                        <input
                          required
                          type="text"
                          value={newProduct.details.countryOfOrigin}
                          onChange={(e) => setNewProduct({ ...newProduct, details: { ...newProduct.details, countryOfOrigin: e.target.value } })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all"
                          placeholder="e.g. India"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Fabric</label>
                        <input
                          required
                          type="text"
                          value={newProduct.details.fabric}
                          onChange={(e) => setNewProduct({ ...newProduct, details: { ...newProduct.details, fabric: e.target.value } })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all"
                          placeholder="e.g. Rich Silk & Georgette"
                        />
                      </div>

                      <div className="space-y-3 md:col-span-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Work</label>
                        <textarea
                          required
                          rows={3}
                          value={newProduct.details.work}
                          onChange={(e) => setNewProduct({ ...newProduct, details: { ...newProduct.details, work: e.target.value } })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all resize-none"
                          placeholder="e.g. Gotta Patti & Hand Embroidery"
                        />
                      </div>

                      <div className="space-y-3 md:col-span-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Includes</label>
                        <textarea
                          required
                          rows={2}
                          value={newProduct.details.includes}
                          onChange={(e) => setNewProduct({ ...newProduct, details: { ...newProduct.details, includes: e.target.value } })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all resize-none"
                          placeholder="e.g. Lehenga, Blouse, Dupatta"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 px-8 py-5 border border-[#F0E6D2] text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all">Cancel</button>
                  <button type="submit" className="flex-1 px-8 py-5 bg-[#C5A059] text-white font-bold rounded-2xl hover:bg-[#B38F4D] transition-all shadow-xl shadow-[#C5A059]/20">Publish Product</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Product Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEditModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl border border-[#F0E6D2] overflow-hidden">
              <div className="p-10 border-b border-[#F0E6D2] flex justify-between items-center bg-[#FDFBF7]">
                <div>
                  <h2 className="text-3xl font-playfair font-bold text-slate-900 tracking-tight">Edit Product</h2>
                  <p className="text-slate-500 text-sm mt-1">Updates will sync to storefront instantly.</p>
                </div>
                <button onClick={() => setIsEditModalOpen(false)} className="p-3 hover:bg-white rounded-full text-slate-400 transition-all border border-transparent hover:border-[#F0E6D2]"><X size={24} /></button>
              </div>
              <form onSubmit={handleUpdateProduct} className="p-10 max-h-[70vh] overflow-y-auto space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Product Name</label>
                    <input required type="text" value={selectedProduct.name} onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
                    <select
                      value={selectedProduct.category}
                      onChange={(e) => setSelectedProduct((prev: any) => {
                        const nextCategory = e.target.value;
                        const nextSubCategory =
                          !prev.subCategory?.trim() || prev.subCategory === prev.category ? nextCategory : prev.subCategory;
                        return { ...prev, category: nextCategory, subCategory: nextSubCategory };
                      })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all"
                    >
                      <option>Lehenga</option><option>Saree</option><option>Suit</option><option>Drape</option><option>Dress</option>
                    </select>

                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mt-4">Sub Category</label>
                    <input
                      required
                      type="text"
                      value={selectedProduct.subCategory ?? selectedProduct.category}
                      onChange={(e) => setSelectedProduct({ ...selectedProduct, subCategory: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Price (₹)</label>
                    <input required type="number" value={selectedProduct.price} onChange={(e) => setSelectedProduct({...selectedProduct, price: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all" />

                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mt-4">Tagline</label>
                    <input
                      type="text"
                      value={selectedProduct.tagline ?? ""}
                      onChange={(e) => setSelectedProduct({ ...selectedProduct, tagline: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all"
                      placeholder="e.g. Red Magestic Twirl..."
                    />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Product Images (Gallery)</label>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {/* Show current images if no new files selected */}
                      {previewUrls.length === 0 && selectedProduct.images?.map((url: string, index: number) => (
                        <div key={index} className="relative w-24 h-24 rounded-xl overflow-hidden border border-[#F0E6D2]">
                          <Image src={url} alt="Current" fill className="object-cover" />
                        </div>
                      ))}
                      {/* Show new previews if files selected */}
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative w-24 h-24 rounded-xl overflow-hidden border border-[#F0E6D2]">
                          <Image src={url} alt="Preview" fill className="object-cover" />
                        </div>
                      ))}
                      <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-[#F0E6D2] rounded-xl cursor-pointer hover:bg-slate-50 transition-all text-slate-400">
                        <Upload size={20} />
                        <span className="text-[10px] font-bold mt-1 uppercase">Upload</span>
                        <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
                      </label>
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Video (URL / Path)</label>
                    <input
                      type="text"
                      value={selectedProduct.video ?? ""}
                      onChange={(e) => setSelectedProduct({ ...selectedProduct, video: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all"
                      placeholder="/videos/32.mp4 or https://example.com/video.mp4"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Description</label>
                    <textarea required rows={4} value={selectedProduct.description} onChange={(e) => setSelectedProduct({...selectedProduct, description: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all resize-none" />
                  </div>

                  <div className="md:col-span-2 border-t border-[#F0E6D2] pt-8 space-y-6">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Product Details (Specs)</p>
                      <p className="text-slate-500 text-sm mt-1">Edit the specs table fields.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Colour</label>
                        <input
                          required
                          type="text"
                          value={selectedDetailsFields.colour}
                          onChange={(e) => setEditDetailsField("colour", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all"
                          placeholder="e.g. Space Cherry"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Style No</label>
                        <input
                          required
                          type="text"
                          value={selectedDetailsFields.styleNo}
                          onChange={(e) => setEditDetailsField("styleNo", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all"
                          placeholder="e.g. KCB001"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Number of component</label>
                        <input
                          required
                          type="text"
                          value={selectedDetailsFields.numberOfComponents}
                          onChange={(e) => setEditDetailsField("numberOfComponents", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all"
                          placeholder="e.g. 3"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Wash Care</label>
                        <input
                          required
                          type="text"
                          value={selectedDetailsFields.washCare}
                          onChange={(e) => setEditDetailsField("washCare", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all"
                          placeholder="e.g. Dry clean only"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Country of Origin</label>
                        <input
                          required
                          type="text"
                          value={selectedDetailsFields.countryOfOrigin}
                          onChange={(e) => setEditDetailsField("countryOfOrigin", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all"
                          placeholder="e.g. India"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Fabric</label>
                        <input
                          required
                          type="text"
                          value={selectedDetailsFields.fabric}
                          onChange={(e) => setEditDetailsField("fabric", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all"
                          placeholder="e.g. Rich Silk & Georgette"
                        />
                      </div>

                      <div className="space-y-3 md:col-span-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Work</label>
                        <textarea
                          required
                          rows={3}
                          value={selectedDetailsFields.work}
                          onChange={(e) => setEditDetailsField("work", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all resize-none"
                          placeholder="e.g. Gotta Patti & Hand Embroidery"
                        />
                      </div>

                      <div className="space-y-3 md:col-span-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Includes</label>
                        <textarea
                          required
                          rows={2}
                          value={selectedDetailsFields.includes}
                          onChange={(e) => setEditDetailsField("includes", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/5 focus:border-[#C5A059] transition-all resize-none"
                          placeholder="e.g. Lehenga, Blouse, Dupatta"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 px-8 py-5 border border-[#F0E6D2] text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all">Cancel</button>
                  <button type="submit" className="flex-1 px-8 py-5 bg-[#C5A059] text-white font-bold rounded-2xl hover:bg-[#B38F4D] transition-all shadow-xl shadow-[#C5A059]/20">Save Changes</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
