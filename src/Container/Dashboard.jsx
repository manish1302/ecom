import React from "react";
import sales from "../Assets/Skates/revenue.png";
import users from "../Assets/Skates/users.png";
import products from "../Assets/Skates/products.png";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="Home">
      <div className="admin-dashboard">
        {/* Cards Section */}
        <div className="cards-container">
          <div className="admin-card d-flex align-items-center">
            <img
              src={sales}
              alt=""
              style={{ width: "50px", height: "auto", marginRight: "16px" }}
            />
            <div>
              <h3>Number of sales</h3>
              <div>$1200</div>
            </div>
          </div>
          <div className="admin-card d-flex align-items-center">
            <img
              src={users}
              alt=""
              style={{ width: "50px", height: "auto", marginRight: "16px" }}
            />
            <div>
              <h3>Number of Users</h3>
              <div>1200</div>
            </div>
          </div>
          <div className="admin-card d-flex align-items-center">
            <img
              src={products}
              alt=""
              style={{ width: "50px", height: "auto", marginRight: "16px" }}
            />
            <div>
              <h3>Number of Products</h3>
              <div>200</div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-container mb-3">
          <table className="product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Discount</th>
                <th>Product Code</th>
                <th>Category</th>
                <th>Created Date</th>
                <th>Rating</th>
                <th>Rated Users</th>
              </tr>
            </thead>
            <tbody>
              {/* Replace with dynamic product data */}
              <tr>
                <td>Product 1</td>
                <td>Best product</td>
                <td>$20</td>
                <td>50</td>
                <td>10%</td>
                <td>PRD001</td>
                <td>Category A</td>
                <td>2024-10-20</td>
                <td>4.5</td>
                <td>200</td>
              </tr>
              {/* Add more rows */}
            </tbody>
          </table>
        </div>

        <div
          style={{
            width: "fit-content",
            color: "var(--accent-color-2)",
            borderBottom: "1px solid var(--text-color-light)",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/dashboard/add")
          }}
        >
          + Add new product
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
