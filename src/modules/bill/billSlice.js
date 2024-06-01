import { createSlice } from "@reduxjs/toolkit";
import { billPayload } from "./billPayload";

const billSlice = createSlice({
    name: "bill",
    initialState: {
        bills: [],
        bill: null,
        paginateParams: billPayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.bills = action.payload;
            return state;
        },
        update: (state, action) => {
            state.bill = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = billSlice.actions;
export default billSlice.reducer;
