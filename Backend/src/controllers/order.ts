import { TryCatch } from "../middleware/error.js";
import { Order } from "../models/order.js";
import { invalidateCache } from "../utils/cacheUtil.js";
import { reduceStock } from "../utils/features.js";

export const newOrder = TryCatch(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    user,
    discount,
    tax,
    total,
    shippingCharges,
  } = req.body;

   const order =  await Order.create({
    orderItems,
    shippingInfo,
    user,
    discount,
    tax,
    total,
    shippingCharges,
  });

  reduceStock(orderItems);
  invalidateCache("orders");
});

