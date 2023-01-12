import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  return props.auth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
