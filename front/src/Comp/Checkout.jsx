import { useState, useEffect } from "react";
import api from "../api/api.js";
import { useNavigate } from "react-router";

export default function Checkout() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (!userId) return;
    api.get(`/cart/${userId}`).then((res) => setCart(res.data));
    api.get(`/address/${userId}`).then((res) => {
      setAddresses(res.data);
      if (res.data.length > 0) setSelectedAddress(res.data[0]);
    });
  }, []);

  if (!cart) return <div className="p-6">Loading...</div>;

  const cartItems = cart.CartItems || [];
  const total = cartItems.reduce(
    (sum, item) => sum + item.Product.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }
    const res = await api.post("/order/place", {
      userId,
      address: selectedAddress,
    });
    navigate(`/order-success/${res.data.orderId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <h2 className="font-semibold mb-2">Select Delivery Address</h2>
      <div className="space-y-3">
        {addresses.map((addr) => (
          <label key={addr.id} className="block border p-3 rounded cursor-pointer">
            <input
              type="radio"
              name="address"
              checked={selectedAddress?.id === addr.id}
              onChange={() => setSelectedAddress(addr)}
              className="mr-2"
            />
            <strong>{addr.fullName}</strong>
            <p className="text-sm">
              {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
            </p>
            <p className="text-sm">📞 {addr.phone}</p>
          </label>
        ))}
      </div>

      <h2 className="font-semibold mt-6 mb-2">Order Summary</h2>
      <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>

      <button
        onClick={placeOrder}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Place Order (COD)
      </button>
    </div>
  );
}