import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://e-commerce-muse.vercel.app',
        'https://e-commerce-muse-56j6ax9rx-nishant-jhas-projects-fac428b5.vercel.app',
        process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true
}));
app.use(express.json());

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/muse-ecommerce');
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
};

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Product Schema
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// Cart Schema
const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        title: String,
        price: Number,
        quantity: { type: Number, default: 1 },
        total: Number,
        discountPercentage: Number,
        discountedPrice: Number,
        thumbnail: String
    }],
    totalProducts: { type: Number, default: 0 },
    totalQuantity: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    discountedTotal: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', cartSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        title: String,
        price: Number,
        quantity: Number,
        total: Number,
        thumbnail: String
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// Auth Middleware
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Routes

// Auth Routes
app.post('/api/auth/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.post('/api/auth/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Product Routes
app.get('/api/products', async (req, res) => {
    try {
        const { category, search, limit = 30, skip = 0 } = req.query;
        let query = {};
        
        if (category) query.category = category;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } }
            ];
        }

        const products = await Product.find(query)
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .sort({ createdAt: -1 });
        
        const total = await Product.countDocuments(query);
        
        res.json({ products, total, limit: parseInt(limit), skip: parseInt(skip) });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Cart Routes
app.get('/api/cart', auth, async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.userId }).populate('products.productId');
        if (!cart) {
            cart = new Cart({ userId: req.user.userId, products: [] });
            await cart.save();
        }
        
        // Ensure thumbnails are populated from product data
        for (let item of cart.products) {
            if (item.productId && !item.thumbnail) {
                item.thumbnail = item.productId.thumbnail;
            }
        }
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.post('/api/cart/add', auth, async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ userId: req.user.userId });
        if (!cart) {
            cart = new Cart({ userId: req.user.userId, products: [] });
        }

        const existingItem = cart.products.find(item => item.productId.toString() === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.total = existingItem.price * existingItem.quantity;
            existingItem.discountedPrice = existingItem.total * (1 - existingItem.discountPercentage / 100);
        } else {
            const discountedPrice = product.price * (1 - product.discountPercentage / 100);
            cart.products.push({
                productId: product._id,
                title: product.title,
                price: product.price,
                quantity,
                total: product.price * quantity,
                discountPercentage: product.discountPercentage,
                discountedPrice: discountedPrice * quantity,
                thumbnail: product.thumbnail
            });
        }

        // Recalculate totals
        cart.totalProducts = cart.products.length;
        cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
        cart.total = cart.products.reduce((sum, item) => sum + item.total, 0);
        cart.discountedTotal = cart.products.reduce((sum, item) => sum + item.discountedPrice, 0);
        cart.updatedAt = new Date();

        await cart.save();
        res.json({ message: 'Product added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.put('/api/cart/update', auth, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        
        const cart = await Cart.findOne({ userId: req.user.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.products.find(item => item.productId.toString() === productId);
        if (!item) {
            return res.status(404).json({ message: 'Product not in cart' });
        }

        if (quantity <= 0) {
            cart.products = cart.products.filter(item => item.productId.toString() !== productId);
        } else {
            item.quantity = quantity;
            item.total = item.price * quantity;
            item.discountedPrice = item.total * (1 - item.discountPercentage / 100);
        }

        // Recalculate totals
        cart.totalProducts = cart.products.length;
        cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
        cart.total = cart.products.reduce((sum, item) => sum + item.total, 0);
        cart.discountedTotal = cart.products.reduce((sum, item) => sum + item.discountedPrice, 0);
        cart.updatedAt = new Date();

        await cart.save();
        res.json({ message: 'Cart updated', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.delete('/api/cart/remove/:productId', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.products = cart.products.filter(item => item.productId.toString() !== req.params.productId);
        
        // Recalculate totals
        cart.totalProducts = cart.products.length;
        cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
        cart.total = cart.products.reduce((sum, item) => sum + item.total, 0);
        cart.discountedTotal = cart.products.reduce((sum, item) => sum + item.discountedPrice, 0);
        cart.updatedAt = new Date();

        await cart.save();
        res.json({ message: 'Product removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Order Routes
// Single item order route
app.post('/api/orders/single', auth, async (req, res) => {
    try {
        const { product, totalAmount, shippingAddress } = req.body;
        
        const order = new Order({
            userId: req.user.userId,
            products: [product],
            totalAmount,
            shippingAddress
        });

        await order.save();
        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.post('/api/orders', auth, async (req, res) => {
    try {
        const { shippingAddress } = req.body;
        
        const cart = await Cart.findOne({ userId: req.user.userId });
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const order = new Order({
            userId: req.user.userId,
            products: cart.products.map(item => ({
                productId: item.productId,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                total: item.total,
                thumbnail: item.thumbnail
            })),
            totalAmount: cart.discountedTotal,
            shippingAddress
        });

        await order.save();
        
        // Clear cart after order
        cart.products = [];
        cart.totalProducts = 0;
        cart.totalQuantity = 0;
        cart.total = 0;
        cart.discountedTotal = 0;
        await cart.save();

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.put('/api/orders/:orderId/cancel', auth, async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.orderId, userId: req.user.userId });
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        if (order.status !== 'pending') {
            return res.status(400).json({ message: 'Order cannot be cancelled' });
        }
        
        order.status = 'cancelled';
        await order.save();
        
        res.json({ message: 'Order cancelled successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.get('/api/orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.userId })
            .populate('products.productId')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.get('/api/orders/:id', auth, async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, userId: req.user.userId })
            .populate('products.productId');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Payment Routes
app.post('/api/payment/create-order', auth, async (req, res) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: amount * 100, // amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };
        res.json(options);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
});

app.post('/api/payment/verify', auth, async (req, res) => {
    try {
        const shippingAddress = {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA'
        };
        
        const cart = await Cart.findOne({ userId: req.user.userId });
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const order = new Order({
            userId: req.user.userId,
            products: cart.products.map(item => ({
                productId: item.productId,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                total: item.total,
                thumbnail: item.thumbnail
            })),
            totalAmount: cart.discountedTotal,
            shippingAddress
        });

        await order.save();
        
        // Clear cart after order
        cart.products = [];
        cart.totalProducts = 0;
        cart.totalQuantity = 0;
        cart.total = 0;
        cart.discountedTotal = 0;
        await cart.save();

        res.json({ message: 'Payment verified and order created' });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying payment', error: error.message });
    }
});

// Admin Routes
app.post('/api/admin/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.delete('/api/admin/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// User Profile Routes
app.get('/api/user/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.put('/api/user/profile', auth, async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { name, email },
            { new: true }
        ).select('-password');
        res.json({ message: 'Profile updated', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.put('/api/user/change-password', auth, [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.userId);
        
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

import { productData } from './productData.js';

// Initialize database with sample data
const initializeData = async () => {
    try {
        await Product.deleteMany({});
        console.log('Cleared existing products');
        
        await Product.insertMany(productData);
        console.log(`Added ${productData.length} products to database`);
    } catch (error) {
        console.error('Error initializing data:', error);
    }
};

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    initializeData();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});