import { TryCatch } from "../middleware/error.js";

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
});
