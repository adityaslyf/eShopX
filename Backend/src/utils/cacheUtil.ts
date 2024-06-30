// cacheUtil.ts
import { MyCache } from "../app.js";

export const getFromCache = (key: string) => {
    return MyCache.get(key);
};

export const setToCache = (key: string, value: any, ttl?: number) => {
    return MyCache.set(key, value, ttl !== undefined ? ttl : 0);
};

export const invalidateCache = (key: string) => {
    return MyCache.del(key);
};
