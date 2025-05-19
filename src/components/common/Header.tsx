import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-purple-700">
          LOGO
        </Link>
        <nav className="space-x-6 text-sm font-medium">
          <Link to="/register" className="hover:text-purple-700">Đăng ký</Link>
          <Link to="/login" className="hover:text-purple-700">Đăng nhập</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
