import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  ProductResponse } from "../../types/api-types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/product`,
  }),

  endpoints: (builder) => ({
    latestProducts: builder.query<ProductResponse , string>({
      query: () => "latest",
    }),
  }),
});

export const { useLatestProductsQuery } = productApi;