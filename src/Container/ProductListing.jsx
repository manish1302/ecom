import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import HomeProductCard from "../Components/HomeProductCard";
import { Col, Dropdown, Row, Space } from "antd";
import { CloseOutlined, SortAscendingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { typographyClasses } from "@mui/material";

const ProductListing = () => {
  const [sortValue, setSortValue] = useState("Sort");
  const [products, setProducts] = useState();
  const { type } = useParams();
  const { cartUpdate, toggleCartUpdate, setCartItems } =
    useContext(AuthContext);

  useEffect(() => {
    const headers = { Authorization: localStorage.getItem("jwtToken") };

    const url =
      type === "latest"
        ? "https://localhost:7272/api/Main/GetLatest"
        : type === "deals"
        ? "https://localhost:7272/api/Main/GetDeals"
        : "";

    axios
      .get(url, {
        headers,
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [type]);

  const Category = {
    designs: 1,
    decks: 2,
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
    <div className="Home">
      <div className=" d-flex align-items-center justify-content-end">
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
      <div className="listing-products">
        {products?.map((item) => {
          return (
            <div>
              <HomeProductCard onCardClick={onCardClick} data={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductListing;
