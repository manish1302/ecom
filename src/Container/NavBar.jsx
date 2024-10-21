import {
  faCartShopping,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Divider, Drawer, Dropdown, Space, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import CartItem from "../Components/CartItem";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import AuthContext from "../Context/AuthContext";
import axios from "axios";
import LikedItem from "../Components/LikedItem";

const NavBar = () => {
  const [openCart, setOpenCart] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [uniqueCartItems, setUniqueCartItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const navigate = useNavigate();

  const {
    isLoggedIn,
    Authlogout,
    cartItems,
    toggleCartUpdate,
    setCartItems,
    likeItems,
    setLikeItems,
  } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        `https://localhost:7272/api/Cart/GetCartItems/${localStorage.getItem(
          "JapandiEmailId"
        )}`,
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
            Accept: "application/json, text/plain, */*",
            mode: "no-cors",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `https://localhost:7272/Api/Order/GetOrders/${localStorage.getItem(
          "JapandiEmailId"
        )}`,
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
            Accept: "application/json, text/plain, */*",
            mode: "no-cors",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        setOrderItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoggedIn]);

  useEffect(() => {
    window.setTimeout(() => {
      const cartData = cartItems;
      const uniqueCart = [];
      const itemMap = {};

      // Iterate over each item in the cart
      cartData.forEach((item) => {
        // Create a unique key for each item (using productCode)
        const key = item.productCode;

        // Check if the item already exists in the map
        if (itemMap[key]) {
          // Increment the quantity of the existing item
          itemMap[key].quantity += 1;
        } else {
          // Add the item to the map and set its initial quantity to 1
          itemMap[key] = { ...item, quantity: 1 };
        }
      });

      // Convert the map to an array
      for (const key in itemMap) {
        // Push each unique item into the uniqueCart array
        uniqueCart.push(itemMap[key]);
      }
      uniqueCart.sort((a, b) => a.id - b.id);
      setUniqueCartItems(uniqueCart);
    }, 10);
    setTotal(cartItems.reduce((total, item) => total + Number(item.price), 0));
  }, [cartItems]);

  useEffect(() => {
    axios
      .get(
        `https://localhost:7272/api/Cart/GetLikeItems/${localStorage.getItem(
          "JapandiEmailId"
        )}`,
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
            Accept: "application/json, text/plain, */*",
            mode: "no-cors",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        setLikeItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoggedIn]);

  const removeLike = (data) => {
    const config = {
      method: "post",
      url: "https://localhost:7272/api/Cart/RemoveLike",
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
        Accept: "application/json, text/pflain, */*",
        mode: "no-cors",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        userEmailId: localStorage.getItem("JapandiEmailId"),
        productId: data.id,
      },
    };

    axios(config)
      .then((response) => {
        setLikeItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeCart = (data) => {
    const config = {
      method: "post",
      url: "https://localhost:7272/api/Cart/RemoveCompleteFromCart",
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
        Accept: "application/json, text/pflain, */*",
        mode: "no-cors",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        userEmailId: localStorage.getItem("JapandiEmailId"),
        productId: data.id,
      },
    };

    axios(config)
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ConfirmOrder = (status) => {
    let cartData = [];
    cartItems?.map((item, id) => {
      var obj = {};
      obj.orderId = 0;
      obj.productId = item.id;
      obj.quantity = item.quantity;
      cartData.push(obj);
    });

    const config = {
      method: "post",
      url: "https://localhost:7272/Api/Order/ConfirmOrder",
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
        Accept: "application/json, text/pflain, */*",
        mode: "no-cors",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        emailId: localStorage.getItem("JapandiEmailId"),
        orderItems: cartData,
        status: status,
      },
    };

    axios(config)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `https://localhost:7272/api/Cart/ClearCart/${localStorage.getItem(
          "JapandiEmailId"
        )}`,
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
            Accept: "application/json, text/plain, */*",
            mode: "no-cors",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        setCartItems([]);
        toggleCartUpdate();
        setTotal(0);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `https://localhost:7272/Api/Order/GetOrders/${localStorage.getItem(
          "JapandiEmailId"
        )}`,
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
            Accept: "application/json, text/plain, */*",
            mode: "no-cors",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const showDrawer = () => {
    setOpenCart(!openCart);
  };
  const showOrders = () => {
    setOpenOrders(!openOrders);
  };

  const showWishList = () => {
    setOpenWishlist(!openWishlist);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const items = isLoggedIn
    ? [
        {
          key: "1",
          label: (
            <div
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
              onClick={setOpenWishlist}
            >
              Wishlist &nbsp; &nbsp;
            </div>
          ),
        },
        {
          key: "2",
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
          key: "3",
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
                toggleCartUpdate();
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
                navigate("/login");
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
      {contextHolder}
      <Navbar collapseOnSelect expand="lg" className="pt-4">
        <Container fluid>
          <Navbar.Brand
            className="nav-brand"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/home");
            }}
          >
            the.<span style={{ color: "var(--accent-color-1)" }}>KickFlip</span>
            .store
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <div style={{}}></div>
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav variant="underline">
              <Nav.Link
                className="nav-menu"
                onClick={() => navigate("products/latest")}
              >
                Latest
              </Nav.Link>
              <Nav.Link
                className="nav-menu"
                onClick={() => navigate("products/deals")}
              >
                Deals
              </Nav.Link>
              <Nav.Link
                className="nav-menu"
                onClick={() => navigate("products/designs")}
              >
                Designs
              </Nav.Link>
              <Nav.Link
                className="nav-menu"
                onClick={() => navigate("products/decks")}
              >
                Decks
              </Nav.Link>
              <Nav.Link
                className="nav-menu"
                onClick={() => navigate("dashboard")}
              >
                Dashboard
              </Nav.Link>
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
                  <div onClick={(e) => e.preventDefault()}>
                    <Space className="nav-menu">
                      <FontAwesomeIcon icon={faUser} />
                    </Space>
                  </div>
                </Dropdown>
              </Nav.Link>
              <Nav.Link className="nav-menu" onClick={showDrawer}>
                <Space size="middle">
                  <Badge size="small" count={cartItems?.length}>
                    <FontAwesomeIcon color="white" icon={faCartShopping} />
                  </Badge>
                </Space>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Drawer
          title="Cart"
          header={{ color: "white" }}
          onClose={showDrawer}
          open={openCart}
        >
          <div
            style={{ height: "100%" }}
            className="d-flex flex-column align-items-center justify-content-between"
          >
            <div style={{ height: "80%", overflowY: "scroll" }}>
              {uniqueCartItems.map((item, index) => {
                return <CartItem removeCart={removeCart} data={item} />;
              })}
            </div>
            <Divider />
            <div className="cart-checkout p-2 d-flex align-item-center justify-content-between">
              <div className="cart-pd-sub ">Sub Total</div>
              <div className="cart-pd-sub">${total?.toFixed(2)}</div>
            </div>
            <div className="cart-checkout">
              <div className="cart-pd-title">
                <button
                  className="choose-a-chair p-2 w-100 mb-3"
                  onClick={() => {
                    setCheckout(!checkout);
                  }}
                >
                  {!checkout ? "Checkout" : "Cancel"}
                </button>
              </div>
              {checkout && (
                <>
                  <div className="cart-pd-title">
                    <button
                      className="payment p-2 w-100 mb-3"
                      onClick={() => {
                        ConfirmOrder(1);
                        setCheckout(false);
                        messageApi.open({
                          type: "warning",
                          content: "Order Pending",
                        });
                      }}
                    >
                      Cash on delivery
                    </button>
                  </div>
                  <div className="cart-pd-title w-100">
                    <button
                      className="payment p-2 w-100"
                      onClick={() => {
                        ConfirmOrder(2);
                        setCheckout(false);
                        messageApi.open({
                          type: "success",
                          content: "Order Confirmed",
                        });
                      }}
                    >
                      Pay online
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Drawer>
        <Drawer title="Orders" onClose={showOrders} open={openOrders}>
          <div className="d-flex flex-column align-items-center justify-content-between">
            <div style={{ overflowY: "scroll" }}>
              {orderItems.map((item) => {
                if (item?.products.length > 0) {
                  return (
                    <>
                      <div className="cart-pd-remove mb-2">
                        Order No: {item.orderId}
                      </div>
                      {item?.products.map((prod, id) => {
                        return <CartItem isOrders={true} data={prod} />;
                      })}
                    </>
                  );
                }
              })}
            </div>
          </div>
        </Drawer>
        <Drawer title="Wishlist" onClose={showWishList} open={openWishlist}>
          <div
            style={{ height: "100%" }}
            className="d-flex flex-column align-items-center justify-content-between"
          >
            <div style={{ height: "100%", overflowY: "scroll" }}>
              {likeItems.map((item, index) => {
                return <LikedItem data={item} removeLike={removeLike} />;
              })}
            </div>
          </div>
        </Drawer>
      </Navbar>
    </Loader>
  );
};

export default NavBar;
