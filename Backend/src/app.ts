import express, { Request, Response, NextFunction } from "express";
import userRouter from "./routes/user.js";
import { connectDB } from "./utils/feautures.js";
import bodyParser from "body-parser";
import { errorMiddleware } from "./middleware/error.js";
const app = express();
const port = 4000;

connectDB();

app.use(bodyParser.json());
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
