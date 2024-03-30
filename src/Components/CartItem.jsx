import React from "react";
import orangeChair from "../Assets/orangechair.png";
import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const CartItem = () => {
  return (
    <div className="cartName">
      <div className="cart-img-bg">
        <img style={{ width: "100px" }} src={orangeChair} alt="" />
      </div>
      <div className="cart-item-info d-flex flex-column justify-content-between">
        <div>
          <div className="cart-pd-title">Girafee Legged Chair</div>
          <div className="cart-pd-code">C48IUEEF38</div>
          <div className="cart-pd-cost">$78.90</div>
        </div>
        <div className="w-100 d-flex align-item-center">
          <div className="d-flex">
            <button className="cart-pd-quantity">
              <MinusOutlined />
            </button>
            &nbsp; &nbsp; 3 &nbsp; &nbsp;
            <button className="cart-pd-quantity">
              <PlusOutlined />
            </button>
          </div>
          <div className="cart-pd-remove">&nbsp;&nbsp;&nbsp; &nbsp; Remove</div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
