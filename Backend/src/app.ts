import express, { Request, Response, NextFunction } from "express";
import userRouter from "./routes/user.js";
import { connectDB } from "./utils/feautures.js";
import bodyParser from "body-parser";
import { errorMiddleware } from "./middleware/error.js";
import productRoute from "./routes/products.js";
import NodeCache from "node-cache";
import cors from "cors"; // Import CORS middleware
import orderRoute from './routes/order.js'
import { config } from "dotenv";
import morgon from "morgan";

config({
  path: "./.env",
});

const app = express();

const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || "";
// Connect to the database
connectDB(mongoURI);

// Initialize cache
export const MyCache = new NodeCache();

// Use CORS middleware
app.use(cors());

// Serve static files from the uploads directory
app.use("/uploads", express.static("uploads"));

// Use body-parser middleware
app.use(bodyParser.json());
app.use(morgon("dev"));
// Use routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
// Health check route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Use error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
