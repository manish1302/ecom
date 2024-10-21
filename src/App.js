import { useContext, useEffect, useState } from "react";
import "./App.css";
import Home from "./Container/Home";
import LoginContainer from "./Container/LoginContainer";
import NavBar from "./Container/NavBar";
import ProductDetail from "./Container/ProductDetail";
import ProductListing from "./Container/ProductListing";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthContext, { AuthProvider } from "./Context/AuthContext";
import SignUpContainer from "./Container/SignUpContainer";
import VendorsOnWheels from "./Container/VendorsOnWheels";
import Chat from "./Container/Chat";
import Payment from "./Container/Payment";
import OrderConfirmed from "./Container/OrderConfirmed";
import PaymentFailed from "./Container/PaymentFailed";
import Home1 from "./Container/Home1";
import Dashboard from "./Container/Dashboard";
import AddAProduct from "./Container/AddAProduct";
import bwimage from "./Assets/Skates/image2.jpg"

function App() {
  const isLoggedIn = localStorage.getItem("IsLoggedIn") === "true";

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
              element={<Navigate to={isLoggedIn ? "/home" : "/signup"} />}
            />
            <Route path="/login" element={<LoginContainer />} />
            <Route path="/signup" element={<SignUpContainer />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products/:type" element={<ProductListing />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
            <Route path="wheels" element = {<VendorsOnWheels/>}/>
            <Route path = "/dashboard" element = {<Dashboard />} />
            <Route path = "/dashboard/add" element = {<AddAProduct />} />
            {/* <Route path = "chat" element = {<Chat />} /> */}
            {/* <Route path = "payment" element ={<Payment />} /> */}
            {/* <Route path = "success" element={<OrderConfirmed />} /> */}
            {/* <Route path = "failure" element={<PaymentFailed />} /> */}
            {/* <Route path = "/home1" element = {<Home1 />} /> */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
