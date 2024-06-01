import { createSlice } from "@reduxjs/toolkit";
import { shopPayload } from "./shopPayload";

const shopSlice = createSlice({
    name: "shop",
    initialState: {
        shops: [],
        shop: null,
        paginateParams: shopPayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.shops = action.payload;
            return state;
        },
        update: (state, action) => {
            state.shop = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = shopSlice.actions;
export default shopSlice.reducer;
