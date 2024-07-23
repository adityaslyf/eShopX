import express from "express";
import { isAdmin } from "../middleware/auth.js";
import { MyOrder, newOrder } from "../controllers/order.js";

const app = express.Router();

app.post("/new" , newOrder);
app.get("/my" , MyOrder);


export default app;