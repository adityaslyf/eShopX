import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";

export const newUser = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
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

    // Send a generic error response
    return res.status(500).json({
      status: "error",
      message: "An error occurred while creating the user",
      error: err instanceof Error ? err.message : 'Unknown error',
    });

    // You can still pass the error to the next middleware if needed
    next(err);
  }
};
