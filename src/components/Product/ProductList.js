import React, { useEffect, useState } from 'react';
import { getProducts } from '../../api/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
