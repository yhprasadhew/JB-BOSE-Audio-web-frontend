import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircleDollarSign, Layers, Compass, Loader2 } from "lucide-react";
import { API_BASE_URL } from "../../config/api";

export default function ProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products`);
        // Filter only Sale type and available products
        const saleProducts = response.data.filter(
          (p) => p.type === "sale" && p.availability === true
        );
        setProducts(saleProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F7F5F0] py-16 px-6 md:px-16 max-w-7xl mx-auto">
      
      {/* HEADER SECTION */}
      <div className="border-b border-black/[0.05] pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-2">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0B0F1A]/50 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            Shop Premium Gear
          </span>
          <h1 className="text-4xl font-extrabold text-[#0B0F1A] tracking-tight">Products for Sale</h1>
          <p className="text-sm text-gray-500 max-w-md">
            Purchase professional-grade sound systems, acoustic gear, and accessories backed by full warranty.
          </p>
        </div>
        <div className="bg-[#0B0F1A] text-white px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase">
          {products.length} Items Available
        </div>
      </div>

      {/* LOADER */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="w-10 h-10 text-[#FFB648] animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading premium catalog...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white border border-black/5 rounded-2xl p-16 text-center text-gray-400 max-w-xl mx-auto">
          No items listed for sale at the moment. Please check back later!
        </div>
      ) : (
        /* PRODUCTS GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.key}
              className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#FFB648]/40 transition-all duration-300 flex flex-col group"
            >
              {/* Product Image */}
              <div 
                onClick={() => navigate(`/item/${product.key}`)}
                className="w-full h-64 bg-[#fbfbfb] p-6 flex items-center justify-center relative overflow-hidden border-b border-gray-50 cursor-pointer"
              >
                <img
                  src={product.image?.[0] || "https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg"}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain filter drop-shadow-sm group-hover:scale-[1.03] transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg";
                  }}
                />
                <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-gray-500 border border-gray-100 font-mono">
                  {product.category}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 
                    onClick={() => navigate(`/item/${product.key}`)}
                    className="font-bold text-lg text-[#0B0F1A] line-clamp-1 group-hover:text-[#FFB648] transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium font-mono">{product.dimension}</p>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Price</span>
                    <p className="text-xl font-extrabold text-[#0B0F1A]">
                      LKR {product.price.toLocaleString()}
                    </p>
                  </div>
                  <button 
                    onClick={() => navigate(`/item/${product.key}`)}
                    className="px-5 py-2.5 bg-[#0B0F1A] text-white rounded-lg text-xs font-bold hover:bg-black transition duration-300 shadow-md hover:shadow-lg"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}