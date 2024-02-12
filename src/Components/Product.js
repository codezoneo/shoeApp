import React, { useState } from "react";

function Product({ product, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = () => {
    if (onAddToCart && selectedSize) {
      onAddToCart(product, selectedSize);
      setSelectedSize(""); // Reset selectedSize after adding to cart
    } else {
      alert("Please select a size");
    }
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  return (
    <div>
      <h3>{product.shoeName}</h3>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <select value={selectedSize} onChange={handleSizeChange}>
        <option value="">Select Size</option>
        {Object.keys(product.quantities).map((size) => (
          <option
            key={size}
            value={size}
            disabled={product.quantities[size] === 0}
          >
            {size} ({product.quantities[size]} available)
          </option>
        ))}
      </select>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default Product;
