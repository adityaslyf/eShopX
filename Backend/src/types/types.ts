import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
  _id: string;
  name: string;
  photo: string;
  role: "admin" | "user";
  email: string;
  gender: "male" | "female";
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
  age: number;
}

export interface NewProductRequestBody {
  name: string;
  category: string;
  price: number;
  stock: number;
}

export type ControllerType = (
  req: Request<any>,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export type SearchRequestQuery = {
  search?: string;
  price?: string;
  category?: string;
  sort?: string;
  page?: string;
  productName?: string;
};

export interface BaseQuery {
  $or?: { [key: string]: any }[]; // Optional: Allows querying with logical OR on multiple conditions
  category?: string; // Optional: Filters documents by category

  price?: {
    $gte: number; // Optional: Filters documents where price is greater than or equal to a specified value
    $lte: number; // Optional: Filters documents where price is less than or equal to a specified value
    $eq?: number; // Optional: Filters documents where price is exactly equal to a specified value
  };

  name?: {
    $regex: string; // Optional: Filters documents where name matches a specified pattern (case insensitive)
    $options: string; // Optional: Options for regex matching (e.g., 'i' for case insensitivity)
  };

  // Add more fields as needed for your specific query structure
}

// Example definition in types/types.js or equivalent
export type SortOptions = {
  [key: string]: 1 | -1; // Dynamically define keys as string and values as 1 or -1
};

export type OrderItemType = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
};

export type ShippingInfoType = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
};

export interface NewOrderRequestBody {
  shippingInfo: ShippingInfoType;
  user: string;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  orderItems: OrderItemType[];
}