import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";

export const newUser = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    // return next(new ErrorHandler("Mera custom error" , 403));
    throw new Error("Mera custom error");
    const { name, email, photo, gender, role, _id, dob } = req.body;

    // Optionally, add some validation here

    const user = await User.create({
      name,
      email,
      photo,
      gender,
      role,
      _id,
      dob,
    });

    return res.status(201).json({
      status: "success",
      message: `User created successfully, ${user.name}`,
    });
  } catch (err) {
    // Log the error for debugging purposes
    console.error(err);
    next(err);
  }
};
