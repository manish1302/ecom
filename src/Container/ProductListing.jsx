import React, { useState } from "react";
import HomeProductCard from "../Components/HomeProductCard";
import { Col, Dropdown, Row, Space } from "antd";
import { CloseOutlined, SortAscendingOutlined } from "@ant-design/icons";

const ProductListing = () => {
    const [sortValue, setSortValue] = useState("Sort");
  const items = [
    {
      key: "1",
      label: (
        <div
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Popularity &nbsp; &nbsp;
        </div>
      ),
      value : "Popularity",
    },
    {
      key: "2",
      label: (
        <div
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Discount
        </div>
      ),
      value : "Discount",
      disabled: false,
    },
    {
      key: "3",
      label: (
        <div
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Low to High &nbsp; &nbsp;
        </div>
      ),
      value : "Low to High",
    },
    {
      key: "4",
      label: (
        <div
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          High to Low
        </div>
      ),
      value : "High to Low",
      disabled: false,
    },
    {
        key: "5",
        label: (
          <div
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
             <CloseOutlined /> Clear
          </div>
        ),
        value : "Sort",
        disabled: false,
      },
  ];

  const onClick = ({key}) => {
    setSortValue(items[Number(key) - 1].value);
  } 

  return (
    <div className="Home">
      <div className="w-100 d-flex align-items-center justify-content-end">
        <div style={{padding : "16px"}}>
          <Dropdown
            menu={{
              items,
              onClick
            }}
            placement="bottomRight"
          >
            <Space className="nav-menu text-end">
              {sortValue}<SortAscendingOutlined />
            </Space>
          </Dropdown>
        </div>
      </div>
      <Row
        gutter={[
          {
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          },
          24,
        ]}
      >
        <Col xs={12} sm={12} md={8} lg={6}>
          <HomeProductCard />
        </Col>
        <Col xs={12} sm={12} md={8} lg={6}>
          <HomeProductCard />
        </Col>
        <Col xs={12} sm={12} md={8} lg={6}>
          <HomeProductCard />
        </Col>
        <Col xs={12} sm={12} md={8} lg={6}>
          <HomeProductCard />
        </Col>
        <Col xs={12} sm={12} md={8} lg={6}>
          <HomeProductCard />
        </Col>
        <Col xs={12} sm={12} md={8} lg={6}>
          <HomeProductCard />
        </Col>
      </Row>
    </div>
  );
};

export default ProductListing;
