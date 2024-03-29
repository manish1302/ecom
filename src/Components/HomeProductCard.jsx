import React from "react";
import pan from "../Assets/pan-removebg-preview.png";
import {
  BookFilled,
  BookOutlined,
  HeartFilled,
  HeartOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const HomeProductCard = () => {
  return (
    <div className="Product-card">
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div>
            {/* <HeartOutlined /> */}
            <HeartFilled style = {{color : "#606c5a", marginRight: "4px"}}/>
          </div>
          <div>4.8</div>
        </div>
        <div>
          <BookFilled />
          {/* <BookOutlined /> */}
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <img
          style={{
            height: "100px",
          }}
          src={pan}
          alt=""
        />
      </div>
      <div className="d-flex justify-content-between">
        <div style={{width : "80%"}}>
          <div className="featured-name">Desert Cactus Lamp</div>
          <div className="featured-name" style={{ fontWeight: 300 }}>
            $108.50
          </div>
        </div>
        <div className="add-button-home d-flex align-items-center justify-content-center">
        <PlusOutlined />
        </div>
      </div>
    </div>
  );
};

export default HomeProductCard;
