import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import lamp from "../Assets/lamp.png";
import { homeImages } from "../common";

const Chat = () => {
  let images = [];

  for (let i = 1; i <= 10; i++) {
    let angle = (i - 1) * (36);
    images.push(
      <div
        className="item"
        style={{ transform: `rotateY(${angle}deg) translateZ(200px)` }}
        key={i}
      >
        <img style={{height: '300px', width : "auto", transform : "rotateZ(30deg)"}} src={homeImages[i]} alt="" />
      </div>
    );
  }

  return (
    <div className="banner">
      <div className="slider">
        {images}
      </div>
    </div>
  );
};

export default Chat;
