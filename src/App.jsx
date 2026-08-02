import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./Styles/global.css";
import Home from "./Pages/Home/Home";
import Layout from "./Layout/Layout";
import Contact from "./Pages/Contact/Contact";
import Disclaimer from "./Pages/Disclaimer/Disclaimer";
import AboutUs from "./Pages/About/About";
import ReturnPolicy from "./Pages/ReturnPolicy/ReturnPolicy";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import ProductDetals from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import Ordersuccess from "./Pages/Checkout/Ordersuccess";
import Profile from "./Pages/Profile/Profile";
import Orders from "./Pages/Admin/Order/Orders";
import AddProduct from "./Pages/Admin/Product/AddProduct";
import AdminDashboard from "./Pages/Admin/Dashboard/AdminDashboard";
import AllProducts from "./Pages/Admin/Product/AllProducts";
import EditProduct from "./Pages/Admin/Product/EditProduct";
import AllUsers from "./Pages/Admin/Users/AllUsers";
import UserProtectedRoutes from "./routes/UserProtectedRoutes";
import AdminProtectedRoutes from "./routes/AdminProtectedRoutes";
import ToastProvider from "./Components/Toast/ToastProvider";
import NotFound from "./Pages/errors/NotFound";
import ServerError from "./Pages/errors/ServerError";

function App() {
  return (
    <Router>
      <ToastProvider/>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public Routes */}
          <Route path="" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/return" element={<ReturnPolicy />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetals />} />
          <Route path="/cart" element={<Cart />} />

          //Error Pages
          <Route path="*" element={<NotFound />} />
          <Route path="/500" element={<ServerError />} />

          {/* User Routes */}
          <Route element={<UserProtectedRoutes />}>
            <Route path="/cart/checkout" element={<Checkout />} />
            <Route path="/ordersuccess" element={<Ordersuccess />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminProtectedRoutes />}>
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/product-add" element={<AddProduct />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AllProducts />} />
            <Route path="/admin/product/:id" element={<EditProduct />} />
            <Route path="/admin/users" element={<AllUsers />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
