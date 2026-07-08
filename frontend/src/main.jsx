import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import CodeGen from "./pages/CodeGen";
import CodeAnalyze from "./pages/CodeAnalyze";
import CodeReview from "./pages/CodeReview";
import History from "./pages/History";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import ContactUs from "./pages/ContactUs";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import ProtectedRoute from "./components/ProtectedRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/codegen" element={<ProtectedRoute><CodeGen /></ProtectedRoute>} />
        <Route path="/codeanalyze" element={<ProtectedRoute><CodeAnalyze /></ProtectedRoute>} />
        <Route path="/codereview" element={<ProtectedRoute><CodeReview /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/contactus" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />

        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);