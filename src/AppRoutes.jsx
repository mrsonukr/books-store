import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import ExplorePage from "./pages/Explore";
import CartPage from "./pages/CartPage";
import Dashboard from "./admin/Dashboard";
import Help from "./admin/Help";
import ManageBook from "./admin/ManageBooks";
import Product from "./admin/Product";
import UploadBooks from "./admin/UploadBooks";
import User from "./admin/User";
import EditBook from "./admin/EditBook";
import NotFound from "./pages/NotFound";

const AdminLayout = () => (
  <div className="flex min-h-screen">
    <div className="text-white fixed top-0 left-0 h-screen overflow-y-auto">
      <Sidebar />
    </div>
    <main className="flex-1 ml-[14rem] overflow-y-auto">
      <Outlet />
    </main>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/cart" element={<CartPage />} />

      {/* Admin Routes with Sidebar */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="help" element={<Help />} />
        <Route path="managebook" element={<ManageBook />} />
        <Route path="product" element={<Product />} />
        <Route path="uploadbooks" element={<UploadBooks />} />
        <Route path="user" element={<User />} />
        <Route path="managebook/edit" element={<EditBook />} />
        <Route path="managebook/edit/:id" element={<EditBook />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;