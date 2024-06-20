import { TryCatch } from "../middleware/error.js";

export const newProduct = TryCatch(async (req, res, next) => {
  res.send("New product");
});
