import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // check if token exists

  if (!token) {
    return <Navigate to="/login" replace />; // redirect to login if not logged in
  }

  return children; // render the protected component
};

export default ProtectedRoute;
