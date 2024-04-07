import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import AuthContext from "../Context/AuthContext";
const LoginContainer = () => {
  const [emailId, setEmailId] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { Authlogout, Authlogin } = useContext(AuthContext);

  const handleSubmit = () => {
    setIsLoading(true);
    const config = {
      method: "post",
      url: "https://localhost:7272/login",
      headers: {
        Accept: "application/json, text/plain, */*",
        mode: "no-cors",
        "Access-Control-Allow-Origin": "*",
        // Other headers as needed
      },
      data: {
        email: emailId,
        password: password,
        twoFactorCode: "string",
        twoFactorRecoveryCode: "string",
      },
    };
    axios(config)
      .then((resp) => {
        Authlogin();
        localStorage.setItem("jwtToken", "Bearer " + resp.data?.accessToken);
        localStorage.setItem("JapandiEmailId", emailId);
        localStorage.setItem("IsLoggedIn", true);
        console.log(
          localStorage,
          localStorage.getItem("JapandiEmailId"),
          "hisdhbhvdh"
        );
        navigate("/home");
        setIsLoading(false);
      })
      .catch((error) => {
        localStorage.removeItem("JapandiEmailId");
        localStorage.removeItem("IsLoggedIn");
        localStorage.removeItem("jwtToken");
        navigate("/login");
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <Loader isLoading={isLoading}>
      <div className="login-container">
        <div className="login-box">
          <div className="login-title mb-3">THE.JAPANDI.STORE</div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              className="login-input"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="login-button" onClick={handleSubmit}>
            Login
          </button>
          <button className="signup-button">Sign Up</button>
        </div>
      </div>
    </Loader>
  );
};

export default LoginContainer;
