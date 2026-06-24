import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import { API_BASE_URL } from "../../config/api";

export default function EditItemAdmin() {
  const { key } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [dimension, setDimension] = useState("");
  const [category, setCategory] = useState("Speakers");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [type, setType] = useState("sale");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/api/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Find the specific product by key
        const foundProduct = response.data.find((p) => p.key === key);
        if (foundProduct) {
          setName(foundProduct.name);
          setPrice(foundProduct.price);
          setDimension(foundProduct.dimension);
          setCategory(foundProduct.category || "Speakers");
          setDescription(foundProduct.description);
          setImageUrl(foundProduct.image?.[0] || "");
          setType(foundProduct.type || "sale");
        } else {
          toast.error("Product not found ❌");
          navigate("/admin/items");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load product details ❌");
        navigate("/admin/items");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [key, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const token = localStorage.getItem("token");
    const payload = {
      name,
      price: Number(price),
      dimension,
      category,
      description,
      image: [imageUrl || "https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg"],
      type,
    };

    try {
      await axios.put(`${API_BASE_URL}/api/products/${key}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product updated successfully! 📝");
      navigate("/admin/items");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update product ❌");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <Loader2 className="w-10 h-10 text-[#FFB648] animate-spin" />
        <p className="text-sm text-gray-400 font-medium">Loading item details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Header Actions */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <button
          onClick={() => navigate("/admin/items")}
          className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-black uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Items
        </button>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0B0F1A]/50">
          Edit Inventory listing
        </span>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-xl border border-black/5 shadow-sm p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-[#0B0F1A] tracking-tight">Edit Listing Details</h1>
          <p className="text-xs text-gray-400 font-mono mt-1">Unique Key: {key}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Item Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB648] transition-all bg-gray-50/50 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Price (LKR)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB648] transition-all bg-gray-50/50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Listing Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB648] transition-all bg-gray-50/50 focus:bg-white"
              >
                <option value="sale">For Sale</option>
                <option value="rental">For Rental</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Dimension</label>
              <input
                type="text"
                required
                value={dimension}
                onChange={(e) => setDimension(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB648] transition-all bg-gray-50/50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB648] transition-all bg-gray-50/50 focus:bg-white"
              >
                <option value="Speakers">Speakers</option>
                <option value="Microphones">Microphones</option>
                <option value="Mixers">Mixers</option>
                <option value="Amplifiers">Amplifiers</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB648] transition-all bg-gray-50/50 focus:bg-white"
            />
          </div>

          {imageUrl && (
            <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center">
              <img
                src={imageUrl}
                alt="Product Preview"
                className="max-h-40 object-contain rounded-md"
                onError={(e) => {
                  e.target.src = "https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg";
                }}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
            <textarea
              required
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB648] transition-all bg-gray-50/50 focus:bg-white resize-none"
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate("/admin/items")}
              className="flex-1 py-3 border border-gray-200 rounded-lg font-semibold hover:bg-gray-50 text-[#0B0F1A] text-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 bg-[#0B0F1A] text-white rounded-lg font-semibold hover:bg-black transition flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving Changes..." : "Save Product Details"}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
