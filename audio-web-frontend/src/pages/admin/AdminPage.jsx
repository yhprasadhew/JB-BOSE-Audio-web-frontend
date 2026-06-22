import {
  FaTachometerAlt,
  FaCalendarCheck,
  FaBoxOpen,
  FaUsers,
  FaHeadphones,
} from "react-icons/fa";

import { NavLink, Routes, Route } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="w-full min-h-screen flex bg-[#F7F5F0] text-[#10131F]">

      {/* SIDEBAR (BLACK THEME) */}
      <div className="w-[280px] min-h-screen bg-[#0B0F1A] text-white flex flex-col">

        {/* LOGO */}
        <div className="px-6 py-6 border-b border-white/10 flex items-center gap-3">

          {/* YOUR NEW LOGO */}
          <div className="flex gap-[3px] items-end h-6">
            <span className="w-[3px] h-2 bg-[#FFB648] rounded-sm" />
            <span className="w-[3px] h-5 bg-[#FFB648] rounded-sm" />
            <span className="w-[3px] h-3 bg-[#FFB648] rounded-sm" />
            <span className="w-[3px] h-6 bg-[#FFB648] rounded-sm" />
          </div>

          <div>
            <h1 className="text-lg font-bold">
              JB-BOSE <span className="text-[#FFB648]">Audio</span>
            </h1>
            <p className="text-xs text-gray-400">Admin Console</p>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex-1 p-4 space-y-2">

          <NavLink
            to="/admin"
            end
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

      {/* MAIN CONTENT (LIGHT THEME) */}
      <div className="flex-1 p-8 bg-[#F7F5F0]">

        <Routes>

          {/* DASHBOARD */}
          <Route
            index
            element={
              <div>
                <h1 className="text-3xl font-bold">
                  Dashboard
                </h1>

                <p className="mt-2 text-gray-600">
                  Welcome back to JB-BOSE Audio Admin Panel.
                </p>

                {/* SIMPLE CARDS */}
                <div className="grid grid-cols-3 gap-6 mt-8">

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

          <Route path="booking" element={<h1>Booking Page</h1>} />
          <Route path="items" element={<h1>Items Page</h1>} />
          <Route path="users" element={<h1>Users Page</h1>} />

        </Routes>

      </div>
    </div>
  );
}