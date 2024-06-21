import { TryCatch } from "../middleware/error.js";
import { Request, Response } from "express";
import { NewProductRequestBody } from "../types/types.js";
import { Product } from "../models/product.js";
import { unlinkSync } from "fs"; // Import for file deletion

export const newProduct = TryCatch(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    if (!photo) return next(new Error("Please upload a photo"));

    if (!name || !price || !stock || !category) {
      // Check if a photo was uploaded
      if (req.file) {
        try {
          // Attempt to delete the uploaded photo using unlinkSync
          unlinkSync(req.file.path);
        } catch (error) {
          console.error("Error deleting uploaded photo:", error);
          // Handle potential deletion errors gracefully (e.g., log the error)
        }
      }

      return next(new Error("Please enter all fields"));
    }
    await Product.create({
      name,
      price,
      stock,
      category,
      photo: photo.filename,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
    });
  }
);

export const getLatestProducts = TryCatch(async (req, res, next) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);

  return res.status(201).json({
    success: true,
    products,
  });
});

export const getCategories = TryCatch(async (req, res, next) => {
  const categories = await Product.distinct("category");

  return res.status(201).json({
    success: true,
    categories,
  });
});

export const getAdminProducts = TryCatch(async (req, res, next) => {
  const products = await Product.find({});
  return res.status(201).json({
    success: true,
    products,
  });
});