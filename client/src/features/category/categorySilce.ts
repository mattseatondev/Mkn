import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Category } from "../../types";

interface CategoryState {
    activeCat: Category;
}

export const allCat: Category = {
    id: -1,
    type: 'all',
    name: 'All',
    createdAt: new Date(),
    details: ''
};

const initialState: CategoryState = {
    activeCat: allCat, // default
};

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setActiveCat(state, action: PayloadAction<Category>) {
            state.activeCat = action.payload;
        }
    }
});

export const { setActiveCat } = categorySlice.actions;
export default categorySlice.reducer;
