import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../api/api';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
};

export default ProductDetails;
