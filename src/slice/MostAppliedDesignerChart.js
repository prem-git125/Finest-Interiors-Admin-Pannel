import { createSlice } from "@reduxjs/toolkit";
import { MostAppliedDesignerChart } from "../thunks/MostAppliedDesignerChart";

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const MostAppliedDesignerChartSlice = createSlice({
    name: "MostAppliedDesignerChart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(MostAppliedDesignerChart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(MostAppliedDesignerChart.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(MostAppliedDesignerChart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default MostAppliedDesignerChartSlice.reducer;