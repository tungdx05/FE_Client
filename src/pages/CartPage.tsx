import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom

const CartPage: React.FC = () => {
  // Dữ liệu sản phẩm mẫu trong giỏ hàng
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Gradient Graphic T-Shirt",
      slug: "gradient-graphic-t-shirt",
      description: "Size: Large | Color: White",
      price: 145000,
      salePrice: null,
      sku: "GTS123",
      stockQuantity: 50,
      brand: "CoolMate",
      material: "Cotton",
      images: [
        {
          imageUrl: "https://via.placeholder.com/80",
          altText: "Gradient Graphic T-Shirt",
        },
      ],
      origin: "Domestic",
      warrantyInfo: "Return within 7 days",
      quantity: 2,
    },
    {
      id: "2",
      name: "Checkered Shirt",
      slug: "checkered-shirt",
      description: "Size: Medium | Color: Red",
      price: 180000,
      salePrice: null,
      sku: "CS456",
      stockQuantity: 20,
      brand: "Puma",
      material: "Cotton",
      images: [
        {
          imageUrl: "https://via.placeholder.com/80",
          altText: "Checkered Shirt",
        },
      ],
      origin: "Imported",
      warrantyInfo: "Warranty 1 year",
      quantity: 1,
    },
    {
      id: "3",
      name: "Skinny Fit Jeans",
      slug: "skinny-fit-jeans",
      description: "Size: Large | Color: Blue",
      price: 240000,
      salePrice: null,
      sku: "SFJ789",
      stockQuantity: 30,
      brand: "Levi's",
      material: "Denim",
      images: [
        {
          imageUrl: "https://via.placeholder.com/80",
          altText: "Skinny Fit Jeans",
        },
      ],
      origin: "Imported",
      warrantyInfo: "Return within 7 days",
      quantity: 1,
    },
  ]);

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-US", { style: "currency", currency: "USD" });

  const subtotal = cartItems.reduce((total, item) => {
    const price = item.salePrice ?? item.price;
    return total + price * item.quantity;
  }, 0);

  const discount = 113; // Ví dụ: 20% discount
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  // Hàm xử lý tăng số lượng
  const handleIncreaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity < item.stockQuantity
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Hàm xử lý giảm số lượng
  const handleDecreaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Hàm xử lý xóa sản phẩm
  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Cart Items Section */}
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl font-bold mb-6">Cart</h1>
          <div className="overflow-x-auto">
            <div className="space-y-4">
              {cartItems.map((item) => {
                const price = item.salePrice ?? item.price;
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border border-gray-200 p-4 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.images[0]?.imageUrl}
                        alt={item.images[0]?.altText}
                        className="w-20 h-20 object-cover"
                      />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">
                          {item.description}
                        </div>
                        <div className="text-sm">{formatCurrency(price)}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDecreaseQuantity(item.id)}
                        className="w-8 h-8 bg-gray-200 rounded-full text-sm hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(item.id)}
                        className="w-8 h-8 bg-gray-200 rounded-full text-sm hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold">
                        {formatCurrency(price * item.quantity)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
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
            <div className="mt-4">
              <input
                type="text"
                placeholder="Add promo code"
                className="w-full p-2 border border-gray-300 rounded-l-full text-sm"
              />
              <button className="w-20 p-2 bg-black text-white rounded-r-full text-sm">
                Apply
              </button>
            </div>
            <Link to="/checkout" className="w-full mt-6 block">
              <button className="w-full p-3 bg-black text-white rounded-full text-sm font-semibold">
                Proceed to Checkout →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;