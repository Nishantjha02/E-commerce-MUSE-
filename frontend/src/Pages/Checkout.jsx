import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ordersAPI, authAPI } from '../api.js';
import './Styles/Checkout.css';

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  useEffect(() => {
    if (!authAPI.isAuthenticated()) {
      navigate('/Login');
      return;
    }
    
    if (location.state?.product) {
      setProduct(location.state.product);
    } else {
      navigate('/UserDashboard');
    }
  }, [location, navigate]);

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = () => {
    // Dummy payment simulation
    const paymentSuccess = window.confirm(
      `Proceed with payment of $${product.total}?\n\nThis is a dummy payment - no real money will be charged.`
    );
    
    if (paymentSuccess) {
      // Simulate payment processing
      setTimeout(async () => {
        try {
          await ordersAPI.create({
            products: [{
              productId: product.productId,
              title: product.title,
              price: product.price,
              quantity: product.quantity,
              total: product.total,
              thumbnail: product.thumbnail
            }],
            totalAmount: product.total,
            shippingAddress: shippingInfo
          });
          
          alert('Payment Successful! Order placed successfully!');
          navigate('/UserDashboard', { state: { activeTab: 'Orders' } });
        } catch (error) {
          alert('Error placing order: ' + error.message);
        }
      }, 1000);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      
      <div className="checkout-content">
        <div className="product-summary">
          <h2>Order Summary</h2>
          <div className="checkout-product">
            <img src={product.thumbnail} alt={product.title} />
            <div>
              <h3>{product.title}</h3>
              <p>Quantity: {product.quantity}</p>
              <p>Price: ${product.price}</p>
              <p><strong>Total: ${product.total}</strong></p>
            </div>
          </div>
        </div>

        <div className="shipping-form">
          <h2>Shipping Information</h2>
          <form>
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={shippingInfo.street}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={shippingInfo.city}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={shippingInfo.state}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="zipCode"
              placeholder="ZIP Code"
              value={shippingInfo.zipCode}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={shippingInfo.country}
              onChange={handleInputChange}
              required
            />
          </form>
        </div>
      </div>

      <div className="checkout-actions">
        <button onClick={() => navigate(-1)} className="back-btn">Back</button>
        <button onClick={handlePlaceOrder} className="place-order-btn">Place Order</button>
      </div>
    </div>
  );
}

export default Checkout;