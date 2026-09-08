import { useState, useEffect } from "react";
import api from "../api/api.js";
import { useNavigate } from "react-router";

export default function Cart() {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const loadCart = async () => {
    if (!userId) return;
    try {
      const res = await api.get(`/cart/${userId}`);
      setCart(res.data);
    } catch {
      setCart(null);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (productId) => {
    await api.post("/cart/remove", { userId, productId });
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQty = async (productId, quantity) => {
    if (quantity === 0) {
      await removeItem(productId);
      return;
    }
    await api.post("/cart/update", { userId, productId, quantity });
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!cart) return <div className="p-6">Loading...</div>;

  const cartItems = cart.CartItems || [];
  const total = cartItems.reduce(
    (sum, item) => sum + item.Product.price * item.quantity,
    0
  );
return (
  <div className="min-h-screen bg-gray-50 py-10 px-4">
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Your Cart
          </h1>
          <p className="text-gray-500 mt-1">
            Review your items before checkout
          </p>
        </div>

        <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
          {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      {cartItems.length === 0 ? (
        /* Empty Cart */
        <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
          <div className="text-6xl mb-4">🛒</div>

          <h2 className="text-2xl font-bold text-gray-800">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mt-2 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border shadow-sm p-5
                           hover:shadow-md transition duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                  {/* Product Image */}
                  <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.Product.image}
                      alt={item.Product.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-800">
                      {item.Product.title}
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                      ${Number(item.Product.price).toFixed(2)} each
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() =>
                          updateQty(
                            item.productId,
                            item.quantity - 1
                          )
                        }
                        className="w-9 h-9 flex items-center justify-center
                                   rounded-lg border border-gray-300
                                   bg-gray-50 hover:bg-gray-200
                                   font-bold text-lg transition"
                      >
                        −
                      </button>

                      <span className="w-8 text-center font-semibold text-gray-800">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQty(
                            item.productId,
                            item.quantity + 1
                          )
                        }
                        className="w-9 h-9 flex items-center justify-center
                                   rounded-lg border border-gray-300
                                   bg-gray-50 hover:bg-gray-200
                                   font-bold text-lg transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price + Remove */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3">

                    <p className="text-xl font-bold text-gray-900">
                      $
                      {(
                        Number(item.Product.price) *
                        item.quantity
                      ).toFixed(2)}
                    </p>

                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-sm text-red-500 hover:text-red-700
                                 font-medium transition"
                    >
                      Remove
                    </button>

                  </div>

                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 hover:text-blue-800
                         font-medium transition"
            >
              ← Continue Shopping
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border shadow-sm p-6 sticky top-6">

              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">
                    Free
                  </span>
                </div>

                <div className="border-t pt-4 flex justify-between">
                  <span className="text-lg font-bold">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-blue-600">
                    ${total.toFixed(2)}
                  </span>
                </div>

              </div>

              <button
                onClick={() => navigate("/checkout-address")}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700
                           text-white py-3.5 rounded-xl
                           font-semibold text-lg
                           shadow-sm hover:shadow-md
                           transition duration-200"
              >
                Proceed to Checkout →
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                🔒 Secure checkout
              </p>

            </div>
          </div>

        </div>
      )}
    </div>
  </div>
);
}