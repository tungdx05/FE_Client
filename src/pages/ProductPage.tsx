import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Giả lập dữ liệu sản phẩm
    const fakeProducts: Product[] = [
      { _id: "1", name: "Áo thun thể thao", price: 199000, image: "/images/ao-thun.jpg" },
      { _id: "2", name: "Quần short tập gym", price: 249000, image: "/images/quan-short.jpg" },
      { _id: "3", name: "Giày chạy bộ nam", price: 599000, image: "/images/giay.jpg" },
      { _id: "4", name: "Áo khoác mùa đông rất dài không bị vỡ layout", price: 499000, image: "/images/ao-khoac.jpg" },
      { _id: "1", name: "Áo thun thể thao", price: 199000, image: "/images/ao-thun.jpg" },
      { _id: "2", name: "Quần short tập gym", price: 249000, image: "/images/quan-short.jpg" },
      { _id: "3", name: "Giày chạy bộ nam", price: 599000, image: "/images/giay.jpg" },
      { _id: "4", name: "Áo khoác mùa đông rất dài không bị vỡ layout", price: 499000, image: "/images/ao-khoac.jpg" },
    ];
    setProducts(fakeProducts);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3
                className="text-lg font-semibold text-gray-800"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal',
                  minHeight: '3rem', // giữ chiều cao cố định cho 2 dòng
                }}
              >
                {product.name}
              </h3>
              <p className="text-purple-600 font-bold">{product.price.toLocaleString()}₫</p>
              <Link
                to={`/products/${product._id}`}
                className="inline-block mt-2 px-4 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-800 text-sm"
              >
                Xem chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
