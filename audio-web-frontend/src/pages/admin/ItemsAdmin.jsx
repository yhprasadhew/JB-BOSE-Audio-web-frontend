import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Plus, Trash2, Edit, Image, Tag, Layers } from "lucide-react";
import { API_BASE_URL } from "../../config/api";

export default function ItemsAdmin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Create Form State
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [price, setPrice] = useState("");
  const [dimension, setDimension] = useState("");
  const [category, setCategory] = useState("Speakers");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [type, setType] = useState("sale");
  const [adding, setAdding] = useState(false);

  // Auto-generate key from name for new items
  useEffect(() => {
    const generatedKey = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    setKey(generatedKey);
  }, [name]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setAdding(true);

    const token = localStorage.getItem("token");
    const payload = {
      key,
      name,
      price: Number(price),
      dimension,
      category,
      description,
      image: [imageUrl || "https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg"],
      type,
    };

    try {
      await axios.post(`${API_BASE_URL}/api/products`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product added successfully! 🚀");
      // Reset form
      setName("");
      setKey("");
      setPrice("");
      setDimension("");
      setDescription("");
      setImageUrl("");
      setType("sale");
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add product ❌");
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteProduct = async (productKey) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_BASE_URL}/api/products/${productKey}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product deleted successfully! 🗑️");
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete product ❌");
    }
  };

  return (
    <div className="space-y-10">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0B0F1A] tracking-tight">Manage Inventory</h1>
          <p className="text-sm text-gray-500 mt-1">Add, edit, review, and delete sales or rental products.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ADD PRODUCT FORM */}
        <div className="bg-white rounded-xl border border-black/5 shadow-sm p-6 lg:col-span-1 h-fit">
          <h2 className="text-lg font-bold text-[#0B0F1A] mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#FFB648]" />
            List New Item
          </h2>

          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Item Name</label>
              <input
                type="text"
                required
                placeholder="e.g. JBL PartyBox 310"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB648] transition-all bg-gray-50/50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Unique Key (Slug)</label>
              <input
                type="text"
                required
                placeholder="e.g. jbl-partybox-310"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB648] transition-all bg-gray-100 text-gray-600 font-mono text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Price (LKR)</label>
                <input
                  type="number"
                  required
                  placeholder="2500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB648] transition-all bg-gray-50/50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Listing Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB648] transition-all bg-gray-50/50 focus:bg-white"
                >
                  <option value="sale">For Sale</option>
                  <option value="rental">For Rental</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Dimension</label>
                <input
                  type="text"
                  required
                  placeholder="32.5 x 68.8 cm"
                  value={dimension}
                  onChange={(e) => setDimension(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB648] transition-all bg-gray-50/50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB648] transition-all bg-gray-50/50 focus:bg-white"
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
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Image URL</label>
              <input
                type="url"
                placeholder="https://example.com/item.png"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB648] transition-all bg-gray-50/50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Description</label>
              <textarea
                required
                rows={3}
                placeholder="Enter key specs, condition, and sound quality notes..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB648] transition-all bg-gray-50/50 focus:bg-white resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={adding}
              className="w-full py-2.5 bg-[#0B0F1A] text-white rounded-lg font-semibold hover:bg-black transition-colors duration-300 disabled:opacity-50"
            >
              {adding ? "Listing..." : "Add to Inventory"}
            </button>
          </form>
        </div>

        {/* PRODUCTS LIST */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-[#0B0F1A]">Listed Items ({products.length})</h2>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-[#FFB648] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white border border-black/5 rounded-xl p-12 text-center text-gray-400">
              No products found. List one on the left to get started.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <div
                  key={product.key}
                  className="bg-white border border-black/5 rounded-xl p-4 flex gap-4 items-center shadow-sm relative group hover:border-[#FFB648]/40 transition duration-300"
                >
                  <img
                    src={product.image?.[0] || "https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg"}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                    onError={(e) => {
                      e.target.src = "https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg";
                    }}
                  />
                  <div className="flex-1 min-w-0 space-y-1 pr-14">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        product.type === "rental" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
                      }`}>
                        {product.type === "rental" ? "Rental" : "Sale"}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono truncate">{product.key}</span>
                    </div>
                    <h3 className="font-bold text-[#0B0F1A] text-sm truncate">{product.name}</h3>
                    <p className="text-xs text-gray-500 font-medium">{product.category} · {product.dimension}</p>
                    <p className="text-sm font-semibold text-[#FFB648]">LKR {product.price.toLocaleString()}</p>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1">
                    <button
                      onClick={() => navigate(`/admin/items/edit/${product.key}`)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-[#FFB648] hover:bg-amber-50/50 transition-colors"
                      title="Edit item"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.key)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50/50 transition-colors"
                      title="Delete item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
