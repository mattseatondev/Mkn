// features/sort/sortSlice.ts
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type SortOption = 'category' | 'isComplete' | 'category+isComplete' | 'createdAt' | 'updatedAt' | 'isComplete+createdAt';

interface SortState {
    option: SortOption;
}

const initialState: SortState = {
    option: 'isComplete+createdAt'
};

export const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSortOption: (state, action: PayloadAction<SortOption>) => {
            // Immer is creating an immutable copy
            state.option = action.payload;
        }
    }
});

export const { setSortOption } = sortSlice.actions;
export default sortSlice.reducer;
