import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../api/api.js";

export default function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadCart = async () => {
      if (!userId) {
        setCartCount(0);
        return;
      }
      try {
        const res = await api.get(`/cart/${userId}`);
        const items = res.data.CartItems || [];
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      } catch {
        setCartCount(0);
      }
    };

    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, [userId]);

  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">

          {/* Logo - Unified Blue/Indigo Theme */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <span className="text-2xl">🛍️</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Lakshmi Store
              </h1>
              <p className="hidden sm:block text-xs text-gray-500">Shop • Smile • Repeat</p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2 sm:gap-5">

            {/* Home */}
            <Link to="/" className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-lg text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
              🏠 <span>Home</span>
            </Link>

            {/* ✅ NEW: Admin Link - Visible only when logged in */}
            {userId && (
              <Link to="/admin/products" className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-lg text-gray-700 font-medium hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">
                🛠️ <span>Admin</span>
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative flex items-center justify-center w-11 h-11 rounded-full text-2xl hover:bg-blue-50 hover:scale-105 transition-all duration-200">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[21px] h-[21px] px-1 flex items-center justify-center bg-red-500 text-white text-[11px] font-bold rounded-full border-2 border-white shadow-sm">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {!userId ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link to="/login" className="px-4 py-2 rounded-lg text-gray-700 font-semibold hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                  Login
                </Link>
                <Link to="/signup" className="px-4 sm:px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                  Signup
                </Link>
              </div>
            ) : (
              <button onClick={logout} className="px-4 sm:px-5 py-2.5 rounded-lg border border-red-200 text-red-500 font-semibold hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200">
                Logout
              </button>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}