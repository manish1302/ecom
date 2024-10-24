import React, { useContext } from "react";
import cartProduct from "../Assets/Skates/pbg1.png";

import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import AuthContext from "../Context/AuthContext";

const CartItem = ({ isOrders, data, removeCart }) => {
  const { setCartItems } = useContext(AuthContext);

  const plusMinusClick = (plus) => {
    const config = {
      method: "post",
      url: plus
        ? "https://localhost:7272/api/Cart/AddToCart"
        : "https://localhost:7272/api/Cart/RemoveFromCart",
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
        Accept: "application/json, text/pflain, */*",
        mode: "no-cors",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        userEmailId: localStorage.getItem("JapandiEmailId"),
        productId: data.id,
      },
    };

    axios(config)
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="cartName">
      <div className="cart-img-bg">
        <img style={{ width: "50px" }} src={cartProduct} alt="" />
      </div>
      <div className="cart-item-info d-flex flex-column justify-content-between">
        <div>
          <div className="cart-pd-title">{data?.name}</div>
          <div className="cart-pd-code">
            {data?.productCode} &nbsp; &nbsp;&nbsp; &nbsp;{" "}
            {/* {isOrders && data?.} */}
          </div>
          <div className="cart-pd-cost">${data?.price}</div>
        </div>
        <div className="w-100 d-flex align-item-center">
          {!isOrders ? (
            <div className="d-flex">
              <button className="cart-pd-quantity">
                <MinusOutlined onClick={() => plusMinusClick(false)} />
              </button>
              &nbsp; &nbsp; {data.quantity} &nbsp; &nbsp;
              <button className="cart-pd-quantity">
                <PlusOutlined onClick={() => plusMinusClick(true)} />
              </button>
            </div>
          ) : (
            <div className="cart-pd-remove">Qty : {data?.stock}</div>
          )}
          <div
            className="cart-pd-remove"
            style={{ cursor: "pointer" }}
            onClick={() => removeCart(data)}
          >
            &nbsp;&nbsp;&nbsp; &nbsp;{!isOrders && "Remove"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
