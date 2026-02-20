
import './App.css'
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button } from './components/ui/button'
import Master from "./router/Master"; 
import ScrollToTop from "./components/ScrollToTop"; 
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ToastProvider from "./components/providers/ToastProvider";

function App() {


  return (
    <>
      <ToastProvider>
      <Router>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/*" element={<Master />} />
                </Routes>
              </Router>
    </ToastProvider>
    </>
  )
}

export default App
