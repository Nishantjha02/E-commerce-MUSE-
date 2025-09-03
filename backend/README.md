# Muse E-commerce Backend

A complete Node.js/Express.js backend for the Muse e-commerce website with MongoDB database integration.

## Features

- **Authentication & Authorization**: JWT-based user authentication
- **Product Management**: CRUD operations for products with categories and search
- **Shopping Cart**: Add, update, remove items with automatic total calculations
- **Order Management**: Create and track orders with shipping details
- **User Profile**: User registration, login, profile management, password change

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products (with pagination, search, category filter)
- `GET /api/products/:id` - Get single product
- `GET /api/categories` - Get all product categories

### Cart (Protected Routes)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add product to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/:productId` - Remove item from cart

### Orders (Protected Routes)
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get specific order

### User Profile (Protected Routes)
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/change-password` - Change password

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation Steps

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/muse-ecommerce
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

3. **Database Setup**
   
   **Option A: Local MongoDB**
   - Install MongoDB locally
   - Start MongoDB service
   - The application will connect to `mongodb://localhost:27017/muse-ecommerce`

   **Option B: MongoDB Atlas (Cloud)**
   - Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get connection string and update `MONGODB_URI` in `.env`

4. **Seed Database (Optional)**
   ```bash
   npm run seed
   ```

5. **Start the Server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## Database Schema

### User
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date
}
```

### Product
```javascript
{
  title: String (required),
  description: String (required),
  price: Number (required),
  discountPercentage: Number (default: 0),
  rating: Number (default: 0),
  stock: Number (required),
  brand: String (required),
  category: String (required),
  thumbnail: String (required),
  images: [String],
  createdAt: Date
}
```

### Cart
```javascript
{
  userId: ObjectId (ref: User),
  products: [{
    productId: ObjectId (ref: Product),
    title: String,
    price: Number,
    quantity: Number,
    total: Number,
    discountPercentage: Number,
    discountedPrice: Number
  }],
  totalProducts: Number,
  totalQuantity: Number,
  total: Number,
  discountedTotal: Number,
  updatedAt: Date
}
```

### Order
```javascript
{
  userId: ObjectId (ref: User),
  products: [{
    productId: ObjectId (ref: Product),
    title: String,
    price: Number,
    quantity: Number,
    total: Number
  }],
  totalAmount: Number,
  status: String (enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  createdAt: Date
}
```

## Frontend Integration

Update your frontend API calls to use the new backend endpoints:

### Example API Usage

```javascript
// Login
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password })
});

// Get products
const response = await fetch('http://localhost:5000/api/products?category=smartphones&search=iphone');

// Add to cart (with authentication)
const response = await fetch('http://localhost:5000/api/cart/add', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ productId, quantity })
});
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Input validation with express-validator
- CORS enabled for frontend integration
- Protected routes for sensitive operations

## Development

- The server automatically initializes with sample products if the database is empty
- Use `npm run dev` for development with auto-restart
- MongoDB connection is established before starting the server
- Error handling and validation on all endpoints

## Production Deployment

1. Set `NODE_ENV=production` in environment variables
2. Use a strong JWT secret
3. Configure MongoDB Atlas for cloud database
4. Set up proper CORS origins for your domain
5. Use HTTPS in production

## Troubleshooting

- **Database Connection Issues**: Check MongoDB service is running and connection string is correct
- **Authentication Errors**: Verify JWT secret is set and tokens are being sent correctly
- **CORS Issues**: Ensure frontend URL is allowed in CORS configuration