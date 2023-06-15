import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ProductPage from '../pages/ProductPage';
import SpecificProduct from '../pages/SpecificProduct';
import Orders from '../pages/Orders';
import CheckoutPage from '../pages/CheckoutPage';
import OrderHistoryPage from '../pages/OrderHistoryPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Logout from '../pages/Logout';
import ErrorPage from '../pages/ErrorPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/products/:productId" element={<SpecificProduct />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/history" element={<OrderHistoryPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AppRoutes;
