import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { Calendar, MessageSquare, Compass, Loader2, X, Send, Calculator } from "lucide-react";
import { toast } from "react-hot-toast";
import { API_BASE_URL } from "../../config/api";

export default function RentalsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Booking Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products`);
        // Filter only Rental type and available products
        const rentalProducts = response.data.filter(
          (p) => p.type === "rental" && p.availability === true
        );
        setProducts(rentalProducts);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRentals();
  }, []);

  const handleOpenBookingModal = (product) => {
    if (!user) {
      toast.error("Please sign in to send a rental inquiry! 🔑");
      navigate("/login");
      return;
    }
    setSelectedProduct(product);
    
    // Set default start date to tomorrow, end date to day after tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    
    setStartDate(tomorrow.toISOString().split("T")[0]);
    setEndDate(tomorrow.toISOString().split("T")[0]); // default to 1 day
    setMessage(`Hi, I would like to rent the ${product.name} sound system. Please check availability.`);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setStartDate("");
    setEndDate("");
    setMessage("");
  };

  // Dynamic cost calculation
  const getDurationDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    if (diffTime < 0) return 0;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const days = getDurationDays();
  const totalPrice = days * (selectedProduct?.price || 0);

  const handleSendInquiry = async (e) => {
    e.preventDefault();

    if (days <= 0) {
      toast.error("End Date must be on or after Start Date! ❌");
      return;
    }

    setSubmitting(true);

    const token = localStorage.getItem("token");
    
    // Format the date-range details inside the message field for backward compatibility
    const formattedMessage = `[Rental Request Details]
Duration: ${startDate} to ${endDate} (${days} ${days === 1 ? 'day' : 'days'})
Estimated Total Price: LKR ${totalPrice.toLocaleString()}

Customer Message: ${message}`;

    const payload = {
      productKey: selectedProduct.key,
      itemName: selectedProduct.name,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalCost: totalPrice,
      message: formattedMessage,
    };

    try {
      await axios.post(`${API_BASE_URL}/api/inquiry`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Rental request submitted successfully! 🚀");
      handleCloseModal();
    } catch (error) {
      console.error("Inquiry Error:", error);
      toast.error(error.response?.data?.message || "Failed to submit rental request ❌");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F5F0] py-16 px-6 md:px-16 max-w-7xl mx-auto relative">
      
      {/* HEADER SECTION */}
      <div className="border-b border-black/[0.05] pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-2">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0B0F1A]/50 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            Premium Sound Rentals
          </span>
          <h1 className="text-4xl font-extrabold text-[#0B0F1A] tracking-tight">Audio Equipment Rentals</h1>
          <p className="text-sm text-gray-500 max-w-md">
            Rent high-fidelity audio networks suited for weddings, keynotes, and concerts.
          </p>
        </div>
        <div className="bg-[#FFB648] text-[#0B0F1A] px-4 py-2 rounded-lg text-xs font-bold tracking-wide uppercase">
          {products.length} Rentals Available
        </div>
      </div>

      {/* LOADER */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="w-10 h-10 text-[#FFB648] animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading rentals catalog...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white border border-black/5 rounded-2xl p-16 text-center text-gray-400 max-w-xl mx-auto">
          No items listed for rental at the moment. Please check back later!
        </div>
      ) : (
        /* RENTALS GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.key}
              className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#FFB648]/40 transition-all duration-300 flex flex-col group"
            >
              {/* Product Image */}
              <div className="w-full h-64 bg-[#fbfbfb] p-6 flex items-center justify-center relative overflow-hidden border-b border-gray-50">
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
                  <h3 className="font-bold text-lg text-[#0B0F1A] line-clamp-1 group-hover:text-[#FFB648] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium font-mono">{product.dimension}</p>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Rate / Day</span>
                    <p className="text-xl font-extrabold text-[#FFB648]">
                      LKR {product.price.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenBookingModal(product)}
                    className="px-5 py-2.5 bg-[#0B0F1A] text-white rounded-lg text-xs font-bold hover:bg-black transition duration-300 shadow-md hover:shadow-lg"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BOOKING MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-black/5 p-6 space-y-5 relative animate-in slide-in-from-bottom-4 duration-300">
            
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title */}
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-[#0B0F1A] tracking-tight">Rent Product</h2>
              <p className="text-xs text-gray-400 font-mono">{selectedProduct.name}</p>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSendInquiry} className="space-y-4">
              
              {/* Date Inputs Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#FFB648]" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFB648] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#FFB648]" />
                    End Date
                  </label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    min={startDate || new Date().toISOString().split("T")[0]}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFB648] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Cost Calculation Box */}
              {days > 0 && (
                <div className="bg-amber-50/70 border border-amber-200/50 rounded-xl p-4 space-y-2.5 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center text-xs text-gray-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Calculator className="w-3.5 h-3.5 text-gray-400" />
                      Daily Rate
                    </span>
                    <span>Rs. {selectedProduct.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 font-medium">
                    <span>Duration</span>
                    <span className="font-semibold text-[#0B0F1A]">{days} {days === 1 ? "day" : "days"}</span>
                  </div>
                  <div className="pt-2 border-t border-amber-200/60 flex justify-between items-center font-extrabold text-[#0B0F1A]">
                    <span className="text-xs">Estimated Total</span>
                    <span className="text-base text-[#e59d2f]">Rs. {totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Inquiry Message (Optional)
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFB648] focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || days <= 0}
                className="w-full py-3 bg-[#0B0F1A] text-white rounded-lg font-semibold hover:bg-black transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {submitting ? "Submitting Request..." : "Submit Rental Request"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}