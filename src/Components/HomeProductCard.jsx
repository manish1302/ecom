import React, { useContext, useEffect, useState } from "react";
import pan from "../Assets/pan-removebg-preview.png";
import { Images } from "../images";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { Tooltip } from "antd";

const HomeProductCard = (props) => {
  const { data, onCardClick } = props;
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  const { toggleLikeUpdate, likeItems, setLikeItems } = useContext(AuthContext);

  useEffect(() => {
    const config = {
      method: "post",
      url: "https://localhost:7272/api/Cart/IsLikedProduct",
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
        Accept: "application/json, text/pflain, */*",
        mode: "no-cors",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        userEmailId: localStorage.getItem("JapandiEmailId"),
        productId: data?.id,
      },
    };

    axios(config)
      .then((res) => {
        if (data.id == 32) console.log(res.data, "dkjbhdbg");
        setLike(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  const handleLike = (e) => {
    e.stopPropagation();
    const config = {
      method: "post",
      url: like
        ? "https://localhost:7272/api/Cart/RemoveLike"
        : "https://localhost:7272/api/Cart/Like",
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
        Accept: "application/json, text/pflain, */*",
        mode: "no-cors",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        userEmailId: localStorage.getItem("JapandiEmailId"),
        productId: data?.id,
      },
    };

    axios(config)
      .then((res) => {
        setLikeItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    toggleLikeUpdate();
    setLike(!like);
  };

  // const handleSave = () => {
  //   setSave(!save);
  // };

  return (
    <div
      className="Product-card"
      onClick={() => {
        navigate(`/product-detail/${data.id}`);
      }}
    >
      <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-between w-100">
          <div onClick={handleLike}>
            {/* <HeartOutlined /> */}
            {!like ? (
              <FavoriteBorderIcon
                style={{
                  color: "#606c5a",
                  marginRight: "4px",
                  cursor: "pointer",
                }}
              />
            ) : (
              <FavoriteIcon
                style={{
                  color: "#606c5a",
                  marginRight: "4px",
                  cursor: "pointer",
                }}
              />
            )}
          </div>
          <div
            style={{ fontSize: "16px", color: "#606c5a", fontWeight: "600" }}
          >
            ⭐ {data?.rating?.toFixed(1)}
          </div>
        </div>
        {/* <div onClick={handleSave}>
          {save ? (
            <TurnedInNotIcon style={{ color: "#606c5a", cursor: "pointer" }} />
          ) : (
            <BookmarkIcon style={{ color: "#606c5a", cursor: "pointer" }} />
          )}
        </div> */}
      </div>
      <div className="w-100 d-flex align-items-center justify-content-center">
        <img
          style={{
            height: "150px",
            width : "auto"
          }}
          src={Images.Lamp}
          alt=""
        />
      </div>
      <div className="d-flex justify-content-between">
        <div style={{ width: "80%" }}>
          {data?.name.length > 15 ? (
            <Tooltip title={data?.name}>
              <div className="featured-name">
                {data?.name.slice(0, 15) + "..."}
              </div>
            </Tooltip>
          ) : (
            <div className="featured-name">{data?.name}</div>
          )}
          <div className="featured-name" style={{ fontWeight: 300 }}>
            ${data?.price}
          </div>
        </div>
        <div
          className=" d-flex align-items-center justify-content-center add-button-home"
          onClick={(event) => {
            event.stopPropagation();
            onCardClick(data.id);
          }}
        >
          <PlusOutlined />
        </div>
      </div>
    </div>
  );
};

export default HomeProductCard;
