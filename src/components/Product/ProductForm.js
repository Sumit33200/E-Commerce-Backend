import React, { useState } from 'react';
import { createProduct } from '../../api/api';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createProduct(formData);
      alert('Product created successfully');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert('Error creating product');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="text" name="description" placeholder="Description" onChange={handleChange} />
      <input type="number" name="price" placeholder="Price" onChange={handleChange} />
      <input type="text" name="category" placeholder="Category" onChange={handleChange} />
      <input type="number" name="stock" placeholder="Stock" onChange={handleChange} />
      <button type="submit">Create Product</button>
    </form>
  );
};

export default ProductForm;
