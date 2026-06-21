import {
  FaTachometerAlt,
  FaCalendarCheck,
  FaBoxOpen,
  FaUsers,
} from "react-icons/fa";

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-[280px] h-screen bg-[#101357] text-white flex flex-col shadow-2xl">

        <div className="px-6 py-6 border-b border-white/10">
          <h1 className="text-xl font-bold text-[#fea49f]">
            JB-BOSE Audio
          </h1>
          <p className="text-xs text-gray-300 mt-1">
            Admin Dashboard
          </p>
        </div>

        <div className="flex-1 p-4 space-y-2">

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#fea49f] text-[#101357] font-semibold">
            <FaTachometerAlt />
            <span>Dashboard</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition">
            <FaCalendarCheck />
            <span>Bookings</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition">
            <FaBoxOpen />
            <span>Items</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition">
            <FaUsers />
            <span>Users</span>
          </button>

        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome back to JB-BOSE Audio Management System.
        </p>
      </div>

    </div>
  );
}