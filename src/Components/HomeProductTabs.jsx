import React from "react";

const HomeProductTabs = ({ itemsCount, name, currentTab, active }) => {
  return (
      <div
        className="d-flex flex-column justify-content-center"
        style = {{width : "150px"}} 
      >
        <div className="product-tab-title" style={{opacity : active && 0.5}}>{name}</div>
        <div className="product-tab-items" style={{opacity : active && 0.5}}>12 items</div>
      </div>
  );
};

export default HomeProductTabs;
