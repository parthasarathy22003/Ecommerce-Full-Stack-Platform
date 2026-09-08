import { useEffect, useState } from "react";
import api from "../api/api.js";
import { Link } from "react-router";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    const res = await api.get(
      `/products?search=${search}&category=${category}`
    );
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      const res = await api.post("/cart/add", {
        userId,
        productId,
      });

      const items = res.data.cart.CartItems || [];
      const total = items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      localStorage.setItem("cartCount", total);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to add to cart"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="max-w-2xl">
            <p className="text-blue-200 text-sm font-semibold uppercase tracking-wider mb-2">
              Welcome to our store
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Find the best tech for your everyday life.
            </h1>

            <p className="mt-4 text-blue-100 text-lg">
              Explore laptops, mobiles, tablets and more at great prices.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto px-6 -mt-7 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-5">
          <div className="flex flex-col md:flex-row gap-4">

            {/* Search */}
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  pl-12 pr-4 py-3
                  border border-gray-200
                  rounded-xl
                  bg-gray-50
                  text-gray-800
                  placeholder-gray-400
                  outline-none
                  transition
                  focus:bg-white
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                "
              />
            </div>

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="
                w-full md:w-64
                px-4 py-3
                border border-gray-200
                rounded-xl
                bg-gray-50
                text-gray-700
                outline-none
                cursor-pointer
                transition
                focus:bg-white
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
              "
            >
              <option value="">All Categories</option>
              <option value="Laptops">Electronics</option>
              <option value="Mobiles">Footwear</option>
              <option value="Tablets">Clothing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Our Products
            </h2>

            <p className="text-gray-500 mt-1">
              Discover products you will love
            </p>
          </div>

          <span className="hidden sm:block text-sm text-gray-500">
            {products.length} products
          </span>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">

            {products.map((product) => (
              <div
                key={product.id}
                className="
                  group
                  bg-white
                  rounded-2xl
                  border border-gray-100
                  overflow-hidden
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >

                {/* Image */}
                <Link to={`/product/${product.id}`}>
                  <div className="relative h-48 md:h-56 bg-gray-50 flex items-center justify-center p-5 overflow-hidden">

                    <img
                      src={product.image}
                      alt={product.title}
                      className="
                        w-full
                        h-full
                        object-contain
                        group-hover:scale-105
                        transition-transform
                        duration-500
                      "
                    />

                    {/* Category Badge */}
                    {product.category && (
                      <span
                        className="
                          absolute
                          top-3 left-3
                          bg-white/90
                          backdrop-blur-sm
                          text-xs
                          font-semibold
                          text-gray-600
                          px-3 py-1
                          rounded-full
                          shadow-sm
                        "
                      >
                        {product.category}
                      </span>
                    )}
                  </div>
                </Link>

                {/* Product Details */}
                <div className="p-4">

                  <Link to={`/product/${product.id}`}>
                    <h2
                      className="
                        font-semibold
                        text-gray-900
                        text-base
                        md:text-lg
                        line-clamp-2
                        min-h-[48px]
                        hover:text-blue-600
                        transition
                      "
                    >
                      {product.title}
                    </h2>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-yellow-400 text-sm">
                      ★★★★★
                    </span>

                    <span className="text-xs text-gray-400">
                      4.5
                    </span>
                  </div>

                  {/* Price + Cart */}
                  <div className="flex items-center justify-between mt-4">

                    <div>
                      <p className="text-xs text-gray-400">
                        Price
                      </p>

                      <p className="text-xl font-bold text-gray-900">
                        ${product.price}
                      </p>
                    </div>

                    <button
                      onClick={() => addToCart(product.id)}
                      className="
                        flex items-center gap-2
                        bg-blue-600
                        hover:bg-blue-700
                        active:scale-95
                        text-white
                        px-3 md:px-4
                        py-2
                        rounded-xl
                        text-sm
                        font-semibold
                        shadow-sm
                        hover:shadow-md
                        transition-all
                      "
                    >
                      <span>🛒</span>
                      <span className="hidden sm:inline">
                        Add
                      </span>
                    </button>

                  </div>
                </div>
              </div>
            ))}

          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">

            <div className="text-5xl mb-4">
              🔍
            </div>

            <h3 className="text-xl font-bold text-gray-900">
              No products found
            </h3>

            <p className="text-gray-500 mt-2">
              Try a different search or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("");
              }}
              className="
                mt-5
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5 py-2
                rounded-lg
                font-medium
                transition
              "
            >
              Clear Filters
            </button>

          </div>
        )}
      </main>
    </div>
  );
}

