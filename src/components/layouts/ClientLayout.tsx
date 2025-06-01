import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const ClientLayout: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ fullname?: string } | null>(null);

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
        <div className="container mx-auto px-6 py-4 grid grid-cols-3 items-center gap-x-8">
          {/* Logo */}
          <div>
            <Link to="/" className="text-2xl font-bold text-purple-700">
              Slyout
            </Link>
          </div>

          {/* Search Bar */}
          <div>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* User menu + Giỏ hàng */}
          <div className="flex justify-end items-center space-x-4 pl-6">
            <Link
              to="/cart"
              className="hover:text-purple-700 flex items-center space-x-1 mr-4"
            >
              <span role="img" aria-label="cart">🛒</span>
            </Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="px-4 py-2 border border-green-600 text-green-600 rounded-full hover:bg-green-100 transition"
                >
                  Xin chào, {user.fullname || "Người dùng"}
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-red-600 text-red-600 rounded-full hover:bg-red-100 transition"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 border border-purple-700 text-purple-700 rounded-full hover:bg-purple-100 transition"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-800 transition"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="container mx-auto px-6 py-2">
          <nav className="flex justify-center space-x-6 text-sm md:text-base">
            <Link to="/" className="hover:text-purple-700">
              Trang chủ
            </Link>
            <Link to="/products" className="hover:text-purple-700">
              Sản phẩm
            </Link>
            <Link to="/about" className="hover:text-purple-700">
              Giới thiệu
            </Link>
            <Link to="/contact" className="hover:text-purple-700">
              Liên hệ
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Slyout. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ClientLayout;
