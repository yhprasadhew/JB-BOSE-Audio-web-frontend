import { useState } from "react";
export default function LoginPage() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-black/5 p-8">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex gap-[3px] items-end h-8 mb-3">
            <span className="w-[4px] h-3 bg-[#FFB648] rounded-sm" />
            <span className="w-[4px] h-7 bg-[#FFB648] rounded-sm" />
            <span className="w-[4px] h-4 bg-[#FFB648] rounded-sm" />
            <span className="w-[4px] h-8 bg-[#FFB648] rounded-sm" />
          </div>

          <h1 className="text-2xl font-bold text-[#0B0F1A]">
            JB-BOSE Audio
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Sign in to your account
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-5">

          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB648]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB648]"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <a
              href="#"
              className="text-[#FFB648] hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#0B0F1A] text-white rounded-lg font-semibold hover:bg-black transition"
          >
            Sign In
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <span className="text-[#FFB648] font-medium cursor-pointer">
            Register
          </span>
        </p>

      </div>

    </div>
  );
}