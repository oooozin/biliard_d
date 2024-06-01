import { createSlice } from "@reduxjs/toolkit";
import { counterPayload } from "./counterPayload";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        tables: [],
        table: null,
        order: null,
        category: [],
        paginateParams: counterPayload.paginateParams,
        categoryParams: counterPayload.categoryParams
    },
    reducers: {
        tables: (state, action) => {
            state.tables = action.payload;
            return state;
        },
        category: (state, action) => {
            state.category = action.payload;
            return state;
        },
        order: (state, action) => {
            state.order = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
        setCategoryPaginate: (state, action) => {
            state.categoryParams = action.payload;
            return state;
        },
        update: (state, action) => {
            state.table = action.payload;
            return state;
        },
        updateorder: (state, action) => {
            state.order = action.order;
            return state
        }
    },
});

export const { tables, setPaginate, category, update, updateorder, order } = counterSlice.actions;
export default counterSlice.reducer;