import { Product, User } from "./types";
export type MessageResponse = {
  success: boolean;
  message: string;
};

export type UserResponse = {
  success: boolean;
  user?: User;
  message?: string;
};

export type ProductResponse = {
  success: boolean;
  products?: Product[];
};

export type CustomError = {
  statusCode: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type CategoryResponse = {
  success: boolean;
  categories  : string[];
};
export type searchProductsResponse = ProductResponse &{
  totalPages: number;
};
export type searchProductsRequest={
  price: number;
  page: number;
  category: string;
  sort: string;
  search: string;

};