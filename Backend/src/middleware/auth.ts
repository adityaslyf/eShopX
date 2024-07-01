import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middleware/error.js";


export const isAdmin = TryCatch(async (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    return next(new ErrorHandler("login first", 401));
  }
  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  if (user.role !== "admin") {
    return next(new ErrorHandler("You are not authorized", 401));
  }
  next();
});
