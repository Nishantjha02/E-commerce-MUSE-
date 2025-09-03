import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartAPI, authAPI, ordersAPI } from '../api.js';
import './Styles/CartSection.css';
import CartCard from './CartCard.jsx';

function CartSection() {
  const [cart, setCart] = useState(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const shippingAddress = {
        street: '123 Main St',
        city: 'New York', 
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      };
      await ordersAPI.create({ shippingAddress });
      alert('Order placed successfully!');
      navigate('/UserDashboard', { state: { activeTab: 'Orders' } });
    } catch (error) {
      alert('Error placing order: ' + error.message);
    }
  };

  useEffect(() => {
    if (!authAPI.isAuthenticated()) {
      navigate('/Login');
      return;
    }
    
    async function fetchCart() {
      try {
        const cartData = await cartAPI.get();
        setCart(cartData);
        setIsEmpty(!cartData.products || cartData.products.length === 0);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    }
    fetchCart();
  }, [navigate]);

  if (cart === null) {
    return (
      <div className="Loading-container">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="Empty-cart-container">
        <h1>Your cart is empty.</h1>
      </div>
    );
  }

  return (
    <>
      <div className="Cart-section">
        <h1>Your Cart ({cart.products.length} items)</h1>
        <div className="cart-card-container">
          <div className='Card-header'>
            <h3 className='Item'>Item</h3>
            <h3>Price</h3>
            <h3>Quantity</h3>
            <h3>Total</h3>
            <h3>Discounted Total</h3>
          </div>
          {cart.products.map((item, id) => (
            <div key={id}>
              <CartCard product={item} />
            </div>
          ))}
        </div>
      </div>
      <div className="cart-final-info">
        <h2>Grand Total : {`$${cart.discountedTotal}`}</h2>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </>
  );
}

export default CartSection;
