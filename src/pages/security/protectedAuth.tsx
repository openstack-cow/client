import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Kiểm tra token lưu trong localStorage

  if (!isAuthenticated) {
    return <Navigate to="/auth" />; // Chuyển hướng nếu chưa đăng nhập
  }

  return children;
};

export default ProtectedRoute;