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
  const userId = req.query.id;
  console.log(userId);

  if (!userId) {
    return next(new ErrorHandler("User ID is required", 400));
  }

  const key = `user_orders_${userId}`;

  if (MyCache.has(key)) {
    const cachedOrders = MyCache.get(key);
    return res.status(200).json({
      status: "success",
      message: "Orders retrieved successfully from cache",
      orders: cachedOrders,
    });
  }

  const orders = await Order.find({ user: userId });

  if (!orders || orders.length === 0) {
    return next(new ErrorHandler("No orders found", 404));
  }

  MyCache.set(key, orders, 3600);

  return res.status(200).json({
    status: "success",
    message: "Orders retrieved successfully from database",
    orders,
  });
});

export const allOrder = TryCatch(async (req, res, next) => {
  const key = "all-orders";
  let orders: any[] = [];

  if (MyCache.has(key)) {
    orders = MyCache.get(key) as any[];
  } else {
    orders = await Order.find().populate("user", "name");
    MyCache.set(key, orders, 3600);
  }

  if (!orders || orders.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "No orders found",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Orders retrieved successfully",
    orders,
  });
});

export const getSingleOrder = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  console.log(`Fetching order with ID: ${id}`); // Logging

  if (!id) {
    return next(new ErrorHandler("Order ID is required", 400));
  }

  const key = `order-${id}`;

  let order;

  console.log(`Checking cache for key: ${key}`); // Logging

  if (MyCache.has(key)) {
    order = MyCache.get(key);
    console.log(`Order found in cache: ${order}`); // Logging
  } else {
    try {
      order = await Order.findById(id).populate("user", "name");

      if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
      }

      console.log(`Order fetched from database: ${order}`); // Logging
      MyCache.set(key, order);
      console.log(`Order cached with key: ${key}`); // Logging
    } catch (error) {
      console.error(`Error fetching order: ${error}`); // Logging
      return next(new ErrorHandler("An error occurred while fetching the order", 500));
    }
  }

  return res.status(200).json({
    success: true,
    order,
  });
});
