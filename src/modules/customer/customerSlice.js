import { createSlice } from "@reduxjs/toolkit";
import { customerPayload } from "./customerPayload";

const customerSlice = createSlice({
    name: "customer",
    initialState: {
        customers: [],
        customer: null,
        paginateParams: customerPayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.customers = action.payload;
            return state;
        },
        update: (state, action) => {
            state.customer = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = customerSlice.actions;
export default customerSlice.reducer;
