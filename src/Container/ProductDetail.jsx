import React from "react";
import OrangeChair from "../Assets/orangechair.png";
import { Button, Col, Row } from "react-bootstrap";
import { Avatar, Rate, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ProductreviewCard from "../Components/ProductreviewCard";

const ProductDetail = () => {
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
          <div className="pd-title">Giraffe Legged Chair</div>
          <div className="pd-code mb-2">CASKV38RF3</div>
          <div className="pd-desc mb-3">
            Introducing the Giraffe Leg Chair, a unique fusion of elegance and
            whimsy for your living space. With slender, elongated legs
            reminiscent of graceful giraffes, this chair stands out as a
            statement piece. Its ergonomic design ensures both comfort and
            style, inviting you to lounge in luxury.
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
            <div className="pd-cost">$79.60</div> &nbsp; &nbsp;&nbsp;
            <div className="pd-discount">$98.60</div>
          </div>
          <div className="pd-percentage mb-3">( 18%off )</div>
          <div className="pd-title">
            <Button className="choose-a-chair mb-3">Add to Cart</Button>
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
