import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_your_key_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'your_key_secret'
});

export const createOrder = async (amount, currency = 'INR') => {
  try {
    const options = {
      amount: amount * 100, // amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };
    
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    throw new Error('Error creating Razorpay order: ' + error.message);
  }
};

export const verifyPayment = (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'your_key_secret')
    .update(body.toString())
    .digest("hex");
    
  return expectedSignature === razorpay_signature;
};