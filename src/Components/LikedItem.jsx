import React, { useContext } from "react";
import orangeChair from "../Assets/orangechair.png";
import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import AuthContext from "../Context/AuthContext";

const LikedItem = ({ isOrders, data, removeLike }) => {
  const { setCartItems, toggleCartUpdate } = useContext(AuthContext);

  const onCardClick = (id) => {
    const config = {
      method: "post",
      url: "https://localhost:7272/api/Cart/AddToCart",
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
        Accept: "application/json, text/pflain, */*",
        mode: "no-cors",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        userEmailId: localStorage.getItem("JapandiEmailId"),
        productId: id,
      },
    };

    axios(config)
      .then((res) => {
          setCartItems(res.data);
          toggleCartUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="cartName">
      <div className="cart-img-bg">
        <img style={{ width: "100px" }} src={orangeChair} alt="" />
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
          <div className="cart-pd-remove" style={{cursor: "pointer"}} onClick={() => onCardClick(data.id)}>
            Add to cart &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <div className="cart-pd-remove" style={{cursor: "pointer"}} onClick={() => removeLike(data)}>Remove</div>
        </div>
      </div>
    </div>
  );
};

export default LikedItem;
