import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRouteElement ({ element: Component, ...props }) {
  return (
    props.isLoggedIn ? <Component {...props} /> : <Navigate to="/" replace />
  )
}