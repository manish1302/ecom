import React from "react";
import orangeChair from "../Assets/orangechair.png";
import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const CartItem = ({
  isOrders,
  data,
}) => {


  return (
    <div className="cartName">
      <div className="cart-img-bg">
        <img style={{ width: "100px" }} src={orangeChair} alt="" />
      </div>
      <div className="cart-item-info d-flex flex-column justify-content-between">
        <div>
          <div className="cart-pd-title">{data?.name}</div>
          <div className="cart-pd-code">{data?.productCode} &nbsp; &nbsp;&nbsp; &nbsp; {isOrders && "March 10, 24"}</div>
          <div className="cart-pd-cost">${data?.price}</div>
        </div>
        <div className="w-100 d-flex align-item-center">
          {!isOrders 
          ? <div className="d-flex">
            <button className="cart-pd-quantity">
              <MinusOutlined />
            </button>
            &nbsp; &nbsp; 3 &nbsp; &nbsp;
            <button className="cart-pd-quantity">
              <PlusOutlined />
            </button>
          </div> 
          : <div className="cart-pd-remove">
            Qty : 3
          </div>}
          <div className="cart-pd-remove">&nbsp;&nbsp;&nbsp; &nbsp;{isOrders ? "Cancel" : "Remove"}</div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
