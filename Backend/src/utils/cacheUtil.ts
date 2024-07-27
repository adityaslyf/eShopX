  // // cacheUtil.ts
  import { MyCache } from "../app.js";
  import { Product } from "../models/product.js";
  import { invalidateCacheProps } from "../types/types.js";


  export const getFromCache = (key: string):any => {
    return MyCache.get(key);
  };

  export const setToCache = (key: string, value: any, ttl?: number) : boolean => {
    return MyCache.set(key, value, ttl !== undefined ? ttl : 0);
  };

  export const invalidateCache = (key: string) : number => {
    return MyCache.del(key);
  };

  // export const invalidateCache = async ({ product }: invalidateCacheProps) => {
  //   if (product) {
  //     const productKeys = ["latestProducts", "categories", "adminProducts"];
  //     const products = await Product.find({}).select("_id");
  //     MyCache.del(productKeys);

  //     products.forEach((i) => {
  //       productKeys.push(`product_${i._id}`);
  //     });
  //   }
  // };
