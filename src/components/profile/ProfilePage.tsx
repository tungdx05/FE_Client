import React, { useState, useEffect } from "react";

const Profile = () => {
  const [form, setForm] = useState({
    id: "",
    fullname: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setForm(user);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`http://localhost:3000/users/${form.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const updatedUser = await res.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Lưu thông tin thành công!");
    } else {
      alert("Lưu thất bại!");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: 16 }}>Thông tin cá nhân</h2>
      <form onSubmit={handleSave}>
        <div>
          <label>Họ tên</label>
          <input
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: 12, padding: 8 }}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: 12, padding: 8 }}
            required
            type="email"
            disabled
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            background: "#4F46E5",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </form>
    </div>
  );
};

export default Profile;

