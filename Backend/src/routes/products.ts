import express from "express";

import { isAdmin } from "../middleware/auth.js";
import {
  newProduct,
  getLatestProducts,
  getCategories,
  getAdminProducts,
} from "../controllers/product.js";
import { singleUpload } from "../middleware/multer.js";
import { get } from "http";

const app = express.Router();

app.post("/new", singleUpload, newProduct);
app.get("/latest", getLatestProducts);
app.get("/categories", getCategories);
app.get("/admin-products" , getAdminProducts);

export default app;
