import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("IsLoggedIn") === "true"
  );
  const [cartUpdate, setCartUpdate] = useState(false);

  const toggleCartUpdate = () => {
      setCartUpdate(!cartUpdate);
  }
  const Authlogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("IsLoggedIn", "true");
  };

  const Authlogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("IsLoggedIn", "false");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, Authlogin, Authlogout, cartUpdate, toggleCartUpdate }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
