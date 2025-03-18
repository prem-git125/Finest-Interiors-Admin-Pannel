import { createSlice } from "@reduxjs/toolkit";
import { userdesignerCharts, topFiveDesigner } from "../thunks/userdesignerCharts";

const initialState = {
    data:{ usersCount: 0, designersCount: 0},
    loading: false,
    error: null,
    designerData: [],
};

const userDesignerChartsSlice = createSlice({
    name: 'userdesignerCharts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(userdesignerCharts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(userdesignerCharts.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(userdesignerCharts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder
        .addCase(topFiveDesigner.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(topFiveDesigner.fulfilled, (state, action) => {
            state.loading = false;
            state.designerData = action.payload;
        })

        .addCase(topFiveDesigner.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
})

export default userDesignerChartsSlice.reducer