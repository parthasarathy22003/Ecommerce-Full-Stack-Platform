import './App.css';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Home from "./Comp/Home.jsx";
import Login from "./Comp/Login.jsx";
import Signup from "./Comp/Signup.jsx";
import ProductDetails from "./Comp/ProductDetails.jsx";
import AddProduct from "./Admin/AddProduct.jsx";
import EditProduct from "./Admin/EditProduct.jsx";
import ProductList from "./Admin/ProductList.jsx";
import Navbar from "./Comp/NavBar.jsx";
import Cart from "./Comp/Cart.jsx";
import CheckoutAddress from "./Comp/CheckoutAddress.jsx";
import Checkout from "./Comp/Checkout.jsx";
import OrderSuccess from "./Comp/OrderSuccess.jsx"; // fixed .JSX → .jsx

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/cart", element: <Cart /> },
      { path: "/admin/products", element: <ProductList /> },
      { path: "/admin/products/add", element: <AddProduct /> },
      { path: "/admin/products/edit/:id", element: <EditProduct /> },
      { path: "/checkout-address", element: <CheckoutAddress /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/order-success/:id", element: <OrderSuccess /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}