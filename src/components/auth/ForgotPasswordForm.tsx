import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    setLoading(true);

    try {
      // Tìm user theo email
      const res = await fetch(`http://localhost:3000/users?email=${email}`);
      const users = await res.json();
      const user = users[0];

      if (!user) {
        setError("Không tìm thấy người dùng với email này!");
        return;
      }

      // Cập nhật mật khẩu
      const updateRes = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!updateRes.ok) {
        throw new Error("Cập nhật mật khẩu thất bại!");
      }

      setMessage("Đổi mật khẩu thành công! Đang chuyển về trang đăng nhập...");
      setTimeout(() => navigate("/login"), 1500);

    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6 font-bold text-center">Quên mật khẩu</h2>

        <label className="block mb-2 font-semibold">Email đã đăng ký</label>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="email@example.com"
        />

        <label className="block mb-2 font-semibold">Mật khẩu mới</label>
        <input
          type="password"
          required
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Nhập mật khẩu mới"
        />

        <label className="block mb-2 font-semibold">Xác nhận mật khẩu mới</label>
        <input
          type="password"
          required
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Nhập lại mật khẩu mới"
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-600 mb-4">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full mt-3 py-2 border border-gray-400 rounded text-gray-700 hover:bg-gray-200 transition"
        >
          Quay lại
        </button>
      </form>
    </div>
  );
}
