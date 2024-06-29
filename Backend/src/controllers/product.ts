import { TryCatch } from "../middleware/error.js";
import { Request, Response } from "express";
import {
  NewProductRequestBody,
  SearchRequestQuery,
  BaseQuery,
  SortOptions,
} from "../types/types.js";
import { Product } from "../models/product.js";
import { unlinkSync, existsSync } from "fs"; // Import for file deletion

export const newProduct = TryCatch(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    if (!photo) return next(new Error("Please upload a photo"));

    if (!name || !price || !stock || !category) {
      if (req.file) {
        try {
          unlinkSync(req.file.path);
        } catch (error) {
          console.error("Error deleting uploaded photo:", error);
        }
      }

      return next(new Error("Please enter all fields"));
    }

    try {
      const newProduct = await Product.create({
        name,
        price,
        stock,
        category,
        photo: photo.filename,
      });

      return res.status(201).json({
        success: true,
        message: "Product created successfully",
        Product,
      });
    } catch (error) {
      if (req.file) {
        try {
          unlinkSync(req.file.path);
        } catch (unlinkError) {
          console.error(
            "Error deleting uploaded photo after failure:",
            unlinkError
          );
        }
      }
      return next(error);
    }
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

export const getSingleProduct = TryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  return res.status(201).json({
    success: true,
    product,
  });
});

export const updateProduct = TryCatch(
  async (
    req: Request<{ id: string }, {}, NewProductRequestBody>,
    res,
    next
  ) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;

    const product = await Product.findById(req.params.id);
    if (!product) return next(new Error("Product not found"));

    if (photo) {
      if (existsSync(product.photo)) {
        try {
          unlinkSync(product.photo);
        } catch (error) {
          console.error("Error deleting old photo:", error);
        }
      } else {
        console.warn("Old photo not found, skipping deletion");
      }
      product.photo = photo.filename;
    }

    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  }
);

export const getAllProducts = TryCatch(
  async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
    const { search, price, category, sort, page, productName } = req.query;
    const pageNumber = Number(page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;

    let query: BaseQuery = {}; // Initialize query as an empty object

    // Filter by search keyword (name and category)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by product name
    if (productName) {
      query.name = { $regex: productName, $options: "i" }; // Case-insensitive search for name
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by price range or exact value
    if (price) {
      const priceRange = price.split("-");
      if (priceRange.length === 2) {
        query.price = {
          $gte: Number(priceRange[0]),
          $lte: Number(priceRange[1]),
        };
      } else if (priceRange.length === 1) {
        query.price = {
          $eq: Number(priceRange[0]),
        };
      }
    }

    // Sorting
    let sortOptions: SortOptions = { createdAt: -1 }; // Default sorting by createdAt descending
    if (sort === "price") {
      sortOptions = { price: 1 }; // Sort by price ascending
    } else if (sort === "-price") {
      sortOptions = { price: -1 }; // Sort by price descending
    }

    try {
      // Execute the query
      const products = await Product.find(query)
        .sort(sortOptions)
        .skip((pageNumber - 1) * limit)
        .limit(limit);

      // Calculate total pages
      const totalItems = await Product.countDocuments(query);
      const totalPages = Math.ceil(totalItems / limit);

      // Generate array of page numbers
      const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

      return res.status(200).json({
        success: true,
        products,
        totalPages,
        pagesArray,
      });
    } catch (error) {
      next(error);
    }
  }
);
