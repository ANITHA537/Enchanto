// ===============================
// ORDER CONTROLLER (FULL FILE)
// ===============================

import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

// Razorpay Instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ===============================
// ✨ COD ORDER
// ===============================
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
    };

    const newOrder = await Order.create(orderData);
    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(201).json({ message: "Order Placed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Order Place Error" });
  }
};

// ===============================
// ✨ Razorpay — Create Order
// ===============================
export const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const newOrder = await Order.create({
      items,
      amount,
      userId,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now()
    });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: newOrder._id.toString()
    };

    const order = await razorpayInstance.orders.create(options);

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      receipt: newOrder._id
    });
  } catch (error) {
    console.log("Razorpay Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ===============================
// ✨ Razorpay — Verify Payment (FINAL FIXED VERSION)
// ===============================
export const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid Signature"
      });
    }

    // Fetch actual Razorpay order
    const rzpOrder = await razorpayInstance.orders.fetch(razorpay_order_id);

    // Mark local order as paid
    await Order.findByIdAndUpdate(rzpOrder.receipt, { payment: true });

    // Clear cart
    await User.findByIdAndUpdate(req.userId, { cartData: {} });

    return res.status(200).json({
      success: true,
      message: "Payment Verified"
    });
  } catch (error) {
    console.log("Verify Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ===============================
// ✨ Get user orders
// ===============================
export const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId });
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "User Orders Error" });
  }
};

// ===============================
// ✨ ADMIN — Get All Orders
// ===============================
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Admin Orders Error" });
  }
};

// ===============================
// ✨ ADMIN — Update Status
// ===============================
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    return res.status(200).json({ message: "Status Updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
