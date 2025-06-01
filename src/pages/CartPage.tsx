import React from "react";

const CartPage: React.FC = () => {
  // Dữ liệu sản phẩm mẫu trong giỏ hàng
  const cartItems = [
    {
      id: "1",
      name: "Áo Thun Cotton Nam",
      slug: "ao-thun-cotton-nam",
      description: "Áo thun chất liệu cotton cao cấp, thoáng mát.",
      price: 250000,
      salePrice: 199000,
      sku: "ATC123",
      stockQuantity: 50,
      brand: "CoolMate",
      material: "Cotton",
      images: [
        {
          imageUrl: "https://via.placeholder.com/80",
          altText: "Áo thun cotton",
        },
      ],
      origin: "Nội địa",
      warrantyInfo: "Đổi trả trong 7 ngày",
      quantity: 2, // số lượng mua
    },
    {
      id: "2",
      name: "Áo Hoodie Nam",
      slug: "ao-hoodie-nam",
      description: "Áo hoodie phong cách thể thao, giữ ấm tốt.",
      price: 500000,
      salePrice: null,
      sku: "AHN456",
      stockQuantity: 20,
      brand: "Puma",
      material: "Polyester",
      images: [
        {
          imageUrl: "https://via.placeholder.com/80",
          altText: "Áo hoodie nam",
        },
      ],
      origin: "Nhập khẩu",
      warrantyInfo: "Bảo hành 1 năm",
      quantity: 1,
    },
  ];

  const formatCurrency = (value: number) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.salePrice ?? item.price;
    return total + price * item.quantity;
  }, 0);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 text-sm text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Hình ảnh</th>
              <th className="px-4 py-2 border">Tên sản phẩm</th>
              <th className="px-4 py-2 border">Giá</th>
              <th className="px-4 py-2 border">Số lượng</th>
              <th className="px-4 py-2 border">Tạm tính</th>
              <th className="px-4 py-2 border">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              const price = item.salePrice ?? item.price;
              return (
                <tr key={item.id} className="text-sm text-gray-800">
                  <td className="px-4 py-3 border text-center">
                    <img
                      src={item.images[0]?.imageUrl}
                      alt={item.images[0]?.altText}
                      className="w-20 h-20 object-cover mx-auto"
                    />
                  </td>
                  <td className="px-4 py-3 border">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">
                      Mã: {item.sku} | {item.material}
                    </div>
                  </td>
                  <td className="px-4 py-3 border text-right">
                    {item.salePrice ? (
                      <div>
                        <span className="line-through text-gray-400 mr-1">
                          {formatCurrency(item.price)}
                        </span>
                        <span className="text-red-500 font-semibold">
                          {formatCurrency(item.salePrice)}
                        </span>
                      </div>
                    ) : (
                      formatCurrency(item.price)
                    )}
                  </td>
                  <td className="px-4 py-3 border text-center">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-3 border text-right">
                    {formatCurrency(price * item.quantity)}
                  </td>
                  <td className="px-4 py-3 border text-center">
                    <button className="text-red-600 hover:underline text-sm">
                      Xoá
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="px-4 py-3 border text-right font-semibold">
                Tổng cộng:
              </td>
              <td className="px-4 py-3 border text-right font-bold text-lg text-purple-700">
                {formatCurrency(totalPrice)}
              </td>
              <td className="px-4 py-3 border"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default CartPage;
