import React, { useState } from "react";

const AddAProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    productCode: "",
    category: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation (you can add more robust validation if needed)
    if (!product.name || !product.price) {
      alert("Please fill in all required fields!");
      return;
    }

    // For now, we'll just log the product data
    console.log("Product added:", product);

    // You can make a POST request to your backend API here
    // Example with fetch (replace URL with your API endpoint):
    // fetch('your-api-endpoint', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(product)
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
  };

  return (
    <div className="container mt-4">
      <h2 className="Home-headline fs-3 mb-3">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{ color: "var(--text-color-dark)" }}>Name</label>
          <input
            type="text"
            className="login-input"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label style={{ color: "var(--text-color-dark)" }}>Description</label>
          <textarea
            className="login-input"
            name="description"
            value={product.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label style={{ color: "var(--text-color-dark)" }}>Price</label>
          <input
            type="number"
            className="login-input"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label style={{ color: "var(--text-color-dark)" }}>
            Discount (%)
          </label>
          <input
            type="number"
            className="login-input"
            name="discount"
            value={product.discount}
            onChange={handleInputChange}
            min="0"
            max="100"
          />
        </div>
        <div className="form-group">
          <label style={{ color: "var(--text-color-dark)" }}>
            Product Code
          </label>
          <input
            type="text"
            className="login-input"
            name="productCode"
            value={product.productCode}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label style={{ color: "var(--text-color-dark)" }}>Category</label>
          <input
            type="text"
            className="login-input"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="choose-a-chair px-2 py-1 mt-3">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddAProduct;
