import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import Layout from "./components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import Categories from "./screens/Categories";
import ProductsByCategory from "./screens/ProductsCategories";
// import Categories from "./screens/Categories";
// import Products from "./screens/Products";
// import ProductDetail from "./screens/ProductDetail";
// import Login from "./screens/Login";
// import Register from "./screens/Register";
// import ProductCreate from "./screens/ProductCreate";
// import ProductEdit from "./screens/ProductEdit";
// import CartDetail from "./screens/CartDetail";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:categoryId/products" element={<ProductsByCategory />} />
            {/* <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products/create" element={<ProductCreate />} />
            <Route path="/products/edit/:id" element={<ProductEdit />} />
            <Route path="/cart-detail" element={<CartDetail />} /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
