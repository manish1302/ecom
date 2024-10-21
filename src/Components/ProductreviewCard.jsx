import { UserOutlined } from "@ant-design/icons";
import { Avatar, Rate } from "antd";
import React from "react";
import { Tooltip } from "antd";

const ProductreviewCard = ({data}) => {

  return (
    <div
      style={{
        borderRadius: "8px",
        border: "1px solid var(--text-color-dark)",
        padding: "16px",  
      }}
      className=" review-card d-flex gap-2 flex-column justify-content-between"
    >
      <div className="d-flex align-items-center">
        <Rate allowHalf defaultValue={2.5} value = {data.rating} /> &nbsp;&nbsp;{" "}
        <div className="pd-percentage">{data.rating}</div>
      </div>
      <div className="pd-code">
        {data?.review.length > 80 ? (
          <Tooltip title={data?.review}>
            <span>{data?.review.slice(0, 77) + "..."}</span>
          </Tooltip>
        ) : (
          data?.review
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
          <div className="username-review">{data.name}</div>  
        </div>
      </div>
    </div>
  );
};

export default ProductreviewCard;