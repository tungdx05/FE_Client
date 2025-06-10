import React from "react";
import { Link } from "react-router-dom";

const CheckoutPage: React.FC = () => {
  // Dữ liệu giỏ hàng mẫu (có thể lấy từ state hoặc context)
  const cartItems = [
    {
      id: "1",
      name: "Gradient Graphic T-Shirt",
      description: "Size: Large | Color: White",
      price: 145000,
      quantity: 2,
      images: [{ imageUrl: "https://via.placeholder.com/80", altText: "Gradient Graphic T-Shirt" }],
    },
    {
      id: "2",
      name: "Checkered Shirt",
      description: "Size: Medium | Color: Red",
      price: 180000,
      quantity: 1,
      images: [{ imageUrl: "https://via.placeholder.com/80", altText: "Checkered Shirt" }],
    },
    {
      id: "3",
      name: "Skinny Fit Jeans",
      description: "Size: Large | Color: Blue",
      price: 240000,
      quantity: 1,
      images: [{ imageUrl: "https://via.placeholder.com/80", altText: "Skinny Fit Jeans" }],
    },
  ];

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-US", { style: "currency", currency: "USD" });

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = 113; // Ví dụ: 20% discount
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Shipping Information */}
        <div className="w-full md:w-2/3">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                placeholder="Enter your address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                placeholder="Enter your phone number"
              />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x{item.quantity}</span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Discount (20%)</span>
              <span>-{formatCurrency(discount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>{formatCurrency(deliveryFee)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <Link to = "/">
                <button className="w-full mt-6 p-3 bg-black text-white rounded-full text-sm font-semibold">
                Checkout
            </button>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;