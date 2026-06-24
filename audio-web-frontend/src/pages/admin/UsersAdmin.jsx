import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserX, Trash2, Shield, User, Loader2, RefreshCw } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config/api";

export default function UsersAdmin() {
  const { user: loggedInAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionInProgress, setActionInProgress] = useState(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load user accounts ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleSuspend = async (email) => {
    setActionInProgress(email);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/users/${email}/suspend`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message);
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update suspension status ❌");
    } finally {
      setActionInProgress(null);
    }
  };

  const handleDeleteUser = async (email) => {
    if (!confirm(`Are you sure you want to permanently delete the user account for ${email}?`)) return;

    setActionInProgress(email);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(`${API_BASE_URL}/api/users/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(response.data.message);
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete user ❌");
    } finally {
      setActionInProgress(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0B0F1A] tracking-tight">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">Suspend, activate, or delete customer accounts.</p>
        </div>
        <button
          onClick={fetchUsers}
          className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-black rounded-lg transition"
          title="Refresh User List"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-[#FFB648] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white border border-black/5 rounded-xl p-12 text-center text-gray-400">
          No registered users found.
        </div>
      ) : (
        /* USERS TABLE */
        <div className="bg-white border border-black/5 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Contact info</th>
                  <th className="px-6 py-4">Address</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {users.map((u) => {
                  const isSelf = loggedInAdmin?.email === u.email;
                  const isBusy = actionInProgress === u.email;

                  return (
                    <tr key={u.email} className="hover:bg-gray-50/50 transition">
                      
                      {/* Name & Avatar */}
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img
                          src={u.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmyS4TygDepDH2AezAFSACrY7V3HuBaXl_Zq7E0d5jD-QW-7ZjPaV1KNYg&s=10"}
                          alt={`${u.firstName} ${u.lastName}`}
                          className="w-10 h-10 rounded-full object-cover border border-gray-100"
                          onError={(e) => {
                            e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmyS4TygDepDH2AezAFSACrY7V3HuBaXl_Zq7E0d5jD-QW-7ZjPaV1KNYg&s=10";
                          }}
                        />
                        <div>
                          <p className="font-bold text-[#0B0F1A]">
                            {u.firstName} {u.lastName} {isSelf && <span className="text-[10px] text-gray-400 font-normal ml-1">(You)</span>}
                          </p>
                          <p className="text-xs text-gray-400 font-mono truncate max-w-[150px]">{u.email}</p>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-6 py-4 text-gray-600 font-mono text-xs">
                        {u.phone}
                      </td>

                      {/* Address */}
                      <td className="px-6 py-4 text-gray-500 text-xs max-w-[180px] truncate" title={u.address}>
                        {u.address}
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          u.role === "admin" ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {u.role === "admin" && <Shield className="w-3 h-3" />}
                          {u.role}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          u.isSuspended ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"
                        }`}>
                          {u.isSuspended ? "Suspended" : "Active"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            disabled={isSelf || isBusy}
                            onClick={() => handleToggleSuspend(u.email)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                              u.isSuspended
                                ? "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100"
                                : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                            } disabled:opacity-40 disabled:cursor-not-allowed`}
                            title={u.isSuspended ? "Activate Account" : "Suspend Account"}
                          >
                            <UserX className="w-3.5 h-3.5" />
                            {u.isSuspended ? "Activate" : "Suspend"}
                          </button>

                          <button
                            disabled={isSelf || isBusy}
                            onClick={() => handleDeleteUser(u.email)}
                            className="p-1.5 border border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
