import { useEffect, useState } from "react";
import api from "../api/api.js";
import { useParams } from "react-router";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const loadProduct = async () => {
    try {
      const res = await api.get("/products");
      const p = res.data.find((item) => item.id === parseInt(id));
      setProduct(p);
    } catch (error) {
      console.error("Failed to load product:", error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const addToCart = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      return;
    }

    try {
      const res = await api.post("/cart/add", {
        userId,
        productId: product.id,
      });

      const items = res.data.cart.CartItems || [];
      const total = items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      localStorage.setItem("cartCount", total);
      window.dispatchEvent(new Event("cartUpdated"));

      alert("Product added to cart!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add");
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-10 px-4">

      {/* Main Card */}
      <div className="max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500">
          Home <span className="mx-2">/</span>
          Products <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">
            {product.title}
          </span>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Product Image */}
            <div className="bg-gray-100 min-h-[400px] flex items-center justify-center p-8 relative">

              {/* Discount / New Badge */}
              <div className="absolute top-6 left-6 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-full">
                BEST SELLER
              </div>

              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[350px] object-contain mix-blend-multiply hover:scale-105 transition duration-500"
              />
            </div>

            {/* Product Info */}
            <div className="p-8 md:p-12 flex flex-col justify-center">

              {/* Category */}
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                Premium Product
              </p>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-5">
                <div className="flex text-yellow-400 text-lg">
                  ★★★★★
                </div>

                <span className="text-sm text-gray-500">
                  (4.8 / 5)
                </span>
              </div>

              {/* Price */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price}
                </span>

                <span className="text-lg text-gray-400 line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </span>

                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                  20% OFF
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-7 mt-6">
                {product.description}
              </p>

              {/* Divider */}
              <div className="border-t border-gray-200 my-7"></div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 text-sm">

                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-lg">✓</span>
                  <span className="text-gray-600">
                    In Stock
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-lg">✓</span>
                  <span className="text-gray-600">
                    Fast Delivery
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-lg">✓</span>
                  <span className="text-gray-600">
                    Secure Payment
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-lg">✓</span>
                  <span className="text-gray-600">
                    Easy Returns
                  </span>
                </div>

              </div>

              {/* Add To Cart */}
              <button
                onClick={addToCart}
                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all duration-200 flex items-center justify-center gap-3"
              >
                <span className="text-xl">🛒</span>
                Add to Cart
              </button>

              {/* Buy Now */}
              <button
                className="mt-3 w-full border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 font-semibold py-4 rounded-xl transition"
              >
                Buy Now
              </button>

              {/* Secure Checkout */}
              <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-400">
                <span>🔒</span>
                <span>Secure & Safe Checkout</span>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">

          <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <div className="text-2xl mb-2">🚚</div>
            <h3 className="font-semibold text-gray-800">
              Free Delivery
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Fast delivery to your door
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <div className="text-2xl mb-2">↩️</div>
            <h3 className="font-semibold text-gray-800">
              Easy Returns
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Hassle-free return policy
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <div className="text-2xl mb-2">🔐</div>
            <h3 className="font-semibold text-gray-800">
              Secure Payment
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Your payment is protected
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

