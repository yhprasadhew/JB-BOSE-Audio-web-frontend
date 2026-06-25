import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Save, ArrowLeft, Loader2, Upload, X } from "lucide-react";
import { API_BASE_URL } from "../../config/api";
import { supabase } from "../../config/supabase";

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
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
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
          setImages(foundProduct.image || []);
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

  const uploadImagesToSupabase = async (files) => {
    const urls = [];
    for (const file of files) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `listings/${fileName}`;

      const { error } = await supabase.storage
        .from("listings")
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("listings")
        .getPublicUrl(filePath);

      urls.push(publicUrl);
    }
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let uploadedUrls = [];
      if (selectedFiles.length > 0) {
        setUploading(true);
        uploadedUrls = await uploadImagesToSupabase(selectedFiles);
        setUploading(false);
      }

      const finalImages = [...images, ...uploadedUrls];
      if (finalImages.length === 0) {
        finalImages.push("https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg");
      }

      const token = localStorage.getItem("token");
      const payload = {
        name,
        price: Number(price),
        dimension,
        category,
        description,
        image: finalImages,
        type,
      };

      await axios.put(`${API_BASE_URL}/api/products/${key}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product updated successfully! 📝");
      navigate("/admin/items");
    } catch (error) {
      console.error(error);
      toast.error(error.message || error.response?.data?.message || "Failed to update product ❌");
    } finally {
      setSaving(false);
      setUploading(false);
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

          {/* Existing Images */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Existing Photos</label>
            {images.length === 0 ? (
              <p className="text-xs text-gray-400">No existing photos</p>
            ) : (
              <div className="grid grid-cols-4 gap-2 mb-4">
                {images.map((url, idx) => (
                  <div key={idx} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
                    <img src={url} alt="existing product" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setImages((prev) => prev.filter((_, i) => i !== idx));
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 shadow hover:bg-red-600 transition-colors"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upload New Images */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 flex justify-between items-center">
              <span>Upload New Photos (PC)</span>
              {selectedFiles.length > 0 && (
                <span className="text-[10px] text-gray-400 normal-case font-medium">
                  {selectedFiles.length} file(s) selected
                </span>
              )}
            </label>
            <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50/55 hover:bg-white hover:border-[#FFB648]/40 transition-colors flex flex-col items-center justify-center cursor-pointer relative group">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setSelectedFiles((prev) => [...prev, ...files]);
                }}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <Upload className="w-6 h-6 text-gray-400 group-hover:text-[#FFB648] transition-colors mb-1.5" />
              <p className="text-xs font-semibold text-gray-600">Select files from computer</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Add more files to this listing</p>
            </div>

            {/* Preview Selected Files */}
            {selectedFiles.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {selectedFiles.map((file, idx) => {
                  const objectUrl = URL.createObjectURL(file);
                  return (
                    <div key={idx} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
                      <img src={objectUrl} alt="preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFiles((prev) => prev.filter((_, i) => i !== idx));
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 shadow hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

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
              {saving ? (uploading ? "Uploading images..." : "Saving Changes...") : "Save Product Details"}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
