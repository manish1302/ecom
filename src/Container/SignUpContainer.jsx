import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { message } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import bwimage from '../Assets/Skates/image2.jpg'

const SignUpContainer = () => {
  const [emailId, setEmailId] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [eyeOpen, setEyeOpen] = useState(false);
  const [eyeOpen2, setEyeOpen2] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const handleSubmit = () => {
    if(password == confirmPassword) {
      setIsLoading(true);
    const config = {
      method: "post",
      url: "https://localhost:7272/register",
      headers: {
        Accept: "application/json, text/plain, */*",
        mode: "no-cors",
        "Access-Control-Allow-Origin": "*",
        // Other headers as needed
      },
      data: {
        email: emailId,
        password: password,
      },
    };
    axios(config)
      .then((resp) => {
        messageApi.open({
          type: "error",
          content: "Account successfully created",
        });
        navigate("/login");
        setIsLoading(false);
      })
      .catch((res) => {
        const x = res?.response?.data?.errors;
        if (x) {
          Object.keys(x).forEach((key) => {
            console.log(`${x[key][0]}`, "sign");
            messageApi.open({
              type: "error",
              content: x[key][0],
            });
          });
        } else {
          messageApi.open({
            type: "error",
            content: "An unexpected error occurred",
          });
        }
        setIsLoading(false);
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Passwords doesn't match",
      });
    }
  };

  return (
    <div>
      {contextHolder}
      <Loader isLoading={isLoading}>
        <div className="login-container"  style={{background: `url(${bwimage})`}}>
          <div className="login-box">
            <div className="login-title mb-3"><span style={{color : "var(--text-color-dark"}}>THE</span>.KICKFLIP.<span style={{color : "var(--text-color-dark"}}>STORE</span></div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value = {emailId}
                className="login-input"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type={eyeOpen ? "text" : "password"}
                placeholder="New Password"
                value = {password}
                className="login-input"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div
                className="passwordEye"
                onClick={() => {
                  setEyeOpen(!eyeOpen);
                }}
              >
                {eyeOpen ? (
                  <EyeFilled style={{ color: "var(--accent-color-2)" }} />
                ) : (
                  <EyeInvisibleFilled
                    style={{ color: "var(--accent-color-2)" }}
                  />
                )}
              </div>
            </div>
            <div className="input-group">
              <input
                type={eyeOpen2 ? "text" : "password"}
                placeholder="Confirm Password"
                className="login-input"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <div
                className="passwordEye"
                onClick={() => {
                  setEyeOpen2(!eyeOpen2);
                }}
              >
                {eyeOpen2 ? (
                  <EyeFilled style={{ color: "var(--accent-color-2)" }} />
                ) : (
                  <EyeInvisibleFilled
                    style={{ color: "var(--accent-color-2)" }}
                  />
                )}
              </div>
            </div>
            <button className="login-button" onClick={handleSubmit}>
              Sign Up
            </button>
            <button
              className="signup-button"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </div>
        </div>
      </Loader>
    </div>
  );
};

export default SignUpContainer;
