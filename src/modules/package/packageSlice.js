import { createSlice } from "@reduxjs/toolkit";
import { packagePayload } from "./packagePayload";

const packageSlice = createSlice({
    name: "package",
    initialState: {
        packages: [],
        packageData: null,
        paginateParams: packagePayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.packages = action.payload;
            return state;
        },
        update: (state, action) => {
            state.packageData = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = packageSlice.actions;
export default packageSlice.reducer;
