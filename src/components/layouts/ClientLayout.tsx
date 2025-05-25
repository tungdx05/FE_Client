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
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-purple-700">
            Slyout
          </Link>
          <nav className="space-x-6 text-sm md:text-base">
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
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-purple-700 font-semibold">
                  Xin chào, {user.fullname || "Người dùng"}
                </span>
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
