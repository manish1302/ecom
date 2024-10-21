import React, { useContext, useEffect, useState } from "react";
import productImage from "../Assets/Skates/pbg1.png";
import { Button, Col, Row } from "react-bootstrap";
import { Avatar, Rate, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ProductreviewCard from "../Components/ProductreviewCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Context/AuthContext";

const ProductDetail = () => {
  const [data, setData] = useState({});
  const [review, setReview] = useState(false);
  const [errors, setErrors] = useState(0);
  const [reviewData, setReviewData] = useState([]);
  const { id } = useParams();
  const [name, setName] = useState(localStorage.getItem(`name${id}`));
  const [draft, setDraft] = useState(localStorage.getItem(`review${id}`));
  const [rate, setRate] = useState(0);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const { setCartItems } = useContext(AuthContext);

  useEffect(() => {
    const headers = { Authorization: localStorage.getItem("jwtToken") };
    axios
      .get(`https://localhost:7272/api/Main/GetProductById/${id}`, { headers })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const config = {
      method: "post",
      url: "https://localhost:7272/Api/Review/GetReviews",
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
        Accept: "application/json, text/plain, */*",
        mode: "no-cors",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        emailId: localStorage.getItem("JapandiEmailId"),
        productId: id,
        name: "string",
        rating: 0,
        review: "string",
        reviewID: 0,
      },
    };

    axios(config)
      .then((res) => {
        setReviewData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addToCart = () => {
    const config = {
      method: "post",
      url: "https://localhost:7272/api/Cart/AddToCart",
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
        Accept: "application/json, text/plain, */*",
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AddReview = () => {
    let err = 0;
    if (rate == 0 && name == "") {
      err = 3;
      setErrors(3);
    } else if (name == "") {
      err = 2;
      setErrors(2);
    } else if (rate == 0) {
      err = 1;
      setErrors(1);
    }

    console.log(err, rate, name, "errpop");

    if (err == 0) {
      const config = {
        method: "post",
        url: "https://localhost:7272/Api/Review/AddReview",
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
          Accept: "application/json, text/plain, */*",
          mode: "no-cors",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          emailId: localStorage.getItem("JapandiEmailId"),
          productId: id,
          rating: rate,
          review: draft,
          reviewID: 0,
          name: name,
        },
      };
      axios(config)
        .then((res) => {
          setReviewData(res.data);
        })
        .catch((err) => {});
      localStorage.removeItem(`review${id}`);
      // localStorage.removeItem(`name${id}`);
      setReview(false);
      setRate(0);
      setDraft("");
      setErrors(0);
    }
  };

  return (
    <div className="Home">
      <div className="d-flex mobileflex-pd mb-5">
        <div className="product-image-div">
          <div className="product-img-backgroud">
            <div>
              <img
                style={{ opacity: 1 }}
                className="pd-img-width"
                src={productImage}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="product-image-div">
          <div className="pd-title">{data.name}</div>
          <div className="pd-code mb-2">{data.productCode}</div>
          <div className="pd-desc mb-3">{data.description}</div>
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
            <div className="pd-cost">
              ${(((100 - data.discount) * data.price) / 100)?.toFixed(2)}
            </div>{" "}
            &nbsp; &nbsp;&nbsp;
            {data.discount != 0 && (
              <div className="pd-discount">${data.price?.toFixed(2)}</div>
            )}
          </div>
          {data.discount != 0 && (
            <div className="pd-percentage mb-3">( {data.discount}%off )</div>
          )}
          <div className="pd-title">
            <Button className="choose-a-chair mb-3" onClick={addToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="pd-cost">Customers Reviews</div>
        <div
          className="add-review"
          onClick={() => {
            setReview(!review);
          }}
        >
          {review ? "Cancel" : "+ Add Review"}
        </div>
      </div>
      {reviewData?.length == 0 ? (
        <div className="mb-3" style={{ color: "var(--text-color-dark)" }}>
          No reviews. Be the first one.
        </div>
      ) : (
        <div className="mb-3" style={{ color: "var(--text-color-dark)" }}>
          {reviewData?.length} Reviews
        </div>
      )}
      {review && (
        <div className="w-100 ">
          <Rate
            className="custom-rate"
            tooltips={desc}
            allowHalf
            defaultValue={2.5}
            value={rate}
            onChange={setRate}
          />{" "}
          &nbsp;&nbsp; <span className="pd-percentage">{rate}</span>
          <br />
          &nbsp;
          {(errors == 1 || errors == 3) && (
            <span className="required">Required</span>
          )}
          <input
            type="text"
            value={name}
            autoFocus
            placeholder="Your Name"
            className="w-100 login-input"
            onChange={(e) => {
              setName(e.target.value);
              localStorage.setItem(`name${id}`, e.target.value);
            }}
          />
          &nbsp;
          {(errors == 2 || errors == 3) && (
            <span className="required">Required</span>
          )}
          <textarea
            type="text"
            value={draft}
            placeholder="Write a review"
            autoFocus
            className="w-100 login-input"
            onChange={(e) => {
              setDraft(e.target.value);
              localStorage.setItem(`review${id}`, e.target.value);
            }}
          />
          <Button className="choose-a-chair mb-3" onClick={AddReview}>
            Add
          </Button>
        </div>
      )}
      <div className="w-100 d-flex flex-wrap">
        {reviewData?.map((data) => {
          return <ProductreviewCard data={data} />;
        })}
      </div>
    </div>
  );
};

export default ProductDetail;
