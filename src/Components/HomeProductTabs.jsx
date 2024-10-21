import React from "react";
import isDesktopOrLaptop  from 'react-responsive'

const HomeProductTabs = ({ itemsCount, name, currentTab, active }) => {
  return (
      <div
        className="d-flex flex-column justify-content-center mb-3 latest-deals"
      >
        <div className="product-tab-title" style={{opacity : !active && 0.5}}>{name}</div>
        <div className="product-tab-items" style={{opacity : !active && 0.5}}>12 items</div>
      </div>
  );
};

export default HomeProductTabs;
