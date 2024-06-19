import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middleware/error.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    throw new Error("Test error");
    const { name, email, photo, gender, role, _id, dob } = req.body;

    // Basic validation
    if (!name || !email || !role || !_id || !dob) {
      return next(new ErrorHandler("Missing required fields", 400));
    }

    // Optionally, add more detailed validation (e.g., using Joi)

    try {
      const user = await User.create({
        name,
        email,
        photo,
        gender,
        role,
        _id,
        dob: new Date(dob),
      });

      return res.status(201).json({
        status: "success",
        message: `User created successfully, ${user.name}`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
