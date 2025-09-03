import React, { useState, useEffect } from 'react';
import { ordersAPI } from '../api.js';
import './Styles/OrdersSection.css';
import OrderCard from './OrderCard';

function OrdersSection() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const cancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${orderId}/cancel`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        
        if (response.ok) {
          alert('Order cancelled successfully!');
          // Update only the cancelled order in the state
          setOrders(prevOrders => 
            prevOrders.map(order => 
              order._id === orderId 
                ? { ...order, status: 'cancelled' }
                : order
            )
          );
        } else {
          alert('Error cancelling order');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  useEffect(() => {
    async function fetchOrders() {
      try {
        const orderData = await ordersAPI.getAll();
        setOrders(orderData || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="Loading-container">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="Empty-cart-container">
        <h1>No orders found.</h1>
      </div>
    );
  }

  return (
    <div className="order-section">
      <h1>Your Orders ({orders.length} orders)</h1>
      <div className="order-card-container">
        {orders.map((order) => (
          <div key={order._id} className="order-item">
            <h3>Order #{order._id.slice(-6)}</h3>
            <p>Status: <span className={`status-${order.status}`}>{order.status.toUpperCase()}</span></p>
            <p>Total: ${order.totalAmount}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <div className="order-products">
              {order.products.map((item, id) => (
                <div key={id}>
                  <OrderCard product={item} order={order} onCancel={cancelOrder} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersSection; 
