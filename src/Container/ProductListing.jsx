import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import HomeProductCard from "../Components/HomeProductCard";
import { Col, Dropdown, Row, Space } from "antd";
import { CloseOutlined, SortAscendingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const ProductListing = () => {
  const [sortValue, setSortValue] = useState("Sort");
  const [products, setProducts] = useState();
  const { type } = useParams();
  const {cartUpdate, toggleCartUpdate} = useContext(AuthContext);

  const Category = {
    living: 1,
    bedroom: 2,
    kitchen: 3,
    bathroom: 4,
  };

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
      value: "Popularity",
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
      value: "Discount",
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
      value: "Low to High",
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
      value: "High to Low",
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
      value: "Sort",
      disabled: false,
    },
  ];

  useEffect(() => {
    const headers = { Authorization: localStorage.getItem("jwtToken") };
    axios
      .get(
        `https://localhost:7272/api/Main/GetProductsBySearchCriteria/${Category[type]}`,
        { headers }
      )
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [type]);

  const onClick = ({ key }) => {
    setSortValue(items[Number(key) - 1].value);
  };

  const onCardClick = (id) => {
    const config = {
      method : "post",
      url : "https://localhost:7272/api/Cart/AddToCart",
      headers : {
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

    axios(config).then((response) => {
      toggleCartUpdate(!cartUpdate);
    }).catch((error) => {
      console.log(error); 
    })
  }

  return (
    <div className="Home">
      <div className="w-100 d-flex align-items-center justify-content-end">
        <div style={{ padding: "16px" }}>
          <Dropdown
            menu={{
              items,
              onClick,
            }}
            placement="bottomRight"
          >
            <Space className="nav-menu text-end">
              {sortValue}
              <SortAscendingOutlined />
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
        {products?.map((item) => {
          console.log(item);
          return (
            <Col xs={12} sm={12} md={8} lg={6}>
              <HomeProductCard onCardClick = {onCardClick} data={item} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ProductListing;
