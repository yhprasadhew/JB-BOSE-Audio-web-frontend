import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for registration would go here
    console.log("Registering:", { name, email, password, agreeTerms });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F7F5F0] flex items-center justify-center px-4 py-12">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-black/5 p-8 relative overflow-hidden">
        
        {/* Decorative elements */}
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
            Create an Account
          </h1>

          <p className="text-sm text-gray-500 mt-1.5 text-center max-w-[280px]">
            Join JB-BOSE Audio to book, manage, and explore premium sound systems.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFB648] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Email Address */}
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

          {/* Password */}
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

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFB648] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start gap-2.5 text-sm pt-1">
            <input
              type="checkbox"
              id="terms"
              required
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-[#FFB648] rounded border-gray-300 focus:ring-[#FFB648]"
            />
            <label htmlFor="terms" className="text-xs text-gray-500 leading-normal">
              I agree to the{" "}
              <a href="#" className="text-[#FFB648] font-medium hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#FFB648] font-medium hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#0B0F1A] text-white rounded-lg font-semibold hover:bg-black transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Create Account
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-8 pt-6 border-t border-gray-100">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[#FFB648] font-semibold hover:underline bg-transparent border-none p-0 focus:outline-none"
          >
            Sign In
          </button>
        </p>

      </div>

    </div>
  );
}
