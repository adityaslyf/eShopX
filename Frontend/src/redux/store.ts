import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/UserApi";
import { userReducer } from "./reducer/UserReducer";
import { productApi } from "./api/ProductApi";

export const server = import.meta.env.VITE_SERVER_URL;

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [userReducer.name]: userReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware ,productApi.middleware),

});
