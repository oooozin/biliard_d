import { createSlice } from "@reduxjs/toolkit";
import { itemPayload } from "./itemPayload";

const itemSlice = createSlice({
    name: "item",
    initialState: {
        items: [],
        item: null,
        paginateParams: itemPayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.items = action.payload;
            return state;
        },
        update: (state, action) => {
            state.item = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = itemSlice.actions;
export default itemSlice.reducer;
