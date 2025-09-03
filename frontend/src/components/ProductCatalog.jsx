import React, { useState, useEffect } from 'react';
import './Styles/ProductCatalog.css';
import ProductCard from './ProductCard.jsx';
import { productsAPI } from '../api.js';

function ProductCatalog() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const allData = await productsAPI.getAll({ limit: 6 });
        setAllProducts(allData.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="Main-container">
      <div className="product-card-container">
        <ProductCard title={"Latest Products"} arr={allProducts.slice(0, 6)} />
      </div>
    </div>
  );
}

export default ProductCatalog;
