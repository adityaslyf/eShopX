import mongoose from "mongoose";

export const connectDB = (uri :string) => {
  mongoose
    .connect(uri, {
      dbName: "eshopx",
    })
    .then((c) => console.log(`connected to ${c.connection.host}`))
    .catch((e) => console.log(e));
};
