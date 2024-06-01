import { createSlice } from "@reduxjs/toolkit";
import { transferMaterialPayload } from "./transferMaterialPayload";

const transferMaterialSlice = createSlice({
    name: "transferMaterial",
    initialState: {
        transferMaterials: [],
        transferMaterial: null,
        paginateParams: transferMaterialPayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.transferMaterials = action.payload;
            return state;
        },
        update: (state, action) => {
            state.transferMaterial = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = transferMaterialSlice.actions;
export default transferMaterialSlice.reducer;
