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

const Home = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  return (
    <div className="Home">
      <NavBar />
      <Container className="mt-3">
        <Row>
          <Col lg={6} xs={12} className="d-flex gap-2">
            <div className="d-flex flex-column align-items-start">
              <div className="Home-headline mb-4">
                Harmony in Design, Tranquility in Living
              </div>
              <div className="Home-subheading mb-4">
                Refresh your living space with our curated minimalist furniture
                range, uniquely designed to complement your lifestyle, in
                exchange for your old items."
              </div>
              <Button className="choose-a-chair mb-3">Choose a chair</Button>
            </div>
          </Col>
          <Col lg={6} xs={12} className="home-img-col">
            <img src={homeimg} alt="" className="home-img" />
          </Col>
        </Row>
        <Row className="mb-5 mt-5">
          <Col lg={4} md = {4} sm = {12}>
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
          <Col lg={4} md = {4} sm = {12}>
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
          <Col lg={4} md = {4} sm = {12}>
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
                    name={item.name}
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
              <Col sm = {12} md = {4} lg = {3}><HomeProductCard /></Col>
              <Col sm = {12} md = {4} lg = {3}><HomeProductCard /></Col>
              <Col sm = {12} md = {4} lg = {3}><HomeProductCard /></Col>
              <Col sm = {12} md = {4} lg = {3}><HomeProductCard /></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
