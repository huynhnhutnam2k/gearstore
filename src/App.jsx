import "./assets/libs/boxicons-2.1.1/css/boxicons.min.css";
import "./scss/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import Loading from "./components/loading/Loading";
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

const Blank = React.lazy(() => import("./pages/Blank"));
const MainLayout = React.lazy(() => import("./layout/MainLayout"));
const ProductRender = React.lazy(() => import("./pages/product/ProductRender"));
const ProductAdd = React.lazy(() => import("./pages/product/ProductAdd"));
const ProductEdit = React.lazy(() => import("./pages/product/ProductEdit"));
const CategoryRender = React.lazy(() =>
  import("./pages/category/CategoryRender")
);
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="category" element={<CategoryRender />} />
            <Route path="products" element={<ProductRender />} />
            <Route path="add-products" element={<ProductAdd />} />
            <Route path="edit-products/:id" element={<ProductEdit />} />
            <Route path="customers" element={<Blank />} />
            <Route path="settings" element={<Blank />} />
            <Route path="stats" element={<Blank />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
