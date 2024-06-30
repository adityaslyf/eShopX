import express from "express";
import { isAdmin } from "../middleware/auth.js";
import { newOrder } from "../controllers/order.js";

const app = express.Router();

app.post("/new" , newOrder);


export default app;