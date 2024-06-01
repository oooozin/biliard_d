import { createSlice } from "@reduxjs/toolkit";
import { categoryPayload } from "./categoryPayload";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categorys: [],
        category: null,
        paginateParams: categoryPayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.categorys = action.payload;
            return state;
        },
        update: (state, action) => {
            state.category = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = categorySlice.actions;
export default categorySlice.reducer;
