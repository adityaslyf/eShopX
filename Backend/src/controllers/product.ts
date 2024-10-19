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
  import { faker } from "@faker-js/faker";
  import { getFromCache, setToCache, invalidateCache } from "../utils/cacheUtil.js";

  //Create a new product
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

        // Invalidate related caches
        invalidateCache("latestProducts");
        invalidateCache("categories");
        return res.status(201).json({
          success: true,
          message: "Product created successfully",
          Product: newProduct,
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

  // Middleware to get latest products with caching
  export const getLatestProducts = TryCatch(async (req, res, next) => {
    try {
      // Check if the data is already in cache
      const cachedProducts = getFromCache("latestProducts");
      if (cachedProducts) {
        return res.status(200).json({
          success: true,
          products: cachedProducts,
        });
      }

      // If not in cache, fetch from database
      const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);

      // Store the fetched data in cache
      setToCache("latestProducts", products, 600); // 10 minutes TTL

      return res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      next(error);
    }
  });

  // Get product categories
  export const getCategories = TryCatch(async (req, res, next) => {
    try {
      const cachedCategories = getFromCache("categories");
      if (cachedCategories) {
        return res.status(200).json({
          success: true,
          categories: cachedCategories,
        });
      }

      const categories = await Product.distinct("category");
      setToCache("categories", categories, 600); // 10 minutes TTL

      return res.status(200).json({
        success: true,
        categories,
      });
    } catch (error) {
      next(error);
    }
  });

  // Admin can get all products
  export const getAdminProducts = TryCatch(async (req, res, next) => {
    try {
      const cachedProducts = getFromCache("adminProducts");

      if (cachedProducts) {
        return res.status(200).json({
          success: true,
          products: cachedProducts,
        });
      }
      const products = await Product.find({});
      setToCache("adminProducts", products, 600); // 10 minutes TTL

      return res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      next(error);
    }
  });

  // Getting a single product
  export const getSingleProduct = TryCatch(async (req, res, next) => {
    try {
      const cacheKey = `product_${req.params.id}`;
      const cachedProduct = getFromCache(cacheKey);
      if (cachedProduct) {
        return res.status(200).json({
          success: true,
          product: cachedProduct,
        });
      }
      const product = await Product.findById(req.params.id);
      setToCache(cacheKey, product, 600); // 10 minutes TTL

      return res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      next(error);
    }
  });

  // Update a product
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

      // Invalidate related caches
      invalidateCache("latestProducts");
      invalidateCache("categories");
      invalidateCache("adminProducts");
      invalidateCache(`product_${req.params.id}`);

      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
      });
    }
  );

  // Delete a product
  export const deleteProduct = TryCatch(
    async (req: Request<{ id: string }>, res, next) => {
      const product = await Product.findById(req.params.id);
      if (!product) return next(new Error("Product not found"));

      if (product.photo && existsSync(product.photo)) {
        try {
          unlinkSync(product.photo);
        } catch (error) {
          console.error("Error deleting photo:", error);
        }
      }

      await product.deleteOne();

      // Invalidate related caches
      invalidateCache("latestProducts");
      invalidateCache("categories");
      invalidateCache("adminProducts");
      invalidateCache(`product_${req.params.id}`);

      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    }
  );

  // Get all products for search
// Get all products for search
export const getAllProducts = TryCatch(
  async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
    const { search, price, category, sort, page } = req.query;
    const pageNumber = Number(page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;

    let query: BaseQuery = {};

    // Filter by search keyword (name and category)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by category
    if (category && category !== "none") {
      query.category = category;
    }

    // Filter by price range
    if (price) {
      query.price = { $lte: Number(price) };
    }

    // Sorting
    let sortOptions: SortOptions = { createdAt: -1 };
    if (sort === "asc") {
      sortOptions = { price: 1 };
    } else if (sort === "desc") {
      sortOptions = { price: -1 };
    }

    try {
      const products = await Product.find(query)
        .sort(sortOptions)
        .skip((pageNumber - 1) * limit)
        .limit(limit);

      const totalItems = await Product.countDocuments(query);
      const totalPages = Math.ceil(totalItems / limit);

      return res.status(200).json({
        success: true,
        products,
        totalPages,
      });
    } catch (error) {
      return next(error);
    }
  }
);