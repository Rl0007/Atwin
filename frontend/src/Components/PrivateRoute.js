import { useContext } from "react";
import { Route, redirect } from "react-router-dom";
// import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./AuthContext";
const PrivateRoute = ({ children, ...rest }) => {
  const { user, user_details } = useContext(AuthContext);
  return user_details?.is_staff ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
