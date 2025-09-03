# 🚀 Quick Start Guide

## Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

## Step 2: Start Backend Server
```bash
npm run seed
npm run dev
```
Backend will run on http://localhost:5000

## Step 3: Start Frontend (New Terminal)
```bash
cd frontend
npm start
```
Frontend will run on http://localhost:3000

## ✅ You're Done!

### What's Working Now:
- ✅ User Registration & Login
- ✅ Product Catalog with Search & Filters
- ✅ Shopping Cart (Add/Remove/Update)
- ✅ Order Management
- ✅ User Dashboard
- ✅ Authentication System

### Test the System:
1. **Register**: Go to http://localhost:3000/Register
2. **Login**: Use your credentials
3. **Browse Products**: View products on homepage
4. **Add to Cart**: Click any product → Add to Cart
5. **View Cart**: User menu → Dashboard → Cart
6. **Place Order**: Click Checkout in cart
7. **View Orders**: Dashboard → Orders

### Database:
- Uses MongoDB (automatically connects to local MongoDB)
- Sample products are automatically loaded
- No additional setup needed

### Troubleshooting:
- If MongoDB connection fails, install MongoDB locally or use MongoDB Atlas
- Make sure both servers are running (backend:5000, frontend:3000)
- Clear browser cache if you see old data

**Everything is integrated and working! 🎉**