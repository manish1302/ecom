import {
  faCartShopping,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Drawer, Dropdown, Space } from "antd";
import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { cartItems } from "../common";
import CartItem from "../Components/CartItem";

const NavBar = () => {
  const [openCart, setOpenCart] = useState(false);
  const showDrawer = () => {
    setOpenCart(!openCart);
  };
  const items = [
    {
      key: '1',
      label: (
        <div target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Orders &nbsp; &nbsp;
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          Logout
        </div>
      ),
      disabled: false,
    }
  ];
  return (
    <Navbar collapseOnSelect expand="lg" className="pt-4">
      <Container fluid>
        <Navbar.Brand href="#home" className="nav-brand">
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
                menu={
                  {
                    items,
                  }
                }
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
    </Navbar>
  );
};

export default NavBar;
