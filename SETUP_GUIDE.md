# Muse E-commerce Complete Setup Guide

This guide will help you set up the complete Muse e-commerce application with both frontend and backend.

## Project Structure
```
muse-master/
├── backend/           # Node.js/Express API server
├── frontend/          # React frontend application
└── SETUP_GUIDE.md    # This file
```

## Prerequisites

Before starting, make sure you have installed:

1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - Choose one option:
   - **Local MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
   - **MongoDB Atlas** (Cloud) - [Sign up here](https://www.mongodb.com/atlas)
3. **Git** (optional) - [Download here](https://git-scm.com/)

## Step-by-Step Setup

### 1. Backend Setup

#### Navigate to Backend Directory
```bash
cd backend
```

#### Install Dependencies
```bash
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `backend` directory:

**For Local MongoDB:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/muse-ecommerce
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/muse-ecommerce
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

#### Database Setup

**Option A: Local MongoDB**
1. Install MongoDB Community Server
2. Start MongoDB service:
   - **Windows**: MongoDB should start automatically as a service
   - **macOS**: `brew services start mongodb/brew/mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

**Option B: MongoDB Atlas (Recommended)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get the connection string and update `MONGODB_URI` in `.env`

#### Seed Database with Sample Data
```bash
npm run seed
```

#### Start Backend Server
```bash
# Development mode (auto-restart on changes)
npm run dev

# OR Production mode
npm start
```

The backend server will start on `http://localhost:5000`

### 2. Frontend Setup

#### Navigate to Frontend Directory
```bash
cd ../frontend
```

#### Install Dependencies
```bash
npm install
```

#### Start Frontend Development Server
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## Verification

### Backend Verification
1. Open `http://localhost:5000/api/products` in your browser
2. You should see a JSON response with products

### Frontend Verification
1. Open `http://localhost:3000` in your browser
2. You should see the Muse e-commerce website

### Full Integration Test
1. Try registering a new user
2. Login with the credentials
3. Browse products
4. Add items to cart
5. View cart and place an order

## API Integration

The frontend now includes an API service layer (`src/api.js`) that handles all backend communication. Key features:

- **Authentication**: JWT token management
- **Products**: Browse, search, filter products
- **Cart**: Add, update, remove items
- **Orders**: Create and track orders
- **User Profile**: Registration, login, profile management

## Available Scripts

### Backend Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with auto-restart
npm run seed       # Seed database with sample data
```

### Frontend Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## Database Collections

The backend creates the following MongoDB collections:

1. **users** - User accounts and authentication
2. **products** - Product catalog
3. **carts** - User shopping carts
4. **orders** - Order history and tracking

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get products (with search, category filter, pagination)
- `GET /api/products/:id` - Get single product
- `GET /api/categories` - Get all categories

### Cart (Requires Authentication)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add product to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/:productId` - Remove item from cart

### Orders (Requires Authentication)
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get specific order

### User Profile (Requires Authentication)
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/change-password` - Change password

## Troubleshooting

### Common Issues

#### Backend Issues
1. **Database Connection Error**
   - Check MongoDB is running (local) or connection string is correct (Atlas)
   - Verify network access in MongoDB Atlas

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill process using the port: `npx kill-port 5000`

3. **JWT Token Issues**
   - Ensure JWT_SECRET is set in `.env`
   - Clear browser localStorage if needed

#### Frontend Issues
1. **API Connection Error**
   - Ensure backend is running on port 5000
   - Check CORS settings in backend

2. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Development Tips

1. **Use Browser DevTools** to monitor API requests
2. **Check Backend Logs** for error messages
3. **Use MongoDB Compass** to view database contents
4. **Enable CORS** for cross-origin requests during development

## Production Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Use `NODE_ENV=production`
3. Configure MongoDB Atlas for production
4. Set up proper CORS origins

### Frontend Deployment
1. Update API base URL in `src/api.js`
2. Run `npm run build`
3. Deploy the `build` folder to your hosting platform

## Security Considerations

- Change JWT_SECRET in production
- Use HTTPS in production
- Implement rate limiting
- Validate all user inputs
- Use environment variables for sensitive data

## Support

If you encounter any issues:
1. Check the console logs (both frontend and backend)
2. Verify all dependencies are installed
3. Ensure MongoDB is running and accessible
4. Check that all environment variables are set correctly

The application is now ready for development and testing!