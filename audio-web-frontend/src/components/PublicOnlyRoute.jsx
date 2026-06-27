import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

export default function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F5F0]">
        <Loader2 className="w-10 h-10 text-[#FFB648] animate-spin mb-2" />
        <p className="text-sm text-gray-500 font-medium">Loading...</p>
      </div>
    );
  }

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}
