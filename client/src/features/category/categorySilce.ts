import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Category } from "../../types";

interface CategoryState {
    activeCat: Category;
}

// Default Category State: Displayed as "All Todos" in UI
export const allCat: Category = {
    id: -1,
    type: 'all',
    name: 'All',
    // Casts Date type to ISO string to prevent TS error
    createdAt: new Date().toISOString(),
    details: ''
};

// Sets activeCat var to its default state on app start
const initialState: CategoryState = {
    activeCat: allCat,
};

// State slice used to track and update Active Category
// Reducer allows component/user action to update this value
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
