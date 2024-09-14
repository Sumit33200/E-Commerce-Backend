import React, { useEffect, useState } from 'react';
import { getOrders } from '../../api/api';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Order List</h2>
      {orders.map((order) => (
        <div key={order._id}>
          <p>User: {order.user.name}</p>
          <p>Product: {order.product.name}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Total Price: ${order.totalPrice}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
