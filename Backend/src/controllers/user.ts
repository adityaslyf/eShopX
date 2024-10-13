import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middleware/error.js";

export const  newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    // throw new Error("Test error");
    const { name, email, photo, gender, role, _id, dob } = req.body;  

    let user = await User.findById(_id);

    // Optionally, add more detailed validation (e.g., using Joi)

    if (user) {
      return res.status(200).json({
        success: true,
        message: `Welcome , ${user.name}`,
      });
    }

    if (!name || !email || !role || !_id || !dob) {
      return next(new ErrorHandler("Missing required fields", 400));
    }
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
      return next(error);
    }
  }
);

export const getAllUsers = TryCatch(
  //although we dont need to specify the type of req, res, next,  cz of the TryCatch function has controllerType in which we have specified the type of req, res, next
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
);


export const getUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

export const deleteUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(`Deleting user with ID: ${req.params.id}`); // Log the ID being deleted
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error(`Error deleting user: ${error}`); // Log any errors
      next(error);
    }
  }
);
