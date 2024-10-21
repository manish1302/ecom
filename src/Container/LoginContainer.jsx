import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bwimage from '../Assets/Skates/image2.jpg'
import Loader from "../Components/Loader";
import { message } from "antd";
import AuthContext from "../Context/AuthContext";
import { EyeFilled, EyeInvisibleFilled, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
const LoginContainer = () => {
  const [emailId, setEmailId] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [eyeOpen, setEyeOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  const { Authlogin, toggleCartUpdate, cartUpdate } = useContext(AuthContext);


  const refreshTokens = () => {
    const config = {
        method : "post",
        url : "https://localhost:7272/refresh",
        headers : {
          Authorization : localStorage.getItem("jwtToken"),
          Accept: "application/json, text/pflain, */*",
          mode: "no-cors",
          "Access-Control-Allow-Origin": "*",
        },
        data : {
          refreshToken : localStorage.getItem("refreshToken")
        }
    }
    axios.post(config).then((resp) => {
      console.log(resp, "lkjxcvhb")
      localStorage.setItem("refreshToken", resp?.refreshToken);
      localStorage.setItem("jwtToken", "Bearer " + resp?.accessToken);
    }).catch((err) => {
      console.log(err, "lkjxcvhb")
    })
  }


  axios.interceptors.response.use(
    response => response,
    error => {
      const status = error.response ? error.response.status : null;
      
      if (status === 401) {
        refreshTokens();
        console.log("Unauthorized access");
      } else if (status === 404) {
        // Handle not found errors
        console.log("Post not found");
      } else {
        // Handle other errors
        console.error("An error occurred:", error);
      }
      
      return Promise.reject(error);
    }
  );

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
        localStorage.setItem("refreshToken", resp.data?.accessToken);
        localStorage.setItem("IsLoggedIn", true);
        navigate("/home");
        toggleCartUpdate(!cartUpdate)
        setIsLoading(false);
      })
      .catch((error) => {
        localStorage.removeItem("JapandiEmailId");
        localStorage.removeItem("IsLoggedIn");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
        console.log(error);
        setIsLoading(false);
        window.setTimeout(() => {
          messageApi.open({
            type: "error",
            content: error?.response?.data?.status == 401 ? "Username or password is incorrect" : "Something's wrong",
          });
        }, 100)
      });
  };

  return (
    <Loader isLoading={isLoading}>
      {contextHolder}
      <div className="login-container" style={{background: `url(${bwimage})`}}>
        <div className="login-box">
          <div className="login-title mb-3"><span style={{color : "var(--text-color-dark"}}>THE</span>.KICKFLIP.<span style={{color : "var(--text-color-dark"}}>STORE</span></div>
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
              type={eyeOpen ? "text" : "password"}
              placeholder="Password"
              className="login-input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="passwordEye" onClick={() => {setEyeOpen(!eyeOpen)}}>
            {eyeOpen 
            ? <EyeFilled style={{color : "var(--accent-color-2)"}}/> 
            : <EyeInvisibleFilled style={{color : "var(--accent-color-2)"}}/>}
            </div>
          </div>
          <button type="submit" className="login-button" onClick={handleSubmit}>
            Login
          </button>
          <button className="signup-button" onClick={() => 
            {navigate('/signup')}}>Sign Up</button>
        </div>
      </div>
    </Loader>
  );
};

export default LoginContainer;
