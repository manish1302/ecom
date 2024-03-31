import React from "react";

const LoginContainer = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        {/* <div href="#home" className="nav-brand mb-3"> */}
          {/* the<span style={{ color: "#606C5A" }}>JAPANDI</span>store
        </div> */}
        <div className="login-title mb-3">THE.JAPANDI.STORE</div>
        <div className="input-group">
          <input type="text" placeholder="Username" className="login-input" />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            className="login-input"
          />
        </div>
        <button className="login-button">Login</button>
        <button className="signup-button">Sign Up</button>
      </div>
    </div>
  );
};

export default LoginContainer;
