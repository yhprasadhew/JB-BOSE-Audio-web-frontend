import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email,
          password,
        }
      );

      console.log("Login Success:", response.data);

      if (response.data.token) {
        const payload = login(response.data.token);
        
        toast.success(`Welcome back, ${payload.firstName || "User"}! 👋`);

        // Role-based routing
        if (payload.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Login failed: no token received ❌");
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Login Failed ❌";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F7F5F0] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-black/5 p-8 relative overflow-hidden">
        {/* TOP ACCENT BAR */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FFB648] via-[#e59d2f] to-[#FFB648]" />

        {/* LOGO */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex gap-[3px] items-end h-8 mb-3">
            <span className="w-[4px] h-3 bg-[#FFB648] rounded-sm" />
            <span className="w-[4px] h-7 bg-[#FFB648] rounded-sm" />
            <span className="w-[4px] h-4 bg-[#FFB648] rounded-sm" />
            <span className="w-[4px] h-8 bg-[#FFB648] rounded-sm" />
          </div>

          <h1 className="text-2xl font-bold text-[#0B0F1A] tracking-tight">
            Welcome Back
          </h1>

          <p className="text-sm text-gray-500 mt-1.5">
            Sign in to your JB-BOSE account
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              Email Address
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <Mail className="w-4 h-4" />
              </span>

              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFB648] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              Password
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <Lock className="w-4 h-4" />
              </span>

              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFB648] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* REMEMBER + FORGOT */}
          <div className="flex justify-between items-center text-sm pt-1">
            <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#FFB648]"
              />
              Remember me
            </label>

            <button
              type="button"
              className="text-xs text-[#FFB648] font-semibold hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0B0F1A] text-white rounded-lg font-semibold hover:bg-black transition-colors duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-8 pt-6 border-t border-gray-100">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-[#FFB648] font-semibold hover:underline bg-transparent border-none p-0 focus:outline-none"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}