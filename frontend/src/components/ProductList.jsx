import React, { useState, useEffect } from "react";
import "./Styles/ProductList.css";
import Card from "./Card.jsx";
import { productsAPI } from '../api.js';

function ProductList({ filterCategory }) {
  const [ProductsData, setProductsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await productsAPI.getAll({ limit: 100 });
        setProductsData(response.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, []);

  const displayedProducts = filterCategory === "none"
    ? ProductsData
    : ProductsData.filter(item => item.category === filterCategory);

  // Group products by category when no filter is applied
  const groupedProducts = {};
  if (filterCategory === "none") {
    displayedProducts.forEach(product => {
      if (!groupedProducts[product.category]) {
        groupedProducts[product.category] = [];
      }
      groupedProducts[product.category].push(product);
    });
  }

  const categoryOrder = ['laptops', 'smartphones', 'clothing', 'books', 'headphones', 'shoes'];
  const categoryTitles = {
    'laptops': 'Laptops',
    'smartphones': 'Smartphones', 
    'clothing': 'Fashion',
    'books': 'Books',
    'headphones': 'Headphones',
    'shoes': 'Shoes'
  };

  return (
    <div className={`ProductListMain ${filterCategory !== "none" ? "filtered" : ""}`}>
      {displayedProducts.length === 0 ? (
        <p>Sorry No products found in this category.</p>
      ) : filterCategory !== "none" ? (
        displayedProducts.map((item) => (
          <div key={item._id || item.id} className="ProductCardContainer">
            <Card product={item} />
          </div>
        ))
      ) : (
        categoryOrder.map(category => {
          const categoryProducts = groupedProducts[category] || [];
          if (categoryProducts.length === 0) return null;
          
          return (
            <div key={category} className="category-section">
              <h2 className="category-title">{categoryTitles[category]}</h2>
              <div className="category-products">
                {categoryProducts.slice(0, 4).map((item) => (
                  <div key={item._id || item.id} className="ProductCardContainer">
                    <Card product={item} />
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ProductList;
