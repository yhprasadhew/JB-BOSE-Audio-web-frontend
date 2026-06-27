import { useState } from "react";
import {
  FaTachometerAlt,
  FaCalendarCheck,
  FaBoxOpen,
  FaUsers,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { Link, NavLink, Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import ItemsAdmin from "./ItemsAdmin";
import BookingsAdmin from "./BookingsAdmin";
import UsersAdmin from "./UsersAdmin";
import EditItemAdmin from "./EditItemAdmin";

export default function AdminPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = () => {
    logout();
    setSidebarOpen(false);
    toast.success("Signed out successfully 👋");
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-[#F7F5F0] text-[#10131F]">
      
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between bg-[#0B0F1A] text-white px-6 py-4 sticky top-0 z-30 border-b border-white/10">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 -ml-2 text-white/80 hover:text-[#FFB648] transition-colors"
          aria-label="Open sidebar"
        >
          <FaBars className="w-6 h-6" />
        </button>
        <span className="font-bold text-sm tracking-wide">JB-BOSE Admin</span>
        <div className="w-6" />
      </div>

      {/* BACKDROP OVERLAY FOR MOBILE */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR (BLACK THEME) */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-40 w-[280px] min-h-screen bg-[#0B0F1A] text-white flex flex-col justify-between transform transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          {/* LOGO & CLOSE BUTTON */}
          <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
            <Link
              to="/"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 hover:opacity-90 transition-opacity"
            >
              {/* LOGO BAR ICON */}
              <div className="flex gap-[3px] items-end h-6">
                <span className="w-[3px] h-2 bg-[#FFB648] rounded-sm" />
                <span className="w-[3px] h-5 bg-[#FFB648] rounded-sm" />
                <span className="w-[3px] h-3 bg-[#FFB648] rounded-sm" />
                <span className="w-[3px] h-6 bg-[#FFB648] rounded-sm" />
              </div>

              <div>
                <h1 className="text-lg font-bold text-white">
                  JB-BOSE <span className="text-[#FFB648]">Audio</span>
                </h1>
                <p className="text-xs text-gray-400">Admin Console</p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 text-white/60 hover:text-white"
              aria-label="Close sidebar"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* NAVIGATION */}
          <div className="p-4 space-y-2">
            <NavLink
              to="/admin"
              end
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-[#FFB648] text-[#0B0F1A] font-semibold"
                    : "hover:bg-white/10 text-white/80"
                }`
              }
            >
              <FaTachometerAlt />
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/booking"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-[#FFB648] text-[#0B0F1A] font-semibold"
                    : "hover:bg-white/10 text-white/80"
                }`
              }
            >
              <FaCalendarCheck />
              Bookings
            </NavLink>

            <NavLink
              to="/admin/items"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-[#FFB648] text-[#0B0F1A] font-semibold"
                    : "hover:bg-white/10 text-white/80"
                }`
              }
            >
              <FaBoxOpen />
              Items
            </NavLink>

            <NavLink
              to="/admin/users"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-[#FFB648] text-[#0B0F1A] font-semibold"
                    : "hover:bg-white/10 text-white/80"
                }`
              }
            >
              <FaUsers />
              Users
            </NavLink>
          </div>
        </div>

        {/* ADMIN INFO & SIGNOUT */}
        <div className="p-4 border-t border-white/10 space-y-3 bg-[#080B14]">
          <div className="px-2">
            <p className="text-[10px] uppercase font-bold tracking-wider text-white/40">Logged in as:</p>
            <p className="text-sm font-semibold truncate text-[#FFB648]" title={user?.email}>
              {user?.email || "Admin"}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition duration-300"
          >
            <FaSignOutAlt />
            Sign Out
          </button>
        </div>
      </div>

      {/* MAIN CONTENT (LIGHT THEME) */}
      <div className="flex-1 p-6 md:p-8 bg-[#F7F5F0] overflow-y-auto">
        <Routes>
          {/* DASHBOARD */}
          <Route
            index
            element={
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>

                <p className="mt-2 text-gray-600">
                  Welcome back to JB-BOSE Audio Admin Panel.
                </p>

                {/* SIMPLE CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-gray-500 text-sm">Bookings</h2>
                    <p className="text-2xl font-bold">128</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-gray-500 text-sm">Items</h2>
                    <p className="text-2xl font-bold">54</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-gray-500 text-sm">Users</h2>
                    <p className="text-2xl font-bold">320</p>
                  </div>
                </div>
              </div>
            }
          />

          <Route path="booking" element={<BookingsAdmin />} />
          <Route path="items" element={<ItemsAdmin />} />
          <Route path="items/edit/:key" element={<EditItemAdmin />} />
          <Route path="users" element={<UsersAdmin />} />
        </Routes>
      </div>
    </div>
  );
}

//