import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full h-20 bg-[#0B0F1A] text-white flex items-center justify-between px-8 md:px-12 sticky top-0 z-50 border-b border-white/10">
      
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
        <div className="flex gap-[3px] items-end h-6">
          <span className="w-[3px] h-2 bg-[#FFB648] rounded-sm" />
          <span className="w-[3px] h-5 bg-[#FFB648] rounded-sm" />
          <span className="w-[3px] h-3 bg-[#FFB648] rounded-sm" />
          <span className="w-[3px] h-6 bg-[#FFB648] rounded-sm" />
        </div>

        <h1 className="text-xl font-semibold tracking-tight">
          JB-BOSE <span className="text-[#FFB648]">Audio</span>
        </h1>
      </Link>

      {/* NAVIGATION */}
      <nav className="hidden md:flex gap-10 text-sm font-medium text-white/80">
        <Link to="/" className="hover:text-[#FFB648] transition-colors">
          Home
        </Link>

        <Link to="/products" className="hover:text-[#FFB648] transition-colors">
          Products
        </Link>

        <Link to="/rentals" className="hover:text-[#FFB648] transition-colors">
          Rentals
        </Link>

        <Link to="/contact" className="hover:text-[#FFB648] transition-colors">
          Contact
        </Link>
      </nav>

      {/* AUTH BUTTONS */}
      <div className="hidden md:flex items-center gap-4">
        <Link to="/login" className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
          Login
        </Link>
        <Link to="/register" className="px-5 py-2 text-sm font-semibold bg-[#FFB648] text-[#0B0F1A] rounded-md hover:bg-[#ffc56e] transition-colors shadow-sm">
          Register
        </Link>
      </div>
    </header>
  );
}