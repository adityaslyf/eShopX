import express from "express";

import { isAdmin } from "../middleware/auth.js";
import { getAllProducts, getSingleProduct, updateProduct , deleteProduct } from "../controllers/product.js";
import {
  newProduct,
  getLatestProducts,
  getCategories,
  getAdminProducts,
} from "../controllers/product.js";
import { singleUpload } from "../middleware/multer.js";

const app = express.Router();

app.post("/new", singleUpload, newProduct);
app.get("/search", getAllProducts);
app.get("/latest", getLatestProducts);
app.get("/categories", getCategories);
app.get("/admin-products", getAdminProducts);

app.route("/:id").get(getSingleProduct).put( singleUpload , updateProduct).delete(deleteProduct);


export default app;
