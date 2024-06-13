import express from "express";
import userRouter from "./routes/user.js";
const app = express();
const port = 4000;

app.get("/api/v1", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
