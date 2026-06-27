import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { Menu, X } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown and mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    logout();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    toast.success("Signed out successfully 👋");
    navigate("/");
  };

  return (
    <header className="w-full h-20 bg-[#0B0F1A] text-white flex items-center justify-between px-6 md:px-12 sticky top-0 z-50 border-b border-white/10">
      
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

      {/* NAVIGATION (DESKTOP) */}
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

      {/* ACTIONS & PROFILE & MOBILE TOGGLE */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center focus:outline-none border-2 border-transparent hover:border-[#FFB648] rounded-full p-0.5 transition-all duration-300"
            >
              <img
                src={user.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmyS4TygDepDH2AezAFSACrY7V3HuBaXl_Zq7E0d5jD-QW-7ZjPaV1KNY&s=10"}
                alt="Account profile avatar"
                className="w-9 h-9 rounded-full object-cover"
              />
            </button>

            {/* DROPDOWN MENU */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-[#0F1322] border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2.5 border-b border-white/5">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-white/40">Signed in as</p>
                  <p className="text-sm font-semibold truncate text-[#FFB648]">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-white/50 truncate mt-0.5">{user.email}</p>
                </div>

                <Link
                  to="/edit-profile"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-[#FFB648] transition-colors"
                >
                  Edit Profile
                </Link>

                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-[#FFB648] transition-colors font-medium border-t border-white/5"
                  >
                    Admin Dashboard
                  </Link>
                )}

                <button
                  onClick={handleSignOut}
                  className="w-full text-left block px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors border-t border-white/5"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
              Login
            </Link>
            <Link to="/register" className="px-5 py-2 text-sm font-semibold bg-[#FFB648] text-[#0B0F1A] rounded-md hover:bg-[#ffc56e] transition-colors shadow-sm">
              Register
            </Link>
          </div>
        )}

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white/80 hover:text-[#FFB648] focus:outline-none transition-colors duration-200"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#0B0F1A] border-b border-white/10 z-40 shadow-2xl py-6 px-6 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-4 text-base font-semibold">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-[#FFB648] transition-colors py-2 border-b border-white/5"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-[#FFB648] transition-colors py-2 border-b border-white/5"
            >
              Products
            </Link>
            <Link
              to="/rentals"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-[#FFB648] transition-colors py-2 border-b border-white/5"
            >
              Rentals
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-[#FFB648] transition-colors py-2"
            >
              Contact
            </Link>

            {/* Auth options inside mobile menu when logged out */}
            {!user && (
              <div className="flex flex-col gap-3 pt-5 border-t border-white/10">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg text-sm font-semibold border border-white/20 text-white hover:bg-white/5 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg text-sm font-semibold bg-[#FFB648] text-[#0B0F1A] hover:bg-[#ffc56e] transition shadow"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Profile actions inside mobile menu when logged in */}
            {user && (
              <div className="flex flex-col gap-3 pt-5 border-t border-white/10">
                <Link
                  to="/edit-profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/80 hover:text-[#FFB648] text-sm font-semibold transition py-1"
                >
                  Edit Profile
                </Link>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#FFB648] text-sm font-bold transition py-1"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="w-full text-left py-2 text-sm text-red-400 hover:text-red-300 font-semibold transition"
                >
                  Sign Out
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}