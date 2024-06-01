import { createSlice } from "@reduxjs/toolkit";
import { transferItemPayload } from "./transferItemPayload";

const transferItemSlice = createSlice({
    name: "transferItem",
    initialState: {
        transferItems: [],
        transferItem: null,
        paginateParams: transferItemPayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.transferItems = action.payload;
            return state;
        },
        update: (state, action) => {
            state.transferItem = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = transferItemSlice.actions;
export default transferItemSlice.reducer;
