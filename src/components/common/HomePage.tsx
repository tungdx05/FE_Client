import React from "react";
// import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Chào mừng đến với <span className="text-purple-700">Slyout</span>
        </h1>
        {/* <p className="text-lg md:text-xl text-gray-600 mb-8">
          Đăng ký ngay để khám phá trải nghiệm tuyệt vời và sản phẩm chất lượng cùng chúng tôi.
        </p> */}

        {/* <div className="flex justify-center space-x-6">
          <Link
            to="/register"
            className="px-6 py-3 bg-purple-700 text-white rounded-full font-semibold shadow-md hover:bg-purple-800 transition"
          >
            Đăng ký
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-purple-700 text-purple-700 rounded-full font-semibold shadow-md hover:bg-purple-100 transition"
          >
            Đăng nhập
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;
