import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import Home from "./pages/home/App";

export const PageRouter = () => {
  return (
    <Router basename="/v1">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<SignUp />} index />
        <Route path="/login" element={<Login />} index />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};
