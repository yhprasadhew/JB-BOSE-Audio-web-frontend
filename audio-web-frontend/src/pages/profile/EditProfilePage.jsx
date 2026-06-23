import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { User, Mail, Phone, MapPin, Image, Save, ArrowLeft } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { user, login, loading: authLoading } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Pre-fill form when user session loads
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setProfilePicture(user.profilePicture || "");
    }
  }, [user]);

  // If auth is loading, show spinner
  if (authLoading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#F7F5F0]">
        <div className="w-8 h-8 border-4 border-[#FFB648] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If no user is logged in, redirect to login
  if (!user) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-[#F7F5F0] text-center px-4">
        <h2 className="text-xl font-bold mb-4">Please log in to edit your profile</h2>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2.5 bg-[#0B0F1A] text-white rounded-lg font-semibold hover:bg-black transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3000/api/users/profile",
        {
          firstName,
          lastName,
          phone,
          address,
          profilePicture,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.token) {
        login(response.data.token);
        toast.success("Profile updated successfully! ✅");
      } else {
        toast.error("Profile updated, but failed to refresh session. Please log in again.");
      }
    } catch (error) {
      console.error("Profile Update Error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile ❌");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F7F5F0] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-black/5 p-8 relative overflow-hidden">
        
        {/* Decorative top accent bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FFB648] via-[#e59d2f] to-[#FFB648]" />

        {/* Header Actions */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-black uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0B0F1A]/50">
            Account Management
          </span>
        </div>

        {/* Profile Card Intro & Live Avatar Preview */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-gray-100 mb-8">
          <div className="relative group">
            <img
              src={profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmyS4TygDepDH2AezAFSACrY7V3HuBaXl_Zq7E0d5jD-QW-7ZjPaV1KNY&s=10"}
              alt="Live Avatar Preview"
              className="w-24 h-24 rounded-full object-cover border-4 border-[#FFB648] shadow-inner"
              onError={(e) => {
                e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmyS4TygDepDH2AezAFSACrY7V3HuBaXl_Zq7E0d5jD-QW-7ZjPaV1KNY&s=10";
              }}
            />
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h1 className="text-2xl font-bold text-[#0B0F1A] tracking-tight">
              Edit Your Profile
            </h1>
            <p className="text-sm text-gray-500">
              Update your contact details and personalization options below.
            </p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Names Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                First Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFB648] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                Last Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFB648] focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Email (Read Only) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              Email Address (Cannot be changed)
            </label>
            <div className="relative opacity-60">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-100 cursor-not-allowed text-gray-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <Phone className="w-4 h-4" />
              </span>
              <input
                type="tel"
                required
                placeholder="0771234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFB648] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <MapPin className="w-4 h-4" />
              </span>
              <input
                type="text"
                required
                placeholder="No. 12, Galle Road, Colombo"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFB648] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Profile Picture URL */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              Profile Picture URL
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <Image className="w-4 h-4" />
              </span>
              <input
                type="url"
                placeholder="https://example.com/avatar.jpg"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFB648] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-[#0B0F1A] text-white rounded-lg font-semibold hover:bg-black transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {submitting ? "Saving Changes..." : "Save Profile Details"}
          </button>

        </form>

      </div>
    </div>
  );
}
