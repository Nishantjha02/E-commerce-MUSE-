import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

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

const Cart = mongoose.model('Cart', cartSchema);
const Product = mongoose.model('Product', productSchema);

const fixCartThumbnails = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const carts = await Cart.find().populate('products.productId');
        
        for (let cart of carts) {
            let updated = false;
            for (let item of cart.products) {
                if (item.productId && !item.thumbnail) {
                    item.thumbnail = item.productId.thumbnail;
                    updated = true;
                }
            }
            if (updated) {
                await cart.save();
                console.log(`Updated cart for user: ${cart.userId}`);
            }
        }

        console.log('Cart thumbnails fixed!');
        process.exit(0);
    } catch (error) {
        console.error('Error fixing cart thumbnails:', error);
        process.exit(1);
    }
};

fixCartThumbnails();