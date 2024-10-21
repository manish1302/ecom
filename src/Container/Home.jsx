import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import chair from "../Assets/chair.png";
import { HomeProductList } from "../common";
import HomeProductTabs from "../Components/HomeProductTabs";
import HomeProductCard from "../Components/HomeProductCard";
import shaky from "../Assets/Skates/image1.jpg";
import carJump from "../Assets/Skates/image3.jpg";
import MidnightFlame from "../Assets/Skates/special2.png";
import { Footer } from "antd/es/layout/layout";
import Loader from "../Components/Loader";
import { homeImages } from "../common";
import axios from "axios";
import Featured from "../Components/Featured";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let images = [];

  for (let i = 1; i <= 10; i++) {
    let angle = (i - 1) * 36;
    images.push(
      <div
        className="item"
        style={{ transform: `rotateY(${angle}deg) translateZ(200px)` }}
        key={i}
      >
        <img
          style={{
            height: "300px",
            width: "auto",
            transform: "rotateZ(30deg)",
          }}
          src={homeImages[i]}
          alt=""
        />
      </div>
    );
  }

  useEffect(() => {
    const headers = { Authorization: localStorage.getItem("jwtToken") };
    const url = currentTab === 0 ? 'https://localhost:7272/api/Main/GetLatest' : 'https://localhost:7272/api/Main/GetDeals'
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
  }, [currentTab]);

  return (
    <>
      <Loader isLoading={isLoading}>
        <div className="Home">
          <Container className="mt-3">
            <Row style={{ height: "75vh", marginBottom: "24px" }}>
              <Col
                lg={6}
                xs={12}
                style={{ zIndex: 1 }}
                className="d-flex flex-column align-items-start justify-content-center"
              >
                <div className="Home-designer-name mb-4">
                  Designed by David John
                </div>
                <div
                  className="Home-headline mb-4"
                  style={{ position: "relative" }}
                >
                  <div className="Home-bg-text">The Arbour Curve.</div>
                </div>
                <div className="Home-headline mb-4">The Arbour Curve.</div>
                <div className="home-code mb-2">7FG38TYEG2</div>
                <div className="Home-subheading mb-2">
                  The Arbour Curve skateboard is crafted for smooth, flowing
                  rides with precision and style. Combining eco-friendly
                  materials and dynamic design, it's perfect for effortless
                  cruising and carving.
                </div>
                <hr />
                <Button
                  className="view-button mb-3"
                  onClick={() => navigate("/product-detail/1021")}
                >
                  View More
                </Button>
              </Col>
              <Col lg={6} xs={12} className="home-img-col">
                <div className="banner">
                  <div className="slider">{images}</div>
                </div>
              </Col>
            </Row>
            <div className="featured-text">Featured.</div>
            <Row className="mb-5 mt-5">
              <Col lg={4} md={4} sm={12} className="mb-3">
                <Featured />
              </Col>
              <Col lg={4} md={4} sm={12} className="mb-3">
                <Featured />
              </Col>
              <Col lg={4} md={4} sm={12} className="mb-3">
                <Featured />
              </Col>
            </Row>
            <div
              className="d-flex flex-column justify-content-center"
              style={{ height: "100vh" }}
            >
              <div className="mb-4 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  {HomeProductList.map((item, id) => {
                    return (
                      <div
                        className="d-flex flex-column justify-content-center mb-3 latest-deals"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setCurrentTab(id);
                        }}
                      >
                        <div
                          className="product-tab-title"
                          style={{ opacity: !(currentTab === id) && 0.5 }}
                        >
                          {item?.name}
                        </div>
                        <div
                          className="product-tab-items"
                          style={{ opacity: !(currentTab === id) && 0.5 }}
                        >
                          12 items
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{color : "var(--accent-color-2)"}}>{"see all >>"}</div>
              </div>
              <div>
                <Row className="d-flex justify-content-between">
                  {products?.map((item, id) => {
                    if(id > 3) return;
                    return (
                      <Col sm={12} md={4} lg={3}>
                        <HomeProductCard data={item} />
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </div>
            <Row className="m-5">
              <Col
                lg={6}
                sm={12}
                className="d-flex flex-column align-items-end"
              >
                <div style={{ width: "70%" }}>
                  <img src={shaky} style={{ width: "100%" }} alt="" />
                  <div className="Home-subheading">
                    <i>Live Less.</i>
                  </div>
                </div>
              </Col>
              <Col lg={6} sm={12}>
                <img src={carJump} style={{ width: "70%" }} alt="" />
                <div className="Home-subheading">
                  <i>Skate More.</i>
                </div>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center w-100">
              <div
                className="d-flex align-items-center "
                style={{ position: "relative", width: "85%" }}
              >
                <div style={{ zIndex: 1 }}>
                  <img
                    src={MidnightFlame}
                    alt=""
                    style={{ transform: "rotate(-90deg)" }}
                  />
                </div>
                <div
                  className="zen-lounger-details"
                  style={{ position: "absolute", right: 0 }}
                >
                  <div
                    style={{ width: "70%" }}
                    className="d-flex align-items-center justify-content-center flex-column"
                  >
                    <div className="Zen-lounger-title mb-2 px-2">
                      Midnight Flame
                    </div>
                    <div className="Zen-lounger-body mb-3 px-2">
                      Features a durable 7-ply maple deck with a striking black
                      and fiery design. Equipped with ABEC-9 bearings for high
                      speed, 52mm polyurethane wheels for smooth rides, and
                      lightweight aluminum trucks, it's perfect for skaters
                      seeking performance, agility, and style.
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
                  THE KICKFLIP
                </span>{" "}
                Store
              </h3>
            </div>
            <div className="d-flex w-50 justify-content-end">
              <div className="footer-products me-5">
                <h5>Products</h5>
                <div>Designs</div>
                <div>Decks</div>
              </div>
              <div className="footer-products me-5">
                <h5>Community</h5>
                <div>Blog</div>
                <div>About Us</div>
                <div>Join Us</div>
              </div>
              <div className="footer-products">
                <h5>Contact</h5>
                <div>Instagram</div>
                <div>Facebook</div>
                <div>Youtube</div>
              </div>
            </div>
          </div>
          <div className="terms-row d-flex justify-content-between align-items-center w-100">
            <div className="copyright" style={{ color: "#E6E4E0" }}>
              ® 2024 THEKICKFLIPSTORE
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
