import React, { useState } from "react";
import pan from "../Assets/pan-removebg-preview.png";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  BookFilled,
  BookOutlined,
  HeartFilled,
  HeartOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const HomeProductCard = (props) => {
  const {data, onCardClick} = props;
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const navigate = useNavigate();

  const handleLike = () => {
    setLike(!like);
  };

  const handleSave = () => {
    setSave(!save);
  };


  return (
    <div className="Product-card" onClick = {() => {
      navigate(`/product-detail/${data.id}`)
    }}>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div onClick={handleLike}>
            {/* <HeartOutlined /> */}
            {like ? (
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
            {data?.rating?.toFixed(1)}
          </div>
        </div>
        <div onClick={handleSave}>
          {save ? (
            <TurnedInNotIcon style={{ color: "#606c5a", cursor: "pointer" }} />
          ) : (
            <BookmarkIcon style={{ color: "#606c5a", cursor: "pointer" }} />
          )}
          {/* <BookOutlined /> */}
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <img
          style={{
            height: "100px",
          }}
          src={pan}
          alt=""
        />
      </div>
      <div className="d-flex justify-content-between">
        <div style={{ width: "80%" }}>
          <div className="featured-name">{data?.name}</div>
          <div className="featured-name" style={{ fontWeight: 300 }}>
            ${data?.price}
          </div>
        </div>
        <div
          className=" d-flex align-items-center justify-content-center add-button-home"
          onClick={(event) => {
            event.stopPropagation();
            onCardClick(data.id)
          }}
        >
          <PlusOutlined />
        </div>
      </div>
    </div>
  );
};

export default HomeProductCard;
