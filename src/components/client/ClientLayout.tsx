import React from "react";
import { Link } from "react-router-dom";

const ClientLayout: React.FC = () => {
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
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gradient-to-r from-purple-100 to-pink-100 py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Khám phá sản phẩm <br /> chất lượng cao từ{" "}
              <span className="text-purple-700">Slyout</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Đem lại sự hài lòng tuyệt đối cho bạn. Hãy đăng ký và trải
              nghiệm ngay hôm nay!
            </p>
            <Link
              to="/register"
              className="px-6 py-3 bg-purple-700 text-white rounded-full font-semibold shadow-md hover:bg-purple-800 transition"
            >
              Bắt đầu ngay
            </Link>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-12 text-gray-900">
              Sản phẩm nổi bật
            </h2>
            <div className="grid gap-10 md:grid-cols-3">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                >
                  <img
                    src={`https://source.unsplash.com/random/300x200?sig=${index}`}
                    alt="Sản phẩm"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Sản phẩm {index + 1}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Mô tả ngắn gọn sản phẩm.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
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
