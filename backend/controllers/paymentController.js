import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import ParkingHistory from "../models/ParkingHistory.js";

export const createOrder = async (req,res) => {
  try{
    const { amount, receiptId } = req.body;
    const order = await razorpay.orders.create({
      amount:Number(amount)*100,
      currency:"INR",
      receipt:receiptId || `RCPT_${Date.now()}`
    });
    res.json(order);
  }catch(error){
    res.status(500).json({message:"Order creation failed", error:error.message});
  }
};

export const verifyPayment = async (req,res) => {
  try{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, receiptId } = req.body;
    const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if(expected !== razorpay_signature) return res.status(400).json({message:"Payment verification failed"});

    if(receiptId){
      const history = await ParkingHistory.findOne({ receiptId });
      if(history){
        history.paymentStatus = "PAID";
        await history.save();
      }
    }

    res.json({message:"Payment verified"});
  }catch(error){
    res.status(500).json({message:"Verification failed", error:error.message});
  }
};
