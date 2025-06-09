import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const ClientLayout: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ fullname?: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      {/* Header */}
      <header className="shadow-md">
        <div className="container w-full max-w-screen-xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src="/src/assets/images/Logo-bgremove.png" alt="SHOP.CO Logo" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8 text-sm md:text-base text-blue-600 md:ml-5">
            <Link to="/shop" className="hover:text-purple-700">Shop</Link>
            <Link to="/on-sale" className="hover:text-purple-700">On Sale</Link>
            <Link to="/new-arrivals" className="hover:text-purple-700">New Arrivals</Link>
            <Link to="/brands" className="hover:text-purple-700">Brands</Link>
          </nav>

          {/* Search Bar */}
          <div className="flex-grow md:flex-none md:ml-12 mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Link to="/cart" className="hover:text-purple-700 text-gray-600 md:ml-3">
              <span role="img" aria-label="cart">🛒</span>
            </Link>

            {user ? (
              <>
                <Link to="/profile" className="px-4 py-1 border border-green-600 text-green-600 rounded-full hover:bg-green-100 text-sm transition">
                  Xin chào, {user.fullname || "user"}
                </Link>
                <button onClick={handleLogout} className="px-4 py-1 border border-red-600 text-red-600 rounded-full hover:bg-red-100 text-sm transition">
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-1 border border-purple-700 text-purple-700 rounded-full hover:bg-purple-100 text-sm transition">
                  Đăng nhập
                </Link>
                <Link to="/register" className="px-4 py-1 bg-purple-700 text-white rounded-full hover:bg-purple-800 text-sm transition">
                  Đăng ký
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden mt-4">
            <button className="focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white shadow-md`}>
          <nav className="flex flex-col space-y-2 p-4">
            <Link to="/shop" className="text-blue-600 hover:text-purple-700" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            <Link to="/on-sale" className="text-blue-600 hover:text-purple-700" onClick={() => setIsMenuOpen(false)}>On Sale</Link>
            <Link to="/new-arrivals" className="text-blue-600 hover:text-purple-700" onClick={() => setIsMenuOpen(false)}>New Arrivals</Link>
            <Link to="/brands" className="text-blue-600 hover:text-purple-700" onClick={() => setIsMenuOpen(false)}>Brands</Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto max-w-screen-xl px-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Slyout. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ClientLayout;