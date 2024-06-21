import { TryCatch } from "../middleware/error.js";
import { Request, Response } from "express";
import { NewProductRequestBody } from "../types/types.js";
import { Product } from "../models/product.js";

export const newProduct = TryCatch(async (req : Request < {} , {} , NewProductRequestBody>, res , next) => {
 
  const {name , price , stock , category} = req.body;
  const photo = req.file
    if(!photo) return next(new Error("Please upload a photo"));

    if(!name || !price || !stock || !category){
        return next(new Error("Please enter all fields"));
    }
  
    await Product.create({
        name, 
        price,
        stock,
        category,
        photo: photo.filename
    });
    return res.status(201).json({
        success: true,
        message: "Product created successfully"
    });
});
