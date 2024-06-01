import { createSlice } from "@reduxjs/toolkit";
import { materialDataPayload } from "./materialDataPayload";

const materialDataSlice = createSlice({
    name: "materialData",
    initialState: {
        materialDatas: [],
        materialData: null,
        paginateParams: materialDataPayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.materialDatas = action.payload;
            return state;
        },
        update: (state, action) => {
            state.materialData = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = materialDataSlice.actions;
export default materialDataSlice.reducer;
