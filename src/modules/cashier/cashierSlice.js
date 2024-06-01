import { createSlice } from "@reduxjs/toolkit";
import { cashierPayload } from "./cashierPayload";

const cashierSlice = createSlice({
    name: "cashier",
    initialState: {
        cashiers: [],
        cashier: null,
        paginateParams: cashierPayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.cashiers = action.payload;
            return state;
        },
        update: (state, action) => {
            state.cashier = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = cashierSlice.actions;
export default cashierSlice.reducer;
