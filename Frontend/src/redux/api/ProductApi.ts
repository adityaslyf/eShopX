import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CategoryResponse,
  MessageResponse,
  NewProductRequest,
  ProductResponse,
  searchProductsRequest,
  searchProductsResponse,
} from "../../types/api-types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/product`,
  }),

  endpoints: (builder) => ({
    latestProducts: builder.query<ProductResponse, string>({
      query: () => "latest",
    }),
    allProducts: builder.query<ProductResponse, string>({
      query: (id) => `admin-products?=${id}`,
    }),
    categories: builder.query<CategoryResponse, string>({
      query: () => "categories",
    }),
    searchProducts: builder.query<
      searchProductsResponse,
      searchProductsRequest
    >({
      query: ({ price, search, sort, category, page }) => {
        let base = `search?search=${search}&page=${page}`;
        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;
        return base;
      },
    }),
    newProduct: builder.mutation<MessageResponse, NewProductRequest>({
      query: ({ formData, id }) => ({
        url:`new?id=${id}`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useNewProductMutation
} = productApi;
