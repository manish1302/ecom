import React from "react";
import { Bars } from "react-loading-icons";

const Loader = ({ children, isLoading }) => {
  return isLoading ? (
    <div
      className="Loader d-flex align-items-center flex-column justify-content-center"
    >
      <Bars fill="var(--accent-color-1)" height="30px" scale={2} />
      <div className="login-title mt-2">Getting you in...</div>
    </div>
  ) : (
    <div>{children}</div>
  );
};

export default Loader;
