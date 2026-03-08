import Razorpay from "razorpay";
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "demo",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "demo"
});
export default razorpay;
