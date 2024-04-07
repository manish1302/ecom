import { useContext, useEffect, useState } from "react";
import "./App.css";
import Home from "./Container/Home";
import LoginContainer from "./Container/LoginContainer";
import NavBar from "./Container/NavBar";
import ProductDetail from "./Container/ProductDetail";
import ProductListing from "./Container/ProductListing";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthContext, { AuthProvider } from "./Context/AuthContext";

function App() {
  const isLoggedIn = localStorage.getItem("IsLoggedIn") === "true";

  console.log(isLoggedIn, "Manish");
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <div className="Home">
            <NavBar />
          </div>
          <Routes>
            <Route
              path="/"
              element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
            />
            <Route path="/login" element={<LoginContainer />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products/:type" element={<ProductListing />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
