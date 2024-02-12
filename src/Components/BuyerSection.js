import React, { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";

const API_URL = "https://crudcrud.com/api/12070b474aa64a32a2b6aa96954910ad";

function BuyerSection({ products, setProducts }) {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API_URL}/cart`);
      setCart(response.data);
      calculateTotalAmount(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const calculateTotalAmount = (cartItems) => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  };

  const handleAddToCart = async (product, selectedSize) => {
    try {
      const existingItemIndex = cart.findIndex(
        (item) => item._id === product._id && item.selectedSize === selectedSize
 
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        };

        setCart(updatedCart);
        calculateTotalAmount(updatedCart);
          console.log(updatedCart);
        await axios.put(
          `${API_URL}/cart/${updatedCart[existingItemIndex]._id}`,
          {
            quantity: updatedCart[existingItemIndex].quantity,
          }
        );
      } else {
        const newItem = { ...product, selectedSize, quantity: 1 };
        const updatedCart = [...cart, newItem];
        setCart(updatedCart);
        calculateTotalAmount(updatedCart);
        await axios.post(`${API_URL}/cart`, newItem);
      }

      const updatedProducts = products.map((p) => {
        if (p.id === product.id && p.quantities[selectedSize] > 0) {
          return {
            ...p,
            quantities: {
              ...p.quantities,
              [selectedSize]: p.quantities[selectedSize] - 1,
            },
          };
        }
        return p;
      });

      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleRemoveFromCart = async (id, selectedSize, productName) => {
    try {
      const existingItemIndex = cart.findIndex(
        (item) =>
          item._id === id &&
          item.selectedSize === selectedSize &&
          item.shoeName === productName
      );
      if (existingItemIndex !== -1) {
        if (cart[existingItemIndex].quantity > 1) {
          const updatedCart = [...cart];
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity - 1,
          };
          setCart(updatedCart);
          calculateTotalAmount(updatedCart);
          await axios.put(`${API_URL}/cart/${id}`, {
            quantity: updatedCart[existingItemIndex].quantity,
          });
        } else {
          const updatedCart = cart.filter(
            (item) =>
              !(
                item._id === id &&
                item.selectedSize === selectedSize &&
                item.shoeName === productName
              )
          );
          setCart(updatedCart);
          calculateTotalAmount(updatedCart);
          await axios.delete(`${API_URL}/cart/${id}`);
        }
      }

      const updatedProducts = products.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            quantities: {
              ...p.quantities,
              [selectedSize]: p.quantities[selectedSize] + 1,
            },
          };
        }
        return p;
      });

      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleProceedToBuy = () => {
    alert(`Order has been placed! Total Amount: $${totalAmount}`);
    setCart([]);
    setTotalAmount(0);
  };

  return (
    <div>
      <h2>Buyer Section</h2>
      <h3>Products Available</h3>
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}

      <h3>Cart</h3>
      <ul>
        {cart.map((item, index) => (
          <li key={item._id ? `${item._id}-${item.selectedSize}` : index}>
            <p>
              {item.shoeName} ({item.selectedSize}) - ${item.price} - Quantity:{" "}
              {item.quantity}{" "}
              <button
                onClick={() =>
                  handleRemoveFromCart(
                    item._id,
                    item.selectedSize,
                    item.shoeName
                  )
                }
              >
                Remove
              </button>
            </p>
          </li>
        ))}
      </ul>
      <p>Total Amount: ${totalAmount}</p>

      <button onClick={handleProceedToBuy}>Proceed to Buy</button>
    </div>
  );
}

export default BuyerSection;
