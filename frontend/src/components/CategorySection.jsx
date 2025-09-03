import React, { useState } from 'react';
import Card from './Card';
import './Styles/CategorySection.css';

function CategorySection({ title, products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 4;

  const nextProducts = () => {
    if (currentIndex + productsPerPage < products.length) {
      setCurrentIndex(currentIndex + productsPerPage);
    }
  };

  const prevProducts = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - productsPerPage);
    }
  };

  const displayedProducts = products.slice(currentIndex, currentIndex + productsPerPage);

  return (
    <div className="category-section">
      <div className="category-header">
        <h2 className="category-title">{title}</h2>
        <div className="category-nav">
          <button 
            onClick={prevProducts} 
            disabled={currentIndex === 0}
            className="nav-btn prev-btn"
          >
            ←
          </button>
          <span className="page-indicator">
            {Math.floor(currentIndex / productsPerPage) + 1} / {Math.ceil(products.length / productsPerPage)}
          </span>
          <button 
            onClick={nextProducts} 
            disabled={currentIndex + productsPerPage >= products.length}
            className="nav-btn next-btn"
          >
            →
          </button>
        </div>
      </div>
      
      <div className="products-grid">
        {displayedProducts.map((product) => (
          <div key={product._id} className="product-item">
            <Card product={product} />
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price}</p>
              <p className="product-brand">{product.brand}</p>
              <div className="product-rating">
                ⭐ {product.rating} ({product.stock} in stock)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySection;