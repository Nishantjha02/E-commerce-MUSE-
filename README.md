# MUSE E-Commerce Platform

A full-stack e-commerce application built with React.js frontend and Node.js backend.

## Features

- **User Authentication** - Register, login, and user dashboard
- **Product Catalog** - Browse products by categories (Laptops, Smartphones, Clothing, Books, Headphones, Shoes)
- **Shopping Cart** - Add/remove items, quantity management
- **Order Management** - Place orders, view order history, cancel pending orders
- **Admin Panel** - Add/delete products, manage inventory
- **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

### Frontend
- React.js
- React Router
- CSS3
- JavaScript ES6+

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Nishantjha02/E-commerce-MUSE-.git
cd E-commerce-MUSE-
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Start the backend server:
```bash
cd backend
npm run dev
```

6. Start the frontend development server:
```bash
cd frontend
npm start
```

## Usage

### User Features
- Browse products by category
- Add items to cart
- Place orders
- View order history
- Cancel pending orders

### Admin Features
- Login with admin credentials: `admin@muse.com` / `admin123`
- Add new products
- Delete existing products
- View all products

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/categories` - Get all categories

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:productId` - Remove item from cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `PUT /api/orders/:orderId/cancel` - Cancel order

### Admin
- `POST /api/admin/products` - Add product
- `DELETE /api/admin/products/:id` - Delete product

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.