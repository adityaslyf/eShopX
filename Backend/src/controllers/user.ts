import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";

export const newUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {} = req.body;
    const user = await User.create({});
    return res.status(201).json({
      status: "success",
      message: `User created successfully" , ${user.name}`,
    });
  } catch (err) {
    next(err);
  }
};
