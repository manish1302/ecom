import React, { useContext, useEffect, useState } from "react";
import OrangeChair from "../Assets/orangechair.png";
import { Button, Col, Row } from "react-bootstrap";
import { Avatar, Rate, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ProductreviewCard from "../Components/ProductreviewCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Context/AuthContext";

const ProductDetail = () => {

  const [data, setData] = useState({});
  const {id} = useParams();

  const {toggleCartUpdate} = useContext(AuthContext);

  useEffect(() => {
    const headers = { Authorization: localStorage.getItem("jwtToken") };
    axios
      .get(
        `https://localhost:7272/api/Main/GetProductById/${id}`,
        { headers }
      )
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  const addToCart = () => {
    const config = {
      method : "post",
      url: "https://localhost:7272/api/Cart/AddToCart",
      headers: {
        Authorization : localStorage.getItem("jwtToken"),
        Accept: "application/json, text/plain, */*",
        mode: "no-cors",
        "Access-Control-Allow-Origin": "*",
      },
      data : {
        userEmailId : localStorage.getItem("JapandiEmailId"),
        productId : id
      }
    }

    axios(config).then((res) => {
      toggleCartUpdate()
    }).catch((error) => {
      console.log(error);
    })
  }

  var review =
    "That's a very fantastic chair, unbelievable, magnificient. How can people make this kind of chair, it's just brilliant.";
  return (
    <div className="Home">
      <div className="d-flex mobileflex-pd mb-5">
        <div className="product-image-div">
          <div className="product-img-backgroud">
            <div>
              <img style={{ opacity: 1 }} className="pd-img-width" src={OrangeChair} alt="" />
            </div>
          </div>
        </div>
        <div className="product-image-div">
          <div className="pd-title">{data.name}</div>
          <div className="pd-code mb-2">{data.productCode}</div>
          <div className="pd-desc mb-3">
            {data.description}
          </div>
          <div className="d-flex">
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#CE954E",
                borderRadius: "50%",
              }}
            ></div>{" "}
            &nbsp; &nbsp;&nbsp;
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#E4C9B4",
                borderRadius: "50%",
              }}
            ></div>
          </div>
          <div className="pd-colordesc mb-3">Mustard</div>
          <div className="pd-title"></div>
          <div className="d-flex">
            <div className="pd-cost">${((100 - data.discount) * data.price/100)?.toFixed(2)}</div> &nbsp; &nbsp;&nbsp;
            {data.discount != 0 && <div className="pd-discount">${(data.price)?.toFixed(2)}</div>}
          </div>
          {data.discount != 0 && <div className="pd-percentage mb-3">( {data.discount}%off )</div>}
          <div className="pd-title">
            <Button className="choose-a-chair mb-3" onClick = {addToCart}>Add to Cart</Button>
          </div>
        </div>
      </div>
      <div className="pd-cost">Customers Reviews</div>
      <div className="w-100 d-flex flex-wrap">
        <ProductreviewCard />
        <ProductreviewCard />
        <ProductreviewCard />
        <ProductreviewCard />
      </div>
    </div>
  );
};

export default ProductDetail;
