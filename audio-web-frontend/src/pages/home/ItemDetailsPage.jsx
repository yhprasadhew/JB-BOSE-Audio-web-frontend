import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { 
  ArrowLeft, 
  Calendar, 
  MessageSquare, 
  Calculator, 
  Send, 
  Loader2, 
  ChevronLeft, 
  ChevronRight, 
  ShoppingBag, 
  Tag, 
  CheckCircle, 
  XCircle,
  PhoneCall
} from "lucide-react";
import { toast } from "react-hot-toast";
import { API_BASE_URL } from "../../config/api";

export default function ItemDetailsPage() {
  const { key } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Image Viewer State
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Inquiry Form State
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch product by key
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products`);
        const foundProduct = response.data.find((p) => p.key === key);
        if (foundProduct) {
          setProduct(foundProduct);
          
          // Set default dates if it's a rental
          if (foundProduct.type === "rental") {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            setStartDate(tomorrow.toISOString().split("T")[0]);
            setEndDate(tomorrow.toISOString().split("T")[0]);
            setMessage(`Hi, I would like to rent the ${foundProduct.name}. Please confirm availability for my selected dates.`);
          } else {
            setMessage(`Hi, I'm interested in purchasing the ${foundProduct.name}. Please contact me with more information.`);
          }
        } else {
          toast.error("Product not found ❌");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Failed to load product details ❌");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [key, navigate]);

  // Duration and total price calculation
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
  const totalPrice = days * (product?.price || 0);

  // Submit Inquiry (Rentals & Sales)
  const handleSendInquiry = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in to send an inquiry! 🔑");
      navigate("/login");
      return;
    }

    if (product.type === "rental" && days <= 0) {
      toast.error("End Date must be on or after Start Date! ❌");
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem("token");

    let formattedMessage = "";
    let payload = {};

    if (product.type === "rental") {
      formattedMessage = `[Rental Request Details]
Duration: ${startDate} to ${endDate} (${days} ${days === 1 ? 'day' : 'days'})
Estimated Total Price: LKR ${totalPrice.toLocaleString()}

Customer Message: ${message}`;

      payload = {
        productKey: product.key,
        itemName: product.name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalCost: totalPrice,
        message: formattedMessage,
      };
    } else {
      // Sale inquiry: send standard details
      formattedMessage = `[Purchase Inquiry]
Item: ${product.name}
Category: ${product.category}
Price: LKR ${product.price.toLocaleString()}

Customer Message: ${message}`;

      payload = {
        productKey: product.key,
        itemName: product.name,
        startDate: new Date(),
        endDate: new Date(),
        totalCost: product.price,
        message: formattedMessage,
      };
    }

    try {
      await axios.post(`${API_BASE_URL}/api/inquiry`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(
        product.type === "rental" 
          ? "Rental request submitted successfully! 🚀" 
          : "Purchase inquiry submitted successfully! ✉️"
      );
      if (product.type === "rental") {
        // Reset message but keep dates
        setMessage(`Hi, I would like to rent the ${product.name}. Please confirm availability for my selected dates.`);
      } else {
        setMessage(`Hi, I'm interested in purchasing the ${product.name}. Please contact me with more information.`);
      }
    } catch (error) {
      console.error("Inquiry Error:", error);
      toast.error(error.response?.data?.message || "Failed to submit inquiry ❌");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-10 h-10 text-[#FFB648] animate-spin" />
        <p className="text-sm text-gray-500 font-medium">Loading item details...</p>
      </div>
    );
  }

  if (!product) return null;

  const productImages = product.image && product.image.length > 0 
    ? product.image 
    : ["https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg"];

  return (
    <div className="w-full min-h-screen bg-[#F7F5F0] py-12 px-6 md:px-16 max-w-7xl mx-auto">
      
      {/* BACK BUTTON & NAVIGATION BREADCRUMB */}
      <div className="flex items-center justify-between mb-8 border-b border-black/[0.05] pb-5">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-black uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Catalog
        </button>
        <div className="text-[10px] font-mono font-semibold text-gray-400 uppercase tracking-widest">
          {product.type === "rental" ? "Rental Service" : "For Sale"} &middot; {product.category}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: PREMIUM IMAGE CAROUSEL & SELECTOR (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl border border-black/5 overflow-hidden shadow-sm aspect-video sm:aspect-[4/3] flex items-center justify-center p-6 relative group">
            
            {/* Main Display Image */}
            <img
              src={productImages[activeImageIndex]}
              alt={product.name}
              className="max-w-full max-h-full object-contain filter drop-shadow-md transition-all duration-300 group-hover:scale-[1.01]"
              onError={(e) => {
                e.target.src = "https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg";
              }}
            />

            {/* Left/Right controls (only show if multiple images) */}
            {productImages.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-black shadow-md border border-gray-100 hover:scale-105 transition opacity-0 group-hover:opacity-100 duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-black shadow-md border border-gray-100 hover:scale-105 transition opacity-0 group-hover:opacity-100 duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            
            {/* Category tag */}
            <span className="absolute top-4 left-4 bg-[#0B0F1A] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          {/* Thumbnails (only show if multiple images) */}
          {productImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto py-2">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border bg-white p-1 flex items-center justify-center flex-shrink-0 transition-all ${
                    idx === activeImageIndex 
                      ? "border-[#FFB648] ring-2 ring-[#FFB648]/20 scale-105" 
                      : "border-black/5 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx}`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = "https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg";
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: INFO & INTERACTIVE FORM (5 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* PRODUCT META */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                product.type === "rental" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
              }`}>
                For {product.type === "rental" ? "Rental" : "Sale"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
                <CheckCircle className="w-3.5 h-3.5" />
                Available Now
              </span>
            </div>

            <h1 className="text-3xl font-extrabold text-[#0B0F1A] tracking-tight leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-gray-400" />
                {product.category}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              <span className="font-mono text-xs text-gray-400 bg-white border border-black/5 px-2 py-0.5 rounded">
                Dimensions: {product.dimension}
              </span>
            </div>

            {/* Price Box */}
            <div className="bg-white rounded-2xl border border-black/5 p-6 flex justify-between items-center shadow-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                  {product.type === "rental" ? "Rental Rate" : "Purchase Price"}
                </span>
                <p className="text-3xl font-extrabold text-[#0B0F1A]">
                  LKR {product.price.toLocaleString()}
                  {product.type === "rental" && <span className="text-sm font-semibold text-gray-400"> / day</span>}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#FFB648]/10 flex items-center justify-center text-[#FFB648]">
                {product.type === "rental" ? <Calendar className="w-6 h-6" /> : <ShoppingBag className="w-6 h-6" />}
              </div>
            </div>
          </div>

          {/* PRODUCT DESCRIPTION */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">
              Overview & Specifications
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed bg-white/50 border border-black/[0.02] p-5 rounded-2xl">
              {product.description || "No description provided for this item."}
            </p>
          </div>

          {/* DYNAMIC INQUIRY CARD */}
          <div className="bg-white rounded-2xl border border-black/5 shadow-md p-6 space-y-5">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#0B0F1A] tracking-tight flex items-center gap-2">
                {product.type === "rental" ? <Calendar className="w-5 h-5 text-[#FFB648]" /> : <PhoneCall className="w-5 h-5 text-[#FFB648]" />}
                {product.type === "rental" ? "Rental Inquiry Form" : "Purchase Inquiry Form"}
              </h3>
              <p className="text-xs text-gray-400">
                {product.type === "rental" 
                  ? "Select dates to estimate rental costs and request booking." 
                  : "Send your details to inquire about product purchase."}
              </p>
            </div>

            <form onSubmit={handleSendInquiry} className="space-y-4">
              {product.type === "rental" && (
                <>
                  {/* Date Inputs Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
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
                        <span>Rs. {product.price.toLocaleString()}</span>
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
                </>
              )}

              {/* Message */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Message Details
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter details about your event, requirement, or contact timing..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFB648] focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || (product.type === "rental" && days <= 0)}
                className="w-full py-3 bg-[#0B0F1A] text-white rounded-lg font-semibold hover:bg-black transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
              >
                <Send className="w-4 h-4" />
                {submitting ? "Submitting Inquiry..." : (product.type === "rental" ? "Submit Rental Request" : "Send Inquiry Request")}
              </button>
            </form>
          </div>
        </div>

      </div>
      
    </div>
  );
}
