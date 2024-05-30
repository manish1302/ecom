import {
  faCartShopping,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import NavBar from "./NavBar";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import homeimg from "../Assets/booktable.jpg";
import chair from "../Assets/chair.png";
import lamp from "../Assets/lamp.png";
import giraffe from "../Assets/orangechair.png";
import { HomeProductList } from "../common";
import HomeProductTabs from "../Components/HomeProductTabs";
import HomeProductCard from "../Components/HomeProductCard";
import LessClutter from "../Assets/House.jpg";
import MoreLiving from "../Assets/sculpture.jpg";
import ZenLounger from "../Assets/zenlounge.png";
import { Skeleton } from "antd";
import { Footer } from "antd/es/layout/layout";
import Loader from "../Components/Loader";
import axios from "axios";
const Home = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [active, setActive] = useState(true);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];
  const handleLoad = () => {
    setActive(false);
  };

  const headers = { Authorization: localStorage.getItem("jwtToken") };
  axios
    .get(
      "https://localhost:7272/api/Main/GetAllProducts",
      { headers }
    )
    .then((response) => {
      setProducts(response.data.slice(0, 4));
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <>
      <Loader isLoading={isLoading}>
        <div className="Home">
          <Container className="mt-3">
            <Row>
              <Col lg={6} xs={12} className="d-flex gap-2">
                <div className="d-flex flex-column align-items-start">
                  <div className="Home-headline mb-4">
                    Harmony in Design, Tranquility in Living
                  </div>
                  <div className="Home-subheading mb-4">
                    Refresh your living space with our curated minimalist
                    furniture range, uniquely designed to complement your
                    lifestyle, in exchange for your old items."
                  </div>
                  <Button className="choose-a-chair mb-3">
                    Choose a chair
                  </Button>
                </div>
              </Col>
              <Col lg={6} xs={12} className="home-img-col">
                <img
                  src={homeimg}
                  alt=""
                  onLoad={handleLoad}
                  className="home-img"
                />
              </Col>
            </Row>
            <Row className="mb-5 mt-5">
              <Col lg={4} md={4} sm={12} className="mb-3">
                <div className="featured-products">
                  <div
                    className="featured-img-div h-50"
                    style={{ position: "relative" }}
                  >
                    {/* <img
                    src={chair}
                    alt=""
                    className="featured-img"
                    style={{ position: "absolute" }}
                  /> */}
                  </div>
                  <div className="d-flex flex-column align-items-center justify-content-center h-50">
                    <div className="featured-name">Wolf Fur Chair</div>
                    <div className="featured-name">$120</div>
                  </div>
                </div>
              </Col>
              <Col lg={4} md={4} sm={12} className="mb-3">
                <div className="featured-products">
                  <div className="featured-img-div h-50">
                    {/* <img src={lamp} alt="" className="featured-img" /> */}
                  </div>
                  <div className="d-flex flex-column align-items-center justify-content-center h-50">
                    <div className="featured-name">Desert Cactus Lamp</div>
                    <div className="featured-name">$108.50</div>
                  </div>
                </div>
              </Col>
              <Col lg={4} md={4} sm={12} className="mb-3">
                <div className="featured-products">
                  <div className="featured-img-div h-50">
                    {/* <img src={giraffe} alt="" className="featured-img" /> */}
                  </div>
                  <div className="d-flex flex-column align-items-center justify-content-center h-50">
                    <div className="featured-name">Giraffee leg chair</div>
                    <div className="featured-name">$79.60</div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="d-flex flex-column">
              <Col>
                <div className="d-flex align-items-center">
                  {HomeProductList.map((item, id) => {
                    return (
                      <HomeProductTabs
                        name={item?.name}
                        active={currentTab == id}
                        onClick={() => {
                          setCurrentTab(id);
                        }}
                      />
                    );
                  })}
                </div>
              </Col>
              <Col>
                <Row className="d-flex justify-content-between">
                  {products?.map((item) => {
                    return (
                      <Col sm={12} md={4} lg={3}>
                        <HomeProductCard  data = {item}/>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
            <Row className="m-5">
              <Col
                lg={6}
                sm={12}
                className="d-flex flex-column align-items-end"
              >
                <div style={{ width: "70%" }}>
                  <img src={LessClutter} style={{ width: "100%" }} alt="" />
                  <div>Less Clutter.</div>
                </div>
              </Col>
              <Col lg={6} sm={12}>
                <img src={MoreLiving} style={{ width: "70%" }} alt="" />
                <div>More Living.</div>
              </Col>
            </Row>
            <Row>
              <div
                className="d-flex align-items-center w-100"
                style={{ position: "relative" }}
              >
                <div style={{ zIndex: 1 }}>
                  <img src={ZenLounger} alt="" />
                </div>
                <div
                  className="zen-lounger-details"
                  style={{ position: "absolute", right: 0 }}
                >
                  <div
                    style={{ width: "50%" }}
                    className="d-flex align-items-center justify-content-center flex-column"
                  >
                    <div className="Zen-lounger-title m-1">Zen Lounger</div>
                    <div className="Zen-lounger-body m-1">
                      “Introducing our Zen Lounge: A harmonious blend of
                      minimalist design and ultimate comfort. Crafted with clean
                      lines and plush cushions.”
                    </div>
                    <div className="m-1">
                      <Button className="choose-a-chair mb-3">
                        Sleep on it
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </Container>
        </div>
        <Footer className="Home-footer">
          <div className="logo-row w-100 mb-4 d-flex">
            <div className="w-50">
              <h3 style={{ color: "#E6E4E0" }}>
                <span
                  style={{
                    border: "none",
                    borderBottom: "1px solid #E6E4E0",
                    color: "#E6E4E0",
                  }}
                >
                  THE JAPANDI
                </span>{" "}
                Store
              </h3>
            </div>
            <div className="d-flex w-50 justify-content-end">
              <div className="footer-products me-5">
                <h5>Products</h5>
                <div>Living</div>
                <div>Bedroom</div>
                <div>Kitchen</div>
                <div>Bathoom</div>
              </div>
              <div className="footer-products me-5">
                <h5>Community</h5>
                <div>Blog</div>
                <div>About Us</div>
                <div>Join Us</div>
              </div>
              <div className="footer-products">
                <h5>Contact</h5>
                <div>Living</div>
                <div>Bedroom</div>
                <div>Kitchen</div>
                <div>Bathoom</div>
              </div>
            </div>
          </div>
          <div className="terms-row d-flex justify-content-between align-items-center w-100">
            <div className="copyright" style={{ color: "#E6E4E0" }}>
              ® 2024 THEJAPANDISTORE
            </div>
            <div className="terms d-flex">
              <div
                className=""
                style={{ marginRight: "16px", color: "#E6E4E0" }}
              >
                Terms
              </div>
              <div
                className=""
                style={{ marginRight: "16px", color: "#E6E4E0" }}
              >
                Privacy
              </div>
              <div
                className=""
                style={{ marginRight: "16px", color: "#E6E4E0" }}
              >
                Settings
              </div>
            </div>
          </div>
        </Footer>
      </Loader>
    </>
  );
};

export default Home;
