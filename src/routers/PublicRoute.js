import React from "react";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children, loggedIn, redirectTo }) => {
  return loggedIn ? <Navigate to={redirectTo} /> : children;
};
