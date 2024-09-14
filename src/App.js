import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/Product/ProductList';
import ProductDetails from './components/Product/ProductDetails';
import ProductForm from './components/Product/ProductForm';
import OrderList from './components/Order/OrderList';
import OrderDetails from './components/Order/OrderDetails';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/create-product" element={<ProductForm />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
