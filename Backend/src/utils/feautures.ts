import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017", {
      dbName: "eshopx",
    })
    .then((c) => console.log(`connected to ${c.connection.host}`))
    .catch((e) => console.log(e));
};
