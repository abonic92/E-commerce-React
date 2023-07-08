import './App.css'
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Nav from './components/nav/Navbar';
// import Login from './components/login/Login';
// import Register from './components/login/Register';
// import Categories from './components/categories/Categories';
// import Products from './components/products/Products';
// import ProductDetail from './components/products/ProductDetail';
// import CreateProduct from './components/products/CreateProduct';
// import EditProduct from './components/products/EditProduct';
// import CartDetail from './components/cart/CartDetail';

const App: React.FC = () => {
  return (
    <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={Login} />
          <Route path="/register" element={Register} />
          <Route path="/categories" element={Categories} />
          <Route path="/products" element={Products} />
          <Route path="/products/:id" element={ProductDetail} />
          <Route path="/products/create" element={CreateProduct} />
          <Route path="/products/edit/:id" element={EditProduct} />
          <Route path="/cart-detail" element={CartDetail} /> */}
        </Routes>

      </BrowserRouter>
  );
}

export default App;