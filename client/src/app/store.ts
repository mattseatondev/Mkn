import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import sortReducer from '../features/sort/sortSlice';
import categoryReducer from '../features/category/categorySilce';

// Store configuration
export const store = configureStore({
    // Simple reducer with children to handle sorting and tracking active Category
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        sort: sortReducer,
        categories: categoryReducer
    },
    // Default mw included to include safety checks, Thunk support
    // API-specific logic also appended here
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;