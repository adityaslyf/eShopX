import {configureStore} from '@reduxjs/toolkit';

export const server = import.meta.env.VITE_SERVER_URL;

export const store = configureStore({
    reducer: {}, // Add reducers here
});