// App.js
import React, { useState } from "react";
import SellerSection from "./Components/SellerSection";
import BuyerSection from "./Components/BuyerSection";

function App() {
  const [products, setProducts] = useState([]);

  return (
    <div>
      <header>
        <h1>Shoe App</h1>
        <button>Cart</button>
      </header>
      <div>
        <SellerSection products={products} setProducts={setProducts} />
        <BuyerSection products={products} setProducts={setProducts} />
      </div>
    </div>
  );
}

export default App;
