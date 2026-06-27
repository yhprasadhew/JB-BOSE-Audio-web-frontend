import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please log in to access this page! 🔑");
    } else if (!loading && user && allowedRoles && !allowedRoles.includes(user.role)) {
      toast.error("You are not authorized to view this page! 🚫");
    }
  }, [loading, user, allowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F5F0]">
        <Loader2 className="w-10 h-10 text-[#FFB648] animate-spin mb-2" />
        <p className="text-sm text-gray-500 font-medium">Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
