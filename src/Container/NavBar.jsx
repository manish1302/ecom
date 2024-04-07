import {
  faCartShopping,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Drawer, Dropdown, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { cartItems } from "../common";
import CartItem from "../Components/CartItem";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import AuthContext from "../Context/AuthContext";

const NavBar = () => {
  const [openCart, setOpenCart] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const { isLoggedIn, Authlogout } = useContext(AuthContext);

  console.log(isLoggedIn, "abfdkfbdjfbdf")
  const showDrawer = () => {
    setOpenCart(!openCart);
  };
  const showOrders = () => {
    setOpenOrders(!openOrders);
  };

  const items =
  isLoggedIn
    ? [
        {
          key: "1",
          label: (
            <div
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
              onClick={showOrders}
            >
              Orders &nbsp; &nbsp;
            </div>
          ),
        },
        {
          key: "2",
          label: (
            <div
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setIsLoading(true);
                localStorage.removeItem("JapandiEmailId");
                localStorage.removeItem("IsLoggedIn");
                localStorage.removeItem("jwtToken");
                navigate("/login");
                Authlogout();
                window.location.reload();
                setIsLoading(false);
              }}
            >
              Logout
            </div>
          ),
          disabled: false,
        },
      ]
    : [
        {
          key: "1",
          label: (
            <div
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                navigate('/login')
              }}
            >
              Login
            </div>
          ),
          disabled: false,
        },
      ];

  return (
    <Loader isLoading={isLoading}>
      <Navbar collapseOnSelect expand="lg" className="pt-4">
        <Container fluid>
          <Navbar.Brand
            className="nav-brand"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/home");
            }}
          >
            the<span style={{ color: "#606C5A" }}>JAPANDI</span>store
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <div style={{}}></div>
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav variant="underline">
              <Nav.Link className="nav-menu">Living</Nav.Link>
              <Nav.Link className="nav-menu">Bedroom</Nav.Link>
              <Nav.Link className="nav-menu">Kitchen</Nav.Link>
              <Nav.Link className="nav-menu">Bathroom</Nav.Link>
              <Nav.Link className="nav-menu">
                <FontAwesomeIcon icon={faSearch} />
              </Nav.Link>
              <Nav.Link className="nav-menu">
                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottom"
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space className="nav-menu">
                      <FontAwesomeIcon icon={faUser} />
                    </Space>
                  </a>
                </Dropdown>
              </Nav.Link>
              <Nav.Link className="nav-menu" onClick={showDrawer}>
                <FontAwesomeIcon icon={faCartShopping} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Drawer title="Cart" onClose={showDrawer} open={openCart}>
          <div
            style={{ height: "100%" }}
            className="d-flex flex-column align-items-center justify-content-between"
          >
            <div style={{ height: "80%", overflowY: "scroll" }}>
              {cartItems.map((item, index) => {
                return <CartItem />;
              })}
            </div>
            <Divider />
            <div className="cart-checkout p-2 d-flex align-item-center justify-content-between">
              <div className="cart-pd-sub ">Sub Total</div>
              <div className="cart-pd-sub">$900</div>
            </div>
            <div className="cart-checkout">
              <div className="cart-pd-title">
                <button className="choose-a-chair p-2 w-100 mb-3">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </Drawer>
        <Drawer title="Orders" onClose={showOrders} open={openOrders}>
          <div className="d-flex flex-column align-items-center justify-content-between">
            <div style={{ overflowY: "scroll" }}>
              {cartItems.map((item, index) => {
                return <CartItem isOrders={true} />;
              })}
            </div>
          </div>
        </Drawer>
      </Navbar>
    </Loader>
  );
};

export default NavBar;
