import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!res.ok) throw new Error("Đăng ký thất bại!");

      alert("Đăng ký thành công!");
      setFormData({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/"); // Chuyển về trang chủ sau khi đăng ký thành công
    } catch (error: any) {
      alert(error.message || "Có lỗi xảy ra, thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 flex items-center justify-center px-6 py-12">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full flex overflow-hidden">
        {/* Phần hình ảnh bên trái */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
            alt="Fashion illustration"
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-8 left-8 text-white font-bold text-xl drop-shadow-lg">
            Khám phá phong cách của bạn
          </div>
        </div>

        {/* Form bên phải */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white shadow-lg rounded-l-3xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center leading-tight">
            Tạo tài khoản mới
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Họ và tên
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                value={formData.fullname}
                onChange={handleChange}
                required
                placeholder="Nguyễn Văn A"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="email@example.com"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="********"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Xác nhận mật khẩu
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="********"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-6 bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 text-white font-semibold rounded-full shadow-lg hover:brightness-110 transition disabled:opacity-50"
            >
              {loading ? "Đang xử lý..." : "Đăng ký"}
            </button>
          </form>

          <p className="mt-10 text-center text-gray-600 text-sm">
            Đã có tài khoản?{" "}
            <a
              href="/login"
              className="text-purple-700 font-semibold hover:underline"
            >
              Đăng nhập ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
