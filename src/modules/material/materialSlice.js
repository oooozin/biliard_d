import { createSlice } from "@reduxjs/toolkit";
import { materialPayload } from "./materialPayload";

const materialSlice = createSlice({
    name: "material",
    initialState: {
        materials: [],
        material: null,
        paginateParams: materialPayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.materials = action.payload;
            return state;
        },
        update: (state, action) => {
            state.material = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = materialSlice.actions;
export default materialSlice.reducer;
