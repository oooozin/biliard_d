import { createSlice } from "@reduxjs/toolkit";
import { tablePayload } from "./tablePayload";

const tableSlice = createSlice({
    name: "table",
    initialState: {
        tables: [],
        table: null,
        paginateParams: tablePayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.tables = action.payload;
            return state;
        },
        update: (state, action) => {
            state.table = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = tableSlice.actions;
export default tableSlice.reducer;
