"use client";

import { useState } from "react";
import { X, Plus, Trash2, Loader2, Upload, File } from "lucide-react";
import toast from "react-hot-toast";

interface ProductFormProps {
  onClose: () => void;
  onSubmit?: (data: any) => Promise<void>;
  editingProduct?: any;
}

const DEFAULT_CATEGORIES = ["Lehenga", "Saree", "Drape", "Suit", "Dress"];

export default function ProductForm({ 
  onClose, 
  onSubmit,
  editingProduct 
}: ProductFormProps) {
  const isEditing = !!editingProduct;

  const [formData, setFormData] = useState({
    name: editingProduct?.name || "",
    slug: editingProduct?.slug || "",
    tagline: editingProduct?.tagline || "",
    price: editingProduct?.price || 0,
    category: editingProduct?.category || "Lehenga",
    customCategory: "",
    subCategory: editingProduct?.subCategory || "",
    description: editingProduct?.description || "",
    image: "",
    images: editingProduct?.images || [],
    video: editingProduct?.video || "",
    stock: editingProduct?.stock || 0,
    minStockLevel: editingProduct?.minStockLevel || 5,
    notes: editingProduct?.notes || "",
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [details, setDetails] = useState<string[]>(editingProduct?.details || []);
  const [newDetail, setNewDetail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" || name === "minStockLevel"
          ? parseInt(value) || 0
          : value,
    }));
  };

  // Handle image file uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const newFiles = Array.from(files).filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        toast.error(`${file.name} is not a supported image format`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        return false;
      }
      return true;
    });

    if (imageFiles.length + newFiles.length > 7) {
      toast.error("Maximum 7 images allowed");
      return;
    }

    setImageFiles([...imageFiles, ...newFiles]);
    e.target.value = "";
    toast.success(`${newFiles.length} image(s) added`);
  };

  // Handle video file upload
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["video/mp4", "video/webm", "video/quicktime"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only MP4, WebM, and QuickTime videos are supported");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error("Video must be less than 50MB");
      return;
    }

    setVideoFile(file);
    e.target.value = "";
    toast.success("Video uploaded!");
  };

  // Remove image from list
  const removeImage = (index: number) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const addDetail = () => {
    if (newDetail.trim()) {
      setDetails([...details, newDetail.trim()]);
      setNewDetail("");
      toast.success("Detail added!");
    }
  };

  const removeDetail = (index: number) => {
    setDetails(details.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.slug || !formData.price || !formData.category) {
      toast.error("Please fill all required fields");
      return;
    }

    if (formData.stock === 0) {
      toast.error("Please add stock quantity");
      return;
    }

    if (imageFiles.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }

    setIsLoading(true);

    try {
      // Create FormData for file upload
      const uploadFormData = new FormData();
      
      // Add basic product data
      uploadFormData.append("name", formData.name);
      uploadFormData.append("slug", formData.slug);
      uploadFormData.append("tagline", formData.tagline);
      uploadFormData.append("price", formData.price.toString());
      uploadFormData.append(
        "category",
        formData.customCategory || formData.category
      );
      uploadFormData.append("subCategory", formData.subCategory);
      uploadFormData.append("description", formData.description);
      uploadFormData.append("stock", formData.stock.toString());
      uploadFormData.append("minStockLevel", formData.minStockLevel.toString());
      uploadFormData.append("notes", formData.notes);

      // Add image files
      imageFiles.forEach((file) => {
        uploadFormData.append("images", file);
      });

      // Add video file
      if (videoFile) {
        uploadFormData.append("video", videoFile);
      }

      // Add details as JSON
      uploadFormData.append("details", JSON.stringify(details));

      if (onSubmit) {
        await onSubmit(uploadFormData);
      } else {
        // Default: store locally with base64 encoded files
        const imageUrls = await Promise.all(
          imageFiles.map(
            (file) =>
              new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) =>
                  resolve(e.target?.result as string);
                reader.readAsDataURL(file);
              })
          )
        );

        let videoUrl = "";
        if (videoFile) {
          videoUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) =>
              resolve(e.target?.result as string);
            reader.readAsDataURL(videoFile);
          });
        }

        const productData = {
          ...formData,
          category: formData.customCategory || formData.category,
          images: imageUrls,
          video: videoUrl,
          details,
          id: formData.slug,
          createdAt: new Date().toISOString(),
        };

        const products = JSON.parse(localStorage.getItem("products") || "[]");
        products.push(productData);
        localStorage.setItem("products", JSON.stringify(products));
        toast.success("Product added successfully!");
      }

      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#F0E6D2] sticky top-0 bg-[#FDFBF7]">
          <h2 className="text-2xl font-bold text-slate-900 font-josefin">
            {isEditing ? "✏️ Edit Product" : "➕ Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., 32-kali Bridal Lehenga"
                className="w-full px-4 py-3 border border-[#F0E6D2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="e.g., 32-kali-bridal-lehenga"
                className="w-full px-4 py-3 border border-[#F0E6D2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30"
              />
            </div>
          </div>

          {/* Price & Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="68000"
                className="w-full px-4 py-3 border border-[#F0E6D2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category *
              </label>
              <div className="flex gap-2">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-3 border border-[#F0E6D2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30"
                >
                  {DEFAULT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="custom">+ Add Custom</option>
                </select>
              </div>
              {formData.category === "custom" && (
                <input
                  type="text"
                  value={formData.customCategory}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      customCategory: e.target.value,
                    }))
                  }
                  placeholder="Enter custom category name"
                  className="w-full px-4 py-3 border border-[#F0E6D2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30 mt-2"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Sub Category
              </label>
              <input
                type="text"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleInputChange}
                placeholder="e.g., Bridal"
                className="w-full px-4 py-3 border border-[#F0E6D2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30"
              />
            </div>
          </div>

          {/* Tagline & Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Tagline
            </label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleInputChange}
              placeholder="e.g., Red Majestic Twirl of 32 Kali"
              className="w-full px-4 py-3 border border-[#F0E6D2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Product description and details..."
              rows={3}
              className="w-full px-4 py-3 border border-[#F0E6D2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30"
            />
          </div>

          {/* Images Section */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-3">📸 Product Images (Upload)</h3>
            <div className="mb-3">
              <label className="block mb-2">
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center cursor-pointer hover:bg-blue-100 transition">
                  <Upload size={32} className="mx-auto text-blue-600 mb-2" />
                  <p className="text-blue-700 font-semibold">Click to upload images</p>
                  <p className="text-xs text-blue-600">JPG, PNG, WebP, GIF up to 5MB each</p>
                  <p className="text-xs text-blue-600">Max 7 images</p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {imageFiles.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-2">
                  Uploaded Images ({imageFiles.length}/7)
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {imageFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="relative bg-white border border-blue-200 p-2 rounded group"
                    >
                      <File size={32} className="mx-auto text-blue-600 mb-1" />
                      <p className="text-xs text-blue-700 truncate text-center">
                        {file.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Video - Upload */}
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-3">🎬 Product Video (Optional)</h3>
            <div className="mb-3">
              <label className="block mb-2">
                <div className="border-2 border-dashed border-purple-300 rounded-lg p-4 text-center cursor-pointer hover:bg-purple-100 transition">
                  <Upload size={28} className="mx-auto text-purple-600 mb-2" />
                  <p className="text-purple-700 font-semibold">Click to upload video</p>
                  <p className="text-xs text-purple-600">MP4, WebM, QuickTime up to 50MB</p>
                </div>
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  onChange={handleVideoUpload}
                  className="hidden"
                />
              </label>
            </div>

            {videoFile && (
              <div className="bg-white border border-purple-200 p-3 rounded flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <File size={24} className="text-purple-600" />
                  <span className="text-sm text-purple-700">{videoFile.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setVideoFile(null);
                    toast.success("Video removed");
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Stock Management - Main Section */}
          <div className="bg-green-50 border-2 border-green-300 p-4 rounded-lg">
            <h3 className="font-bold text-green-900 mb-4 text-lg">📦 Stock Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="Enter stock quantity"
                  className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg font-bold"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Minimum Stock Level
                </label>
                <input
                  type="number"
                  name="minStockLevel"
                  value={formData.minStockLevel}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="Alert when stock goes below this"
                  className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Stock Status Indicator */}
            <div className="mt-3 p-3 bg-white rounded border border-green-200">
              <p className="text-sm text-slate-600">
                Status:{" "}
                <span
                  className={`font-bold ${
                    formData.stock === 0
                      ? "text-red-600"
                      : formData.stock < formData.minStockLevel
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {formData.stock === 0
                    ? "❌ Out of Stock"
                    : formData.stock < formData.minStockLevel
                    ? "⚠️ Low Stock"
                    : "✅ In Stock"}
                </span>
              </p>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Product Details
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newDetail}
                onChange={(e) => setNewDetail(e.target.value)}
                placeholder="e.g., Colour: Red, Fabric: Silk"
                className="flex-1 px-4 py-2 border border-[#F0E6D2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30"
              />
              <button
                type="button"
                onClick={addDetail}
                className="px-4 py-2 bg-[#C5A059] text-white rounded-lg hover:bg-[#B38F4D] flex items-center gap-2"
              >
                <Plus size={18} />
              </button>
            </div>

            {details.length > 0 && (
              <div className="space-y-2 bg-[#FDFBF7] p-3 rounded-lg border border-[#F0E6D2]">
                {details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm bg-white p-2 rounded border border-[#F0E6D2]"
                  >
                    <span className="text-slate-700">{detail}</span>
                    <button
                      type="button"
                      onClick={() => removeDetail(idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Internal Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="e.g., Limited edition, High demand, Custom order"
              rows={2}
              className="w-full px-4 py-3 border border-[#F0E6D2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30"
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4 border-t border-[#F0E6D2]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-[#F0E6D2] text-slate-900 rounded-lg hover:bg-[#FDFBF7] transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-[#C5A059] text-white rounded-lg hover:bg-[#B38F4D] disabled:opacity-50 transition font-semibold flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {isEditing ? "Updating..." : "Adding..."}
                </>
              ) : (
                <>
                  {isEditing ? (
                    <>
                      <Plus size={18} />
                      Update Product
                    </>
                  ) : (
                    <>
                      <Plus size={18} />
                      Add Product
                    </>
                  )}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
