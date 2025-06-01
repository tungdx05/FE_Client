import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Gửi request GET đến endpoint users có email
      const res = await fetch(`http://localhost:3000/users?email=${email.trim()}`);

      if (!res.ok) {
        throw new Error("Lỗi kết nối tới máy chủ");
      }

      const users = await res.json();

      console.log("Kết quả từ server:", users); // Debug

      // Tìm người dùng có email đúng
      const user = users.find((u: any) => u.email === email.trim());

      if (!user) {
        setError("Email không tồn tại");
        return;
      }

      if (user.password !== password) {
        setError("Mật khẩu không đúng");
        return;
      }

      // Đăng nhập thành công
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (err: any) {
      console.error("Lỗi đăng nhập:", err);
      setError("Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 flex items-center justify-center px-6 py-12">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          Đăng nhập
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent"
            />


            <div className="text-right mt-1">
  <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
    Quên mật khẩu?
  </a>
</div>


          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 text-white font-semibold rounded-full shadow-lg hover:brightness-110 transition"
          >

            Đăng nhập
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600 text-sm">
          Chưa có tài khoản?{" "}
          <a href="/register" className="text-purple-700 font-semibold hover:underline">
            Đăng ký ngay
          </a>
        </p>
      </div>
    </div>
  );
}
