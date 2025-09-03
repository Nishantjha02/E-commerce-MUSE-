import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/AdminDashboard.css';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    brand: '',
    category: '',
    stock: '',
    thumbnail: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin-login');
      return;
    }
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products?limit=100');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock),
          rating: 4.0,
          discountPercentage: 0,
          images: [newProduct.thumbnail]
        })
      });

      if (response.ok) {
        alert('Product added successfully!');
        setShowAddForm(false);
        setNewProduct({
          title: '',
          description: '',
          price: '',
          brand: '',
          category: '',
          stock: '',
          thumbnail: ''
        });
        fetchProducts();
      } else {
        alert('Error adding product');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/products/${productId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert('Product deleted successfully!');
          fetchProducts();
        } else {
          alert('Error deleting product');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div>
          <button onClick={() => setShowAddForm(!showAddForm)} className="add-btn">
            {showAddForm ? 'Cancel' : 'Add Product'}
          </button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      {showAddForm && (
        <div className="add-product-form">
          <h2>Add New Product</h2>
          <form onSubmit={handleAddProduct}>
            <input
              type="text"
              placeholder="Product Title"
              value={newProduct.title}
              onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
              required
            />
            <textarea
              placeholder="Product Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Brand"
              value={newProduct.brand}
              onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
              required
            />
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              required
            >
              <option value="">Select Category</option>
              <option value="laptops">Laptops</option>
              <option value="smartphones">Smartphones</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="headphones">Headphones</option>
              <option value="shoes">Shoes</option>
            </select>
            <input
              type="number"
              placeholder="Stock Quantity"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
              required
            />
            <input
              type="url"
              placeholder="Image URL"
              value={newProduct.thumbnail}
              onChange={(e) => setNewProduct({...newProduct, thumbnail: e.target.value})}
              required
            />
            <button type="submit">Add Product</button>
          </form>
        </div>
      )}

      <div className="products-list">
        <h2>All Products ({products.length})</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <p>{product.category}</p>
              <p>Stock: {product.stock}</p>
              <button 
                onClick={() => handleDeleteProduct(product._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;