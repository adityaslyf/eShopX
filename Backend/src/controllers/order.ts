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
  const order = await Order.find({ user: req.params.id });

  if (MyCache.has("orders")) {
    MyCache.set("orders", order);
  } else {
    MyCache.set("orders", order, 3600);
  }
  return res.status(200).json({
    status: "success",
    order,
  });

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  return res.status(200).json({
    status: "success",
    order,
  });
});
