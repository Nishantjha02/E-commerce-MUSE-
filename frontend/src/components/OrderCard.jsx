import React from 'react'
import './Styles/OrderCard.css'

function OrderCard({product, order, onCancel}) {
  return (
    <div className='order-Card'>
      <img className='order-image' src={product.thumbnail || 'https://via.placeholder.com/150'} alt="" />
      <h1 className='Item-name'>{product.title}</h1>
      <p>Qty: {product.quantity}</p>
      <p>${product.price}</p>
      <div className='order-actions'>
        {order && order.status === 'pending' && (
          <button 
            onClick={() => onCancel(order._id)} 
            className='cancel-order-btn'
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}

export default OrderCard