import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Check, X, Calendar, User, Phone, MessageSquare, AlertCircle } from "lucide-react";

export default function BookingsAdmin() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/inquiry", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInquiries(response.data.inquiries || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load bookings/inquiries ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:3000/api/inquiry/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Booking ${newStatus} successfully!`);
      fetchInquiries();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update status ❌");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-extrabold text-[#0B0F1A] tracking-tight">Booking Inquiries</h1>
        <p className="text-sm text-gray-500 mt-1">Review, approve, or reject rental sound system bookings.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-[#FFB648] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : inquiries.length === 0 ? (
        <div className="bg-white border border-black/5 rounded-xl p-12 text-center text-gray-400">
          No bookings or inquiries found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="bg-white border border-black/5 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-[#FFB648]/40 transition duration-300 relative overflow-hidden"
            >
              {/* Status Indicator Line */}
              <div className={`absolute top-0 left-0 w-1.5 h-full ${
                inquiry.status === "approved" ? "bg-emerald-500" :
                inquiry.status === "rejected" ? "bg-red-500" : "bg-amber-400"
              }`} />

              <div className="space-y-4 flex-1 pl-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold text-gray-400 font-mono">#INQ-{inquiry.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    inquiry.status === "approved" ? "bg-emerald-100 text-emerald-800" :
                    inquiry.status === "rejected" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {inquiry.status || "pending"}
                  </span>
                  <span className="text-xs text-gray-400">
                    Received on {new Date(inquiry.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0B0F1A]">
                  Rental request for <span className="text-[#FFB648]">{inquiry.itemName || "Unknown Item"}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{inquiry.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{inquiry.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium text-[#0B0F1A]">
                    <Calendar className="w-4 h-4 text-[#FFB648]" />
                    <span>Requested Date: {new Date(inquiry.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm text-gray-600 flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="italic">"{inquiry.message}"</p>
                </div>
              </div>

              {/* Action Buttons */}
              {inquiry.status === "pending" && (
                <div className="flex md:flex-col gap-2 w-full md:w-auto">
                  <button
                    onClick={() => handleUpdateStatus(inquiry.id, "approved")}
                    className="flex-1 md:w-36 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-semibold transition"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(inquiry.id, "rejected")}
                    className="flex-1 md:w-36 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-semibold transition"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              )}

              {inquiry.status !== "pending" && (
                <div className="text-sm text-gray-400 flex items-center gap-1 font-medium w-full md:w-auto justify-end">
                  <AlertCircle className="w-4 h-4" />
                  <span>Resolved</span>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
