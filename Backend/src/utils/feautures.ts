import mongoose from "mongoose";
import { OrderItemType } from "../types/types.js";
import { Product } from  '../models/product.js'

export const connectDB = (uri :string) => {
  mongoose
    .connect(uri, {
      dbName: "eshopx",
    })
    .then((c) => console.log(`connected to ${c.connection.host}`))
    .catch((e) => console.log(e));
};

export const reduceStock = async (orderItems: OrderItemType[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if (!product) throw new Error("Product Not Found");
    product.stock -= order.quantity;
    await product.save();
  }
};