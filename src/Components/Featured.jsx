import React from "react";
import { homeImages } from "../common";

const Featured = () => {
  return (
    <div className="featured-products">
      <div></div>
      <div className="featured-img-div d-flex align-items-center justify-content-center mb-5">
        <img
          src={homeImages[0]}
          alt=""
          style={{ height: "300px", width: "auto" }}
        />
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="featured-name">SAMURAI</div>
        <div className="featured-name">$120</div>
      </div>
    </div>
  );
};

export default Featured;
