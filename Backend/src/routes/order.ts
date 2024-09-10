import express from "express";
import { isAdmin } from "../middleware/auth.js";
import { allOrder, getSingleOrder, MyOrder, newOrder ,  } from "../controllers/order.js";

const app = express.Router();

app.post("/new" , newOrder);
app.get("/my" , MyOrder);
app.get("/all",   allOrder);
app.route('/:id').get(getSingleOrder)


export default app;