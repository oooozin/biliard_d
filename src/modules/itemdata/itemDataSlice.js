import { createSlice } from "@reduxjs/toolkit";
import { itemDataPayload } from "./itemDataPayload";

const itemDataSlice = createSlice({
    name: "itemData",
    initialState: {
        itemDatas: [],
        itemData: null,
        paginateParams: itemDataPayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.itemDatas = action.payload;
            return state;
        },
        update: (state, action) => {
            state.itemData = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = itemDataSlice.actions;
export default itemDataSlice.reducer;
