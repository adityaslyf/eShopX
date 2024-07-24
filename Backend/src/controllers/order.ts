import { allOrders } from "./order";
import { MyCache } from "../app.js";
import { TryCatch } from "../middleware/error.js";
import { Order } from "../models/order.js";
import { invalidateCache } from "../utils/cacheUtil.js";
import { reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";

export const newOrder = TryCatch(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    user,
    discount,
    tax,
    total,
    shippingCharges,
    subtotal,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    user,
    discount,
    tax,
    total,
    shippingCharges,
    subtotal,
  });

  reduceStock(orderItems);
  invalidateCache("orders");

  return res.status(201).json({
    status: "success",
    message: "Order created successfully",
    order,
  });
});

export const MyOrder = TryCatch(async (req, res, next) => {
  const userId = req.params.id;
  const key = "user_orders_${userId}";

  if (MyCache.has(key)) {
    const cachedOrders = MyCache.get(key);
    return res.status(200).json({
      status: "success",
      message: "Orders retrieved successfully",
      cachedOrders,
    });
  }

  const orders = await Order.find({ user: userId });

  if (!orders || orders.length === 0) {
    return next(new ErrorHandler("No orders found", 404));
  }
  MyCache.set(key, orders, 3600);
  return res.status(200).json({
    status: "success",
    message: "Orders retrieved successfully",
  });
});

export const allOrders = TryCatch(async (req, res, next) => {
  const key = "all-orders";

  if (MyCache.has(key)) {
    const cachedAllorders = MyCache.get(key);
    return res.status(200).json({
      status: "success",
      message: "Orders retrieved successfully",
      cachedAllorders,
    });
  }

  const allOrders = await Order.find();

  if (!allOrders || allOrders.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "No orders found",
    });
  }

  MyCache.set(key, allOrders, 3600);

  return res.status(200).json({
    status: "success",
    message: "Orders retrieved successfully",
    allOrders,
  });
});
