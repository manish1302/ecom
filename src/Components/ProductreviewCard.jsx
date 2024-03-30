import { UserOutlined } from "@ant-design/icons";
import { Avatar, Rate } from "antd";
import React from "react";
import { Tooltip } from "antd";

const ProductreviewCard = () => {
  var review =
    "That's a very fantastic chair, unbelievable, magnificient. How can people make this kind of chair, it's just brilliant.";

  return (
    <div
      style={{
        borderRadius: "8px",
        border: "1px solid #606C5A",
        padding: "16px",
      }}
      className=" review-card d-flex gap-2 flex-column justify-content-between"
    >
      <div className="d-flex align-items-center">
        <Rate allowHalf defaultValue={2.5} /> &nbsp;&nbsp;{" "}
        <div className="pd-percentage">2.5</div>
      </div>
      <div className="pd-code">
        {review.length > 80 ? (
          <Tooltip title={review}>
            <span>{review.slice(0, 77) + "..."}</span>
          </Tooltip>
        ) : (
          review
        )}
      </div>
      <div className="d-flex align-items-center">
        <Avatar
          style={{
            backgroundColor: "#87d068",
          }}
          icon={<UserOutlined />}
        />
        &nbsp;&nbsp;
        <div>
          <div className="username-review">Patrick jane</div>
          <div className="pd-percentage">New York, USA, | 12hago</div>
        </div>
      </div>
    </div>
  );
};

export default ProductreviewCard;