import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "Áo thun", slug: "ao-thun" },
  { id: 2, name: "Quần jean", slug: "quan-jean" },
  { id: 3, name: "Giày thể thao", slug: "giay-the-thao" },
];

const CategorySidebar: React.FC = () => {
  return (
    <aside className="w-full md:w-64 p-5 bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link
              to={`/products?category=${cat.slug}`}
              className="block px-4 py-2 text-gray-700 rounded-lg hover:bg-purple-100 hover:text-purple-700 transition-all"
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategorySidebar;
