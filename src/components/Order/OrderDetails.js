import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrders } from '../../api/api';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrders(); // Adjust if you have specific API endpoint for order details
        const foundOrder = response.data.find((o) => o._id === orderId);
        setOrder(foundOrder);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h2>Order Details</h2>
      <p>User: {order.user.name}</p>
      <p>Product: {order.product.name}</p>
      <p>Quantity: {order.quantity}</p>
      <p>Total Price: ${order.totalPrice}</p>
      <p>Status: {order.status}</p>
    </div>
  );
};

export default OrderDetails;
