import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "../common/Header";
import Banner from "../common/Banner";
import Footer from "../common/Footer";

const ClientLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<{ fullname?: string } | null>(null);

  // Ẩn banner nếu là trang chi tiết sản phẩm hoặc trang giỏ hàng
  const isHiddenBannerPage =
    /^\/products\/[^/]+$/.test(location.pathname) || location.pathname === "/cart";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Header />
      {!isHiddenBannerPage && <Banner />}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
