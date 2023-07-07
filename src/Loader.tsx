import React from "react";
import { useLocation, Navigate } from "react-router-dom";

export default function Loaders() {
  const location = useLocation();
  return <>{location.pathname == "/" && <Navigate to="/v1/login" />}</>;
}
