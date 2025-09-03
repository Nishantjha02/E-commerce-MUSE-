import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartAPI } from '../api.js';
import './Styles/CartCard.css';

function CartCard({ product }) {
    const [quantity, setQuantity] = useState(product.quantity);
    const navigate = useNavigate();
    const maxQuantity = 5;

    const updateCartQuantity = async (newQuantity) => {
        try {
            await cartAPI.update(product.productId, newQuantity);
            setQuantity(newQuantity);
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    function quantityAdd() {
        if (quantity < maxQuantity) {
            updateCartQuantity(quantity + 1);
        }
    }

    function quantitySubtract() {
        if (quantity > 1) {
            updateCartQuantity(quantity - 1);
        }
    }

    const removeItem = async () => {
        try {
            await cartAPI.remove(product.productId);
            window.location.reload();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const buyNow = () => {
        const productData = {
            productId: product.productId,
            title: product.title,
            price: product.price,
            quantity: quantity,
            total: product.price * quantity,
            thumbnail: product.thumbnail
        };
        
        navigate('/checkout', { state: { product: productData } });
    };

    return (
        <div className='Cart-Card'>
            <img className='Cart-image' src={product.thumbnail || 'https://via.placeholder.com/150'} alt={product.title} />
            <h1 className='Item-name'>{product.title}</h1>
            <p>${product.price}</p>
            <div className='Quantity-container'>
                <button onClick={quantitySubtract}>-</button>
                <p>{quantity}</p>
                <button onClick={quantityAdd}>+</button>
            </div>
            <p>${product.total}</p>
            <p>${product.discountedPrice}</p>
            <div className='cart-item-actions'>
                <button onClick={buyNow} className='buy-now-btn'>Buy Now</button>
                <button onClick={removeItem} className='remove-btn'>Remove</button>
            </div>
        </div>
    );
}

export default CartCard;