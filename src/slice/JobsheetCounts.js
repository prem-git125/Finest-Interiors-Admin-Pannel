import { createSlice } from "@reduxjs/toolkit";
import { JobsheetCounts } from "../thunks/JobsheetCounts";
import { CompletedJobsheetCounts , PendingJobsheetCounts, TotalRevenue } from "../thunks/JobsheetCounts";

const initialState = {
    totalJobsheets: 0,
    completedJobsheets: 0,
    pendingJobsheets: 0,
    totalRevenue: 0,
    loading: false,
    error: null,
};

const JobsheetCountsSlice = createSlice({
    name: "JobsheetCounts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(JobsheetCounts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(JobsheetCounts.fulfilled, (state, action) => {
                state.totalJobsheets = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(JobsheetCounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(CompletedJobsheetCounts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CompletedJobsheetCounts.fulfilled, (state, action) => {
                state.completedJobsheets = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(CompletedJobsheetCounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(PendingJobsheetCounts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(PendingJobsheetCounts.fulfilled, (state, action) => {
                state.pendingJobsheets = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(PendingJobsheetCounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(TotalRevenue.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(TotalRevenue.fulfilled, (state, action) => {
                state.totalRevenue = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(TotalRevenue.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default JobsheetCountsSlice.reducer;