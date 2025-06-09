import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [products] = useState([
    { id: "1", name: "Gradient Graphic T-Shirt", price: 145, category: "casual", imageUrl: "https://via.placeholder.com/200", rating: 4.5, reviews: 120 },
    { id: "2", name: "Polo Shirt", price: 150, category: "casual", imageUrl: "https://via.placeholder.com/200", rating: 4.2, reviews: 85 },
    { id: "3", name: "Checkered Shirt", price: 180, category: "casual", imageUrl: "https://via.placeholder.com/200", rating: 4.0, reviews: 60 },
    { id: "4", name: "Striped T-Shirt", price: 120, category: "casual", imageUrl: "https://via.placeholder.com/200", rating: 4.3, reviews: 95 },
    { id: "5", name: "Skinny Fit Jeans", price: 240, category: "casual", imageUrl: "https://via.placeholder.com/200", rating: 4.7, reviews: 150 },
    { id: "6", name: "Vertical Striped Shirt", price: 145, category: "formal", imageUrl: "https://via.placeholder.com/200", rating: 4.1, reviews: 70 },
    { id: "7", name: "Courage Graphic T-Shirt", price: 130, category: "sport", imageUrl: "https://via.placeholder.com/200", rating: 4.4, reviews: 100 },
    { id: "8", name: "Luxo Fit Shorts", price: 80, category: "sport", imageUrl: "https://via.placeholder.com/200", rating: 4.0, reviews: 50 },
  ]);

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-US", { style: "currency", currency: "USD" });

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // 3 sản phẩm mỗi hàng, 2 hàng mỗi trang

  // Lọc sản phẩm theo danh mục
  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  // Logic phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Category Page</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Section */}
        <div className="w-full md:w-1/4 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Categories</h3>
              <div className="flex flex-col gap-1">
                <label className="text-sm">
                  <input type="checkbox" className="mr-2" /> T-Shirts
                </label>
                <label className="text-sm">
                  <input type="checkbox" className="mr-2" /> Shirts
                </label>
                <label className="text-sm">
                  <input type="checkbox" className="mr-2" /> Hoodie
                </label>
                <label className="text-sm">
                  <input type="checkbox" className="mr-2" /> Jeans
                </label>
                <label className="text-sm">
                  <input type="checkbox" className="mr-2" /> Shorts
                </label>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Price</h3>
              <input
                type="range"
                min="0"
                max="300"
                className="w-full"
              />
              <div className="text-sm text-gray-600 mt-1">$0 - $300</div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                <button className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm">XS</button>
                <button className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm">S</button>
                <button className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm">M</button>
                <button className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm">L</button>
                <button className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm">XL</button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                <button className="w-6 h-6 bg-red-500 rounded-full border border-gray-300"></button>
                <button className="w-6 h-6 bg-blue-500 rounded-full border border-gray-300"></button>
                <button className="w-6 h-6 bg-green-500 rounded-full border border-gray-300"></button>
                <button className="w-6 h-6 bg-yellow-500 rounded-full border border-gray-300"></button>
                <button className="w-6 h-6 bg-purple-500 rounded-full border border-gray-300"></button>
                <button className="w-6 h-6 bg-gray-500 rounded-full border border-gray-300"></button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Dress Style</h3>
              <div className="flex flex-col gap-1">
                <label className="text-sm">
                  <input type="checkbox" className="mr-2" /> Casual
                </label>
                <label className="text-sm">
                  <input type="checkbox" className="mr-2" /> Formal
                </label>
                <label className="text-sm">
                  <input type="checkbox" className="mr-2" /> Sport
                </label>
              </div>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800">Apply Filter</button>
          </div>
        </div>

        {/* Products Section */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {category ? category.charAt(0).toUpperCase() + category.slice(1) : "All Products"}
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
              </span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>Most Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-4 text-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-2 rounded"
                />
                <h3 className="text-sm font-medium">{product.name}</h3>
                <div className="flex items-center justify-center text-yellow-500 mb-1">
                  {"★".repeat(Math.floor(product.rating))}
                  {product.rating % 1 !== 0 && "☆"}
                  <span className="text-gray-600 text-xs ml-1">({product.reviews} reviews)</span>
                </div>
                <p className="text-lg font-semibold">{formatCurrency(product.price)}</p>
                {product.price < 150 && (
                  <p className="text-red-500 text-sm line-through">{formatCurrency(product.price + 30)}</p>
                )}
                {product.price < 150 && <span className="text-red-500 text-sm"> -20%</span>}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center items-center space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-4 py-2 rounded ${currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;