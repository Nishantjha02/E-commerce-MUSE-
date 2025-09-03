import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

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

const sampleProducts = [
    // Electronics
    {
        title: "iPhone 14 Pro",
        description: "Latest iPhone with A16 Bionic chip, 48MP camera system, and Dynamic Island",
        price: 999,
        discountPercentage: 10,
        rating: 4.8,
        stock: 50,
        brand: "Apple",
        category: "electronics",
        thumbnail: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
        images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600"]
    },
    {
        title: "Samsung Galaxy S23",
        description: "Premium Android smartphone with 200MP camera and Snapdragon 8 Gen 2",
        price: 799,
        discountPercentage: 15,
        rating: 4.6,
        stock: 75,
        brand: "Samsung",
        category: "electronics",
        thumbnail: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
        images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600"]
    },
    {
        title: "Sony WH-1000XM4",
        description: "Wireless noise-canceling headphones with 30-hour battery",
        price: 349,
        discountPercentage: 18,
        rating: 4.7,
        stock: 60,
        brand: "Sony",
        category: "electronics",
        thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"]
    },
    {
        title: "Apple Watch Series 8",
        description: "Advanced health monitoring with ECG and blood oxygen sensors",
        price: 399,
        discountPercentage: 12,
        rating: 4.8,
        stock: 45,
        brand: "Apple",
        category: "electronics",
        thumbnail: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400",
        images: ["https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=600"]
    },
    {
        title: "iPad Pro 12.9",
        description: "Most advanced iPad with M2 chip and Liquid Retina XDR display",
        price: 1099,
        discountPercentage: 8,
        rating: 4.7,
        stock: 35,
        brand: "Apple",
        category: "electronics",
        thumbnail: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
        images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600"]
    },
    {
        title: "AirPods Pro 2",
        description: "Active noise cancellation with spatial audio",
        price: 249,
        discountPercentage: 15,
        rating: 4.6,
        stock: 80,
        brand: "Apple",
        category: "electronics",
        thumbnail: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400",
        images: ["https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600"]
    },

    // Laptops
    {
        title: "MacBook Pro M2",
        description: "13-inch MacBook Pro with M2 chip, 8GB RAM, 256GB SSD",
        price: 1299,
        discountPercentage: 8,
        rating: 4.9,
        stock: 30,
        brand: "Apple",
        category: "laptops",
        thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
        images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600"]
    },
    {
        title: "Dell XPS 13",
        description: "Ultra-thin laptop with Intel i7, 16GB RAM, 512GB SSD",
        price: 1199,
        discountPercentage: 12,
        rating: 4.5,
        stock: 40,
        brand: "Dell",
        category: "laptops",
        thumbnail: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
        images: ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600"]
    },
    {
        title: "HP Spectre x360",
        description: "2-in-1 convertible laptop with touchscreen and stylus support",
        price: 1399,
        discountPercentage: 10,
        rating: 4.4,
        stock: 25,
        brand: "HP",
        category: "laptops",
        thumbnail: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400",
        images: ["https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600"]
    },
    {
        title: "Lenovo ThinkPad X1",
        description: "Business laptop with military-grade durability",
        price: 1599,
        discountPercentage: 7,
        rating: 4.6,
        stock: 20,
        brand: "Lenovo",
        category: "laptops",
        thumbnail: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
        images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600"]
    },

    // Clothing
    {
        title: "Levi's 501 Jeans",
        description: "Classic straight-fit jeans in premium denim",
        price: 89,
        discountPercentage: 25,
        rating: 4.3,
        stock: 120,
        brand: "Levi's",
        category: "clothing",
        thumbnail: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
        images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=600"]
    },
    {
        title: "H&M Cotton T-Shirt",
        description: "Comfortable cotton t-shirt in various colors",
        price: 19,
        discountPercentage: 30,
        rating: 4.1,
        stock: 200,
        brand: "H&M",
        category: "clothing",
        thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
        images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"]
    },
    {
        title: "Zara Blazer",
        description: "Professional blazer perfect for office wear",
        price: 129,
        discountPercentage: 20,
        rating: 4.2,
        stock: 70,
        brand: "Zara",
        category: "clothing",
        thumbnail: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
        images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600"]
    },
    {
        title: "Nike Hoodie",
        description: "Comfortable fleece hoodie for casual wear",
        price: 65,
        discountPercentage: 15,
        rating: 4.5,
        stock: 85,
        brand: "Nike",
        category: "clothing",
        thumbnail: "https://images.unsplash.com/photo-1556821840-3a9fbc86339e?w=400",
        images: ["https://images.unsplash.com/photo-1556821840-3a9fbc86339e?w=600"]
    },
    {
        title: "Adidas Track Pants",
        description: "Comfortable athletic pants for sports and casual wear",
        price: 55,
        discountPercentage: 20,
        rating: 4.3,
        stock: 90,
        brand: "Adidas",
        category: "clothing",
        thumbnail: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
        images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600"]
    },

    // Shoes
    {
        title: "Nike Air Max 270",
        description: "Comfortable running shoes with Air Max technology",
        price: 150,
        discountPercentage: 20,
        rating: 4.4,
        stock: 100,
        brand: "Nike",
        category: "shoes",
        thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"]
    },
    {
        title: "Adidas Ultraboost 22",
        description: "Premium running shoes with Boost midsole technology",
        price: 180,
        discountPercentage: 15,
        rating: 4.6,
        stock: 80,
        brand: "Adidas",
        category: "shoes",
        thumbnail: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400",
        images: ["https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600"]
    },
    {
        title: "Converse Chuck Taylor",
        description: "Classic canvas sneakers in high-top style",
        price: 65,
        discountPercentage: 10,
        rating: 4.2,
        stock: 150,
        brand: "Converse",
        category: "shoes",
        thumbnail: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
        images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600"]
    },

    // Sports
    {
        title: "Yoga Mat Premium",
        description: "Non-slip yoga mat with extra cushioning for comfortable workouts",
        price: 35,
        discountPercentage: 30,
        rating: 4.5,
        stock: 120,
        brand: "FitnessPro",
        category: "sports",
        thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
        images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600"]
    },
    {
        title: "Dumbbell Set",
        description: "Adjustable dumbbell set for home workouts, 5-50 lbs",
        price: 199,
        discountPercentage: 15,
        rating: 4.6,
        stock: 40,
        brand: "PowerFit",
        category: "sports",
        thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
        images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600"]
    },
    {
        title: "Basketball",
        description: "Official size basketball for indoor and outdoor play",
        price: 29,
        discountPercentage: 25,
        rating: 4.4,
        stock: 80,
        brand: "Spalding",
        category: "sports",
        thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400",
        images: ["https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600"]
    },
    {
        title: "Tennis Racket",
        description: "Professional tennis racket with carbon fiber frame",
        price: 149,
        discountPercentage: 20,
        rating: 4.7,
        stock: 35,
        brand: "Wilson",
        category: "sports",
        thumbnail: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
        images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600"]
    },
    {
        title: "Resistance Bands Set",
        description: "Complete resistance bands set for strength training",
        price: 25,
        discountPercentage: 35,
        rating: 4.3,
        stock: 100,
        brand: "FitBand",
        category: "sports",
        thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
        images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600"]
    },

    // Household
    {
        title: "Coffee Maker",
        description: "Programmable coffee maker with 12-cup capacity",
        price: 89,
        discountPercentage: 20,
        rating: 4.4,
        stock: 60,
        brand: "Cuisinart",
        category: "household",
        thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
        images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600"]
    },
    {
        title: "Vacuum Cleaner",
        description: "Cordless stick vacuum with powerful suction",
        price: 199,
        discountPercentage: 15,
        rating: 4.5,
        stock: 45,
        brand: "Dyson",
        category: "household",
        thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"]
    },
    {
        title: "Air Fryer",
        description: "Digital air fryer for healthy cooking with little to no oil",
        price: 129,
        discountPercentage: 25,
        rating: 4.6,
        stock: 70,
        brand: "Ninja",
        category: "household",
        thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
        images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600"]
    },
    {
        title: "Blender",
        description: "High-speed blender perfect for smoothies and soups",
        price: 79,
        discountPercentage: 30,
        rating: 4.3,
        stock: 85,
        brand: "Vitamix",
        category: "household",
        thumbnail: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400",
        images: ["https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600"]
    },
    {
        title: "Smart Thermostat",
        description: "WiFi-enabled smart thermostat with energy saving features",
        price: 199,
        discountPercentage: 18,
        rating: 4.7,
        stock: 40,
        brand: "Nest",
        category: "household",
        thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"]
    },
    {
        title: "Robot Vacuum",
        description: "Smart robot vacuum with mapping and app control",
        price: 299,
        discountPercentage: 20,
        rating: 4.5,
        stock: 30,
        brand: "Roomba",
        category: "household",
        thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"]
    },

    // Books
    {
        title: "The Psychology of Money",
        description: "Timeless lessons on wealth, greed, and happiness",
        price: 15,
        discountPercentage: 25,
        rating: 4.7,
        stock: 100,
        brand: "Harriman House",
        category: "books",
        thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
        images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600"]
    },
    {
        title: "Atomic Habits",
        description: "An easy & proven way to build good habits & break bad ones",
        price: 18,
        discountPercentage: 20,
        rating: 4.8,
        stock: 80,
        brand: "Avery",
        category: "books",
        thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
        images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600"]
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/muse-ecommerce');
        console.log('Connected to MongoDB');

        await Product.deleteMany({});
        console.log('Cleared existing products');

        await Product.insertMany(sampleProducts);
        console.log(`Inserted ${sampleProducts.length} sample products`);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();