import React, { useState } from 'react';

function SellerSection({ setProducts }) {
  const [shoeName, setShoeName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantities, setQuantities] = useState({ small: 0, medium: 0, large: 0 });

  const handleAddProduct = () => {
    // Validate input values
    if (!shoeName || !description || price <= 0) {
      alert('Please fill all fields and provide a valid price.');
      return;
    }

    // Create new product object
    const newProduct = {
      shoeName,
      description,
      price,
      quantities: { ...quantities }
    };

    // Update products state in parent component
    setProducts(prevProducts => [...prevProducts, newProduct]);

    // Reset input fields
    setShoeName('');
    setDescription('');
    setPrice(0);
    setQuantities({ small: 0, medium: 0, large: 0 });

    alert('Product added successfully!');
  };

  return (
    <div>
      <h2>Seller Section</h2>
      <label>
        Shoe Name:
        <input type="text" value={shoeName} onChange={e => setShoeName(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />
      </label>
      <label>
        Quantity (Small):
        <input type="number" value={quantities.small} onChange={e => setQuantities({ ...quantities, small: Number(e.target.value) })} />
      </label>
      <label>
        Quantity (Medium):
        <input type="number" value={quantities.medium} onChange={e => setQuantities({ ...quantities, medium: Number(e.target.value) })} />
      </label>
      <label>
        Quantity (Large):
        <input type="number" value={quantities.large} onChange={e => setQuantities({ ...quantities, large: Number(e.target.value) })} />
      </label>
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
}

export default SellerSection;
