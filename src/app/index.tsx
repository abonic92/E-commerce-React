import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import Layout from "./components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import Categories from "./screens/Categories";
import ProductsByCategory from "./screens/ProductsCategories";
import Products from "./screens/Products";
import Login from "./screens/LoginUser";
import Register from "./screens/RegisterUser";
import { useState } from "react";
import { PrivateRoute } from "./components/PrivateRoute";

import { AdminRoute } from './components/AdminRoute';
import CreateCategoryForm from "./screens/CreateCategory";
import AdminPage from "./screens/Admin";
import CreateProduct from "./screens/CreateProduct";
import EditCategory from "./screens/EditCategory";
import EditProduct from "./screens/EditProduct";
import CartProvider from './hooks/CartContext';
import DetailProduct from './screens/DetailProduct.tsx';
import DetailCart from './screens/Cart/index.tsx';



const queryClient = new QueryClient();

function App() {

  const [userName, setUserName] = useState("");
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');

  const handleSetLoggedIn = (loggedIn: boolean | ((prevState: boolean) => boolean)) => {
    setLoggedIn(loggedIn);
    localStorage.setItem('loggedIn', loggedIn ? 'true' : 'false');
  };
  

  const handleLogout = () => {
    setLoggedIn(false);
    // setUserName("");
    
    localStorage.removeItem("loggedIn"); // cerrar sesión
    localStorage.removeItem("accessToken"); // Remueve el token del local storage al cerrar sesión
    localStorage.removeItem("userData"); //Remueve los datos del usuario
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <CartProvider>
      <Routes>
          <Route element={<Layout loggedIn={loggedIn} userName={userName} handleLogout={handleLogout} />}>

            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:categoryId/products" element={<ProductsByCategory />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:productId" element={<DetailProduct />} />
            <Route path="/cart/detail" element={<DetailCart />} />

            <Route
              path="/adminpage"
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              }
            />
            <Route
              path="/producto/create"
              element={
                <AdminRoute>
                  <CreateProduct />
                </AdminRoute>
              }
            />

            <Route
              path="/category/create"
              element={
                <AdminRoute>
                  <CreateCategoryForm />
                </AdminRoute>
              }
            />
            <Route
              path="/category/edit"
              element={
                <AdminRoute>
                  <EditCategory />
                </AdminRoute>
              }
            />
            <Route
              path="/product/edit"
              element={
                <AdminRoute>
                  <EditProduct />
                </AdminRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PrivateRoute>
                  <Login setLoggedIn={handleSetLoggedIn} setUserName={setUserName} />
                </PrivateRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PrivateRoute>
                  <Register setLoggedIn={handleSetLoggedIn} setUserName={setUserName} />
                </PrivateRoute>
              }
            />
            </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
      </CartProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
